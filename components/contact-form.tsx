'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

type FormState = { kind: 'idle' | 'sending' | 'success' | 'error'; message?: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: 'idle' });
  const [consent, setConsent] = useState(false);

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ kind: 'sending' });
    const form = new FormData(event.currentTarget);
    form.set('consent', consent ? 'true' : 'false');
    try {
      const response = await fetch('/api/enquiries', { method: 'POST', body: form });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok) throw new Error(result.error || 'The transmission did not survive.');
      event.currentTarget.reset();
      setConsent(false);
      setState({ kind: 'success', message: 'Transmission received. I will reply through your chosen contact method.' });
    } catch (error) {
      setState({ kind: 'error', message: error instanceof Error ? error.message : 'Transmission failed. Email hello@kantimitsu.com instead.' });
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} encType="multipart/form-data">
      <div className="field-group">
        <div className="form-grid">
          <div className="field">
            <label htmlFor="nameOrHandle">NAME OR HANDLE *</label>
            <input id="nameOrHandle" name="nameOrHandle" maxLength={100} required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="contactMethod">PREFERRED CONTACT *</label>
            <select id="contactMethod" name="contactMethod" required defaultValue="email">
              <option value="email">Email</option>
              <option value="discord">Discord</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="contactValue">CONTACT ADDRESS / HANDLE *</label>
            <input id="contactValue" name="contactValue" maxLength={320} required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="platforms">STREAMING PLATFORMS</label>
            <input id="platforms" name="platforms" maxLength={200} placeholder="Twitch, TikTok, YouTube…" />
          </div>
          <div className="field">
            <label htmlFor="budgetRange">TARGET BUDGET</label>
            <input id="budgetRange" name="budgetRange" maxLength={100} placeholder="Optional — a range is useful" />
          </div>
          <div className="field">
            <label htmlFor="targetDate">TARGET DATE</label>
            <input id="targetDate" name="targetDate" type="date" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="projectDescription">WHAT DO YOU WANT BUILT? *</label>
          <textarea id="projectDescription" name="projectDescription" maxLength={5000} required rows={8} />
          <small>Describe the problem, the software already involved, and what “working” would look like.</small>
        </div>
        <div className="field">
          <label htmlFor="report">BENCHMARK REPORT</label>
          <input id="report" name="report" type="file" accept=".json,.txt,application/json,text/plain" />
          <small>Optional. One Collector JSON or plain-text report, maximum 1 MiB. No executables or archives.</small>
        </div>
        <input className="form-trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="field consent-field">
          <input id="consent" type="checkbox" checked={consent} onChange={(event) => setConsent(event.currentTarget.checked)} />
          <label htmlFor="consent">You may use these details to respond to this enquiry. *</label>
        </div>
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-theme="dark" />
        ) : null}
        {!consent && state.kind === 'error' ? <p className="field-error">Consent is required.</p> : null}
        <button className="terminal-submit" type="submit" disabled={!consent || state.kind === 'sending'}>
          <Send /> {state.kind === 'sending' ? 'TRANSMITTING…' : 'SEND ENQUIRY'}
        </button>
        <output className={`form-status ${state.kind}`} aria-live="polite">{state.message}</output>
      </div>
    </form>
  );
}
