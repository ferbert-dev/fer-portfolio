'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import type { Dictionary } from '@/content';
import { site } from '@/content';
import { ArrowTile, SubmitButton } from '@/components/ui/Button';
import { Field, ToggleChip } from '@/components/ui/Controls';
import { sendContact } from '@/lib/contact';

type Props = { form: Dictionary['contact']['form']; sent: Dictionary['contact']['sent']; privacyHref: string };
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export function ContactForm({ form, sent, privacyHref }: Props) {
  const [on, setOn] = useState<boolean[]>(form.topicList.map((_, i) => i === 0));
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [note, setNote] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '');
    const input = {
      name: get('name'),
      email: get('email'),
      company: get('company'),
      size: get('size'),
      topics: form.topicList.filter((_, i) => on[i]),
      message: get('message'),
      website: get('website'),
    };
    const next: Errors = {};
    if (!input.name.trim()) next.name = form.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) next.email = form.errors.email;
    if (!input.message.trim()) next.message = form.errors.message;
    setErrors(next);
    setNote('');
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (e.currentTarget.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setBusy(true);
    const res = await sendContact(input);
    setBusy(false);
    if (res.ok) {
      setDone(true);
      return;
    }
    if (res.reason === 'unconfigured') {
      const body = `${input.message}\n\n${input.name}${input.company ? `, ${input.company}` : ''}\n${form.size}: ${input.size}\n${input.topics.join(', ')}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${form.label}: ${input.name}`)}&body=${encodeURIComponent(body)}`;
      setNote(form.mailFallback);
      return;
    }
    setNote(form.sendError);
  };

  if (done) {
    return (
      <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: 20, minHeight: 520, justifyContent: 'center', alignItems: 'flex-start' }}>
        <span style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--acc)', color: 'var(--on-acc)', display: 'grid', placeItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4L16 6" /></svg>
        </span>
        <h2 className="md">{sent.title}</h2>
        <p className="sub" style={{ margin: 0, maxWidth: 460 }}>{sent.body}</p>
        <button type="button" className="lnk mono" onClick={() => setDone(false)} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer' }}>
          {sent.again}
          <ArrowTile />
        </button>
      </div>
    );
  }

  const aria = (k: keyof Errors) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-err` } : {});

  return (
    <form id="contact-form" onSubmit={submit} noValidate aria-label={form.label} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div className="f2">
        <Field htmlFor="n" label={form.name} error={errors.name} errorId="name-err"><input className="inp" id="n" name="name" type="text" autoComplete="name" required {...aria('name')} /></Field>
        <Field htmlFor="e" label={form.email} error={errors.email} errorId="email-err"><input className="inp" id="e" name="email" type="email" autoComplete="email" required {...aria('email')} /></Field>
        <Field htmlFor="co" label={form.company}><input className="inp" id="co" name="company" type="text" autoComplete="organization" /></Field>
        <Field htmlFor="sz" label={form.size}>
          <select className="inp" id="sz" name="size" defaultValue={form.sizeDefault}>
            {form.sizes.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
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
        <textarea className="inp" id="msg" name="message" rows={6} placeholder={form.placeholder} style={{ resize: 'vertical', lineHeight: 1.5 }} {...aria('message')} />
      </Field>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 20, borderTop: '1px solid var(--ln)' }}>
        <span className="sub" style={{ fontSize: 13 }}>{form.privacy} <Link href={privacyHref} style={{ color: 'var(--tx)' }}>{form.privacyLink}</Link></span>
        <SubmitButton label={busy ? form.sending : form.submit} disabled={busy} />
      </div>
      {note ? <p role="status" className="sub" style={{ margin: 0, fontSize: 14 }}>{note}</p> : null}
    </form>
  );
}
