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
  Legend,
  ReferenceLine,
} from "recharts";

/* ------------------------------------------------------------------ *
 * Prepayment Simulator — home / MSME term loan
 * Models part-prepayments against an amortising loan where the EMI is
 * HELD and the tenure shortens. Each prepayment retires principal
 * directly, so every later instalment carries less interest and more
 * principal — the loan closes early.
 *
 * Two entry points (top toggle):
 *   - Fresh sanction : amount, rate, tenure.
 *   - Mid-life       : outstanding, rate, remaining tenure (EMI derived
 *                      on an annuity basis).
 *
 * Prepayments: EITHER a one-time lump sum (amount + month) OR a
 * recurring extra (amount, frequency, start month) — chosen by a
 * segmented control, never both at once. A prepayment is
 * applied at the END of the month, after that month's EMI, so it
 * suppresses interest from the following month.
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

function ym(m) {
  const y = Math.floor((m - 1) / 12) + 1;
  const mo = ((m - 1) % 12) + 1;
  return `${y}.${mo}`;
}

/* ----------------------------- engine ----------------------------- */

const FREQ_MONTHS = { monthly: 1, quarterly: 3, halfyearly: 6, yearly: 12 };

// Amortise P at a fixed EMI, applying prepayments per prepayAt(month)
// at the END of each month (after the EMI). Returns the row series.
function runLoan(P, i, emi, prepayAt, guard) {
  const rows = [];
  let bal = P;
  let totalInterest = 0;
  let totalPrepaid = 0;
  const cap = Math.max(1, Math.round(guard)) + 12;
  for (let m = 1; m <= cap; m++) {
    const interest = bal * i;
    let principal = emi - interest;
    let payment = emi;
    if (bal + interest <= emi) {
      // final instalment clears the balance — no prepayment needed
      principal = bal;
      payment = bal + interest;
      totalInterest += interest;
      rows.push({ month: m, interest, principal, payment, prepay: 0, balance: 0 });
      bal = 0;
      break;
    }
    if (principal < 0) principal = 0; // safety (EMI below interest)
    bal -= principal;
    totalInterest += interest;

    // prepayment at month end, capped at what's left
    let prepay = Math.max(0, prepayAt ? prepayAt(m) : 0);
    if (prepay > bal) prepay = bal;
    bal -= prepay;
    totalPrepaid += prepay;

    rows.push({ month: m, interest, principal, payment, prepay, balance: Math.max(bal, 0) });
    if (bal <= 0.5) {
      rows[rows.length - 1].balance = 0;
      break;
    }
  }
  return { rows, totalInterest, totalPrepaid, months: rows.length };
}

function simulate({
  principal,
  ratePct,
  tenureMonths,
  lumpAmount,
  lumpMonth,
  recurringOn,
  recurringAmount,
  recurringFreq,
  recurringStart,
  stepUpOn,
  stepType,        // 'pct' | 'rupee'
  stepPct,
  stepRupee,
  stepFreq,        // 'yearly' | 'halfyearly' | 'everyN'
  stepEveryN,
  stepCompound,    // true = grows on last stepped amount; false = grows on base
  maxOn,
  maxAmount,
  chargePct,
}) {
  const P = Math.max(0, Number(principal) || 0);
  const i = (Number(ratePct) || 0) / 1200;
  const n = Math.max(1, Math.round(Number(tenureMonths) || 1));
  const emi = amort(P, i, n);

  const L = Math.max(0, Number(lumpAmount) || 0);
  const Lm = Math.max(1, Math.round(Number(lumpMonth) || 1));
  const R = recurringOn ? Math.max(0, Number(recurringAmount) || 0) : 0;
  const Rf = FREQ_MONTHS[recurringFreq] || 12;
  const Rs = Math.max(1, Math.round(Number(recurringStart) || 1));

  // Step-up: the recurring amount escalates on a schedule. stepBlock is the
  // number of MONTHS between each step (yearly = 12, half-yearly = 6, or
  // every-N recurring periods = N x Rf). The step index k at month m counts
  // how many blocks have elapsed since the first recurring payment.
  const su = !!stepUpOn;
  const sPct = Math.max(0, Number(stepPct) || 0) / 100;
  const sRup = Math.max(0, Number(stepRupee) || 0);
  const stepBlock =
    stepFreq === "halfyearly" ? 6 : stepFreq === "everyN" ? Math.max(1, Math.round(Number(stepEveryN) || 1)) * Rf : 12;
  const cap = maxOn ? Math.max(0, Number(maxAmount) || 0) : Infinity;

  const recurringAt = (m) => {
    if (!(R > 0 && m >= Rs && (m - Rs) % Rf === 0)) return 0;
    if (!su) return R;
    const k = Math.floor((m - Rs) / stepBlock); // 0 for the first block
    let amt;
    if (stepType === "rupee") {
      // linear and compounding coincide for a flat rupee increment: base + k x inc
      amt = R + k * sRup;
    } else {
      amt = stepCompound ? R * Math.pow(1 + sPct, k) : R * (1 + k * sPct);
    }
    return Math.min(amt, cap);
  };

  const prepayAt = (m) => {
    let x = 0;
    if (L > 0 && m === Lm) x += L;
    x += recurringAt(m);
    return x;
  };

  const base = runLoan(P, i, emi, null, n);
  const withPre = runLoan(P, i, emi, prepayAt, n);

  const charges = withPre.totalPrepaid * ((Number(chargePct) || 0) / 100);
  const interestSaved = base.totalInterest - withPre.totalInterest;
  const netSaved = interestSaved - charges;
  const monthsSaved = base.months - withPre.months;

  return {
    P,
    n,
    emi,
    base,
    withPre,
    charges,
    interestSaved,
    netSaved,
    monthsSaved,
    totalPrepaid: withPre.totalPrepaid,
    lumpMonth: Lm,
  };
}

/* ------------------------------ atoms ----------------------------- */

function SliderInput({ label, value, onChange, min, max, step, prefix, suffix, hint, disabled }) {
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
    <label style={{ display: "grid", gap: 6, opacity: disabled ? 0.45 : 1, transition: "opacity 120ms" }}>
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
            background: disabled ? "#F4F1EB" : "#fff",
          }}
        >
          {prefix && <span style={{ fontSize: 16, color: MUTED }}>{prefix}</span>}
          <input
            type="text"
            inputMode="decimal"
            disabled={disabled}
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
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: ORANGE }}
      />
      {hint && <span style={{ fontSize: 11.5, color: MUTED }}>{hint}</span>}
    </label>
  );
}

function Segmented({ options, value, onChange, small }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        background: "#fff",
        border: `1px solid ${RULE}`,
        borderRadius: small ? 8 : 9,
        padding: small ? 3 : 4,
        marginBottom: small ? 0 : 18,
        maxWidth: small ? "none" : 460,
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
              padding: small ? "5px 8px" : "9px 12px",
              borderRadius: small ? 5 : 6,
              border: "none",
              cursor: "pointer",
              fontSize: small ? 11.5 : 13,
              fontWeight: 600,
              color: active ? "#fff" : INK,
              background: active ? ORANGE : "transparent",
              transition: "background 120ms ease",
              whiteSpace: "nowrap",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      style={{
        width: 38,
        height: 22,
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        background: on ? ORANGE : "#CFC9BD",
        position: "relative",
        padding: 0,
        flexShrink: 0,
        transition: "background 140ms",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: on ? 18 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 140ms",
          boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }}
      />
    </button>
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
          letterSpacing: big ? -0.4 : 0,
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

const sectionLabel = { fontSize: 11.5, fontWeight: 700, color: MUTED, letterSpacing: 0.3 };

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

/* ------------------------------- app ------------------------------ */

export default function PrepaymentSimulator() {
  const [mode, setMode] = useState("fresh"); // 'fresh' | 'midlife'

  // Fresh sanction
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [years, setYears] = useState(20);
  // Mid-life
  const [outstanding, setOutstanding] = useState(4000000);
  const [remainingMonths, setRemainingMonths] = useState(180);
  // Shared
  const [rate, setRate] = useState(9.0);

  // Prepayments
  const [lumpAmount, setLumpAmount] = useState(500000);
  const [lumpMonth, setLumpMonth] = useState(12);
  const [prepayType, setPrepayType] = useState("lump"); // 'lump' | 'recurring'
  const [recurringAmount, setRecurringAmount] = useState(100000);
  const [recurringFreq, setRecurringFreq] = useState("yearly");
  const [recurringStart, setRecurringStart] = useState(12);
  const [stepUpOn, setStepUpOn] = useState(false);
  const [stepType, setStepType] = useState("pct"); // 'pct' | 'rupee'
  const [stepPct, setStepPct] = useState(10);
  const [stepRupee, setStepRupee] = useState(5000);
  const [stepFreq, setStepFreq] = useState("yearly"); // 'yearly' | 'halfyearly' | 'everyN'
  const [stepEveryN, setStepEveryN] = useState(2);
  const [stepCompound, setStepCompound] = useState(true);
  const [maxOn, setMaxOn] = useState(false);
  const [maxAmount, setMaxAmount] = useState(500000);
  const [chargePct, setChargePct] = useState(0);

  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const midlife = mode === "midlife";
  const principal = midlife ? outstanding : loanAmount;
  const tenureMonths = midlife ? remainingMonths : years * 12;
  const isLump = prepayType === "lump";
  const recurringOn = !isLump;

  // Preview the first few stepped amounts, e.g. ₹10,000 → ₹11,000 → ₹12,100 …
  const stepPreview = useMemo(() => {
    if (!stepUpOn || recurringAmount <= 0) return "";
    const cap = maxOn ? Math.max(0, maxAmount) : Infinity;
    const vals = [];
    for (let k = 0; k < 4; k++) {
      let a;
      if (stepType === "rupee") a = recurringAmount + k * stepRupee;
      else a = stepCompound ? recurringAmount * Math.pow(1 + stepPct / 100, k) : recurringAmount * (1 + (k * stepPct) / 100);
      vals.push(compact(Math.min(a, cap)));
    }
    const every =
      stepFreq === "halfyearly"
        ? "6 months"
        : stepFreq === "everyN"
        ? `${stepEveryN * FREQ_MONTHS[recurringFreq]} months`
        : "year";
    return `${vals.join(" → ")} …  (steps every ${every})`;
  }, [stepUpOn, recurringAmount, stepType, stepPct, stepRupee, stepCompound, stepFreq, stepEveryN, recurringFreq, maxOn, maxAmount]);

  const result = useMemo(
    () =>
      simulate({
        principal,
        ratePct: rate,
        tenureMonths,
        lumpAmount: isLump ? lumpAmount : 0,
        lumpMonth,
        recurringOn,
        recurringAmount,
        recurringFreq,
        recurringStart,
        stepUpOn: !isLump && stepUpOn,
        stepType,
        stepPct,
        stepRupee,
        stepFreq,
        stepEveryN,
        stepCompound,
        maxOn,
        maxAmount,
        chargePct,
      }),
    [principal, rate, tenureMonths, isLump, lumpAmount, lumpMonth, recurringOn, recurringAmount, recurringFreq, recurringStart, stepUpOn, stepType, stepPct, stepRupee, stepFreq, stepEveryN, stepCompound, maxOn, maxAmount, chargePct]
  );

  const chartData = useMemo(() => {
    const mx = result.base.months;
    const out = [];
    for (let m = 1; m <= mx; m++) {
      const b = result.base.rows[m - 1];
      const w = result.withPre.rows[m - 1];
      out.push({
        month: m,
        "Without prepayment": b ? Math.round(b.balance) : 0,
        "With prepayment": w ? Math.round(w.balance) : 0,
      });
    }
    return out;
  }, [result]);

  const CSV_HEADERS = [
    "Month",
    "Year.Month",
    "EMI/Payment",
    "Interest",
    "Principal",
    "Prepayment",
    "Balance (with prepayment)",
    "Balance (without)",
    "Interest saved (cum.)",
  ];

  const tableRows = useMemo(() => {
    const mx = result.base.months;
    const out = [];
    let cumBase = 0;
    let cumPre = 0;
    for (let m = 1; m <= mx; m++) {
      const b = result.base.rows[m - 1];
      const w = result.withPre.rows[m - 1];
      cumBase += b ? b.interest : 0;
      cumPre += w ? w.interest : 0;
      out.push({
        month: m,
        payment: w ? w.payment : 0,
        interest: w ? w.interest : 0,
        principal: w ? w.principal : 0,
        prepay: w ? w.prepay : 0,
        balance: w ? w.balance : 0,
        baseBalance: b ? b.balance : 0,
        cumSaved: cumBase - cumPre,
        closed: !w,
      });
    }
    return out;
  }, [result]);

  const csvRows = useMemo(
    () =>
      tableRows.map((r) => [
        r.month,
        ym(r.month),
        Math.round(r.payment),
        Math.round(r.interest),
        Math.round(r.principal),
        Math.round(r.prepay),
        Math.round(r.balance),
        Math.round(r.baseBalance),
        Math.round(r.cumSaved),
      ]),
    [tableRows]
  );

  const handleDownload = () => downloadCSV("prepayment-schedule.csv", toCSV(CSV_HEADERS, csvRows));
  const handleCopy = async () => {
    const ok = await copyCSV(toCSV(CSV_HEADERS, csvRows));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const visibleRows = showAll ? tableRows : tableRows.slice(0, 36);
  const anyPrepay = result.totalPrepaid > 0;
  const monthCap = result.n;

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
              Prepayment Simulator
            </h1>
            <p style={{ fontSize: 13.5, color: MUTED, margin: 0, maxWidth: 760, lineHeight: 1.55 }}>
              A part-prepayment retires principal directly. The <b>EMI is held</b>, so every later
              instalment carries less interest and more principal, so the loan closes early. This shows the{" "}
              <b>interest saved</b> and the <b>revised tenure</b> for either a one-time lump sum or a
              recurring extra payment.
            </p>
          </div>
          <HeaderCTA />
        </div>

        {/* Entry-point toggle */}
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { value: "fresh", label: "Fresh sanction" },
            { value: "midlife", label: "Mid-life (outstanding)" },
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
            <div style={sectionLabel}>{midlife ? "EXISTING LOAN" : "LOAN"}</div>
            {midlife ? (
              <SliderInput
                label="Outstanding balance"
                prefix="₹"
                value={outstanding}
                onChange={setOutstanding}
                min={100000}
                max={50000000}
                step={100000}
                hint={compact(outstanding)}
              />
            ) : (
              <SliderInput
                label="Loan amount"
                prefix="₹"
                value={loanAmount}
                onChange={setLoanAmount}
                min={100000}
                max={50000000}
                step={100000}
                hint={compact(loanAmount)}
              />
            )}
            <SliderInput
              label="Interest rate"
              value={rate}
              onChange={setRate}
              min={5}
              max={18}
              step={0.05}
              suffix="% p.a."
            />
            {midlife ? (
              <SliderInput
                label="Remaining tenure"
                value={remainingMonths}
                onChange={setRemainingMonths}
                min={12}
                max={360}
                step={1}
                suffix="mo"
                hint={monthsToYM(remainingMonths) + " · EMI " + inr(result.emi)}
              />
            ) : (
              <SliderInput
                label="Tenure"
                value={years}
                onChange={setYears}
                min={1}
                max={30}
                step={1}
                suffix="yr"
                hint={years * 12 + " months · EMI " + inr(result.emi)}
              />
            )}

            <div style={{ height: 1, background: RULE }} />
            <div style={sectionLabel}>PREPAYMENT</div>
            <Segmented
              small
              value={prepayType}
              onChange={setPrepayType}
              options={[
                { value: "lump", label: "One-time lump sum" },
                { value: "recurring", label: "Recurring extra" },
              ]}
            />
            {isLump ? (
              <>
                <SliderInput
                  label="Lump-sum amount"
                  prefix="₹"
                  value={lumpAmount}
                  onChange={setLumpAmount}
                  min={0}
                  max={Math.max(100000, principal)}
                  step={50000}
                  hint={lumpAmount > 0 ? compact(lumpAmount) : "none"}
                />
                <SliderInput
                  label="Paid in month"
                  value={lumpMonth}
                  onChange={setLumpMonth}
                  min={1}
                  max={monthCap}
                  step={1}
                  suffix="mo"
                  hint={
                    lumpAmount > 0
                      ? `month ${lumpMonth} \u00B7 year ${Math.ceil(lumpMonth / 12)}` +
                        (lumpMonth > result.withPre.months ? " \u00B7 after the loan closes" : "")
                      : "set an amount above"
                  }
                  disabled={lumpAmount <= 0}
                />
              </>
            ) : (
              <>
                <Segmented
                  small
                  value={recurringFreq}
                  onChange={setRecurringFreq}
                  options={[
                    { value: "monthly", label: "Monthly" },
                    { value: "quarterly", label: "Quarterly" },
                    { value: "halfyearly", label: "Half-yearly" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
                <SliderInput
                  label="Amount each time"
                  prefix="₹"
                  value={recurringAmount}
                  onChange={setRecurringAmount}
                  min={0}
                  max={2000000}
                  step={5000}
                  hint={
                    recurringAmount > 0
                      ? compact(recurringAmount) +
                        " every " +
                        (FREQ_MONTHS[recurringFreq] === 1 ? "month" : FREQ_MONTHS[recurringFreq] + " months")
                      : "none"
                  }
                />
                <SliderInput
                  label="Starting from month"
                  value={recurringStart}
                  onChange={setRecurringStart}
                  min={1}
                  max={monthCap}
                  step={1}
                  suffix="mo"
                  hint={`then every ${FREQ_MONTHS[recurringFreq]} month${FREQ_MONTHS[recurringFreq] > 1 ? "s" : ""}`}
                  disabled={recurringAmount <= 0}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: INK }}>Step up over time</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 11, color: stepUpOn ? ORANGE : MUTED, fontWeight: 700 }}>
                      {stepUpOn ? "On" : "Off"}
                    </span>
                    <Toggle on={stepUpOn} onChange={setStepUpOn} />
                  </div>
                </div>

                {stepUpOn && (
                  <div style={{ display: "grid", gap: 14, padding: "12px 12px 4px", background: "#FCFBF8", border: `1px solid ${RULE}`, borderRadius: 10 }}>
                    <Segmented
                      small
                      value={stepType}
                      onChange={setStepType}
                      options={[
                        { value: "pct", label: "By %" },
                        { value: "rupee", label: "By \u20B9" },
                      ]}
                    />
                    {stepType === "pct" ? (
                      <SliderInput
                        label="Increase each step"
                        value={stepPct}
                        onChange={setStepPct}
                        min={0}
                        max={50}
                        step={1}
                        suffix="%"
                        hint={stepCompound ? "on the previous amount" : "on the original amount"}
                        disabled={recurringAmount <= 0}
                      />
                    ) : (
                      <SliderInput
                        label="Increase each step"
                        prefix="₹"
                        value={stepRupee}
                        onChange={setStepRupee}
                        min={0}
                        max={500000}
                        step={1000}
                        hint={compact(stepRupee) + " added each step"}
                        disabled={recurringAmount <= 0}
                      />
                    )}
                    <div style={{ display: "grid", gap: 6 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: INK }}>Step up every</span>
                      <Segmented
                        small
                        value={stepFreq}
                        onChange={setStepFreq}
                        options={[
                          { value: "yearly", label: "Year" },
                          { value: "halfyearly", label: "6 months" },
                          { value: "everyN", label: "N periods" },
                        ]}
                      />
                    </div>
                    {stepFreq === "everyN" && (
                      <SliderInput
                        label="Every N recurring payments"
                        value={stepEveryN}
                        onChange={setStepEveryN}
                        min={1}
                        max={24}
                        step={1}
                        suffix="×"
                        hint={`every ${stepEveryN * FREQ_MONTHS[recurringFreq]} month${stepEveryN * FREQ_MONTHS[recurringFreq] > 1 ? "s" : ""}`}
                        disabled={recurringAmount <= 0}
                      />
                    )}
                    {stepType === "pct" && (
                      <Segmented
                        small
                        value={stepCompound ? "comp" : "lin"}
                        onChange={(v) => setStepCompound(v === "comp")}
                        options={[
                          { value: "comp", label: "Compounding" },
                          { value: "lin", label: "Linear" },
                        ]}
                      />
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>Cap the amount</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ fontSize: 11, color: maxOn ? ORANGE : MUTED, fontWeight: 700 }}>
                          {maxOn ? "On" : "Off"}
                        </span>
                        <Toggle on={maxOn} onChange={setMaxOn} />
                      </div>
                    </div>
                    {maxOn && (
                      <SliderInput
                        label="Maximum each time"
                        prefix="₹"
                        value={maxAmount}
                        onChange={setMaxAmount}
                        min={0}
                        max={2000000}
                        step={5000}
                        hint={"caps the stepped amount at " + compact(maxAmount)}
                        disabled={recurringAmount <= 0}
                      />
                    )}
                    <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.5 }}>
                      {stepPreview}
                    </div>
                  </div>
                )}
              </>
            )}

            <div style={{ height: 1, background: RULE }} />
            <SliderInput
              label="Prepayment charge"
              value={chargePct}
              onChange={setChargePct}
              min={0}
              max={5}
              step={0.05}
              suffix="%"
              hint={
                chargePct === 0
                  ? "nil on floating-rate loans (RBI 2026)"
                  : compact(result.charges) + " on " + compact(result.totalPrepaid) + " prepaid"
              }
            />
          </div>

          {/* Results */}
          <div style={{ display: "grid", gap: 16 }}>
            {/* Headline pair */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Metric
                label="Total interest saved"
                value={compact(result.interestSaved)}
                sub={
                  anyPrepay
                    ? inr(result.interestSaved) +
                      (result.charges > 0 ? ` · net ${compact(result.netSaved)} after charges` : "")
                    : "add a prepayment to see the saving"
                }
                accent
                big
              />
              <Metric
                label="Revised tenure"
                value={monthsToYM(result.withPre.months)}
                sub={
                  anyPrepay
                    ? `was ${monthsToYM(result.n)} · closes ${monthsToYM(result.monthsSaved)} earlier`
                    : `${result.n} instalments, unchanged`
                }
                accent
                big
              />
            </div>

            {/* Metric tiles */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 12,
              }}
            >
              <Metric label="EMI (held)" value={inr(result.emi)} sub={`${result.n} instalments originally`} />
              <Metric label="Total prepaid" value={compact(result.totalPrepaid)} sub={inr(result.totalPrepaid)} />
              <Metric
                label="Interest without prepayment"
                value={compact(result.base.totalInterest)}
                sub={inr(result.base.totalInterest)}
              />
              <Metric
                label="Interest with prepayment"
                value={compact(result.withPre.totalInterest)}
                sub={inr(result.withPre.totalInterest)}
              />
              <Metric
                label="Instalments saved"
                value={`${result.monthsSaved}`}
                sub={`${result.withPre.months} of ${result.n} paid`}
              />
              <Metric
                label="Prepayment charges"
                value={compact(result.charges)}
                sub={chargePct > 0 ? `${chargePct}% of amount prepaid` : "nil"}
              />
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
                Outstanding balance — with vs without prepayment
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
                  {anyPrepay && result.withPre.months < result.base.months && (
                    <ReferenceLine
                      x={result.withPre.months}
                      stroke={ORANGE}
                      strokeDasharray="4 3"
                      label={{ value: "closes", position: "top", fill: ORANGE, fontSize: 10.5 }}
                    />
                  )}
                  <Area
                    type="monotone"
                    dataKey="Without prepayment"
                    stroke={BLUE}
                    fill={BLUE_SOFT}
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="With prepayment" stroke={ORANGE} dot={false} strokeWidth={2} />
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
                  Repayment schedule
                  <span style={{ color: MUTED, fontWeight: 500 }}>
                    {"  ·  "}
                    {result.withPre.months} instalments to close
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
                      {["#", "Yr\u00B7Mo", "Payment", "Interest", "Principal", "Prepayment", "Balance", "Without"].map(
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
                              background: h === "Prepayment" ? ORANGE_SOFT : "transparent",
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
                        <td style={tdR}>{r.payment > 0 ? inr(r.payment) : "\u2014"}</td>
                        <td style={tdR}>{r.interest > 0 ? inr(r.interest) : "\u2014"}</td>
                        <td style={tdR}>{r.principal > 0 ? inr(r.principal) : "\u2014"}</td>
                        <td
                          style={{
                            ...tdR,
                            background: r.prepay > 0 ? ORANGE_SOFT : "transparent",
                            color: r.prepay > 0 ? ORANGE : MUTED,
                            fontWeight: r.prepay > 0 ? 700 : 400,
                          }}
                        >
                          {r.prepay > 0 ? inr(r.prepay) : "\u2014"}
                        </td>
                        <td style={{ ...tdR, color: ORANGE, fontWeight: 700 }}>{compact(r.balance)}</td>
                        <td style={{ ...tdR, color: MUTED }}>{compact(r.baseBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 11, color: MUTED, marginTop: 18, lineHeight: 1.55, maxWidth: 780 }}>
          Indicative only. The EMI is held constant and each prepayment is applied at the end of the
          month, after that month's instalment, so it suppresses interest from the following month.
          In mid-life mode the EMI is derived from the outstanding, rate, and remaining tenure on an
          annuity basis; a borrower's actual EMI may differ after past rate resets. Under the RBI
          (Pre-payment Charges on Loans) Directions, 2025, prepayment charges are nil on floating-rate
          loans to individuals and MSEs for facilities sanctioned or renewed on or after 1 January
          2026 — fixed-rate loans and older sanctions may still attract a charge, so the field is left
          editable. Actual figures vary with day-count, rate resets, and rounding.
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
