"use client";

import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

/* ------------------------------------------------------------------ *
 * Balance Transfer Simulator — home / MSME term loan
 * A balance transfer re-originates an EXISTING loan mid-life: the new
 * lender pays off the outstanding and re-amortises it at a lower rate.
 * This is a STAY vs SWITCH comparison over the *remaining* tenure, net
 * of one-time switching costs (processing fee, foreclosure charge at
 * the old lender, legal / valuation / stamp / MODT).
 *
 * Two switch strategies:
 *   - Keep tenure  : hold the months, drop the EMI  → monthly cash saving.
 *   - Keep EMI     : hold the EMI, shorten the tenure → finish earlier.
 * ------------------------------------------------------------------ */

const BG = "#FAF8F3";
const CARD = "#FFFFFF";
const RULE = "#E7E2D8";
const INK = "#1F2421";
const MUTED = "#6B7280";
const ORANGE = "#E07A3F";
const ORANGE_SOFT = "#FBEFE6";
const BLUE = "#3E6E8E";
const BLUE_SOFT = "#E9F0F4";

/* ----------------------------- helpers ---------------------------- */

function amort(P, i, n) {
  if (n <= 0) return P;
  if (i === 0) return P / n;
  const f = Math.pow(1 + i, n);
  return (P * i * f) / (f - 1);
}

// Indian-grouped rupee integer, e.g. ₹1,23,425
function inr(n) {
  const v = Math.round(n || 0);
  return "\u20B9" + v.toLocaleString("en-IN");
}

// compact ₹ label: ₹1.70 Cr / ₹50.00 L / ₹45,000
function compact(n) {
  const v = Math.abs(n || 0);
  if (v >= 1e7) return "\u20B9" + (n / 1e7).toFixed(2) + " Cr";
  if (v >= 1e5) return "\u20B9" + (n / 1e5).toFixed(2) + " L";
  return "\u20B9" + Math.round(n || 0).toLocaleString("en-IN");
}

function monthsToYM(m) {
  const v = Math.max(0, Math.round(m));
  const y = Math.floor(v / 12);
  const mo = v % 12;
  if (y && mo) return `${y}y ${mo}m`;
  if (y) return `${y}y`;
  return `${mo}m`;
}

/* ----------------------------- engine ----------------------------- */

// Amortise a principal at a fixed EMI until it clears. Returns the row
// series, total interest, and the month it closes.
function runLoan(P, i, emi, guard) {
  const rows = [];
  let bal = P;
  let totalInterest = 0;
  const cap = Math.max(1, Math.round(guard)) + 12;
  for (let m = 1; m <= cap; m++) {
    const interest = bal * i;
    let principal = emi - interest;
    let payment = emi;
    if (bal + interest <= emi) {
      // final instalment clears the balance
      principal = bal;
      payment = bal + interest;
      totalInterest += interest;
      rows.push({ month: m, interest, principal, payment, balance: 0 });
      bal = 0;
      break;
    }
    if (principal < 0) principal = 0; // safety (EMI below interest)
    bal -= principal;
    totalInterest += interest;
    rows.push({ month: m, interest, principal, payment, balance: bal });
    if (bal <= 0.5) break;
  }
  return { rows, totalInterest, months: rows.length };
}

function simulate({
  outstanding,
  oldRate,
  remainingMonths,
  newRate,
  strategy, // 'tenure' | 'emi'
  procPct,
  foreclosurePct,
  otherCosts,
}) {
  const O = Math.max(0, Number(outstanding) || 0);
  const iOld = (Number(oldRate) || 0) / 1200;
  const iNew = (Number(newRate) || 0) / 1200;
  const n = Math.max(1, Math.round(Number(remainingMonths) || 1));

  // STAY — current lender, current rate, remaining tenure
  const emiStay = amort(O, iOld, n);
  const stay = runLoan(O, iOld, emiStay, n);

  // SWITCH — new lender re-amortises the same outstanding at the new rate
  let emiNew;
  if (strategy === "emi") {
    emiNew = emiStay; // hold the EMI, let the tenure fall out
  } else {
    emiNew = amort(O, iNew, n); // hold the tenure, lower the EMI
  }
  const switchRun = runLoan(O, iNew, emiNew, strategy === "emi" ? n * 2 : n);

  // One-time switching costs
  const processingFee = O * ((Number(procPct) || 0) / 100);
  const foreclosureFee = O * ((Number(foreclosurePct) || 0) / 100);
  const otherFee = Math.max(0, Number(otherCosts) || 0);
  const totalCost = processingFee + foreclosureFee + otherFee;

  const grossInterestSaved = stay.totalInterest - switchRun.totalInterest;
  const netSaved = grossInterestSaved - totalCost;
  const monthlySaving = emiStay - emiNew; // >0 only in keep-tenure
  const monthsSaved = stay.months - switchRun.months; // >0 only in keep-EMI

  // Break-even.
  //  keep-tenure : cash-flow — months of lower EMI to recover the cost.
  //  keep-EMI    : interest-recovery — month cumulative interest saved ≥ cost.
  let breakEven = null;
  if (strategy === "tenure") {
    breakEven = monthlySaving > 0 ? Math.ceil(totalCost / monthlySaving) : null;
  } else {
    let cumStay = 0;
    let cumSwitch = 0;
    const mx = Math.max(stay.months, switchRun.months);
    for (let m = 1; m <= mx; m++) {
      cumStay += stay.rows[m - 1] ? stay.rows[m - 1].interest : 0;
      cumSwitch += switchRun.rows[m - 1] ? switchRun.rows[m - 1].interest : 0;
      if (cumStay - cumSwitch >= totalCost) {
        breakEven = m;
        break;
      }
    }
  }

  return {
    O,
    n,
    emiStay,
    emiNew,
    stay,
    switchRun,
    processingFee,
    foreclosureFee,
    otherFee,
    totalCost,
    grossInterestSaved,
    netSaved,
    monthlySaving,
    monthsSaved,
    breakEven,
    strategy,
  };
}

/* ------------------------------ atoms ----------------------------- */

function SliderInput({ label, value, onChange, min, max, step, prefix, suffix, hint }) {
  const [buf, setBuf] = React.useState(String(value));
  React.useEffect(() => {
    setBuf(String(value));
  }, [value]);
  const commit = () => {
    let n = parseFloat(String(buf).replace(/[^0-9.\-]/g, ""));
    if (!isFinite(n)) n = min;
    n = Math.min(max, Math.max(min, n));
    onChange(n);
    setBuf(String(n));
  };
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: INK }}>{label}</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            border: `1px solid ${RULE}`,
            borderRadius: 7,
            padding: "2px 7px",
            background: "#fff",
          }}
        >
          {prefix && <span style={{ fontSize: 12.5, color: MUTED }}>{prefix}</span>}
          <input
            type="text"
            inputMode="decimal"
            value={buf}
            onChange={(e) => setBuf(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
            style={{
              width: 84,
              border: "none",
              outline: "none",
              textAlign: "right",
              fontSize: 13.5,
              fontWeight: 700,
              color: INK,
              background: "transparent",
              fontVariantNumeric: "tabular-nums",
              padding: 0,
            }}
          />
          {suffix && <span style={{ fontSize: 12, color: MUTED }}>{suffix}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: ORANGE }}
      />
      {hint && <span style={{ fontSize: 11.5, color: MUTED }}>{hint}</span>}
    </label>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        background: "#fff",
        border: `1px solid ${RULE}`,
        borderRadius: 9,
        padding: 4,
        marginBottom: 18,
        maxWidth: 460,
      }}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              flex: 1,
              padding: "9px 12px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: active ? "#fff" : INK,
              background: active ? ORANGE : "transparent",
              transition: "background 120ms ease",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Metric({ label, value, sub, accent }) {
  return (
    <div
      style={{
        background: accent ? ORANGE_SOFT : "#fff",
        border: `1px solid ${accent ? "#F1D8C6" : RULE}`,
        borderRadius: 11,
        padding: "13px 15px",
        display: "grid",
        gap: 3,
      }}
    >
      <span style={{ fontSize: 11.5, color: MUTED, fontWeight: 600, letterSpacing: 0.2 }}>{label}</span>
      <span style={{ fontSize: 20, fontWeight: 750, color: accent ? ORANGE : INK, lineHeight: 1.1 }}>
        {value}
      </span>
      {sub && <span style={{ fontSize: 11.5, color: MUTED }}>{sub}</span>}
    </div>
  );
}

const ghostBtn = {
  border: `1px solid ${RULE}`,
  background: "#fff",
  borderRadius: 7,
  padding: "6px 11px",
  fontSize: 12,
  fontWeight: 600,
  color: INK,
  cursor: "pointer",
};

/* --------------------------- CSV export --------------------------- */

function toCSV(headers, rows) {
  const esc = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.map(esc).join(","), ...rows.map((r) => r.map(esc).join(","))].join("\n");
}

function downloadCSV(filename, csv) {
  try {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    return true;
  } catch (e) {
    return false;
  }
}

async function copyCSV(csv) {
  try {
    await navigator.clipboard.writeText(csv);
    return true;
  } catch (e) {
    return false;
  }
}

function ym(m) {
  const y = Math.floor((m - 1) / 12) + 1;
  const mo = ((m - 1) % 12) + 1;
  return `${y}.${mo}`;
}

/* ------------------------------- app ------------------------------ */

export default function BalanceTransferSimulator() {
  const [strategy, setStrategy] = useState("tenure"); // 'tenure' | 'emi'
  const [outstanding, setOutstanding] = useState(4000000);
  const [oldRate, setOldRate] = useState(9.5);
  const [remainingMonths, setRemainingMonths] = useState(180);
  const [newRate, setNewRate] = useState(8.5);
  const [procPct, setProcPct] = useState(0.5);
  const [foreclosurePct, setForeclosurePct] = useState(0);
  const [otherCosts, setOtherCosts] = useState(15000);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () =>
      simulate({
        outstanding,
        oldRate,
        remainingMonths,
        newRate,
        strategy,
        procPct,
        foreclosurePct,
        otherCosts,
      }),
    [outstanding, oldRate, remainingMonths, newRate, strategy, procPct, foreclosurePct, otherCosts]
  );

  const keepEMI = strategy === "emi";

  const chartData = useMemo(() => {
    const mx = Math.max(result.stay.months, result.switchRun.months);
    const out = [];
    for (let m = 1; m <= mx; m++) {
      const s = result.stay.rows[m - 1];
      const w = result.switchRun.rows[m - 1];
      out.push({
        month: m,
        Stay: s ? Math.round(s.balance) : 0,
        Switch: w ? Math.round(w.balance) : 0,
      });
    }
    return out;
  }, [result]);

  // Metric tiles adapt to the chosen strategy.
  const metrics = keepEMI
    ? [
        { label: "EMI (unchanged)", value: inr(result.emiNew), sub: "same EMI, charged at the new rate" },
        {
          label: "New tenure",
          value: monthsToYM(result.switchRun.months),
          sub: `was ${monthsToYM(result.n)} · ${monthsToYM(result.monthsSaved)} shorter`,
          accent: true,
        },
        {
          label: "Net saving",
          value: compact(result.netSaved),
          sub: `after ${compact(result.totalCost)} switching cost`,
          accent: true,
        },
        {
          label: "Cost recovered by",
          value: result.breakEven ? `month ${result.breakEven}` : "—",
          sub: "when interest saved covers the cost",
        },
        { label: "Interest saved (gross)", value: compact(result.grossInterestSaved), sub: inr(result.grossInterestSaved) },
        { label: "Switching cost", value: compact(result.totalCost), sub: "processing + charges + legal" },
      ]
    : [
        { label: "Current EMI", value: inr(result.emiStay), sub: `${monthsToYM(result.n)} remaining` },
        {
          label: "New EMI",
          value: inr(result.emiNew),
          sub: `save ${inr(result.monthlySaving)} / month`,
          accent: true,
        },
        {
          label: "Net saving",
          value: compact(result.netSaved),
          sub: `after ${compact(result.totalCost)} switching cost`,
          accent: true,
        },
        {
          label: "Break-even",
          value: result.breakEven ? `${result.breakEven} mo` : "—",
          sub: "lower EMIs to recover the cost",
        },
        { label: "Interest saved (gross)", value: compact(result.grossInterestSaved), sub: inr(result.grossInterestSaved) },
        { label: "Switching cost", value: compact(result.totalCost), sub: "processing + charges + legal" },
      ];

  const CSV_HEADERS = [
    "Month",
    "Year.Month",
    "EMI/Payment",
    "Interest",
    "Principal",
    "Balance (switch)",
    "Balance (stay)",
    "Interest saved (cum.)",
  ];

  const csvRows = useMemo(() => {
    const mx = Math.max(result.stay.months, result.switchRun.months);
    const out = [];
    let cumStay = 0;
    let cumSwitch = 0;
    for (let m = 1; m <= mx; m++) {
      const w = result.switchRun.rows[m - 1];
      const s = result.stay.rows[m - 1];
      cumStay += s ? s.interest : 0;
      cumSwitch += w ? w.interest : 0;
      out.push([
        m,
        ym(m),
        w ? Math.round(w.payment) : 0,
        w ? Math.round(w.interest) : 0,
        w ? Math.round(w.principal) : 0,
        w ? Math.round(w.balance) : 0,
        s ? Math.round(s.balance) : 0,
        Math.round(cumStay - cumSwitch),
      ]);
    }
    return out;
  }, [result]);

  const handleDownload = () => downloadCSV("balance-transfer-schedule.csv", toCSV(CSV_HEADERS, csvRows));
  const handleCopy = async () => {
    const ok = await copyCSV(toCSV(CSV_HEADERS, csvRows));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  // On-screen table: the new (switch) loan, with the stay balance alongside.
  const tableRows = useMemo(() => {
    const mx = Math.max(result.stay.months, result.switchRun.months);
    const out = [];
    for (let m = 1; m <= mx; m++) {
      const w = result.switchRun.rows[m - 1];
      const s = result.stay.rows[m - 1];
      out.push({
        month: m,
        emi: w ? w.payment : 0,
        interest: w ? w.interest : 0,
        principal: w ? w.principal : 0,
        balance: w ? w.balance : 0,
        stayBalance: s ? s.balance : 0,
        closed: !w,
      });
    }
    return out;
  }, [result]);

  const visibleRows = showAll ? tableRows : tableRows.slice(0, 36);

  const worthIt = result.netSaved > 0;

  return (
    <div
      style={{
        background: BG,
        minHeight: "100%",
        padding: "26px 22px 40px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: INK,
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <h1 style={{ fontSize: 25, fontWeight: 800, margin: "0 0 5px", letterSpacing: -0.4 }}>
            Balance Transfer Simulator
          </h1>
          <p style={{ fontSize: 13.5, color: MUTED, margin: 0, maxWidth: 760, lineHeight: 1.55 }}>
            A balance transfer re-originates an existing loan mid-life: the new lender clears the
            outstanding and re-amortises it at a lower rate over the remaining tenure. This weighs{" "}
            <b>staying</b> against <b>switching</b>, net of one-time costs. Hold the tenure to cut the
            EMI, or hold the EMI to finish sooner.
          </p>
        </div>

        {/* Strategy toggle */}
        <Segmented
          value={strategy}
          onChange={setStrategy}
          options={[
            { value: "tenure", label: "Keep tenure · lower EMI" },
            { value: "emi", label: "Keep EMI · shorter tenure" },
          ]}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 350px) 1fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* Controls */}
          <div
            style={{
              background: CARD,
              border: `1px solid ${RULE}`,
              borderRadius: 12,
              padding: 20,
              display: "grid",
              gap: 18,
            }}
          >
            <div style={{ fontSize: 11.5, fontWeight: 700, color: MUTED, letterSpacing: 0.3 }}>
              EXISTING LOAN
            </div>
            <SliderInput
              label="Outstanding to transfer"
              prefix="\u20B9"
              value={outstanding}
              onChange={setOutstanding}
              min={500000}
              max={50000000}
              step={100000}
              hint={compact(outstanding)}
            />
            <SliderInput
              label="Current rate"
              value={oldRate}
              onChange={setOldRate}
              min={6}
              max={18}
              step={0.05}
              suffix="% p.a."
            />
            <SliderInput
              label="Remaining tenure"
              value={remainingMonths}
              onChange={setRemainingMonths}
              min={12}
              max={360}
              step={1}
              suffix="mo"
              hint={monthsToYM(remainingMonths)}
            />

            <div style={{ height: 1, background: RULE }} />
            <div style={{ fontSize: 11.5, fontWeight: 700, color: MUTED, letterSpacing: 0.3 }}>
              NEW LOAN
            </div>
            <SliderInput
              label="New rate"
              value={newRate}
              onChange={setNewRate}
              min={6}
              max={18}
              step={0.05}
              suffix="% p.a."
            />

            <div style={{ height: 1, background: RULE }} />
            <div style={{ fontSize: 11.5, fontWeight: 700, color: MUTED, letterSpacing: 0.3 }}>
              SWITCHING COSTS
            </div>
            <SliderInput
              label="Processing fee"
              value={procPct}
              onChange={setProcPct}
              min={0}
              max={2}
              step={0.05}
              suffix="%"
              hint={compact(result.processingFee) + " on the outstanding"}
            />
            <SliderInput
              label="Foreclosure charge (old lender)"
              value={foreclosurePct}
              onChange={setForeclosurePct}
              min={0}
              max={4}
              step={0.05}
              suffix="%"
              hint={
                foreclosurePct === 0
                  ? "nil on floating-rate loans (RBI 2026)"
                  : compact(result.foreclosureFee)
              }
            />
            <SliderInput
              label="Legal, valuation, stamp & MODT"
              prefix="\u20B9"
              value={otherCosts}
              onChange={setOtherCosts}
              min={0}
              max={500000}
              step={1000}
              hint={compact(otherCosts)}
            />
          </div>

          {/* Results */}
          <div style={{ display: "grid", gap: 16 }}>
            {/* Verdict banner */}
            <div
              style={{
                background: worthIt ? ORANGE_SOFT : "#F4F1EB",
                border: `1px solid ${worthIt ? "#F1D8C6" : RULE}`,
                borderRadius: 12,
                padding: "13px 16px",
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 800, color: worthIt ? ORANGE : INK }}>
                {worthIt ? "Switching pays off" : "Not worth switching"}
              </span>
              <span style={{ fontSize: 12.5, color: MUTED }}>
                {worthIt
                  ? `Net ${compact(result.netSaved)} saved over the remaining life after ${compact(
                      result.totalCost
                    )} of costs`
                  : `Costs of ${compact(result.totalCost)} exceed the ${compact(
                      result.grossInterestSaved
                    )} interest saved`}
                {keepEMI
                  ? ` · loan closes ${monthsToYM(result.monthsSaved)} earlier`
                  : ` · EMI drops ${inr(result.monthlySaving)}/month`}
              </span>
            </div>

            {/* Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 12,
              }}
            >
              {metrics.map((m) => (
                <Metric key={m.label} {...m} />
              ))}
            </div>

            {/* Chart */}
            <div
              style={{
                background: CARD,
                border: `1px solid ${RULE}`,
                borderRadius: 12,
                padding: "16px 12px 8px",
              }}
            >
              <div style={{ fontSize: 12.5, fontWeight: 700, color: INK, padding: "0 8px 8px" }}>
                Outstanding balance — stay vs switch
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={chartData} margin={{ top: 6, right: 14, left: 6, bottom: 4 }}>
                  <CartesianGrid stroke="#EFEAE0" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: MUTED }}
                    tickFormatter={(m) => (m % 12 === 0 ? m / 12 + "y" : "")}
                    axisLine={{ stroke: RULE }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: MUTED }}
                    tickFormatter={(v) => compact(v)}
                    axisLine={false}
                    tickLine={false}
                    width={64}
                  />
                  <Tooltip
                    formatter={(v, name) => [inr(v), name]}
                    labelFormatter={(m) => "Month " + m}
                    contentStyle={{ border: `1px solid ${RULE}`, borderRadius: 8, fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11.5 }} />
                  {keepEMI && result.switchRun.months < result.stay.months && (
                    <ReferenceLine
                      x={result.switchRun.months}
                      stroke={ORANGE}
                      strokeDasharray="4 3"
                      label={{ value: "switch closes", position: "top", fill: ORANGE, fontSize: 10.5 }}
                    />
                  )}
                  <Area type="monotone" dataKey="Stay" stroke={BLUE} fill={BLUE_SOFT} strokeWidth={2} />
                  <Line type="monotone" dataKey="Switch" stroke={ORANGE} dot={false} strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Amortisation table */}
            <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 12.5, fontWeight: 700, color: INK }}>
                  New-loan schedule
                  <span style={{ color: MUTED, fontWeight: 500 }}>
                    {"  ·  "}
                    {result.switchRun.months} instalments to close
                  </span>
                </span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={handleCopy} style={ghostBtn}>
                    {copied ? "Copied \u2713" : "Copy CSV"}
                  </button>
                  <button onClick={handleDownload} style={{ ...ghostBtn, borderColor: ORANGE, color: ORANGE }}>
                    Download CSV
                  </button>
                  {tableRows.length > 36 && (
                    <button onClick={() => setShowAll((s) => !s)} style={ghostBtn}>
                      {showAll ? "Show first 36" : `Show all ${tableRows.length}`}
                    </button>
                  )}
                </div>
              </div>

              <div style={{ overflowX: "auto", maxHeight: 420, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                  <thead>
                    <tr style={{ position: "sticky", top: 0, background: "#FCFBF8", zIndex: 1 }}>
                      {["#", "Yr\u00B7Mo", "Payment", "Interest", "Principal", "Balance", "Stay bal."].map(
                        (h, k) => (
                          <th
                            key={h}
                            style={{
                              textAlign: k < 2 ? "left" : "right",
                              padding: "7px 10px",
                              fontSize: 11,
                              color: MUTED,
                              fontWeight: 600,
                              borderBottom: `1px solid ${RULE}`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((r) => (
                      <tr key={r.month} style={{ background: r.closed ? "#FBF8F2" : "transparent" }}>
                        <td style={tdL}>{r.month}</td>
                        <td style={tdL}>{ym(r.month)}</td>
                        <td style={tdR}>{r.emi > 0 ? inr(r.emi) : "\u2014"}</td>
                        <td style={tdR}>{r.interest > 0 ? inr(r.interest) : "\u2014"}</td>
                        <td style={tdR}>{r.principal > 0 ? inr(r.principal) : "\u2014"}</td>
                        <td style={{ ...tdR, color: ORANGE, fontWeight: 700 }}>{compact(r.balance)}</td>
                        <td style={{ ...tdR, color: MUTED }}>{compact(r.stayBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 11, color: MUTED, marginTop: 18, lineHeight: 1.55, maxWidth: 780 }}>
          Indicative only. The current EMI is derived from the outstanding, current rate, and
          remaining tenure on an annuity basis; a borrower's actual EMI may differ slightly after
          past rate resets. Interest each month is charged on the outstanding balance. Under the RBI
          (Pre-payment Charges on Loans) Directions, 2025, foreclosure / prepayment charges are nil
          on floating-rate loans to individuals and MSEs for facilities sanctioned or renewed on or
          after 1 January 2026 — fixed-rate loans and older sanctions may still attract a charge, so
          the field is left editable. Actual figures vary with day-count, rate resets, top-up, and
          rounding.
        </p>
      </div>
    </div>
  );
}

const tdL = {
  textAlign: "left",
  padding: "6px 10px",
  borderBottom: "1px solid #F1ECE2",
  whiteSpace: "nowrap",
  color: INK,
};
const tdR = {
  textAlign: "right",
  padding: "6px 10px",
  borderBottom: "1px solid #F1ECE2",
  whiteSpace: "nowrap",
  color: INK,
  fontVariantNumeric: "tabular-nums",
};
