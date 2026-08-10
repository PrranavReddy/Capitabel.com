// Content transcribed from the design-reference/*.dc.html handoff files.
// Keep this as the single source of truth for site copy — pages just map over it.

export const site = {
  name: "Capitabel Solutions",
  tagline: "Building Bharat through credit access.",
  phone: "+91 99405 48583",
  phoneHref: "tel:+919940548583",
  whatsapp: "https://wa.me/919940548583",
  whatsappWithText:
    "https://wa.me/919940548583?text=Hi%2C%20I%20would%20like%20to%20book%20a%20free%20consultation",
  email: "hello@capitabel.com",
  address: [
    "Capitabel Solutions Pvt Ltd",
    "#E162/5, Tiger Varadachar Road, 1st Cross Kalakshetra,",
    "Besantnagar, Chennai, Tamil Nadu 600090",
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/loans", label: "Loan products" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

// ------------------------------------------------------------------------
// Landing
// ------------------------------------------------------------------------
const lenders = [
  "HDFC Bank",
  "ICICI Bank",
  "Karur Vysya Bank",
  "Central Bank of India",
  "Indian Overseas Bank",
  "Canara Bank",
  "Repco Home Finance",
  "Tata Capital",
  "Bajaj Housing Finance",
  "HomeFirst Finance",
  "Muthoot Finance",
  "Piramal Finance",
];

export const landing = {
  lendersLoop: [...lenders, ...lenders],
  products: [
    {
      code: "CP-03",
      tag: "MSME",
      tagBg: "#334971",
      tagFg: "#FFFFFF",
      name: "MSME Business Loans",
      desc: "Working capital, machinery, and secured business loans — structured around GST turnover, cash-flow cycles, and the paperwork rhythm of a small operation.",
      bullets: ["Tickets from ₹20 L to ₹5 Cr", "Secured and unsecured", "SIPCOT industrial estate specialists"],
      ticket: "₹20 L – ₹5 Cr",
    },
    {
      code: "CP-02",
      tag: "LAP",
      tagBg: "#F58220",
      tagFg: "#FFFFFF",
      name: "Loan Against Property",
      desc: "Unlock capital from commercial or residential property you already own — for business expansion, consolidation, or working capital.",
      bullets: ["Tickets from ₹15 L to ₹2 Cr", "Property-backed SME credit", "Tenures up to 15 years"],
      ticket: "₹15 L – ₹2 Cr",
    },
    {
      code: "CP-01",
      tag: "Home Loan",
      tagBg: "#16264D",
      tagFg: "#FFFFFF",
      name: "Home Loans",
      desc: "From the salaried professional buying a first flat in Chennai to the peri-urban aspirant financing a first home in Nellore.",
      bullets: ["Tickets from ₹8 L to ₹3 Cr", "Tenures up to 30 years", "Balance-transfer restructuring available"],
      ticket: "₹8 L – ₹3 Cr",
    },
  ],
  steps: [
    {
      n: "01",
      dur: "~5 min",
      title: "Tell us what you need",
      body: "A short call clarifies what you’re actually solving for. No paperwork maze required to get started.",
    },
    {
      n: "02",
      dur: "48 hrs",
      title: "We issue a Capitabel Loan Offer",
      body: "Our matching engine scores your file against our core lender panel; we validate with 1–3 shortlisted lenders and issue an in-principle offer.",
    },
    {
      n: "03",
      dur: "7–10 days",
      title: "Sanction, disbursement, and beyond",
      body: "Your dedicated advisor stays with you through documentation, sanction, and every next step. 94% approval rate on files we take on.",
    },
  ],
  segments: [
    {
      n: "01",
      title: "MSME owners",
      initial: "M",
      tag: "MSME · Peri-urban + Tier 2",
      bg: "#F5F0E4",
      fg: "#16264D",
      label: "#334971",
      dot: "#16264D",
      dotFg: "#FFFFFF",
      body: "#334971",
      chipBg: "rgba(22,38,77,0.08)",
      chipFg: "#16264D",
      desc: "Manufacturers, traders, service businesses. From Chennai’s core to Gummidipoondi SIPCOT and Hosur. Working capital that respects your cash-flow cycle.",
      tags: ["Working capital", "Machinery finance", "GST-linked", "SIPCOT specialists", "Secured LAP"],
    },
    {
      n: "02",
      title: "Construction developers",
      initial: "C",
      tag: "Real estate · South India",
      bg: "#F58220",
      fg: "#FFFFFF",
      label: "rgba(255,255,255,0.75)",
      dot: "#FFFFFF",
      dotFg: "#F58220",
      body: "rgba(255,255,255,0.9)",
      chipBg: "rgba(255,255,255,0.15)",
      chipFg: "#FFFFFF",
      desc: "Project finance, LAP against existing assets, and construction loans tied to real site milestones. Built on Manor Group’s 25 years of ground.",
      tags: ["Project finance", "Draw-schedule loans", "LAP", "CREDAI-linked", "Land purchase"],
    },
    {
      n: "03",
      title: "Homebuyers",
      initial: "H",
      tag: "Home Loan · Tier 1 to Tier 3",
      bg: "#16264D",
      fg: "#FFFFFF",
      label: "rgba(245,240,228,0.65)",
      dot: "#F58220",
      dotFg: "#FFFFFF",
      body: "rgba(255,255,255,0.85)",
      chipBg: "rgba(245,240,228,0.12)",
      chipFg: "#FFFFFF",
      desc: "Salaried professionals, business owners, first-time aspirants across South Andhra. Home loans that account for informal income and complex files.",
      tags: ["First-time buyers", "Balance transfer", "Informal income", "Affordable HL", "Peri-urban"],
    },
  ],
  engineFacts: [
    { val: "40+", label: "Banks & NBFCs in our lender network" },
    { val: "4 rules", label: "Match by borrower fit, not commission" },
    { val: "25 yrs", label: "Manor Group South India real estate depth" },
    { val: "€60 Bn", label: "ING loan portfolio our tech was built on" },
  ],
  posts: [
    { tag: "rate charts", cat: "Rates", read: "4 min read", title: "Reading a sanction letter: five lines that actually matter." },
    { tag: "site diagram", cat: "Construction", read: "6 min read", title: "Draw-schedule loans, explained without the jargon." },
    { tag: "GST ledger", cat: "MSME", read: "5 min read", title: "What lenders really look at in your GST returns." },
  ],
  faqs: [
    {
      q: "What is a Capitabel Loan Offer?",
      a: "It’s an in-principle indicative offer issued by us — not the lender — within 48 hours of a complete file. It specifies indicative interest rate within a range, processing fee, tenure, and other Key Fact Statement terms. It’s backed by our matching engine and validated through one round of calls with 1–3 shortlisted lenders. Our Offer Honour Rate — the share of offers that result in a lender sanction on materially equivalent terms — sits at 85%.",
    },
    {
      q: "Do you charge borrowers a fee?",
      a: "For most retail loans, no — we’re paid by the lender on successful disbursement. For complex project finance or specialised advisory, we quote a transparent flat fee upfront. Never a percentage of your loan, never a hidden charge.",
    },
    {
      q: "How do you decide which lender to recommend?",
      a: "By borrower fit first — approval probability, indicative rate, processing fee, sanction TAT, and KFS terms — not by which lender pays us best. Where a direct lender relationship and a channel partner offer the same file, we default to direct. If a channel premium is material we flag it for management review; we don’t auto-route.",
    },
    {
      q: "Which lenders do you work with?",
      a: "A rationalised core panel of lending partners, drawn from a wider network of 40+. It includes HDFC, ICICI, KVB, IOB, Central Bank, Canara, Repco Home Finance, Tata Capital, Bajaj Housing, and specialised MSME/HFC lenders like HomeFirst, Muthoot, and Piramal.",
    },
    {
      q: "Where do you operate?",
      a: "Five clusters across Tamil Nadu and Andhra Pradesh: Chennai (anchor), Nellore, South Andhra (five towns), North Chennai / SIPCOT, and a fifth cluster launching in FY 2026–27. Feet on the ground in each, with local RMs speaking Tamil, Telugu, and English.",
    },
    {
      q: "Can you help if I’ve been rejected before?",
      a: "Often, yes. A rejection is usually a mismatch between your file and one lender’s policy — not a verdict on your creditworthiness. We’ll review, address gaps, and route you to lenders who fit. Our 94% approval rate on files we take on reflects exactly this filter.",
    },
  ],
};

// ------------------------------------------------------------------------
// About
// ------------------------------------------------------------------------
export const about = {
  stats: [
    { val: "₹50.15Cr", tag: "Disbursed", label: "Across 52 files since inception in 2023" },
    { val: "96.3%", tag: "Approval", label: "Rate on files we take on to sanction" },
    { val: "30+", tag: "Lenders", label: "Banks and NBFCs on the wider Capitabel network" },
    { val: "4", tag: "Clusters", label: "Geographic clusters across Tamil Nadu and Andhra Pradesh" },
  ],
  testimonials: [
    {
      quote:
        "Sanction in nine days on an MSME file two banks had already turned down. Harish’s team knew exactly which lender would say yes.",
      initial: "R",
      name: "Rajesh Kumar",
      role: "Textile manufacturer, Chennai",
    },
    {
      quote: "Draw-schedule financing that actually matched our site milestones. First team that got it.",
      initial: "A",
      name: "Anitha Reddy",
      role: "Developer, Chennai",
    },
    {
      quote: "Refinanced our home loan and dropped the rate by 1.4%. Honest advice, no fuss.",
      initial: "V",
      name: "Vikram Iyer",
      role: "Homeowner, Besantnagar",
    },
  ],
  team: [
    {
      img: "/images/chidambaram-kattuputur.png",
      role: "Co-Founder",
      name: "Chidambaram Kattuputur",
      bio: "Operator-investor at the intersection of real estate and fintech. 15+ years building affordable, luxury, and impact housing across South India. CEO of Sanctuary Spaces. Masters in International Business, Grenoble Business School.",
      langs: "Ta · En · Te · Hi",
      base: "Chennai",
    },
    {
      img: "/images/harish-bode.png",
      role: "Co-Founder & MD",
      name: "Harish Bode",
      bio: "18+ years across ING Netherlands, Capgemini, and Cognizant. At ING: Head of IT Custodian for a €60 Bn loan portfolio. Led Strategic Roadmap for Digital Business Lending. MBA, University of Amsterdam.",
      langs: "En · Nl · Te · Ta · Hi",
      base: "Chennai",
    },
    {
      img: "/images/devesh-narang.png",
      role: "Founding Member · Partnerships",
      name: "Devesh Narang",
      bio: "Strategy and partnerships generalist with Capitabel since founding. Closed 15+ bank and NBFC partnerships, cut loan processing TAT by 54%. Won SDG 10 at ESG World Summit & GRIT Awards 2022. Bachelor of Commerce, Loyola College.",
      langs: "En · Ta · Hi",
      base: "Chennai",
    },
    {
      img: "/images/thiru-r.png",
      role: "Strategic Advisor",
      name: "Thiru.R",
      bio: "25 years of experience building and scaling financial services institutions. Expertise in business strategy, credit, operations and digital transformation, with a focus on developing scalable models for MSMEs. Experience spans India, Indonesia and Kenya across fintechs and allied industries. Graduated from Harvard Business School and Santa Clara University.",
      langs: "Ta · Te · En · Kn · Hi",
      base: "South India",
    },
  ],
  opsTeam: [
    { name: "Chidambaram Kattuputur", role: "Co-Founder", loc: "Chennai", focus: "Strategy · Real Estate Partnerships · Investor Relations" },
    { name: "Harish Bode", role: "Co-Founder & MD", loc: "Chennai", focus: "Technology · Lender Network · Operations · Banking Relationships" },
    { name: "Devesh Narang", role: "Founding Member, Partnerships", loc: "Chennai", focus: "Lender Relations · MSME Vertical · Digital Channels" },
    { name: "Monica", role: "Customer Support", loc: "Chennai", focus: "Client Services · CRM Management · Customer NPS" },
    { name: "Nagindra", role: "RM — Sullurpet Cluster", loc: "Sullurpet", focus: "On-Ground Sourcing · Builder & Agent Relationships" },
    { name: "Mutu", role: "ASM — Andhra Region", loc: "Andhra", focus: "Region Sales Management · Partner Development · Expansion" },
    { name: "Thiru.R", role: "Strategic Advisor", loc: "South India", focus: "Matching Engine Framework · Governance · Institution Building" },
  ],
  beliefs: [
    {
      n: "01",
      title: "One advisor, start to finish.",
      body: "No routing menus, no handoffs, no repeating your story. The specialist you meet on your first call is the one who negotiates your sanction and picks up the phone six months later.",
    },
    {
      n: "02",
      title: "Match by borrower fit, not commission.",
      body: "Our matching engine ranks lenders by approval probability, indicative rate, and KFS terms — never by what pays us best. Direct relationships preferred over channel partners at equal payout.",
    },
    {
      n: "03",
      title: "Say no when it isn’t the right loan.",
      body: "Every year we walk clients away from loans they came in wanting. We’d rather earn a referral in five years than close a bad file this month.",
    },
    {
      n: "04",
      title: "Explain everything, hide nothing.",
      body: "Every fee, every clause, every rate-reset trigger. You’ll leave every meeting with fewer questions than you brought in.",
    },
  ],
};

// ------------------------------------------------------------------------
// Loans
// ------------------------------------------------------------------------
export const loans = {
  summary: [
    { label: "Products", val: "3", note: "Home Loan · LAP · MSME" },
    { label: "Lender network", val: "40+", note: "Banks and NBFCs reachable" },
    { label: "Loan Offer TAT", val: "48 hrs", note: "From complete file" },
    { label: "Offer Honour Rate", val: "85%", note: "Q4 FY 2026–27 target" },
  ],
  products: [
    {
      slug: "msme",
      code: "CP-03",
      tag: "Product · MSME",
      icon: "M",
      accentBg: "#334971",
      accentFg: "#FFFFFF",
      name: "MSME Business Loans",
      desc: "Working capital, machinery finance, and secured business loans — structured around GST turnover, cash-flow cycles, and the paperwork rhythm of small operations.",
      rate: "11.00%+",
      tenure: "1–7y",
      ticket: "₹20L – ₹5Cr",
      fit: [
        { title: "Tier 1 · Growth-Stage Business", body: "Chennai urban. KVB, Central Bank, ICICI. Unsecured working capital, machinery finance for growing businesses." },
        { title: "Industrial · SIPCOT Manufacturer", body: "Gummidipoondi / Sriperumbudur. KVB, Canara. Structured for small manufacturers with a real order book." },
        { title: "Peri-urban · Informal Small Business", body: "AP Chambers / rural agglomerations. Property-backed SME credit for businesses outside GST reach." },
      ],
      lenders: ["Karur Vysya Bank", "ICICI Bank", "Central Bank of India", "Canara Bank", "SBI", "Prayaan Capital", "Aye Finance", "Lendingkart"],
    },
    {
      slug: "lap",
      code: "CP-02",
      tag: "Product · LAP",
      icon: "LAP",
      accentBg: "#F58220",
      accentFg: "#FFFFFF",
      name: "Loan Against Property",
      desc: "Unlock capital from commercial or residential property you already own — for business expansion, consolidation, or working capital.",
      rate: "10.00%+",
      tenure: "up to 15y",
      ticket: "₹15L – ₹2Cr",
      fit: [
        { title: "Tier 1 · Property-Backed SME", body: "Chennai. Tata Capital, Bajaj, IOB. Deploy dormant equity in commercial property to fund growth." },
        { title: "Peri-urban · Asset-Rich Small Business", body: "Andhra / Nellore. Repco, Muthoot. Property-backed SME credit for businesses that pre-date GST records." },
        { title: "Balance transfer", body: "Refinance existing LAP with lender partners for lower rates or better terms." },
      ],
      lenders: ["Tata Capital", "Bajaj Housing", "Indian Overseas Bank", "Piramal Finance", "Repco Home Finance", "Muthoot Finance"],
    },
    {
      slug: "home-loan",
      code: "CP-01",
      tag: "Product · Home Loan",
      icon: "HL",
      accentBg: "#16264D",
      accentFg: "#FFFFFF",
      name: "Home Loans",
      desc: "From the salaried professional buying a first flat in Chennai to the peri-urban aspirant financing a first home in Nellore.",
      rate: "8.50%+",
      tenure: "up to 30y",
      ticket: "₹8L – ₹3Cr",
      fit: [
        { title: "Tier 1 · Salaried Professional", body: "Chennai core. HDFC, ICICI, SBI, Bajaj — tickets ₹50L–₹3Cr, competitive rates." },
        { title: "Tier 2 · Aspirant First Buyer", body: "Nellore / North Chennai. Canara, Repco, HomeFirst — tickets ₹15–50L, first-time buyer support." },
        { title: "Peri-urban · Informal Income", body: "South Andhra cluster. Repco, Muthoot, HomeFirst — files that need judgment, not templates." },
      ],
      lenders: ["HDFC Bank", "ICICI Bank", "SBI", "Indian Overseas Bank", "Bajaj Housing", "Canara Bank", "Repco Home Finance", "HomeFirst Finance", "Piramal Finance"],
    },
  ],
  process: [
    { n: "01", name: "Lead first contact after enquiry", tat: "< 2 hours", owner: "Monica / on-duty RM · Zoho CRM" },
    { n: "02", name: "Document collection from customer", tat: "< 48 hours", owner: "Responsible RM · Zoho checklist" },
    { n: "03", name: "Lender matching & recommendation", tat: "< 24 hrs of docs", owner: "Matching Engine · Harish weekly review" },
    { n: "04", name: "Capitabel Loan Offer issued", tat: "< 48 hrs total", owner: "Harish · Offer Honour Rate tracked" },
    { n: "05", name: "File submission to lender", tat: "< 3 working days", owner: "Credit & Ops Exec" },
    { n: "06", name: "Sanction — lender TAT", tat: "5–10 working days", owner: "Devesh escalates if exceeded" },
    { n: "07", name: "Disbursement after sanction", tat: "< 7 working days", owner: "Devesh / Harish · Zoho log" },
  ],
};

// ------------------------------------------------------------------------
// Contact
// ------------------------------------------------------------------------
export const contact = {
  clusters: [
    { name: "Chennai", rm: "Harish Bode · Co-Founder", tag: "HQ" },
    { name: "Nellore", rm: "Mutu · ASM Andhra", tag: "Tier 2" },
    { name: "South Andhra", rm: "Nagindra · RM Sullurpet", tag: "Cluster" },
    { name: "North Chennai", rm: "RM · SIPCOT industrial", tag: "Industrial" },
  ],
  next: [
    {
      n: "01",
      when: "Within 2 hours",
      title: "We call you back",
      body: "A lending specialist reaches out on WhatsApp or by phone — whichever you prefer — for a 20-minute conversation.",
    },
    {
      n: "02",
      when: "24–48 hours",
      title: "You send us your file",
      body: "A tailored checklist over WhatsApp. We collect only what your file needs, not a generic list — usually 6–8 documents.",
    },
    {
      n: "03",
      when: "Within 48 hours of docs",
      title: "Capitabel Loan Offer",
      body: "An in-principle indicative offer with rate range, processing fee, tenure, and KFS terms — backed by our matching engine.",
    },
  ],
  loanProducts: ["Home Loan", "Loan Against Property", "MSME · Business Loan", "Construction / Project Finance", "Not sure yet"],
  ticketSizes: ["Under ₹25 L", "₹25 L – ₹1 Cr", "₹1 Cr – ₹3 Cr", "Above ₹3 Cr"],
  clusterOptions: ["Chennai", "Nellore", "South Andhra (Tirupati / Gudur / Renigunta)", "North Chennai / SIPCOT", "Elsewhere in South India"],
  callTimes: ["Morning (9–12)", "Afternoon (12–3)", "Evening (3–7)", "Any time"],
};
