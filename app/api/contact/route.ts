import { z } from "zod";

import { profile } from "@/content/preet";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(5),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ ok: false, message: "Invalid contact form payload." }, { status: 400 });
  }

  const fallbackMailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${parsed.data.name}`)}&body=${encodeURIComponent(
    `${parsed.data.message}\n\nReply to: ${parsed.data.email}`,
  )}`;

  if (!process.env.RESEND_API_KEY) {
    return Response.json({
      ok: false,
      message: "Email service not configured. Opening your mail client instead.",
      fallbackMailto,
    });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Portfolio Contact <onboarding@resend.dev>",
      to: [profile.email],
      subject: `Portfolio inquiry from ${parsed.data.name}`,
      reply_to: parsed.data.email,
      text: parsed.data.message,
    }),
  });

  if (!response.ok) {
    return Response.json({ ok: false, message: "Failed to send email via Resend.", fallbackMailto }, { status: 500 });
  }

  return Response.json({ ok: true, message: "Message sent successfully." });
}
