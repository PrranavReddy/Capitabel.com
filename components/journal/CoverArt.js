/**
 * Inline SVG "cover" infographics for the 3 journal posts. No image
 * generation or editing tools are available in this environment (see
 * CLAUDE.md), so these are hand-built vector graphics in the site's own
 * navy/orange/cream palette rather than photos — reused as both the
 * listing-card thumbnail and the article-page hero banner via `style`.
 *
 * Deliberately plain generic font stacks (not the site's var(--font-mono)
 * / var(--font-display)) — those branded fonts render noticeably wider
 * than the generic fallback this was visually verified against, which is
 * exactly what caused the first version's text/icon overlaps. Keep it
 * this way unless every label below is re-checked against the real fonts.
 */

function RbiRevolvingCreditArt(props) {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" {...props}>
      <rect width="400" height="300" fill="#F7F3E9" />
      <line x1="200" y1="30" x2="200" y2="230" stroke="#16264D" strokeOpacity="0.12" strokeWidth="1" />

      <text x="40" y="45" fontFamily="monospace" fontSize="10" letterSpacing="1" fill="#334971" fontWeight="700">
        TERM LOAN
      </text>
      <rect x="40" y="140" width="20" height="80" rx="4" fill="#F58220" />
      <rect x="68" y="158" width="20" height="62" rx="4" fill="#F58220" />
      <rect x="96" y="174" width="20" height="46" rx="4" fill="#F58220" />
      <rect x="124" y="188" width="20" height="32" rx="4" fill="#F58220" />
      <rect x="152" y="200" width="20" height="20" rx="4" fill="#F58220" />
      <circle cx="175" cy="65" r="12" fill="#16264D" />
      <path d="M169.5 65 L174 69.5 L181.5 60.5" stroke="#F7F3E9" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="40" y="245" fontFamily="monospace" fontSize="9" fill="#334971">
        fixed schedule
      </text>

      <text x="220" y="45" fontFamily="monospace" fontSize="9.5" letterSpacing="0.5" fill="#334971" fontWeight="700">
        REVOLVING CREDIT
      </text>
      <path d="M220 205 Q 236 155, 254 185 T 288 165 T 322 195 T 350 160" stroke="#F58220" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="360" cy="65" r="12" fill="none" stroke="#16264D" strokeWidth="2.2" />
      <line x1="351.5" y1="56.5" x2="368.5" y2="73.5" stroke="#16264D" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="285" y="228" width="66" height="19" rx="9.5" fill="none" stroke="#F58220" strokeWidth="1.5" />
      <text x="318" y="240.5" fontFamily="monospace" fontSize="9" fill="#F58220" textAnchor="middle" fontWeight="700">
        DRAFT
      </text>
    </svg>
  );
}

function MsmeRateAsymmetryArt(props) {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" {...props}>
      <rect width="400" height="300" fill="#F7F3E9" />
      <g transform="translate(115,150) rotate(-7)">
        <rect x="-75" y="-58" width="150" height="116" rx="10" fill="#FFFFFF" stroke="#16264D" strokeOpacity="0.15" strokeWidth="1.5" />
        <text x="-4" y="-14" fontFamily="sans-serif" fontSize="30" fontWeight="700" fill="#16264D" textAnchor="middle">
          9.5%
        </text>
        <text x="0" y="10" fontFamily="monospace" fontSize="9.5" fill="#334971" textAnchor="middle">
          p.a. — Lender A
        </text>
        <circle cx="52" cy="-40" r="11" fill="#2F855A" />
        <path d="M47 -40 L51 -36 L58 -45" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(278,155) rotate(6)">
        <rect x="-75" y="-58" width="150" height="116" rx="10" fill="#FFFFFF" stroke="#16264D" strokeOpacity="0.15" strokeWidth="1.5" />
        <text x="-4" y="-14" fontFamily="sans-serif" fontSize="30" fontWeight="700" fill="#16264D" textAnchor="middle">
          9.5%
        </text>
        <text x="0" y="10" fontFamily="monospace" fontSize="9.5" fill="#334971" textAnchor="middle">
          p.a. — Lender B
        </text>
        <text x="0" y="28" fontFamily="monospace" fontSize="8.5" fill="#F58220" textAnchor="middle" fontWeight="700">
          + fees not shown
        </text>
        <circle cx="52" cy="-40" r="11" fill="#F58220" />
        <text x="52" y="-36" fontFamily="sans-serif" fontSize="13" fill="#FFFFFF" textAnchor="middle" fontWeight="700">
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
      <g transform="translate(120,165)">
        <polygon points="-55,-10 0,-55 55,-10" fill="#16264D" />
        <rect x="-45" y="-10" width="90" height="65" fill="#16264D" />
        <rect x="-12" y="20" width="24" height="35" fill="#F7F3E9" />
      </g>
      <text x="120" y="233" fontFamily="monospace" fontSize="9.5" letterSpacing="0.5" fill="#334971" textAnchor="middle" fontWeight="700">
        HOME LOAN
      </text>

      <g transform="translate(280,110)">
        <path d="M0,-28 L26,-17 L26,9 Q26,27 0,38 Q-26,27 -26,9 L-26,-17 Z" fill="#F58220" />
        <text x="0" y="7" fontFamily="sans-serif" fontSize="18" fill="#FFFFFF" textAnchor="middle" fontWeight="700">
          +
        </text>
      </g>
      <text x="280" y="58" fontFamily="monospace" fontSize="9.5" letterSpacing="0.5" fill="#F58220" textAnchor="middle" fontWeight="700">
        + INSURANCE
      </text>
      <line x1="178" y1="128" x2="238" y2="112" stroke="#16264D" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />

      <g transform="translate(280,190)">
        <rect x="0" y="28" width="13" height="18" fill="#16264D" fillOpacity="0.25" />
        <rect x="17" y="16" width="13" height="30" fill="#16264D" fillOpacity="0.45" />
        <rect x="34" y="2" width="13" height="44" fill="#16264D" fillOpacity="0.7" />
        <rect x="51" y="-14" width="13" height="60" fill="#16264D" />
      </g>
      <text x="308" y="262" fontFamily="monospace" fontSize="8.5" fill="#334971" textAnchor="middle">
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
