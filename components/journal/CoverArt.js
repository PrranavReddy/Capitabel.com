/**
 * Inline SVG "cover" infographics for the 3 journal posts. No image
 * generation or editing tools are available in this environment (see
 * CLAUDE.md), so these are hand-built vector graphics in the site's own
 * navy/orange/cream palette rather than photos — reused as both the
 * listing-card thumbnail and the article-page hero banner via `style`.
 */

function RbiRevolvingCreditArt(props) {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" {...props}>
      <rect width="400" height="300" fill="#F7F3E9" />
      <line x1="200" y1="30" x2="200" y2="230" stroke="#16264D" strokeOpacity="0.12" strokeWidth="1" />

      <text x="40" y="45" fontFamily="var(--font-mono, monospace)" fontSize="11" letterSpacing="1.5" fill="#334971" fontWeight="700">
        TERM LOAN
      </text>
      <rect x="40" y="130" width="22" height="90" rx="4" fill="#F58220" />
      <rect x="72" y="150" width="22" height="70" rx="4" fill="#F58220" />
      <rect x="104" y="168" width="22" height="52" rx="4" fill="#F58220" />
      <rect x="136" y="184" width="22" height="36" rx="4" fill="#F58220" />
      <rect x="168" y="198" width="22" height="22" rx="4" fill="#F58220" />
      <circle cx="175" cy="55" r="13" fill="#16264D" />
      <path d="M169 55 L174 60 L182 50" stroke="#F7F3E9" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="40" y="240" fontFamily="var(--font-mono, monospace)" fontSize="9" fill="#334971">
        fixed schedule
      </text>

      <text x="220" y="45" fontFamily="var(--font-mono, monospace)" fontSize="11" letterSpacing="1.5" fill="#334971" fontWeight="700">
        REVOLVING CREDIT
      </text>
      <path d="M220 200 Q 240 140, 260 180 T 300 160 T 340 190 T 370 150" stroke="#F58220" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="355" cy="55" r="13" fill="none" stroke="#16264D" strokeWidth="2.5" />
      <line x1="346" y1="46" x2="364" y2="64" stroke="#16264D" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="285" y="222" width="70" height="20" rx="10" fill="none" stroke="#F58220" strokeWidth="1.5" />
      <text x="320" y="235" fontFamily="var(--font-mono, monospace)" fontSize="9" fill="#F58220" textAnchor="middle" fontWeight="700">
        DRAFT
      </text>
    </svg>
  );
}

function MsmeRateAsymmetryArt(props) {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" {...props}>
      <rect width="400" height="300" fill="#F7F3E9" />
      <g transform="translate(120,150) rotate(-7)">
        <rect x="-70" y="-55" width="140" height="110" rx="10" fill="#FFFFFF" stroke="#16264D" strokeOpacity="0.15" strokeWidth="1.5" />
        <text x="0" y="-15" fontFamily="var(--font-display, sans-serif)" fontSize="34" fontWeight="700" fill="#16264D" textAnchor="middle">
          9.5%
        </text>
        <text x="0" y="8" fontFamily="var(--font-mono, monospace)" fontSize="10" fill="#334971" textAnchor="middle">
          p.a. — Lender A
        </text>
        <circle cx="45" cy="-35" r="11" fill="#2F855A" />
        <path d="M40 -35 L44 -31 L51 -40" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(270,155) rotate(6)">
        <rect x="-70" y="-55" width="140" height="110" rx="10" fill="#FFFFFF" stroke="#16264D" strokeOpacity="0.15" strokeWidth="1.5" />
        <text x="0" y="-15" fontFamily="var(--font-display, sans-serif)" fontSize="34" fontWeight="700" fill="#16264D" textAnchor="middle">
          9.5%
        </text>
        <text x="0" y="8" fontFamily="var(--font-mono, monospace)" fontSize="10" fill="#334971" textAnchor="middle">
          p.a. — Lender B
        </text>
        <text x="0" y="26" fontFamily="var(--font-mono, monospace)" fontSize="9" fill="#F58220" textAnchor="middle" fontWeight="700">
          + fees not shown
        </text>
        <circle cx="45" cy="-35" r="11" fill="#F58220" />
        <text x="45" y="-31" fontFamily="var(--font-display, sans-serif)" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="700">
          ?
        </text>
      </g>
    </svg>
  );
}

function InsuranceBundlingArt(props) {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" {...props}>
      <rect width="400" height="300" fill="#F7F3E9" />
      <g transform="translate(130,160)">
        <polygon points="-55,-10 0,-55 55,-10" fill="#16264D" />
        <rect x="-45" y="-10" width="90" height="65" fill="#16264D" />
        <rect x="-12" y="20" width="24" height="35" fill="#F7F3E9" />
      </g>
      <text x="130" y="228" fontFamily="var(--font-mono, monospace)" fontSize="10" letterSpacing="1" fill="#334971" textAnchor="middle" fontWeight="700">
        HOME LOAN
      </text>

      <g transform="translate(255,95)">
        <path d="M0,-30 L28,-18 L28,10 Q28,30 0,42 Q-28,30 -28,10 L-28,-18 Z" fill="#F58220" />
        <text x="0" y="8" fontFamily="var(--font-display, sans-serif)" fontSize="20" fill="#FFFFFF" textAnchor="middle" fontWeight="700">
          +
        </text>
      </g>
      <text x="255" y="65" fontFamily="var(--font-mono, monospace)" fontSize="10" letterSpacing="1" fill="#F58220" textAnchor="middle" fontWeight="700">
        + INSURANCE
      </text>
      <line x1="185" y1="115" x2="225" y2="100" stroke="#16264D" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />

      <g transform="translate(255,180)">
        <rect x="0" y="30" width="14" height="20" fill="#16264D" fillOpacity="0.25" />
        <rect x="18" y="18" width="14" height="32" fill="#16264D" fillOpacity="0.45" />
        <rect x="36" y="4" width="14" height="46" fill="#16264D" fillOpacity="0.7" />
        <rect x="54" y="-12" width="14" height="62" fill="#16264D" />
      </g>
      <text x="285" y="255" fontFamily="var(--font-mono, monospace)" fontSize="9" fill="#334971" textAnchor="middle">
        premium + interest, 20 yrs
      </text>
    </svg>
  );
}

const ART_BY_SLUG = {
  "rbi-nbfc-revolving-credit-draft": RbiRevolvingCreditArt,
  "msme-loan-rate-information-asymmetry": MsmeRateAsymmetryArt,
  "home-loan-insurance-bundling-transparency": InsuranceBundlingArt,
};

export default function CoverArt({ slug, style }) {
  const Art = ART_BY_SLUG[slug];
  if (!Art) return null;
  return <Art style={style} />;
}
