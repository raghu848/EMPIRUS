'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import Image from 'next/image';

const INPUTS = [
  { id: 'name', label: 'Full Name', type: 'text', required: true },
  { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
  { id: 'email', label: 'Email Address', type: 'email', required: false },
  { id: 'type', label: 'Apartment Preference', type: 'text', required: false },
];

type Status = 'idle' | 'sending' | 'done';

export const ContactForm = () => {
  const [form, setForm] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1400));
    setStatus('done');
  };

  const anim = (ms: number) => ({
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.85s ${ms}ms var(--ease-spring), transform 0.85s ${ms}ms var(--ease-spring)`,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="section-py gold-section-top"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#080A0C',
      }}
    >
      {/* Background Image with specific cropping */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/Amenities/WhatsApp Image 2026-03-23 at 11.38.34 AM.jpeg"
          alt="Background"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center 10%', // Focus more on the top
            filter: 'blur(4px)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5,7,9,0.35)', // Very light dark tint
          zIndex: 1
        }} />
      </div>

      {/* Ambient gold glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%', right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(212,168,67,0.06) 0%, transparent 70%)',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="col-2" style={{ alignItems: 'flex-start' }}>
          {/* Left info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p className="eyebrow" style={anim(0)}>Contact Us</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
                letterSpacing: '-0.015em',
                lineHeight: 1.12,
                color: 'var(--white)',
                ...anim(100),
              }}
            >
              Join The{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold-lt)' }}>Regal Empirus</em>{' '}
              Club
            </h2>

            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', ...anim(180) }} />

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.92)',
                maxWidth: '380px',
                ...anim(250),
              }}
            >
              Reserve your expression of interest today and receive the official Investment Brochure with floor plans and project timeline.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '1rem',
                ...anim(350),
              }}
            >
              {[
                ['Phone', '+91 77890 00077'],
                ['Email', 'info@gdplmohali.in'],
                ['Address', 'GDPL, Sector 91, Sahibzada Ajit Singh Nagar, adjoining Eden Court, Punjab 140307'],
              ].map(([label, val]) => (
                <div key={label}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--white)' }}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div style={anim(200)}>
            {status === 'done' ? (
              <div
                style={{
                  padding: '4rem 3rem',
                  border: '1px solid var(--gold)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  alignItems: 'center',
                }}
              >
                <p className="eyebrow">Thank You</p>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 300,
                    fontSize: '2rem',
                    color: 'var(--white)',
                  }}
                >
                  We&apos;ll be in touch shortly.
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--muted)' }}>
                  Our team will contact you within 24 hours with the Regal Empirus Investment Brochure.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({}); }}
                  style={{
                    marginTop: '0.5rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Back
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  padding: '3rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--faint)',
                }}
              >
                {/* Honeypot */}
                <input name="_hp" type="text" style={{ display: 'none' }} tabIndex={-1} />

                {INPUTS.map(inp => (
                  <div key={inp.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label
                      htmlFor={inp.id}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                      }}
                    >
                      {inp.label}{inp.required && <span style={{ color: 'var(--gold)', marginLeft: '4px' }}>*</span>}
                    </label>
                    <input
                      id={inp.id}
                      type={inp.type}
                      required={inp.required}
                      value={form[inp.id] ?? ''}
                      onChange={e => setForm(prev => ({ ...prev, [inp.id]: e.target.value }))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid var(--faint)',
                        outline: 'none',
                        padding: '0.75rem 0',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        color: 'var(--white)',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={e => { (e.currentTarget).style.borderBottomColor = 'var(--gold)'; }}
                      onBlur={e => { (e.currentTarget).style.borderBottomColor = 'var(--faint)'; }}
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-gold"
                  style={{ marginTop: '0.5rem', justifyContent: 'center' }}
                >
                  <span>{status === 'sending' ? 'Sending…' : 'Submit Inquiry'}</span>
                </button>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                    textAlign: 'center',
                    letterSpacing: '0.05em',
                  }}
                >
                  This constitutes an expression of interest only. Subject to availability.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
