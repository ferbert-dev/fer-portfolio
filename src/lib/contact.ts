'use server';

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  size: string;
  topics: string[];
  message: string;
  website: string; // honeypot: real visitors leave it empty
};

export type ContactResult = { ok: true } | { ok: false; reason: 'invalid' | 'unconfigured' | 'failed' };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sends the contact form by email through Resend when RESEND_API_KEY and
 * CONTACT_TO are set (CONTACT_FROM optional). Without them it reports
 * "unconfigured" and the form opens the visitor's mail app instead, so no
 * enquiry is lost.
 */
export async function sendContact(input: ContactInput): Promise<ContactResult> {
  if (input.website) return { ok: true };
  const name = input.name.trim().slice(0, 200);
  const email = input.email.trim().slice(0, 200);
  const message = input.message.trim().slice(0, 5000);
  if (!name || !EMAIL.test(email) || !message) return { ok: false, reason: 'invalid' };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return { ok: false, reason: 'unconfigured' };

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${input.company.trim().slice(0, 200) || '-'}`,
    `Team size: ${input.size.slice(0, 20)}`,
    `Topics: ${input.topics.slice(0, 10).join(', ') || '-'}`,
    '',
    message,
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? 'Ferbert website <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `Website enquiry from ${name}`,
        text,
      }),
    });
    return res.ok ? { ok: true } : { ok: false, reason: 'failed' };
  } catch {
    return { ok: false, reason: 'failed' };
  }
}
