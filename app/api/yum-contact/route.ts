import { Resend } from "resend";

// Exclusive contact channel for the /yum proposal page specifically - goes
// straight to Nishant's own inbox, not the shared contact@market-reports.com
// queue, since this is a single high-value prospect page where a message
// warrants immediate personal attention rather than general triage.
const RECIPIENT_EMAIL = "nishant.ims@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || !message) {
    return Response.json({ error: "Name and message are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[yum-contact] RESEND_API_KEY is not set — cannot send message.");
    return Response.json({ error: "This form isn't configured yet. Please email us directly instead." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Quintessence Analytics <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      subject: `[Yum! Brands Proposal] New message from ${name}`,
      html: `
        <h2>New message on the Yum! Brands proposal page</h2>
        <p><strong>Source:</strong> QA.com/yum (exclusive contact box)</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("[yum-contact] Resend error:", error);
      return Response.json({ error: "Couldn't send your message. Please try again." }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[yum-contact] Unexpected error:", err);
    return Response.json({ error: "Couldn't send your message. Please try again." }, { status: 500 });
  }
}
