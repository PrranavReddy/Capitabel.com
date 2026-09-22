// Forwards the on-site consultation form to a Power Automate flow (trigger:
// "When an HTTP request is received"), which writes the entry into Excel /
// SharePoint and emails a notification. Kept server-side so the flow's URL
// (a bearer-token-bearing SAS link) never reaches the browser bundle.
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, phone } = data || {};
  if (!name?.trim() || !phone?.trim()) {
    return Response.json({ ok: false, error: "Name and phone are required." }, { status: 400 });
  }

  const webhookUrl = process.env.POWER_AUTOMATE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("POWER_AUTOMATE_WEBHOOK_URL is not set.");
    return Response.json({ ok: false, error: "Form is not configured yet." }, { status: 500 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("Failed to forward consultation request:", err);
    return Response.json({ ok: false, error: "Could not submit right now." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
