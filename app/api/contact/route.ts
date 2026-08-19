import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const CONTACT_EMAIL = "contact@market-reports.com";
// Both QA.com and market-reports.com deliver contact-form submissions to
// this same inbox - with no site identifier, there was no way to tell
// which property a given enquiry actually came in on. Hardcoded per-repo
// (not derived from the request) since this route only ever serves
// quintessenceanalytics.com.
const SOURCE_SITE = "QA.com (quintessenceanalytics.com)";

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

  // Persist the lead BEFORE attempting email - previously a submission only
  // ever existed as a sent email, with zero durable record. If the Resend
  // send below fails entirely, this row is still the real, recoverable
  // record of the enquiry. Best-effort: a DB outage here degrades back to
  // the email-only behavior that already existed, rather than blocking the
  // submission on infrastructure that wasn't required before.
  let leadId: string | null = null;
  try {
    const { data, error: insertError } = await getSupabaseAdmin()
      .from("qa_leads")
      .insert({ name, email, company: company || null, interest: interest || null, message })
      .select("id")
      .single();
    if (insertError) {
      console.error("[contact] Failed to persist lead:", insertError);
    } else {
      leadId = data?.id ?? null;
    }
  } catch (err) {
    console.error("[contact] Unexpected error persisting lead:", err);
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
      subject: `[QA.com] New enquiry from ${name}${company ? ` (${company})` : ""}`,
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Source:</strong> ${SOURCE_SITE}</p>
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

    // Best-effort - the lead row already exists regardless of this call's
    // outcome, so a failure here never affects the response to the user.
    if (leadId) {
      const { error: notifyUpdateError } = await getSupabaseAdmin()
        .from("qa_leads")
        .update({ notified: true })
        .eq("id", leadId);
      if (notifyUpdateError) {
        console.error("[contact] Failed to mark lead as notified:", notifyUpdateError);
      }
    }

    // Confirmation receipt back to the submitter, on their own email address -
    // separate send from the internal notification above so a failure here
    // (bad inbox, spam rejection) never blocks the enquiry itself, which has
    // already succeeded by this point.
    const { error: confirmError } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Quintessence Analytics <onboarding@resend.dev>",
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: "We've received your enquiry — Quintessence Analytics",
      html: `
        <h2>Thanks for reaching out, ${escapeHtml(name)}</h2>
        <p>Your enquiry via ${SOURCE_SITE}${company ? ` on behalf of ${escapeHtml(company)}` : ""} has been sent to our team. An analyst will reply within one business day with next steps.</p>
        <p><strong>What you sent us:</strong></p>
        ${interest ? `<p><strong>Interested in:</strong> ${escapeHtml(interest)}</p>` : ""}
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        <p style="margin-top:24px;color:#666;font-size:13px;">If this wasn't you, or you have anything to add, just reply to this email.</p>
      `,
    });
    if (confirmError) {
      // Non-fatal - the enquiry itself already reached us successfully.
      console.error("[contact] Confirmation email to submitter failed:", confirmError);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return Response.json({ error: "Couldn't send your message. Please try again or email us directly." }, { status: 500 });
  }
}
