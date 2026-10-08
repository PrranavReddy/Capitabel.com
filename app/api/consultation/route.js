// Forwards the on-site consultation form to the Zoho CRM "Website Enquiries"
// web form. The hidden values below are the public form identifiers from
// Zoho's generated embed code (they sit in the HTML of any site using the
// form), not secrets, so they live in code rather than in env vars.
const ZOHO_FORM_URL = "https://crm.zoho.in/crm/WebForm";
const ZOHO_HIDDEN = {
  xnQsjsdp: "1f2e676d0f44fc7d366f5e787506286736f8bd7cbed6cbc3653ed135e08a8e14",
  xmIwtLD: "b54df7638164af3a0288d9e22b6c933a730368d4977363db45def05180bf153f46dddca74fca93276e875b660d50ad8a",
  actionType: "Q3VzdG9tTW9kdWxlNg==",
  returnURL: "https://www.capitabel.com/contact",
};
const SITE_ORIGIN = "https://www.capitabel.com";

// Website dropdown label -> the exact pick-list value saved in Zoho. Zoho
// drops values it doesn't recognise, so a label missing here is simply left
// blank in the pick list (it is still included in the notes below).
const PRODUCT = {
  "Home Loan": "Home Loans",
  "Loan Against Property": "Loan against Property",
  "MSME · Business Loan": "MSME Business Loan",
  "Construction / Project Finance": "Construction / Project Finance",
  "Not sure yet": "Not sure yet",
};
const TICKET = {
  "Under ₹25 L": "Under ₹25L",
  "₹25 L – ₹1 Cr": "₹25L - ₹1 Cr",
  "₹1 Cr – ₹3 Cr": "₹1 Cr - ₹3 Cr",
  "Above ₹3 Cr": "Above ₹3 Cr",
};
const CLUSTER = {
  Chennai: "Chennai",
  Nellore: "Nellore",
  "South Andhra (Tirupati / Gudur / Renigunta)": "South Andhra",
  "Elsewhere in South India": "Elsewhere in South India",
};
const CALL_TIME = {
  "Morning (9–12)": "Morning (9 - 12)",
  "Afternoon (12–3)": "Afternoon (12 - 3)",
  "Evening (3–7)": "Evening ( 3-7)",
  "Any time": "Anytime",
};

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = clean(data?.name, 120);
  const phone = clean(data?.phone, 30);
  if (!name || !phone) {
    return Response.json({ ok: false, error: "Name and phone are required." }, { status: 400 });
  }

  const email = clean(data?.email, 100);
  const loanProduct = clean(data?.loanProduct, 100);
  const ticketSize = clean(data?.ticketSize, 100);
  const cluster = clean(data?.cluster, 100);
  const callTime = clean(data?.callTime, 100);
  const message = clean(data?.message, 1200);

  const notes = [
    message || "No message.",
    "",
    "Form selections",
    `Loan product: ${loanProduct || "-"}`,
    `Ticket size: ${ticketSize || "-"}`,
    `Cluster: ${cluster || "-"}`,
    `Best time to call: ${callTime || "-"}`,
  ]
    .join("\n")
    .slice(0, 2000);

  const params = new URLSearchParams({ ...ZOHO_HIDDEN, zc_gad: "", aG9uZXlwb3Q: "" });
  params.set("NAME", name);
  params.set("COBJ6CF1", phone);
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) params.set("Email", email);
  if (PRODUCT[loanProduct]) params.set("COBJ6CF3", PRODUCT[loanProduct]);
  if (TICKET[ticketSize]) params.set("COBJ6CF4", TICKET[ticketSize]);
  if (CLUSTER[cluster]) params.set("COBJ6CF5", CLUSTER[cluster]);
  if (CALL_TIME[callTime]) params.set("COBJ6CF6", CALL_TIME[callTime]);
  params.set("COBJ6CF2", notes);

  try {
    const res = await fetch(ZOHO_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: SITE_ORIGIN,
        Referer: `${SITE_ORIGIN}/contact`,
      },
      body: params.toString(),
      redirect: "manual",
    });
    if (res.status < 200 || res.status >= 400) throw new Error(`Zoho responded ${res.status}`);
  } catch (err) {
    console.error("Failed to submit consultation request to Zoho:", err);
    return Response.json({ ok: false, error: "Could not submit right now." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
