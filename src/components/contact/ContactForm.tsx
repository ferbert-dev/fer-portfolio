'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import type { Dictionary } from '@/content';
import { site } from '@/content';
import { ArrowTile, SubmitButton } from '@/components/ui/Button';
import { Field, ToggleChip } from '@/components/ui/Controls';

type Props = { form: Dictionary['contact']['form']; sent: Dictionary['contact']['sent']; privacyHref: string };
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
type Values = { name: string; email: string; company: string; size: string; message: string };

/** Some mail apps cut longer mailto links; the message is shortened to stay under this. */
const MAX_MAILTO = 1800;

/**
 * Builds the email the visitor sends from their own mail app (decision 17):
 * the message, then one line per detail.
 */
function mailtoHref(form: Props['form'], v: Values, topics: string[]): string {
  const m = form.mail;
  const subject = `${m.subject} ${v.name || m.anonymous}${v.company ? `, ${v.company}` : ''}`;
  const details = [
    `${m.name}: ${v.name}`,
    `${m.email}: ${v.email}`,
    `${m.company}: ${v.company || m.none}`,
    `${m.size}: ${v.size}`,
    `${m.topics}: ${topics.join(', ') || m.none}`,
  ].join('\n');
  const build = (message: string) =>
    `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n${details}`)}`;
  let message = v.message;
  let href = build(message);
  while (href.length > MAX_MAILTO && message.length > 1) {
    message = `${message.slice(0, Math.max(0, message.length - Math.ceil((href.length - MAX_MAILTO) / 3) - 1)).trimEnd()}…`;
    href = build(message);
  }
  return href;
}

export function ContactForm({ form, sent, privacyHref }: Props) {
  const [on, setOn] = useState<boolean[]>(form.topicList.map((_, i) => i === 0));
  const [mailto, setMailto] = useState<string | null>(null);
  const [values, setValues] = useState<Values | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '');
    const input: Values = {
      name: get('name').trim(),
      email: get('email').trim(),
      company: get('company').trim(),
      size: get('size'),
      message: get('message').trim(),
    };
    const next: Errors = {};
    if (!input.name) next.name = form.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) next.email = form.errors.email;
    if (!input.message) next.message = form.errors.message;
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (e.currentTarget.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    const href = mailtoHref(form, input, form.topicList.filter((_, i) => on[i]));
    setValues(input);
    setMailto(href);
    window.location.href = href;
  };

  if (mailto) {
    return (
      <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: 20, minHeight: 520, justifyContent: 'center', alignItems: 'flex-start' }}>
        <span style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--acc)', color: 'var(--on-acc)', display: 'grid', placeItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h14v10H3z M3 5l7 6 7-6" /></svg>
        </span>
        <h2 className="md">{sent.title}</h2>
        <p className="sub" style={{ margin: 0, maxWidth: 460 }}>{sent.body}</p>
        <p className="sub" style={{ margin: 0, maxWidth: 460 }}>
          {sent.fallbackBefore} <a href={mailto} style={{ color: 'var(--tx)' }}>{sent.fallbackLink}</a> {sent.fallbackAfter}{' '}
          <a href={`mailto:${site.email}`} style={{ color: 'var(--tx)' }}>{site.email}</a>.
        </p>
        <button type="button" className="lnk mono" onClick={() => setMailto(null)} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer' }}>
          {sent.back}
          <ArrowTile />
        </button>
      </div>
    );
  }

  const aria = (k: keyof Errors) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-err` } : {});

  return (
    <form id="contact-form" onSubmit={submit} noValidate aria-label={form.label} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div className="f2">
        <Field htmlFor="n" label={form.name} error={errors.name} errorId="name-err"><input className="inp" id="n" name="name" type="text" autoComplete="name" required defaultValue={values?.name} {...aria('name')} /></Field>
        <Field htmlFor="e" label={form.email} error={errors.email} errorId="email-err"><input className="inp" id="e" name="email" type="email" autoComplete="email" required defaultValue={values?.email} {...aria('email')} /></Field>
        <Field htmlFor="co" label={form.company}><input className="inp" id="co" name="company" type="text" autoComplete="organization" defaultValue={values?.company} /></Field>
        <Field htmlFor="sz" label={form.size}>
          <select className="inp" id="sz" name="size" defaultValue={values?.size ?? form.sizeDefault}>
            {form.sizes.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <fieldset style={{ margin: 0, padding: 0, border: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <legend className="mono" style={{ padding: '0 0 12px' }}>{form.topics}</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {form.topicList.map((label, i) => (
            <ToggleChip key={label} variant="topic" pressed={on[i]} onClick={() => setOn((v) => v.map((x, j) => (j === i ? !x : x)))}>{label}</ToggleChip>
          ))}
        </div>
      </fieldset>
      <Field htmlFor="msg" label={form.message} error={errors.message} errorId="message-err" hint={form.hint}>
        <textarea className="inp" id="msg" name="message" rows={6} placeholder={form.placeholder} defaultValue={values?.message} style={{ resize: 'vertical', lineHeight: 1.5 }} {...aria('message')} />
      </Field>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 20, borderTop: '1px solid var(--ln)' }}>
        <span className="sub" style={{ fontSize: 13 }}>{form.opensMail} {form.privacy} <Link href={privacyHref} style={{ color: 'var(--tx)' }}>{form.privacyLink}</Link></span>
        <SubmitButton label={form.submit} />
      </div>
    </form>
  );
}
