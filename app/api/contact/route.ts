import { Resend } from "resend";

const CONTACT_EMAIL = "contact@market-reports.com";

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
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const company = typeof payload.company === "string" ? payload.company.trim() : "";
  const interest = typeof payload.interest === "string" ? payload.interest.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || !email || !message) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — cannot send message.");
    return Response.json({ error: "The contact form isn't configured yet. Please email us directly instead." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Quintessence Analytics <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        ${interest ? `<p><strong>Interested in:</strong> ${escapeHtml(interest)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return Response.json({ error: "Couldn't send your message. Please try again or email us directly." }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return Response.json({ error: "Couldn't send your message. Please try again or email us directly." }, { status: 500 });
  }
}
