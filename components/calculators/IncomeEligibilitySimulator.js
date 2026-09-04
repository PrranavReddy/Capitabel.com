"use client";

import React, { useMemo, useState } from "react";
import HeaderCTA from "./HeaderCTA";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

/* ------------------------------------------------------------------ *
 * Loan Eligibility Simulator — serviceable-income based
 * The inverse of an EMI calculator. FOIR sets the ceiling on TOTAL debt
 * outflow; existing obligations consume part of it, and only the
 * remainder is available to service the new loan:
 *
 *     FOIR ceiling  = monthly income x FOIR%
 *     available EMI = FOIR ceiling - existing obligations   (>= 0)
 *
 * The sanctionable principal is that available EMI reverse-amortised over the
 * repayment tenure at the given rate:
 *
 *     P = EMI x [(1+i)^n - 1] / [ i x (1+i)^n ]
 *
 * Optional construction moratorium: eligibility is sized on the
 * BALANCE tenure (N - M); during the moratorium the borrower services
 * interest-only on the sanction. No LTV / property-value cap applied
 * (income-based eligibility only).
 * ------------------------------------------------------------------ */

const BG = "#FAF8F3";
const CARD = "#FFFFFF";
const RULE = "#E7E2D8";
const INK = "#1F2421";
const MUTED = "#6B7280";
const ORANGE = "#E07A3F";
const ORANGE_SOFT = "#FBEFE6";
const BLUE = "#3E6E8E";

/* ----------------------------- helpers ---------------------------- */

// Forward annuity: EMI on principal P at monthly rate i over n months.
function amort(P, i, n) {
  if (n <= 0) return P;
  if (i === 0) return P / n;
  const f = Math.pow(1 + i, n);
  return (P * i * f) / (f - 1);
}

// Reverse annuity: principal serviceable by a given EMI at rate i over n months.
function principalFromEMI(EMI, i, n) {
  if (n <= 0) return 0;
  if (i === 0) return EMI * n;
  const f = Math.pow(1 + i, n);
  return (EMI * (f - 1)) / (i * f);
}

// Indian-grouped rupee integer, e.g. ₹57,63,214
function inr(n) {
  const v = Math.round(n || 0);
  return "\u20B9" + v.toLocaleString("en-IN");
}

// compact ₹ label: ₹1.70 Cr / ₹57.63 L / ₹45,000
function compact(n) {
  const v = Math.abs(n || 0);
  if (v >= 1e7) return "\u20B9" + (n / 1e7).toFixed(2) + " Cr";
  if (v >= 1e5) return "\u20B9" + (n / 1e5).toFixed(2) + " L";
  return "\u20B9" + Math.round(n || 0).toLocaleString("en-IN");
}

/* --------------------------- the engine --------------------------- */

// Sanctionable principal for a parameter set (used by the sensitivity chart).
function sanctionFor(income, foirPct, ratePct, years, moratoriumMonths, obligations) {
  const i = ratePct / 1200;
  const N = Math.max(1, Math.round(years * 12));
  const M = Math.min(Math.max(Math.round(moratoriumMonths || 0), 0), N - 1);
  const repayN = Math.max(N - M, 1);
  const emi = Math.max(0, (income * foirPct) / 100 - (obligations || 0));
  return principalFromEMI(emi, i, repayN);
}

function simulate({ monthlyIncome, foirPct, ratePct, years, useMoratorium, moratoriumMonths, existingObligations }) {
  const i = ratePct / 1200;
  const N = Math.max(1, Math.round(years * 12));
  const M = useMoratorium ? Math.min(Math.max(Math.round(moratoriumMonths), 0), N - 1) : 0;
  const repayN = Math.max(N - M, 1);

  const obligations = Math.max(0, existingObligations || 0);
  const foirCeiling = (monthlyIncome * foirPct) / 100; // total permissible debt outflow
  const maxEMI = Math.max(0, foirCeiling - obligations); // available for the new loan
  const sanction = principalFromEMI(maxEMI, i, repayN);

  // Build the resulting-loan amortisation schedule.
  const rows = [];
  let book = sanction;
  let totalInterest = 0;
  let moratoriumInterest = 0;
  let month = 0;

  // Phase 1 — moratorium: interest-only servicing on the sanction.
  for (let m = 1; m <= M; m++) {
    month++;
    const interest = book * i;
    totalInterest += interest;
    moratoriumInterest += interest;
    rows.push({
      month,
      year: Math.ceil(month / 12),
      phase: "moratorium",
      payment: interest,
      emi: 0,
      interest,
      principal: 0,
      balance: book,
    });
  }

  // Phase 2 — repayment: fixed EMI (= maxEMI) over the balance tenure.
  const emi = amort(sanction, i, repayN); // equals maxEMI by construction
  const guard = repayN + 12;
  for (let k = 1; k <= guard; k++) {
    month++;
    const interest = book * i;
    let principal = emi - interest;
    let payment = emi;

    if (book + interest <= emi || k === repayN) {
      // final instalment — clear the remainder
      principal = book;
      payment = book + interest;
      totalInterest += interest;
      rows.push({
        month,
        year: Math.ceil(month / 12),
        phase: "repay",
        payment,
        emi,
        interest,
        principal,
        balance: 0,
      });
      book = 0;
      break;
    }

    if (principal < 0) principal = 0;
    book -= principal;
    totalInterest += interest;
    rows.push({
      month,
      year: Math.ceil(month / 12),
      phase: "repay",
      payment,
      emi,
      interest,
      principal,
      balance: book,
    });
    if (book <= 0.5) break;
  }

  const monthsToClose = rows.length;
  const totalPaid = rows.reduce((a, r) => a + r.payment, 0);
  const annualIncome = monthlyIncome * 12;
  const lti = annualIncome > 0 ? sanction / annualIncome : 0;
  const obligationRatio = monthlyIncome > 0 ? (obligations / monthlyIncome) * 100 : 0;

  return {
    maxEMI,
    foirCeiling,
    obligations,
    obligationRatio,
    sanction,
    emi,
    N,
    M,
    repayN,
    rows,
    totalInterest,
    moratoriumInterest,
    monthsToClose,
    totalPaid,
    lti,
  };
}

/* ----------------------------- atoms ------------------------------ */

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
          {prefix && <span style={{ fontSize: 16, color: MUTED }}>{prefix}</span>}
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
              width: 130,
              border: "none",
              outline: "none",
              textAlign: "right",
              fontSize: 19,
              fontWeight: 400,
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
        maxWidth: 520,
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

function Metric({ label, value, sub, accent, big }) {
  return (
    <div
      style={{
        background: accent ? ORANGE_SOFT : "#fff",
        border: `1px solid ${accent ? "#F1D8C6" : RULE}`,
        borderRadius: 11,
        padding: big ? "16px 18px" : "13px 15px",
        display: "grid",
        gap: 3,
      }}
    >
      <span style={{ fontSize: 11.5, color: MUTED, fontWeight: 600, letterSpacing: 0.2 }}>{label}</span>
      <span
        style={{
          fontSize: big ? 27 : 20,
          fontWeight: 750,
          color: accent ? ORANGE : INK,
          lineHeight: 1.1,
          letterSpacing: -0.4,
        }}
      >
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

/* ----------------------------- app -------------------------------- */

export default function IncomeEligibilitySimulator() {
  const [method, setMethod] = useState("immediate"); // 'immediate' | 'moratorium'
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [foir, setFoir] = useState(50);
  const [obligations, setObligations] = useState(0);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [moratoriumMonths, setMoratoriumMonths] = useState(24);
  const [chartMode, setChartMode] = useState("tenure"); // 'tenure' | 'rate'
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const useMoratorium = method === "moratorium";

  const result = useMemo(
    () =>
      simulate({
        monthlyIncome,
        foirPct: foir,
        ratePct: rate,
        years,
        useMoratorium,
        moratoriumMonths,
        existingObligations: obligations,
      }),
    [monthlyIncome, foir, rate, years, useMoratorium, moratoriumMonths, obligations]
  );

  const M = useMoratorium ? Math.min(Math.max(Math.round(moratoriumMonths), 0), result.N - 1) : 0;

  // Sensitivity data — how the sanction moves as one lever changes.
  const sensitivity = useMemo(() => {
    const pts = [];
    if (chartMode === "tenure") {
      for (let y = 1; y <= 30; y++) {
        pts.push({ x: y, sanction: Math.round(sanctionFor(monthlyIncome, foir, rate, y, M, obligations)) });
      }
    } else {
      for (let r = 6; r <= 14.0001; r += 0.5) {
        const rr = Math.round(r * 100) / 100;
        pts.push({ x: rr, sanction: Math.round(sanctionFor(monthlyIncome, foir, rr, years, M, obligations)) });
      }
    }
    return pts;
  }, [chartMode, monthlyIncome, foir, rate, years, M, obligations]);

  const currentX = chartMode === "tenure" ? years : rate;

  const CSV_HEADERS = ["Month", "Year.Month", "Phase", "EMI", "Payment", "Interest", "Principal", "Balance"];
  const csvRows = useMemo(
    () =>
      result.rows.map((r) => [
        r.month,
        `${r.year}.${((r.month - 1) % 12) + 1}`,
        r.phase === "moratorium" ? "Moratorium" : "Repayment",
        Math.round(r.emi),
        Math.round(r.payment),
        Math.round(r.interest),
        Math.round(r.principal),
        Math.round(r.balance),
      ]),
    [result]
  );

  const handleDownload = () => downloadCSV("loan-eligibility-schedule.csv", toCSV(CSV_HEADERS, csvRows));
  const handleCopy = async () => {
    const ok = await copyCSV(toCSV(CSV_HEADERS, csvRows));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const visibleRows = showAll ? result.rows : result.rows.slice(0, 36);

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap", marginBottom: 18 }}>
          <div>
            <h1 style={{ fontSize: 25, fontWeight: 800, margin: "0 0 5px", letterSpacing: -0.4 }}>
              Loan Eligibility Simulator
            </h1>
            <p style={{ fontSize: 13.5, color: MUTED, margin: 0, maxWidth: 760, lineHeight: 1.55 }}>
              FOIR sets the ceiling on total debt outflow (<b>income × FOIR</b>); existing obligations
              are netted off, and the <b>remaining EMI headroom</b> is reverse-amortised over the tenure
              to give the <b>sanctionable loan amount</b>. Income-based eligibility only, no property/LTV
              cap applied here.
            </p>
          </div>
          <HeaderCTA />
        </div>

        {/* Method toggle */}
        <Segmented
          value={method}
          onChange={setMethod}
          options={[
            { value: "immediate", label: "Repayment from month 1" },
            { value: "moratorium", label: "With construction moratorium" },
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
            <SliderInput
              label="Net monthly income"
              prefix="₹"
              value={monthlyIncome}
              onChange={setMonthlyIncome}
              min={10000}
              max={1000000}
              step={5000}
              hint={compact(monthlyIncome) + " / month"}
            />
            <SliderInput
              label="FOIR (repayment capacity)"
              value={foir}
              onChange={setFoir}
              min={20}
              max={75}
              step={1}
              suffix="%"
              hint={"→ " + inr(result.foirCeiling) + " permissible total EMI"}
            />
            <SliderInput
              label="Existing obligations"
              prefix="₹"
              value={obligations}
              onChange={setObligations}
              min={0}
              max={500000}
              step={1000}
              hint={
                obligations > 0
                  ? `${result.obligationRatio.toFixed(0)}% of income · ${inr(result.maxEMI)} EMI headroom left`
                  : "monthly EMIs on current loans / cards"
              }
            />
            <SliderInput
              label="Interest rate"
              value={rate}
              onChange={setRate}
              min={6}
              max={14}
              step={0.05}
              suffix="% p.a."
            />
            <SliderInput
              label="Tenure"
              value={years}
              onChange={setYears}
              min={1}
              max={30}
              step={1}
              suffix="yr"
              hint={years * 12 + " months" + (useMoratorium ? ` · ${result.repayN} repaying` : "")}
            />
            {useMoratorium && (
              <SliderInput
                label="Construction moratorium"
                value={moratoriumMonths}
                onChange={setMoratoriumMonths}
                min={1}
                max={60}
                step={1}
                suffix="mo"
                hint="interest-only; eligibility sized on balance tenure"
              />
            )}
          </div>

          {/* Results */}
          <div style={{ display: "grid", gap: 16 }}>
            {/* Headline */}
            <Metric
              label="Sanctionable loan amount"
              value={compact(result.sanction)}
              sub={
                result.maxEMI <= 0
                  ? "existing obligations exceed the FOIR ceiling — no headroom"
                  : inr(result.sanction) + `  ·  ${result.lti.toFixed(1)}× annual income`
              }
              accent
              big
            />

            {/* Metric tiles */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 12,
              }}
            >
              <Metric
                label="Available EMI (new loan)"
                value={inr(result.maxEMI)}
                sub={`${inr(result.foirCeiling)} ceiling − ${inr(result.obligations)} existing`}
              />
              <Metric
                label="Existing obligations"
                value={inr(result.obligations)}
                sub={`${result.obligationRatio.toFixed(0)}% of income`}
              />
              <Metric label="Total interest" value={compact(result.totalInterest)} sub={inr(result.totalInterest)} />
              <Metric label="Total payable" value={compact(result.totalPaid)} sub="principal + interest" />
              <Metric
                label="Closes in"
                value={result.monthsToClose + " mo (" + (result.monthsToClose / 12).toFixed(1) + " yr)"}
                sub={useMoratorium ? `incl. ${result.M}-mo moratorium` : "from month 1"}
              />
              {useMoratorium && (
                <Metric
                  label="Moratorium interest"
                  value={compact(result.moratoriumInterest)}
                  sub={`serviced over ${result.M} mo`}
                />
              )}
            </div>

            {/* Sensitivity chart */}
            <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: "16px 12px 8px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 8px 10px",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 12.5, fontWeight: 700, color: INK }}>
                  Sanction sensitivity {chartMode === "tenure" ? "by tenure" : "by interest rate"}
                </span>
                <div style={{ display: "flex", gap: 4, background: "#fff", border: `1px solid ${RULE}`, borderRadius: 8, padding: 3 }}>
                  {[
                    { value: "tenure", label: "By tenure" },
                    { value: "rate", label: "By rate" },
                  ].map((o) => {
                    const active = o.value === chartMode;
                    return (
                      <button
                        key={o.value}
                        onClick={() => setChartMode(o.value)}
                        style={{
                          border: "none",
                          borderRadius: 5,
                          padding: "5px 10px",
                          fontSize: 11.5,
                          fontWeight: 600,
                          cursor: "pointer",
                          color: active ? "#fff" : INK,
                          background: active ? ORANGE : "transparent",
                        }}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={sensitivity} margin={{ top: 6, right: 16, left: 6, bottom: 4 }}>
                  <CartesianGrid stroke="#EFEAE0" vertical={false} />
                  <XAxis
                    dataKey="x"
                    tick={{ fontSize: 11, fill: MUTED }}
                    tickFormatter={(v) => (chartMode === "tenure" ? v + "y" : v + "%")}
                    axisLine={{ stroke: RULE }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: MUTED }}
                    tickFormatter={(v) => compact(v)}
                    axisLine={false}
                    tickLine={false}
                    width={66}
                  />
                  <Tooltip
                    formatter={(v) => [inr(v), "Sanction"]}
                    labelFormatter={(x) => (chartMode === "tenure" ? x + " year tenure" : x + "% p.a.")}
                    contentStyle={{ border: `1px solid ${RULE}`, borderRadius: 8, fontSize: 12 }}
                  />
                  <ReferenceLine
                    x={currentX}
                    stroke={ORANGE}
                    strokeDasharray="4 3"
                    label={{ value: "current", position: "top", fill: ORANGE, fontSize: 10.5 }}
                  />
                  <Area type="monotone" dataKey="sanction" stroke={BLUE} fill="#E9F0F4" strokeWidth={2} name="Sanction" />
                  <Line type="monotone" dataKey="sanction" stroke={BLUE} dot={false} strokeWidth={0} />
                </ComposedChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 11, color: MUTED, margin: "4px 8px 0", lineHeight: 1.5 }}>
                Holds income, FOIR{chartMode === "tenure" ? " and rate" : " and tenure"} fixed; the dashed line marks the
                current {chartMode === "tenure" ? "tenure" : "rate"}.
              </p>
            </div>

            {/* Amortisation table (resulting loan) */}
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
                  Resulting loan schedule
                  <span style={{ color: MUTED, fontWeight: 500 }}>
                    {"  ·  "}
                    {result.monthsToClose} instalments
                  </span>
                </span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={handleCopy} style={ghostBtn}>
                    {copied ? "Copied ✓" : "Copy CSV"}
                  </button>
                  <button onClick={handleDownload} style={{ ...ghostBtn, borderColor: ORANGE, color: ORANGE }}>
                    Download CSV
                  </button>
                  {result.rows.length > 36 && (
                    <button onClick={() => setShowAll((s) => !s)} style={ghostBtn}>
                      {showAll ? "Show first 36" : `Show all ${result.rows.length}`}
                    </button>
                  )}
                </div>
              </div>

              <div style={{ overflowX: "auto", maxHeight: 420, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                  <thead>
                    <tr style={{ position: "sticky", top: 0, background: "#FCFBF8", zIndex: 1 }}>
                      {["#", "Yr·Mo", "EMI", "Payment", "Interest", "Principal", "Balance"].map((h, k) => (
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
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((r) => {
                      const morat = r.phase === "moratorium";
                      return (
                        <tr key={r.month} style={{ background: morat ? "#FDF6EE" : "transparent" }}>
                          <td style={tdL}>
                            {r.month}
                            {morat && (
                              <span
                                style={{
                                  marginLeft: 6,
                                  fontSize: 9.5,
                                  color: ORANGE,
                                  border: `1px solid #F1D8C6`,
                                  borderRadius: 4,
                                  padding: "0 4px",
                                  verticalAlign: "middle",
                                }}
                              >
                                moratorium
                              </span>
                            )}
                          </td>
                          <td style={tdL}>
                            {r.year}·{((r.month - 1) % 12) + 1}
                          </td>
                          <td style={{ ...tdR, color: r.emi > 0 ? INK : MUTED }}>{r.emi > 0 ? inr(r.emi) : "—"}</td>
                          <td style={tdR}>{inr(r.payment)}</td>
                          <td style={tdR}>{inr(r.interest)}</td>
                          <td style={tdR}>{morat ? "—" : inr(r.principal)}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{inr(r.balance)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 11, color: MUTED, marginTop: 18, lineHeight: 1.55, maxWidth: 760 }}>
          Indicative only. Eligibility = (income × FOIR − existing obligations) reverse-amortised over
          the repayment tenure; this is a repayment-capacity ceiling, not a sanction. Actual sanction
          also depends on LTV/property value, credit profile, age/retirement horizon, and the bank's
          own FOIR bands and policy norms. Figures may differ from bank systems due to day-count
          conventions, rate resets, and rounding.
        </p>
      </div>
    </div>
  );
}
