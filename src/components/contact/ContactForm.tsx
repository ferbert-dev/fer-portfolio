'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import type { Dictionary } from '@/content';
import { site } from '@/content';
import { Chevron } from '@/components/ui/icons';
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
          <span className="lnk-t"><Chevron /></span>
        </button>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? <span id={`${k}-err`} className="sub" style={{ fontSize: 13, color: 'var(--warn-tx)' }}>{errors[k]}</span> : null;
  const aria = (k: keyof Errors) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-err` } : {});

  return (
    <form id="contact-form" onSubmit={submit} noValidate aria-label={form.label} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div className="f2">
        <div className="fld"><label className="mono" htmlFor="n">{form.name}</label><input className="inp" id="n" name="name" type="text" autoComplete="name" required {...aria('name')} />{err('name')}</div>
        <div className="fld"><label className="mono" htmlFor="e">{form.email}</label><input className="inp" id="e" name="email" type="email" autoComplete="email" required {...aria('email')} />{err('email')}</div>
        <div className="fld"><label className="mono" htmlFor="co">{form.company}</label><input className="inp" id="co" name="company" type="text" autoComplete="organization" /></div>
        <div className="fld">
          <label className="mono" htmlFor="sz">{form.size}</label>
          <select className="inp" id="sz" name="size" defaultValue={form.sizeDefault}>
            {form.sizes.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <fieldset style={{ margin: 0, padding: 0, border: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <legend className="mono" style={{ padding: '0 0 12px' }}>{form.topics}</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {form.topicList.map((label, i) => (
            <button key={label} type="button" className="tp" aria-pressed={on[i]} onClick={() => setOn((v) => v.map((x, j) => (j === i ? !x : x)))} style={{ border: `1px solid ${on[i] ? 'var(--acc-bd)' : 'var(--ln2)'}`, background: on[i] ? 'var(--acc-tint)' : 'transparent', color: 'var(--tx)' }}>
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 2, background: on[i] ? 'var(--acc-tx)' : 'var(--ln4)' }} />
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="fld">
        <label className="mono" htmlFor="msg">{form.message}</label>
        <textarea className="inp" id="msg" name="message" rows={6} placeholder={form.placeholder} style={{ resize: 'vertical', lineHeight: 1.5 }} {...aria('message')} />
        {err('message')}
        <span className="sub" style={{ fontSize: 13 }}>{form.hint}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 20, borderTop: '1px solid var(--ln)' }}>
        <span className="sub" style={{ fontSize: 13 }}>{form.privacy} <Link href={privacyHref} style={{ color: 'var(--tx)' }}>{form.privacyLink}</Link></span>
        <button type="submit" className="btn" disabled={busy}>
          <span className="btn-l">{busy ? form.sending : form.submit}</span>
          <span className="btn-t"><Chevron /></span>
        </button>
      </div>
      {note ? <p role="status" className="sub" style={{ margin: 0, fontSize: 14 }}>{note}</p> : null}
    </form>
  );
}
