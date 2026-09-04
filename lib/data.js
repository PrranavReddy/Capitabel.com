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
  { href: "/about", label: "About us" },
  { href: "/loans", label: "Loan products" },
  { href: "/calculators", label: "Calculators" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

// ------------------------------------------------------------------------
// Calculators
// ------------------------------------------------------------------------
export const calculators = [
  {
    slug: "emi-calculator",
    title: "EMI Calculator",
    tag: "General",
    desc: "Work out the EMI, interest, and full amortisation schedule for any term loan, whether immediate repayment or with a construction moratorium, with staged disbursement.",
    sample: "₹50,00,000",
  },
  {
    slug: "income-eligibility",
    title: "Income Eligibility Calculator",
    tag: "Eligibility",
    desc: "The inverse of an EMI calculator: see how much loan you're eligible for based on your income, existing obligations, and FOIR.",
    sample: "₹1,00,000",
  },
  {
    slug: "balance-transfer",
    title: "Balance Transfer Simulator",
    tag: "Refinance",
    desc: "Compare staying with your current lender against switching, net of processing fees, foreclosure charges, and other switching costs.",
    sample: "₹40,00,000",
  },
  {
    slug: "max-savings",
    title: "Max Savings Calculator",
    tag: "Overdraft-linked",
    desc: "Model an overdraft-linked home loan: see how parking surplus funds suppresses interest and closes the loan early.",
    sample: "₹50,00,000",
  },
  {
    slug: "prepayment-simulator",
    title: "Prepayment Simulator",
    tag: "Prepayment",
    desc: "See how a one-time lump sum or recurring extra payment cuts your interest and shortens your tenure, with an optional step-up over time.",
    sample: "₹50,00,000",
  },
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
      tagBg: "rgba(245,240,228,0.15)",
      tagFg: "#FFFFFF",
      name: "MSME Business Loans",
      desc: "",
      bullets: ["Secured & Unsecured Term Loans", "Working Capital - OD / CC / LC", "Tenure up to 15 years"],
      ticket: "₹10 L onwards",
    },
    {
      code: "CP-02",
      tag: "LAP",
      tagBg: "rgba(245,240,228,0.15)",
      tagFg: "#FFFFFF",
      name: "Loan Against Property",
      desc: "",
      bullets: ["Property backed credit", "Personal and Business use", "Tenure up to 15 years"],
      ticket: "₹25 L onwards",
    },
    {
      code: "CP-01",
      tag: "Home Loan",
      tagBg: "rgba(245,240,228,0.15)",
      tagFg: "#FFFFFF",
      name: "Home Loans",
      desc: "",
      bullets: ["Plot & Property [Purchase / Construction]", "Balance Transfers", "Tenure up to 30 years"],
      ticket: "₹25 L onwards",
    },
  ],
  steps: [
    {
      n: "01",
      title: "Business profiling",
      body: "We analyse your company's cash flow, understand the growth plan and get you access to the funds you need.",
    },
    {
      n: "02",
      title: "Human context",
      body: "We understand your business's context behind the numbers.",
    },
    {
      n: "03",
      title: "AI matching engine",
      body: "Our AI engine helps you find the best fit from 40+ lenders.",
    },
    {
      n: "04",
      title: "Offer + fulfilment",
      body: "You choose, we fulfil your loan requirements.",
    },
  ],
  engineFacts: [
    { val: "40+", label: "Banks & NBFCs in our lender network" },
    { val: "20+", label: "Criteria evaluated to get you the best lender fitment" },
    { val: "100+ cr", label: "Disbursed, over the past 2 years" },
    { val: "90%+", label: "Success rate in fulfilling your needs" },
  ],
  // PLACEHOLDER — layout preview only. Replace with the curated client
  // stories before this ships; keep the same shape (name/role/quote/
  // product/ticket/outcome/initial) so the section doesn't need edits.
  borrowedBetter: [
    {
      name: "Rajesh Kumar",
      role: "Textile manufacturer, Chennai",
      initial: "R",
      quote: "Sanction in nine days on an MSME file two banks had already turned down. Harish’s team knew exactly which lender would say yes.",
      product: "MSME Business Loan",
      ticket: "₹45L",
      outcome: "Sanctioned in 9 days",
    },
    {
      name: "Anitha Reddy",
      role: "Developer, Chennai",
      initial: "A",
      quote: "Draw-schedule financing that actually matched our site milestones. First team that got it.",
      product: "LAP · Construction-linked",
      ticket: "₹1.2 Cr",
      outcome: "Matched to site milestones",
    },
    {
      name: "Vikram Iyer",
      role: "Homeowner, Besantnagar",
      initial: "V",
      quote: "Refinanced our home loan and dropped the rate by 1.4%. Honest advice, no fuss.",
      product: "Home Loan · Balance transfer",
      ticket: "₹68L",
      outcome: "Rate cut by 1.4%",
    },
    {
      name: "Priya Sundaram",
      role: "MSME owner, Nellore",
      initial: "P",
      quote: "Needed working capital fast during peak season. Filed on a Monday, had the offer by Thursday, no back-and-forth on paperwork.",
      product: "MSME · Working Capital",
      ticket: "₹18L",
      outcome: "Approved in a week",
    },
    {
      name: "Karthik Balan",
      role: "First-time homebuyer, Sullurpet",
      initial: "K",
      quote: "First loan I’d ever applied for. They walked me through every clause instead of just handing me a sanction letter to sign.",
      product: "Home Loan · Plot purchase",
      ticket: "₹32L",
      outcome: "First-time buyer, no surprises",
    },
  ],
  faqs: [
    {
      q: "What is a Capitabel Loan Offer?",
      a: [
        "Principle indicative offer issued by us — not the lender — within 48 hours of a complete file.",
        "Specifies: Interest Range, Tenure, Sanctionable limit.",
        "Our Offer Honour Rate — the share of offers that result in a lender sanction on materially similar terms — sits at 91%.",
      ],
    },
    {
      q: "Do you charge borrowers a fee?",
      a: [
        "We quote a fixed transparent fee upfront.",
        "Payable only on successful disbursement.",
      ],
    },
    {
      q: "How do you decide which lender to recommend?",
      a: [
        {
          text: "By borrower fitment first — approval probability, indicative rate, processing fee, sanction TAT, and KFS terms — not by which lender pays us best.",
          highlight: "not by which lender pays us best",
        },
      ],
    },
    {
      q: "Can you help if I’ve been rejected before?",
      a: [
        "Often, yes — a rejection is usually a mismatch between your file and one lender’s policy, not a verdict on your creditworthiness.",
        "We’ll review, address gaps, and route you to lenders who fit.",
        "Our 94% approval rate on files we take on reflects exactly this filter.",
      ],
    },
    {
      q: "Can you get me a better loan offer than my current banker?",
      a: [
        "Most often, yes.",
        "We find you the best deal possible, not just the one your current banker is working on.",
      ],
    },
  ],
};

// ------------------------------------------------------------------------
// About
// ------------------------------------------------------------------------
export const about = {
  stats: [
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
      imgPosition: "center top",
      role: "Co-Founder",
      name: "Chidambaram Kattuputur",
      bio: "Operator-investor at the intersection of real estate and fintech. 15+ years building affordable, luxury, and impact housing across South India. Internationally awarded for work in low income housing. Masters in International Business, Grenoble Business School.",
      base: "Chennai",
      linkedin: "https://www.linkedin.com/in/chidambaramkp/",
    },
    {
      img: "/images/harish-bode.png",
      role: "Co-Founder & MD",
      name: "Harish Bode",
      bio: "18+ years across ING Netherlands, Capgemini, and Cognizant. At ING: Head of IT Custodian for a €60 Bn loan portfolio. Led Strategic Roadmap for Digital Business Lending. MBA, University of Amsterdam.",
      base: "Chennai",
      linkedin: "https://www.linkedin.com/in/harish-bode/",
    },
    {
      img: "/images/devesh-narang.png",
      role: "Founding Member · Partnerships",
      name: "Devesh Narang",
      bio: "Strategy and partnerships generalist with Capitabel since founding. Closed 15+ bank and NBFC partnerships, cut loan processing TAT by 54%. Won SDG 10 at ESG World Summit & GRIT Awards 2022. Bachelor of Commerce, Loyola College.",
      base: "Chennai",
      linkedin: "https://www.linkedin.com/in/deveshnarang/",
    },
    {
      img: "/images/thiru-r.png",
      role: "Strategic Advisor",
      name: "Thirunavukkarasu (Thiru.R)",
      bio: "25 years of experience building and scaling financial services institutions. Expertise in business strategy, credit, operations and digital transformation, with a focus on developing scalable models for MSMEs. Experience spans India, Indonesia and Kenya across fintechs and allied industries. Graduated from Harvard Business School and Santa Clara University.",
      base: "Bengaluru",
      linkedin: "https://www.linkedin.com/in/thirufintech/",
    },
  ],
  opsTeam: [
    { name: "Prranav Reddy M.", role: "Consultant [Partnerships and GTM]", loc: "Chennai" },
    { name: "Ponmurugan V.", role: "Sales Manager", loc: "Chennai [South & West]" },
    { name: "Balaji B.", role: "Sales Manager", loc: "Chennai [Chennai Central & North]" },
    { name: "Singamsetty Muthu", role: "Area Sales Manager", loc: "Nellore" },
    { name: "Chembati Narendra", role: "Business Development Executive", loc: "Sullurpet - Naidupet" },
    { name: "Vishnu B.", role: "Business Development Executive", loc: "Chennai" },
    { name: "Mounika K.", role: "Customer Success Manager", loc: "Chennai" },
    { name: "Sandhya V.", role: "Operations Manager", loc: "Chennai" },
    { name: "Ravi V.", role: "Accounts and Admin", loc: "Chennai" },
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
      title: "Striving for the Perfect borrower-lender fitment.",
      body: "All our people and processes are focused on finding you the best suited loans for your current needs.",
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
      body: "A lending specialist reaches out on WhatsApp or by phone — whichever you prefer — for a 10-minute conversation.",
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

// ------------------------------------------------------------------------
// Legal — DRAFT content, not legally reviewed. See components/LegalPage.js
// for the draft-notice banner. Every page here must go through counsel
// before the banner is removed and this is treated as final/binding.
// ------------------------------------------------------------------------
export const legal = {
  privacy: {
    title: "Privacy Policy",
    draftDate: "3 September 2026",
    sections: [
      {
        heading: "1. Who this policy covers",
        body: [
          "This Privacy Policy explains how Capitabel Solutions Pvt Ltd (“Capitabel”, “we”, “us”, “our”) collects, uses, shares, and protects personal information when you visit capitabel.com, submit an enquiry through our contact form, message us on WhatsApp, or speak with our team by phone.",
        ],
      },
      {
        heading: "2. Information we collect",
        body: [
          "Information you give us directly — for example your name, phone number, email address, city/cluster, the loan product you're enquiring about, ticket size, and any financial details (such as income, existing obligations, or property information) you choose to share on a call, over WhatsApp, or through the contact form.",
          "Information collected automatically — standard technical information such as IP address, browser type, device type, and pages visited, if and when analytics or similar tools are enabled on the site.",
          "Information from lenders — if a bank or NBFC in our panel shares status updates on a file you've been referred for (e.g. an offer, a query, a sanction), we may receive and use that information to keep you updated.",
        ],
      },
      {
        heading: "3. How we use your information",
        body: [
          "To understand your loan requirement and match you with a suitable lender from our panel.",
          "To contact you about your enquiry — by phone, WhatsApp, or email.",
          "To prepare a Capitabel Loan Offer and coordinate with the shortlisted lender(s) on your behalf.",
          "To improve our services, and to meet applicable legal or regulatory requirements.",
          "For marketing communications only where you have consented, and you may opt out at any time.",
        ],
      },
      {
        heading: "4. Sharing with lenders and service providers",
        body: [
          "Matching you with a lender is the core of what we do, so your relevant details are shared with one or more banks/NBFCs in our panel for the purpose of obtaining an indicative offer or sanction. Once a lender receives your file for its own assessment, that lender independently determines how it collects, verifies, and processes your information (including KYC) under its own policies.",
          "We may also share information with service providers who support our operations (for example, communications, hosting, or CRM tools), under obligations to keep it confidential and secure.",
          "We do not sell your personal information.",
        ],
      },
      {
        heading: "5. Data retention",
        body: [
          "We retain personal information for as long as reasonably necessary to fulfil the purposes described in this policy, or as required by applicable law, after which it is deleted or anonymised. [Exact retention periods per data category to be confirmed with counsel/compliance.]",
        ],
      },
      {
        heading: "6. Your rights",
        body: [
          "Subject to applicable law (including the Digital Personal Data Protection Act, 2023), you may have the right to access, correct, or request erasure of your personal information, to withdraw consent, to nominate another individual to exercise your rights in the event of death or incapacity, and to raise a grievance. To exercise any of these rights, write to us at the contact details in Section 10.",
        ],
      },
      {
        heading: "7. Data security",
        body: [
          "We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, or misuse. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "8. Cookies and similar technologies",
        body: [
          "If and when cookies, pixels, or similar technologies are used on this site (for example, for analytics), this section will describe what they do and how you can control them. [To be confirmed once the site's actual analytics/tracking setup is finalised.]",
        ],
      },
      {
        heading: "9. Children's privacy",
        body: [
          "Our services are intended for individuals who are at least 18 years old. We do not knowingly collect personal information from minors.",
        ],
      },
      {
        heading: "10. Grievance officer & contact",
        body: [
          "For any privacy-related questions, requests, or grievances, contact us at hello@capitabel.com or +91 99405 48583. [Name and designation of the Grievance Officer to be added once appointed, as applicable under Indian law.]",
          "Registered office: Capitabel Solutions Pvt Ltd, #E162/5, Tiger Varadachar Road, 1st Cross Kalakshetra, Besantnagar, Chennai, Tamil Nadu 600090.",
        ],
      },
      {
        heading: "11. Changes to this policy",
        body: [
          "We may update this Privacy Policy from time to time. Material changes will be reflected by updating the date on this page.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    draftDate: "3 September 2026",
    sections: [
      {
        heading: "1. Acceptance of these terms",
        body: [
          "By accessing or using capitabel.com, or by engaging with Capitabel Solutions Pvt Ltd (“Capitabel”, “we”, “us”, “our”) through phone, WhatsApp, or our contact form, you agree to these Terms of Use. If you do not agree, please do not use this website or our services.",
        ],
      },
      {
        heading: "2. About Capitabel",
        body: [
          "Capitabel is a growth-capital advisory and fulfilment business. We are not a bank, NBFC, or lending institution — we do not ourselves sanction, disburse, or hold loan funds. We help borrowers navigate a panel of banks and NBFCs and facilitate the loan process on their behalf.",
        ],
      },
      {
        heading: "3. Eligibility",
        body: [
          "You must be at least 18 years old and legally capable of entering into binding obligations to use our services. You agree to provide accurate, current, and complete information when engaging with us.",
        ],
      },
      {
        heading: "4. Nature of our services",
        body: [
          "A “Capitabel Loan Offer” is an in-principle, indicative offer issued by us — not by the lender — typically within 48 hours of a complete file. It reflects our matching engine's assessment and is not a loan sanction. The lending institution independently determines final approval, interest rate, tenure, fees, and all other terms, based on its own underwriting, KYC, and credit policy.",
          "Any statistics we publish about our offers (such as an Offer Honour Rate) describe historical outcomes over a stated period and are not a guarantee of any individual outcome.",
        ],
      },
      {
        heading: "5. Fees",
        body: [
          "For most retail loans, we do not charge borrowers a fee — we are paid by the lender upon successful disbursement. For complex project finance or specialised advisory, we quote a transparent flat fee upfront. We do not charge a percentage of your loan amount, and we do not charge hidden fees.",
        ],
      },
      {
        heading: "6. Your obligations",
        body: [
          "You agree to provide accurate and complete information, not to use our website or services for any fraudulent or unlawful purpose, and not to misrepresent your identity or financial situation.",
        ],
      },
      {
        heading: "7. Intellectual property",
        body: [
          "The Capitabel name, logo, website design, and content are the property of Capitabel Solutions Pvt Ltd and may not be copied, reproduced, or used without our written permission.",
        ],
      },
      {
        heading: "8. Third-party lenders and links",
        body: [
          "Once you are referred to or engage directly with a bank or NBFC, that institution's own terms, privacy policy, and processes apply to that relationship. We are not responsible for the acts, omissions, or terms of any third-party lender.",
        ],
      },
      {
        heading: "9. No guarantee; limitation of liability",
        body: [
          "We do not guarantee that any loan application will be approved, or that any indicative terms will be the final terms offered by a lender. To the maximum extent permitted by law, Capitabel is not liable for any loss arising from a lender's decision, delay, or change in terms, or from your reliance on indicative information provided by us.",
        ],
      },
      {
        heading: "10. Governing law & jurisdiction",
        body: [
          "These terms are governed by the laws of India. Courts in Chennai, Tamil Nadu shall have exclusive jurisdiction over any dispute arising from these terms or your use of our services.",
        ],
      },
      {
        heading: "11. Changes to these terms",
        body: [
          "We may update these Terms of Use from time to time. Continued use of our website or services after an update constitutes acceptance of the revised terms.",
        ],
      },
      {
        heading: "12. Contact",
        body: ["Questions about these terms can be sent to hello@capitabel.com or +91 99405 48583."],
      },
    ],
  },
  disclosures: {
    title: "Disclosures",
    draftDate: "3 September 2026",
    sections: [
      {
        heading: "1. Nature of our business",
        body: [
          "Capitabel Solutions Pvt Ltd is a loan referral and advisory intermediary. We are not a bank, NBFC, or lending institution, and we do not sanction, disburse, or hold loan funds at any point in the process.",
        ],
      },
      {
        heading: "2. Our lender panel",
        body: [
          "We work with a network of 40+ banks and NBFCs, all RBI-regulated institutions. A rationalised core panel is drawn from this wider network for most files.",
        ],
      },
      {
        heading: "3. How we are compensated",
        body: [
          "For most retail loans, we are not paid by the borrower — we are paid by the lender upon successful disbursement. For complex project finance or specialised advisory, we quote a transparent flat fee upfront. We never charge a percentage of your loan amount, and we never charge a hidden fee.",
        ],
      },
      {
        heading: "4. How we choose which lender to recommend",
        body: [
          "We match by borrower fit first — approval probability, indicative interest rate, processing fee, sanction turnaround time, and Key Fact Statement (KFS) terms — not by which lender pays us the most. Where a direct lender relationship and a channel partner offer the same file on comparable terms, we default to the direct relationship.",
        ],
      },
      {
        heading: "5. What a “Capitabel Loan Offer” is — and isn't",
        body: [
          "A Capitabel Loan Offer is an in-principle, indicative offer prepared by us, not by the lender. It is not a loan sanction and does not bind any lender. Actual approval, interest rate, tenure, fees, and all other terms are determined solely by the lending institution, based on its own underwriting and KYC process, and may differ from the indicative offer.",
          "Where we publish a historical conversion figure (an “Offer Honour Rate”), it describes outcomes across a stated group of past offers and is not a guarantee for any individual application. [Exact measurement period and methodology to be confirmed and stated here once finalised.]",
        ],
      },
      {
        heading: "6. No guarantee of approval",
        body: [
          "We do not guarantee that any application will be approved by a lender, or that indicative terms will match the lender's final offer.",
        ],
      },
      {
        heading: "7. Grievance redressal",
        body: [
          "If you have a complaint about our services, write to us at hello@capitabel.com or call +91 99405 48583. [Escalation matrix / turnaround-time commitment to be added once defined.]",
        ],
      },
      {
        heading: "8. Regulatory compliance",
        body: [
          "Capitabel aims to comply with applicable regulatory requirements relevant to loan-sourcing intermediaries in India. [This section should be reviewed and completed with specific, correct regulatory references by legal/compliance counsel — we have deliberately not cited specific RBI circulars or directions here without that review.]",
        ],
      },
      {
        heading: "9. Updates to this disclosure",
        body: [
          "We may update this page from time to time to keep it accurate. Material changes will be reflected by updating the date on this page.",
        ],
      },
    ],
  },
};

// ------------------------------------------------------------------------
// Journal
// ------------------------------------------------------------------------
// TEMPORARY: these 3 posts are a stopgap so /journal has real content
// while the founders are away and before the SEO/AEO agency starts proper
// content + internal-linking work. Each paragraph is either a plain string
// or an array of parts (string | { text, href }) so inline internal links
// render as real <Link>s — see components/JournalArticle.js.
export const journal = {
  posts: [
    {
      slug: "rbi-nbfc-revolving-credit-draft",
      tag: "regulatory watch",
      cat: "Rates",
      read: "6 min read",
      date: "3 September 2026",
      title: "RBI's draft curb on NBFC revolving credit: what it means if you're borrowing from one",
      excerpt:
        "RBI has proposed restricting NBFCs to term loans only, barring revolving credit products like flexi loans and overdraft-style facilities. It's still a draft, and here's what's actually in it.",
      sections: [
        {
          heading: "What RBI actually proposed",
          body: [
            "On 6 August 2026, the RBI released a draft circular proposing that NBFCs be permitted to offer only credit products in the nature of a term loan, and barred from offering revolving credit products. Under the draft, revolving credit is defined broadly: any fund-based credit facility that doesn't meet the definition of a term loan. A term loan, by contrast, can be disbursed in one or more tranches, but has to follow a fixed repayment schedule; once repaid, the limit can't be redrawn or reused.",
            "The draft carries one notable exception: NBFCs specifically authorised by RBI to issue credit cards (currently SBI Cards and BobCard) would be exempt.",
            [
              "The proposal takes the form of draft amendments to RBI's Credit Facilities Directions, 2026 (itself built on directions first issued in November 2025). Comments closed on 28 August 2026, and as of the date of this post it remains a ",
              { text: "draft, not yet a final circular", href: "https://knnindia.co.in/news/newsdetails/sectors/rbi-proposes-restricting-nbfcs-to-term-loans-bars-revolving-credit" },
              ". We'll update this post once RBI issues its final direction.",
            ],
          ],
        },
        {
          heading: "Why RBI is doing this",
          body: [
            "The stated concern is around high-risk revolving products (flexi loans, overdraft-style facilities, digital credit lines) where a borrower can keep drawing against a limit indefinitely. RBI's worry is that some borrowers end up using fresh revolving credit to service existing dues, effectively rolling debt forward rather than repaying it.",
          ],
        },
        {
          heading: "Who this would actually affect",
          body: [
            "If finalised as drafted, this reaches further than consumer credit lines. Industry body FIDC (Finance Industry Development Council) has flagged that a blanket ban could disrupt working-capital products MSMEs rely on, including overdraft-style facilities and loans against securities, not just the higher-risk retail flexi products the rule seems aimed at.",
            [
              "That matters directly for the ",
              { text: "MSME owners", href: "/loans#msme" },
              " we work with: working capital (OD/CC/LC) is one of the more common structures on MSME files, precisely because it's built for a business's cash-flow cycle rather than a fixed monthly outflow. A shift to term-loan-only structures would change how that working capital gets sized and repaid.",
            ],
          ],
        },
        {
          heading: "What to do if this applies to you",
          body: [
            "If you currently hold, or are being offered, a flexi loan, overdraft, or digital credit line from an NBFC, it's worth understanding now whether it would be classified as revolving credit under the draft definition, and what restructuring into a term loan would actually mean for your repayment schedule and cash flow.",
            [
              "This is exactly the kind of fine print we walk clients through before they sign anything, not after. If you want a second read on a facility you're already holding or being offered, ",
              { text: "book a call", href: "/contact" },
              " and we'll go through it with you.",
            ],
          ],
        },
      ],
    },
    {
      slug: "msme-loan-rate-information-asymmetry",
      tag: "rate transparency",
      cat: "MSME",
      read: "5 min read",
      date: "3 September 2026",
      title: "Why two MSME owners with the same file get quoted completely different rates",
      excerpt:
        "The same business, the same financials, two lenders, and two rate quotes that aren't even comparable, let alone equal. Here's why that happens and how to actually compare offers.",
      sections: [
        {
          heading: "The same file, two different quotes",
          body: [
            "Take an identical MSME file to two lenders and you'll rarely get two comparable numbers back. One quotes a headline interest rate. Another quotes the same headline rate but adds a processing fee that isn't mentioned until the sanction letter. A third prices off a benchmark you weren't told about, reset on a schedule buried in the fine print. None of them are lying, but none of them are handing you a number you can actually put side by side with the others either.",
          ],
        },
        {
          heading: "Why this happens",
          body: [
            "MSME lending is still relationship- and negotiation-driven in a way retail lending isn't. Pricing often reflects a relationship manager's read of the file (sector, banking relationship, how the numbers are presented) more than a published rate card. There's no MSME-lending equivalent of comparing flight prices on one screen; each quote takes a fresh application, a fresh set of documents, and a fresh hit to your credit enquiry history.",
            [
              "The Key Fact Statement (KFS), the standardised disclosure lenders are required to give you, is meant to fix part of this by forcing every lender to state the all-in annualised cost, not just the headline rate. It helps, but it only shows up once you already have an offer in hand. See how ",
              { text: "our own Capitabel Loan Offer works", href: "/#faq" },
              ", which is exactly the point in the process where borrowers are least inclined to walk away and start over with someone else.",
            ],
          ],
        },
        {
          heading: "What actually closes the gap",
          body: [
            [
              "The real fix is seeing multiple lenders' terms side by side before you commit to a single application, not after. That's the entire premise behind ",
              { text: "how we work across our lender panel", href: "/loans" },
              ": we score a file on approval probability, indicative rate, processing fee, and KFS terms before recommending anyone, not by who pays us the most for the referral.",
            ],
          ],
        },
        {
          heading: "What to ask every lender, before you apply",
          body: [
            "A short checklist worth running through with anyone quoting you a rate: what's the processing fee as a percentage, not just a flat number; are there prepayment or foreclosure charges; what triggers a rate reset and how often; and will they put the KFS in writing before you submit documents, not after.",
            [
              "If you want to see how a quoted rate actually plays out over your loan's life, including how a small rate difference compounds over a longer tenure, run it through our ",
              { text: "EMI calculator", href: "/calculators/emi-calculator" },
              " before you sign anything.",
            ],
          ],
        },
        {
          heading: "One more thing worth knowing",
          body: [
            [
              "If any part of your working capital is structured as an overdraft or flexi facility with an NBFC, it's also worth reading our note on ",
              { text: "RBI's draft curb on NBFC revolving credit", href: "/journal/rbi-nbfc-revolving-credit-draft" },
              ". It could change how that facility is priced and repaid.",
            ],
          ],
        },
      ],
    },
    {
      slug: "home-loan-insurance-bundling-transparency",
      tag: "borrower rights",
      cat: "Home Loans",
      read: "5 min read",
      date: "3 September 2026",
      title: "The insurance quietly bundled into your home loan: what it's actually costing you",
      excerpt:
        "Insurance sold alongside a home loan is often framed as part of the process rather than a genuine choice, and sometimes financed into the loan principal, where you pay interest on it for decades.",
      sections: [
        {
          heading: "The pattern",
          body: [
            "It's common for a home loan sanction to arrive with an insurance policy attached, often a single-premium policy, and often financed straight into the loan principal rather than paid separately. Framed at the sanction stage as simply part of the paperwork, it's easy to sign off on without registering that it was ever a choice at all.",
          ],
        },
        {
          heading: "Why it happens",
          body: [
            "Insurance sold alongside a loan generates a commission for whoever sells it, and bundling it in at sanction stage, when a borrower is focused on getting the loan closed rather than scrutinising every line of the KFS, makes it far more likely to go through unquestioned than if it were offered as a separate, optional purchase.",
          ],
        },
        {
          heading: "What you're entitled to ask",
          body: [
            "Insurance sold with a loan is meant to be the borrower's choice, not a condition of approval. Before you sign anything, it's worth asking directly: is this insurance mandatory for the loan to be sanctioned; can I decline it or buy an equivalent policy independently, potentially at a lower premium; and exactly how is it being paid: deducted upfront, or added to the loan principal and repaid with interest over the full tenure.",
          ],
        },
        {
          heading: "Why the financing structure matters more than the premium",
          body: [
            [
              "A single-premium policy added to your loan principal doesn't just cost you the premium. It costs you the premium plus interest on that premium for however long is left on your tenure. On a 20-year home loan, a premium added in year one can end up costing meaningfully more than its sticker price by the time it's actually repaid. Run the numbers on our ",
              { text: "EMI calculator", href: "/calculators/emi-calculator" },
              " with and without the add-on to see the difference for your own loan amount and tenure.",
            ],
          ],
        },
        {
          heading: "Where we stand on this",
          body: [
            [
              "We'd rather you leave a meeting with fewer questions than you brought in, not more of them. If you're currently being offered a home loan with insurance attached and want a second opinion on whether it's structured fairly, ",
              { text: "book a call", href: "/contact" },
              " and we'll go through the sanction letter with you, line by line.",
            ],
          ],
        },
      ],
    },
  ],
};
