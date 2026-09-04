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
 * EMI Calculator — generic (vanilla) term loan
 * Standard amortising loan. Interest each month is charged on the
 * outstanding balance (balance x r/12); the EMI is fixed and computed
 * on the full sanctioned amount over the repayment months.
 *
 * Two methods:
 *   - Immediate repayment : EMI begins from month 1.
 *   - Moratorium payment  : interest-only servicing during the
 *                           moratorium, then EMI over the remaining
 *                           tenure.
 *
 * A disbursement schedule is available in BOTH methods: stage the
 * release in tranches (month + amount). During a moratorium, interest
 * is charged only on the amount released so far. Defaults to a single
 * full tranche at month 1, so the plain run is unchanged until staged.
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

function amort(P, i, n) {
  if (n <= 0) return P;
  if (i === 0) return P / n;
  const f = Math.pow(1 + i, n);
  return (P * i * f) / (f - 1);
}

// Indian-grouped rupee integer, e.g. 1,23,425
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

function buildDisbByMonth(list, fullP) {
  const map = {};
  let any = false;
  if (Array.isArray(list)) {
    list.forEach((x) => {
      const m = Math.max(1, Math.round(+x.month || 1));
      const a = Math.max(0, +x.amount || 0);
      if (a > 0) {
        map[m] = (map[m] || 0) + a;
        any = true;
      }
    });
  }
  if (!any) map[1] = fullP; // default: full release at month 1
  return map;
}

/* --------------------------- the engine --------------------------- */

function simulate({
  loanAmount,
  ratePct,
  years,
  useMoratorium,
  moratoriumMonths,
  disbursements,
}) {
  const i = ratePct / 1200;
  const N = Math.max(1, Math.round(years * 12));
  const M = useMoratorium
    ? Math.min(Math.max(Math.round(moratoriumMonths), 0), 60)
    : 0;
  const repayN = Math.max(N - M, 1);

  const disb = buildDisbByMonth(disbursements, loanAmount);
  const totalToRelease = Object.values(disb).reduce((a, b) => a + b, 0);

  const rows = [];
  let book = 0; // outstanding = disbursed so far − principal repaid
  let released = 0; // cumulative disbursed
  let totalInterest = 0;
  let moratoriumInterest = 0;
  let month = 0;

  // EMI tracks the DISBURSED amount, not the sanction. It is (re)computed
  // over the remaining repayment months whenever a new tranche lands.
  let emi = 0;
  let startEMI = 0; // first EMI charged (on the first disbursed slice)
  let fullEMI = 0; // stable EMI once fully disbursed

  // Phase 1 — moratorium: interest-only (pre-EMI) on amount released so far
  for (let m = 1; m <= M; m++) {
    month++;
    const add = disb[month] || 0;
    book += add;
    released += add;
    const interest = book * i;
    totalInterest += interest;
    moratoriumInterest += interest;
    rows.push({
      month,
      year: Math.ceil(month / 12),
      phase: "moratorium",
      disbursed: add,
      revised: add > 0, // interest base stepped up this month
      payment: interest, // interest-only serviced
      emi: 0,
      interest,
      principal: 0,
      balance: book,
    });
  }

  // Phase 2 — repayment: EMI on the disbursed balance, revised per tranche
  const guard = N * 3 + 240;
  let firstRepay = true;
  for (let k = 1; k <= guard; k++) {
    month++;
    const add = disb[month] || 0;
    book += add;
    released += add;

    const remaining = Math.max(N - month + 1, 1); // months left in tenure
    let revised = false;
    // Recompute EMI on the first repayment month, and whenever a tranche lands
    if (firstRepay || add > 0) {
      emi = amort(book, i, remaining);
      revised = true;
      if (firstRepay) startEMI = emi;
      firstRepay = false;
    }
    if (released >= totalToRelease - 0.5 && fullEMI === 0) fullEMI = emi;

    const interest = book * i;
    let principal = emi - interest;
    let payment = emi;

    // final instalment: clear whatever remains
    if (book + interest <= emi) {
      principal = book;
      payment = book + interest;
      totalInterest += interest;
      rows.push({
        month,
        year: Math.ceil(month / 12),
        phase: "repay",
        disbursed: add,
        revised,
        payment,
        emi,
        interest,
        principal,
        balance: 0,
      });
      book = 0;
      if (released >= totalToRelease - 0.5) break;
      continue;
    }

    if (principal < 0) principal = 0; // interest exceeds EMI (edge)
    book -= principal;
    totalInterest += interest;
    rows.push({
      month,
      year: Math.ceil(month / 12),
      phase: "repay",
      disbursed: add,
      revised,
      payment,
      emi,
      interest,
      principal,
      balance: book,
    });
    if (book <= 0.5 && released >= totalToRelease - 0.5) break;
  }

  if (fullEMI === 0) fullEMI = emi;
  const monthsToClose = rows.length;
  const totalPrincipal = rows.reduce((a, r) => a + r.principal, 0);
  const totalPaid = rows.reduce((a, r) => a + r.payment, 0);
  const emiRevisions = rows.filter((r) => r.phase === "repay" && r.revised).length;

  return {
    EMI: fullEMI, // headline EMI = once fully disbursed
    startEMI,
    fullEMI,
    emiRevisions,
    N,
    M,
    repayN,
    rows,
    totalInterest,
    moratoriumInterest,
    monthsToClose,
    totalPrincipal,
    totalPaid,
    totalToRelease,
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

function NumberField({ label, prefix, value, onChange, min, step, hint }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: INK }}>{label}</span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1px solid ${RULE}`,
          borderRadius: 8,
          background: "#fff",
          overflow: "hidden",
        }}
      >
        {prefix && (
          <span
            style={{
              padding: "9px 8px 9px 11px",
              color: MUTED,
              fontSize: 14,
              background: "#FCFBF8",
              borderRight: `1px solid ${RULE}`,
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            border: "none",
            outline: "none",
            padding: "9px 11px",
            fontSize: 14,
            width: "100%",
            color: INK,
            background: "transparent",
          }}
        />
      </div>
      {hint && <span style={{ fontSize: 11.5, color: MUTED }}>{hint}</span>}
    </label>
  );
}

function Slider({ label, value, onChange, min, max, step, format }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: INK }}>{label}</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: ORANGE }}>
          {format ? format(value) : value}
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
      <span style={{ fontSize: 11.5, color: MUTED, fontWeight: 600, letterSpacing: 0.2 }}>
        {label}
      </span>
      <span style={{ fontSize: 20, fontWeight: 750, color: accent ? ORANGE : INK, lineHeight: 1.1 }}>
        {value}
      </span>
      {sub && <span style={{ fontSize: 11.5, color: MUTED }}>{sub}</span>}
    </div>
  );
}

/* --------------------- disbursement schedule ---------------------- */

function DisbursementSchedule({ rows, setRows, loanAmount, windowMonths }) {
  const total = rows.reduce((a, r) => a + (Number(r.amount) || 0), 0);
  const diff = total - loanAmount;
  const status =
    Math.abs(diff) < 1
      ? { text: "Fully allocated", color: "#2F855A" }
      : diff < 0
      ? { text: `${compact(-diff)} unallocated`, color: MUTED }
      : { text: `${compact(diff)} over sanction`, color: "#C53030" };

  const update = (idx, key, val) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, [key]: val } : r));
    setRows(next);
  };
  const add = () => {
    const lastM = rows.length ? Math.max(...rows.map((r) => +r.month || 1)) : 0;
    setRows([...rows, { month: Math.min(lastM + 1, windowMonths || lastM + 1), amount: 0 }]);
  };
  const remove = (idx) => setRows(rows.filter((_, i) => i !== idx));

  const splitEvenly = () => {
    const n = 6;
    const span = Math.max(windowMonths || 6, n);
    const per = Math.round(loanAmount / n);
    const next = [];
    for (let k = 0; k < n; k++) {
      const month = Math.max(1, Math.round(((k + 1) * span) / n));
      const amount = k === n - 1 ? loanAmount - per * (n - 1) : per;
      next.push({ month, amount });
    }
    setRows(next);
  };
  const matchToSanction = () => {
    if (total <= 0) {
      setRows([{ month: 1, amount: loanAmount }]);
      return;
    }
    const scale = loanAmount / total;
    setRows(rows.map((r) => ({ ...r, amount: Math.round((Number(r.amount) || 0) * scale) })));
  };

  const th = { textAlign: "left", fontSize: 11, color: MUTED, fontWeight: 600, padding: "4px 6px" };
  const cellInput = {
    width: "100%",
    border: `1px solid ${RULE}`,
    borderRadius: 6,
    padding: "6px 8px",
    fontSize: 13,
    color: INK,
    outline: "none",
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: INK }}>Disbursement schedule</span>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: status.color }}>{status.text}</span>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Month</th>
            <th style={th}>Tranche amount</th>
            <th style={{ ...th, width: 30 }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => {
            const beyond = windowMonths && (+r.month || 1) > windowMonths;
            return (
              <tr key={idx}>
                <td style={{ padding: "3px 6px 3px 0", width: 90 }}>
                  <input
                    type="number"
                    min={1}
                    value={r.month}
                    onChange={(e) => update(idx, "month", Number(e.target.value))}
                    style={{
                      ...cellInput,
                      borderColor: beyond ? "#E0A15F" : RULE,
                      background: beyond ? "#FDF3E6" : "#fff",
                    }}
                  />
                </td>
                <td style={{ padding: "3px 6px 3px 0" }}>
                  <input
                    type="number"
                    min={0}
                    step={100000}
                    value={r.amount}
                    onChange={(e) => update(idx, "amount", Number(e.target.value))}
                    style={cellInput}
                  />
                </td>
                <td style={{ padding: "3px 0", textAlign: "center" }}>
                  <button
                    onClick={() => remove(idx)}
                    title="Remove tranche"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: MUTED,
                      cursor: "pointer",
                      fontSize: 16,
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={add} style={ghostBtn}>+ Tranche</button>
        <button onClick={splitEvenly} style={ghostBtn}>Split evenly</button>
        <button onClick={matchToSanction} style={ghostBtn}>Match to sanction</button>
      </div>
      <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.5 }}>
        Interest during the moratorium is charged only on the amount released so far. Tranches should
        sum to the sanction; a month beyond the moratorium window is flagged in amber.
      </p>
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

/* ----------------------------- app -------------------------------- */

export default function EMICalculator() {
  const [method, setMethod] = useState("immediate"); // 'immediate' | 'moratorium'
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [rate, setRate] = useState(9.0);
  const [years, setYears] = useState(20);
  const [moratoriumMonths, setMoratoriumMonths] = useState(24);
  const [disbRows, setDisbRows] = useState([{ month: 1, amount: 5000000 }]);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const useMoratorium = method === "moratorium";

  const result = useMemo(
    () =>
      simulate({
        loanAmount,
        ratePct: rate,
        years,
        useMoratorium,
        moratoriumMonths,
        disbursements: disbRows,
      }),
    [loanAmount, rate, years, useMoratorium, moratoriumMonths, disbRows]
  );

  const chartData = useMemo(
    () =>
      result.rows.map((r) => ({
        month: r.month,
        Balance: Math.round(r.balance),
        Interest: Math.round(r.interest),
        Principal: Math.round(r.principal),
      })),
    [result]
  );

  const CSV_HEADERS = [
    "Month",
    "Year.Month",
    "Phase",
    "Disbursed",
    "EMI",
    "Payment",
    "Interest",
    "Principal",
    "Balance",
  ];

  const csvRows = useMemo(
    () =>
      result.rows.map((r) => [
        r.month,
        `${r.year}.${((r.month - 1) % 12) + 1}`,
        r.phase === "moratorium" ? "Moratorium" : "Repayment",
        Math.round(r.disbursed),
        Math.round(r.emi),
        Math.round(r.payment),
        Math.round(r.interest),
        Math.round(r.principal),
        Math.round(r.balance),
      ]),
    [result]
  );

  const handleDownload = () => {
    const csv = toCSV(CSV_HEADERS, csvRows);
    downloadCSV("emi-amortisation-schedule.csv", csv);
  };
  const handleCopy = async () => {
    const csv = toCSV(CSV_HEADERS, csvRows);
    const ok = await copyCSV(csv);
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
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: INK,
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap", marginBottom: 18 }}>
          <div>
            <h1 style={{ fontSize: 25, fontWeight: 800, margin: "0 0 5px", letterSpacing: -0.4 }}>
              EMI Calculator
            </h1>
            <p style={{ fontSize: 13.5, color: MUTED, margin: 0, maxWidth: 720, lineHeight: 1.55 }}>
              Interest and EMI both track the amount actually disbursed, not the sanction. Until the
              next tranche is released, interest is charged only on the disbursed balance; the EMI is
              computed on that balance and revised each time a tranche aggregates it up. Choose immediate
              repayment or a moratorium, and stage the release with the disbursement schedule.
            </p>
          </div>
          <HeaderCTA />
        </div>

        {/* Method toggle */}
        <Segmented
          value={method}
          onChange={setMethod}
          options={[
            { value: "immediate", label: "Immediate repayment" },
            { value: "moratorium", label: "Moratorium payment" },
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
              label="Loan amount (sanctioned)"
              prefix="₹"
              value={loanAmount}
              onChange={setLoanAmount}
              min={100000}
              max={30000000}
              step={100000}
              hint={compact(loanAmount)}
            />
            <SliderInput
              label="Interest rate"
              value={rate}
              onChange={setRate}
              min={5}
              max={18}
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
              hint={years * 12 + " months"}
            />

            {useMoratorium && (
              <SliderInput
                label="Moratorium (interest-only)"
                value={moratoriumMonths}
                onChange={setMoratoriumMonths}
                min={1}
                max={60}
                step={1}
                suffix="mo"
              />
            )}

            <div style={{ height: 1, background: RULE }} />

            <DisbursementSchedule
              rows={disbRows}
              setRows={setDisbRows}
              loanAmount={loanAmount}
              windowMonths={useMoratorium ? moratoriumMonths : 6}
            />
          </div>

          {/* Results */}
          <div style={{ display: "grid", gap: 16 }}>
            {/* Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 12,
              }}
            >
              <Metric
                label="Monthly EMI"
                value={inr(result.fullEMI)}
                accent
                sub={
                  result.emiRevisions > 1
                    ? `on full disbursement · revised ${result.emiRevisions}×`
                    : `over ${result.repayN} instalments`
                }
              />
              {result.emiRevisions > 1 && Math.round(result.startEMI) !== Math.round(result.fullEMI) && (
                <Metric
                  label="Starting EMI"
                  value={inr(result.startEMI)}
                  sub="on first disbursed slice"
                />
              )}
              <Metric label="Total interest" value={compact(result.totalInterest)} sub={inr(result.totalInterest)} />
              <Metric label="Total payable" value={compact(result.totalPaid)} sub="principal + interest" />
              <Metric
                label="Closes in"
                value={
                  result.monthsToClose +
                  " mo (" +
                  (result.monthsToClose / 12).toFixed(1) +
                  " yr)"
                }
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
                Outstanding balance & payment split
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
                    contentStyle={{
                      border: `1px solid ${RULE}`,
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11.5 }} />
                  {useMoratorium && result.M > 0 && (
                    <ReferenceLine
                      x={result.M}
                      stroke={ORANGE}
                      strokeDasharray="4 3"
                      label={{ value: "EMI starts", position: "top", fill: ORANGE, fontSize: 10.5 }}
                    />
                  )}
                  <Area
                    type="monotone"
                    dataKey="Balance"
                    stroke={BLUE}
                    fill="#E9F0F4"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="Interest" stroke={ORANGE} dot={false} strokeWidth={1.6} />
                  <Line type="monotone" dataKey="Principal" stroke="#2F855A" dot={false} strokeWidth={1.6} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Amortisation table */}
            <div
              style={{
                background: CARD,
                border: `1px solid ${RULE}`,
                borderRadius: 12,
                padding: 16,
              }}
            >
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
                  Amortisation schedule
                  <span style={{ color: MUTED, fontWeight: 500 }}>
                    {"  ·  "}
                    {result.monthsToClose} instalments
                  </span>
                </span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={handleCopy} style={ghostBtn}>
                    {copied ? "Copied ✓" : "Copy CSV"}
                  </button>
                  <button
                    onClick={handleDownload}
                    style={{ ...ghostBtn, borderColor: ORANGE, color: ORANGE }}
                  >
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
                      {["#", "Yr·Mo", "Disbursed", "EMI", "Payment", "Interest", "Principal", "Balance"].map(
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
                    {visibleRows.map((r) => {
                      const morat = r.phase === "moratorium";
                      return (
                        <tr
                          key={r.month}
                          style={{ background: morat ? "#FDF6EE" : "transparent" }}
                        >
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
                          <td style={tdR}>{r.disbursed > 0 ? compact(r.disbursed) : "—"}</td>
                          <td
                            style={{
                              ...tdR,
                              color: r.emi > 0 ? INK : MUTED,
                              fontWeight: r.revised && r.phase === "repay" ? 700 : 400,
                              background:
                                r.revised && r.phase === "repay" ? ORANGE_SOFT : "transparent",
                            }}
                          >
                            {r.emi > 0 ? inr(r.emi) : "—"}
                          </td>
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
          Indicative only. Interest each month is charged on the disbursed outstanding; the EMI is
          computed on that balance over the remaining tenure and revised at each tranche. Actual bank
          figures may differ due to day-count conventions, rate resets, and rounding. Moratorium
          interest is assumed serviced monthly (pre-EMI, not capitalised).
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
};
