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
 * Baroda Max Savings Home Loan — Amortisation Simulator
 * Overdraft-linked home loan (MaxGain family). Interest is charged on
 * the NET balance (loan outstanding − surplus parked in the linked SB
 * account). EMI stays fixed, so suppressed interest means more of each
 * EMI retires principal → the loan closes early. The parked surplus is
 * never a prepayment; it stays fully withdrawable.
 * ------------------------------------------------------------------ */

const BG = "#FAF8F3";
const CARD = "#FFFFFF";
const RULE = "#E7E2D8";
const INK = "#1F2421";
const MUTE = "#6B7280";
const NAVY = "#3E5C76";
const ORANGE = "#E07A3F";
const ORANGE_SOFT = "#FBEFE6";
const NET_TINT = "#F6F8FA";

/* ----------------------------- helpers ---------------------------- */

function amort(P, i, n) {
  if (n <= 0) return P;
  if (i === 0) return P / n;
  const f = Math.pow(1 + i, n);
  return (P * i * f) / (f - 1);
}

// Indian-grouped rupee integer, e.g. 1234567 -> "12,34,567"
function inr(x) {
  const n = Math.round(Number(x) || 0);
  const s = String(Math.abs(n));
  let out;
  if (s.length <= 3) out = s;
  else {
    const last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    out = rest + "," + last3;
  }
  return (n < 0 ? "-₹" : "₹") + out;
}

// Compact form: ₹1.70 Cr / ₹50.0 L / ₹12,345
function compact(x) {
  const n = Math.round(Number(x) || 0);
  const a = Math.abs(n);
  if (a >= 1e7) return "₹" + (n / 1e7).toFixed(2) + " Cr";
  if (a >= 1e5) return "₹" + (n / 1e5).toFixed(1) + " L";
  return inr(n);
}

function monthsToYM(m) {
  const y = Math.floor(m / 12);
  const mo = m % 12;
  if (y && mo) return `${y}y ${mo}m`;
  if (y) return `${y}y`;
  return `${mo}m`;
}

function ym(monthIdx) {
  // monthIdx is 1-based instalment number
  const y = Math.floor((monthIdx - 1) / 12) + 1;
  const mo = ((monthIdx - 1) % 12) + 1;
  return `${y}·${mo}`;
}

/* ----------------------------- engine ----------------------------- */

function simulate({
  loanAmount,
  ratePct,
  years,
  initSurplus,
  monthlySurplus,
  useMoratorium,
  moratoriumMonths,
}) {
  const P = Number(loanAmount) || 0;
  const i = (Number(ratePct) || 0) / 100 / 12;
  const N = Math.max(1, Math.round((Number(years) || 0) * 12));
  const M = useMoratorium ? Math.max(0, Math.round(Number(moratoriumMonths) || 0)) : 0;
  const repayN = Math.max(1, N - M);
  const EMI = amort(P, i, repayN);
  const ms = Number(monthlySurplus) || 0;

  /* ---------- Plain run (no surplus parked) ---------- */
  let pBook = P;
  let plainInterest = 0;
  let plainMonths = 0;
  for (let m = 1; m <= M; m++) {
    plainInterest += pBook * i;
    plainMonths++;
  }
  for (let k = 1; k <= repayN + 24; k++) {
    const interest = pBook * i;
    plainMonths++;
    if (pBook + interest <= EMI) {
      plainInterest += interest;
      pBook = 0;
      break;
    }
    pBook -= EMI - interest;
    plainInterest += interest;
    if (pBook <= 0.5) break;
  }

  /* ---------- Max Savings run (surplus parked) ---------- */
  let book = P;
  let parked = Number(initSurplus) || 0;
  let msInterest = 0;
  let months = 0;
  const monthly = []; // {month, interest, principal, book, parked, moratorium}

  for (let m = 1; m <= M; m++) {
    parked += ms;
    const net = Math.max(0, book - parked);
    const interest = net * i;
    msInterest += interest;
    months++;
    monthly.push({ month: months, interest, principal: 0, book, parked, moratorium: true });
  }

  const safety = repayN * 2 + 36;
  for (let k = 1; k <= safety; k++) {
    parked += ms;
    const net = Math.max(0, book - parked);
    const interest = net * i;
    months++;
    if (book + interest <= EMI) {
      msInterest += interest;
      monthly.push({ month: months, interest, principal: book, book: 0, parked, moratorium: false });
      book = 0;
      break;
    }
    const principal = EMI - interest;
    book -= principal;
    msInterest += interest;
    monthly.push({
      month: months,
      interest,
      principal,
      book: Math.max(book, 0),
      parked,
      moratorium: false,
    });
    if (book <= 0.5) break;
  }

  return {
    EMI,
    repayN,
    M,
    N,
    monthly,
    msInterest,
    msMonths: months,
    plainInterest,
    plainMonths,
    interestSaved: plainInterest - msInterest,
    monthsSaved: plainMonths - months,
  };
}

/* ------------------------------ atoms ----------------------------- */

function Segmented({ value, onChange, options }) {
  return (
    <div
      style={{
        display: "inline-flex",
        background: "#F1EEE7",
        border: `1px solid ${RULE}`,
        borderRadius: 9,
        padding: 3,
        gap: 3,
      }}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              border: "none",
              borderRadius: 7,
              padding: "7px 14px",
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              color: active ? "#fff" : INK,
              background: active ? ORANGE : "transparent",
              transition: "background 120ms",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Slider({ label, value, onChange, min, max, step, format }) {
  return (
    <label style={{ display: "block" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 12, color: MUTE, fontWeight: 600, letterSpacing: 0.2 }}>{label}</span>
        <span style={{ fontSize: 14, color: NAVY, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: ORANGE }}
      />
    </label>
  );
}

function SliderInput({ label, value, onChange, min, max, step, prefix, suffix, hint, disabled, labelHidden }) {
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
    <label style={{ display: "block", opacity: disabled ? 0.45 : 1, transition: "opacity 120ms" }}>
      <div
        style={{
          display: "flex",
          justifyContent: labelHidden ? "flex-end" : "space-between",
          alignItems: "center",
          marginBottom: 6,
          gap: 8,
        }}
      >
        {!labelHidden && (
          <span style={{ fontSize: 12, color: MUTE, fontWeight: 600, letterSpacing: 0.2 }}>{label}</span>
        )}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            border: `1px solid ${RULE}`,
            borderRadius: 7,
            padding: "3px 7px",
            background: disabled ? "#F4F1EB" : "#fff",
          }}
        >
          {prefix && <span style={{ fontSize: 12.5, color: MUTE, fontWeight: 600 }}>{prefix}</span>}
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
              width: 78,
              border: "none",
              outline: "none",
              textAlign: "right",
              fontSize: 14,
              fontWeight: 700,
              color: NAVY,
              background: "transparent",
              fontVariantNumeric: "tabular-nums",
              padding: 0,
            }}
          />
          {suffix && <span style={{ fontSize: 12, color: MUTE, fontWeight: 600 }}>{suffix}</span>}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: ORANGE }}
      />
      {hint && <div style={{ fontSize: 11, color: MUTE, marginTop: 3 }}>{hint}</div>}
    </label>
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

function Metric({ label, value, sub, accent }) {
  return (
    <div
      style={{
        background: accent ? ORANGE_SOFT : CARD,
        border: `1px solid ${accent ? "#F0D6C4" : RULE}`,
        borderRadius: 11,
        padding: "13px 15px",
      }}
    >
      <div style={{ fontSize: 11, color: MUTE, fontWeight: 600, letterSpacing: 0.3, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 19, fontWeight: 800, color: accent ? ORANGE : INK, letterSpacing: -0.3 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11.5, color: MUTE, marginTop: 2 }}>{sub}</div>}
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

/* ------------------------------ app ------------------------------- */

export default function BarodaMaxSavingsSimulator() {
  const [useMoratorium, setUseMoratorium] = useState(false);
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [rate, setRate] = useState(8.4);
  const [years, setYears] = useState(20);
  const [moratoriumMonths, setMoratoriumMonths] = useState(24);
  const [initSurplus, setInitSurplus] = useState(500000);
  const [monthlySurplus, setMonthlySurplus] = useState(25000);
  const [surplusOn, setSurplusOn] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () =>
      simulate({
        loanAmount,
        ratePct: rate,
        years,
        initSurplus,
        monthlySurplus: surplusOn ? monthlySurplus : 0,
        useMoratorium,
        moratoriumMonths,
      }),
    [loanAmount, rate, years, initSurplus, monthlySurplus, surplusOn, useMoratorium, moratoriumMonths]
  );

  const chartData = useMemo(
    () =>
      result.monthly.map((r) => ({
        month: r.month,
        Outstanding: Math.round(r.book),
        Net: Math.round(Math.max(0, r.book - r.parked)),
        Interest: Math.round(r.interest),
      })),
    [result]
  );

  const CSV_HEADERS = [
    "Month",
    "Year.Month",
    "Phase",
    "Interest",
    "Principal",
    "Surplus parked",
    "Outstanding",
    "Net (charged)",
  ];

  const csvRows = useMemo(
    () =>
      result.monthly.map((r) => [
        r.month,
        ym(r.month),
        r.moratorium ? "Moratorium" : "Repayment",
        Math.round(r.interest),
        Math.round(r.principal),
        Math.round(r.parked),
        Math.round(r.book),
        Math.round(Math.max(0, r.book - r.parked)),
      ]),
    [result]
  );

  const handleDownload = () => {
    const csv = toCSV(CSV_HEADERS, csvRows);
    downloadCSV("baroda-max-savings-amortisation.csv", csv);
  };
  const handleCopy = async () => {
    const csv = toCSV(CSV_HEADERS, csvRows);
    const ok = await copyCSV(csv);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const visibleRows = showAll ? result.monthly : result.monthly.slice(0, 36);

  const thL = {
    textAlign: "left",
    padding: "8px 18px",
    fontSize: 11,
    color: MUTE,
    fontWeight: 700,
    letterSpacing: 0.3,
    borderBottom: `1px solid ${RULE}`,
    whiteSpace: "nowrap",
  };
  const thR = { ...thL, textAlign: "right" };
  const tdL = {
    padding: "7px 18px",
    fontSize: 12.5,
    color: INK,
    borderBottom: `1px solid ${BG}`,
    whiteSpace: "nowrap",
  };
  const tdR = { ...tdL, textAlign: "right", fontVariantNumeric: "tabular-nums" };

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
            Baroda Max Savings — Amortisation Simulator
          </h1>
          <p style={{ fontSize: 13.5, color: MUTE, margin: 0, maxWidth: 760, lineHeight: 1.55 }}>
            Overdraft-linked home loan. Interest each month is charged on the{" "}
            <b>net</b> balance — outstanding minus the surplus parked in the linked account. The EMI
            stays fixed, so the suppressed interest retires principal faster and the loan closes
            early. Parked surplus stays fully withdrawable; it is never a prepayment.
          </p>
        </div>

        {/* Mode toggle */}
        <div style={{ marginBottom: 16 }}>
          <Segmented
            value={useMoratorium ? "moratorium" : "repay"}
            onChange={(v) => setUseMoratorium(v === "moratorium")}
            options={[
              { value: "repay", label: "Repayment from month 1" },
              { value: "moratorium", label: "With construction moratorium" },
            ]}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 16 }}>
          {/* Inputs */}
          <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 18 }}>
            <div style={{ display: "grid", gap: 16 }}>
              <SliderInput
                label="Loan amount"
                value={loanAmount}
                onChange={setLoanAmount}
                min={500000}
                max={30000000}
                step={100000}
                prefix="₹"
                hint={compact(loanAmount)}
              />
              <SliderInput
                label="Interest rate (BRLLR-linked)"
                value={rate}
                onChange={setRate}
                min={6}
                max={12}
                step={0.05}
                suffix="%"
              />
              <SliderInput
                label="Tenure"
                value={years}
                onChange={setYears}
                min={1}
                max={30}
                step={1}
                suffix="yr"
                hint={`${years * 12} months`}
              />
              {useMoratorium && (
                <SliderInput
                  label="Construction moratorium"
                  value={moratoriumMonths}
                  onChange={setMoratoriumMonths}
                  min={0}
                  max={36}
                  step={1}
                  suffix="mo"
                />
              )}
            </div>
          </div>

          {/* Surplus + metrics */}
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: "grid", gap: 16 }}>
                <SliderInput
                  label="Upfront surplus parked"
                  value={initSurplus}
                  onChange={setInitSurplus}
                  min={0}
                  max={10000000}
                  step={50000}
                  prefix="₹"
                  hint={compact(initSurplus)}
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 12, color: MUTE, fontWeight: 600, letterSpacing: 0.2 }}>
                      Monthly surplus added
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ fontSize: 11, color: surplusOn ? ORANGE : MUTE, fontWeight: 700 }}>
                        {surplusOn ? "On" : "Off"}
                      </span>
                      <Toggle on={surplusOn} onChange={setSurplusOn} />
                    </div>
                  </div>
                  <SliderInput
                    label=""
                    labelHidden
                    value={monthlySurplus}
                    onChange={setMonthlySurplus}
                    min={0}
                    max={200000}
                    step={5000}
                    prefix="₹"
                    hint={surplusOn ? compact(monthlySurplus) + " / month" : "not applied"}
                    disabled={!surplusOn}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Metric label="Monthly EMI" value={inr(result.EMI)} sub={`over ${result.repayN} instalments`} />
              <Metric label="Closes in" value={monthsToYM(result.msMonths)} sub={`${result.msMonths} instalments`} />
              <Metric label="Interest saved" value={compact(result.interestSaved)} sub={inr(result.interestSaved)} accent />
              <Metric label="Time cut" value={monthsToYM(Math.max(0, result.monthsSaved))} sub={`${Math.max(0, result.monthsSaved)} instalments`} accent />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 16, marginTop: 16 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>
            Outstanding vs. net charged
          </div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <ComposedChart data={chartData} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid stroke={RULE} strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: MUTE }}
                  tickFormatter={(m) => (m % 12 === 0 ? m / 12 + "y" : "")}
                  axisLine={{ stroke: RULE }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: MUTE }}
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
                {useMoratorium && result.M > 0 && (
                  <ReferenceLine
                    x={result.M}
                    stroke={ORANGE}
                    strokeDasharray="4 3"
                    label={{ value: "EMI starts", position: "top", fill: ORANGE, fontSize: 10.5 }}
                  />
                )}
                <Area type="monotone" dataKey="Outstanding" stroke={NAVY} fill="#E9EFF4" strokeWidth={2} />
                <Line type="monotone" dataKey="Net" stroke={ORANGE} dot={false} strokeWidth={1.8} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Amortisation table */}
        <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 16, marginTop: 16 }}>
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
              Amortisation tracker
              <span style={{ color: MUTE, fontWeight: 500 }}>
                {"  ·  "}
                {result.msMonths} instalments to payoff
              </span>
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleCopy} style={ghostBtn}>
                {copied ? "Copied ✓" : "Copy CSV"}
              </button>
              <button onClick={handleDownload} style={{ ...ghostBtn, borderColor: ORANGE, color: ORANGE }}>
                Download CSV
              </button>
              {result.monthly.length > 36 && (
                <button onClick={() => setShowAll((s) => !s)} style={ghostBtn}>
                  {showAll ? "Show less" : `Show all ${result.monthly.length}`}
                </button>
              )}
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thL}>Month</th>
                  <th style={thR}>Interest</th>
                  <th style={thR}>Principal</th>
                  <th style={thR}>Surplus</th>
                  <th style={thR}>Outstanding</th>
                  <th style={{ ...thR, background: NET_TINT }}>Net (charged)</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r) => {
                  const net = Math.max(0, r.book - r.parked);
                  return (
                    <tr key={r.month} style={{ background: r.moratorium ? "#FBF8F2" : "transparent" }}>
                      <td style={tdL}>
                        {r.month}
                        <span style={{ color: MUTE, fontSize: 11 }}> · {ym(r.month)}</span>
                        {r.moratorium && (
                          <span
                            style={{
                              marginLeft: 8,
                              fontSize: 10,
                              color: ORANGE,
                              background: ORANGE_SOFT,
                              padding: "1px 6px",
                              borderRadius: 5,
                              fontWeight: 700,
                            }}
                          >
                            moratorium
                          </span>
                        )}
                      </td>
                      <td style={tdR}>{inr(r.interest)}</td>
                      <td style={tdR}>{r.principal > 0 ? inr(r.principal) : "—"}</td>
                      <td style={tdR}>{compact(r.parked)}</td>
                      <td style={{ ...tdR, color: NAVY, fontWeight: 700 }}>{compact(r.book)}</td>
                      <td style={{ ...tdR, background: NET_TINT, fontWeight: 700 }}>{compact(net)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!showAll && result.monthly.length > 36 && (
            <div style={{ fontSize: 11.5, color: MUTE, marginTop: 8 }}>
              Showing first 36 of {result.monthly.length}. Export gives the full schedule.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
