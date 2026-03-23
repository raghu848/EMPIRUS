import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Regal Empirus',
  description:
    'Learn how Regal Empirus collects, uses, and protects your personal information. Read our full privacy policy.',
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header />

      {/* ── Hero Banner ── */}
      <section
        style={{
          position: 'relative',
          paddingTop: '10rem',
          paddingBottom: '4rem',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background:
              'radial-gradient(ellipse, rgba(223,188,115,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />


        <h1
          style={{
            fontFamily: 'var(--font-hand)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#e5d8be',
            position: 'relative',
            lineHeight: 1.2,
          }}
        >
          Privacy Policy
        </h1>
        <div
          className="gold-line"
          style={{ margin: '2rem auto 0' }}
        />
      </section>

      {/* ── Content ── */}
      <section
        className="container"
        style={{ paddingBottom: '6rem' }}
      >
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            fontFamily: 'var(--font-sans)',
            color: 'var(--muted)',
            fontSize: '15px',
            lineHeight: 1.85,
          }}
        >
          {/* Intro */}
          <p style={{ marginBottom: '1.75rem' }}>
            At Regal Empirus, we prioritize the confidentiality and integrity of the
            data shared by our visitors. This policy outlines our commitment to
            managing your information with the highest standards of digital security
            and transparency. All data hosted on this platform is managed with the
            explicit consent of the project developers to ensure a secure user
            environment.
          </p>
          <p style={{ marginBottom: '3rem' }}>
            While we strive for absolute precision in the details provided on this
            website, Regal Empirus assumes no liability for any discrepancies or for
            any actions taken based on the information found herein. Users are
            encouraged to verify all project specifications directly with our
            authorized sales team.
          </p>

          {/* Scope */}
          <SectionHeading>Scope of This Policy</SectionHeading>
          <p style={{ marginBottom: '1.75rem' }}>
            This Privacy Policy governs the collection and processing of
            &quot;Personally Identifiable Information&quot; (PII) acquired through
            the Regal Empirus official web portal.
          </p>
          <p style={{ marginBottom: '3rem' }}>
            Please note that this policy applies exclusively to digital assets owned
            and operated by Regal Empirus. It does not extend to external service
            providers, third-party contractors, or legal disclosures mandated by
            government mandates or judicial orders.
          </p>

          {/* Data Acquisition */}
          <SectionHeading>Data Acquisition &amp; Utilization</SectionHeading>
          <p style={{ marginBottom: '1.25rem' }}>
            We collect essential details — such as your full name, contact number,
            and email address — whenever you engage with our digital touchpoints,
            including:
          </p>
          <ul
            style={{
              paddingLeft: '1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              listStyleType: 'none',
            }}
          >
            {[
              'Project enquiry and "Express Interest" forms.',
              'Newsletter subscriptions.',
              'Direct WhatsApp or Click-to-Call integrations.',
            ].map((item) => (
              <li
                key={item}
                style={{
                  position: 'relative',
                  paddingLeft: '1.25rem',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.35em',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    opacity: 0.7,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
          <p style={{ marginBottom: '3rem' }}>
            The primary purpose of this data is to streamline our communication with
            you, provide requested project brochures, and keep you informed about
            construction milestones or exclusive investment opportunities at Regal
            Empirus.
          </p>

          {/* Legal Disclosures */}
          <SectionHeading>Legal Disclosures</SectionHeading>
          <p style={{ marginBottom: '1.25rem' }}>
            Regal Empirus reserves the right to disclose personal data when such
            action is necessary to:
          </p>
          <ul
            style={{
              paddingLeft: '1.5rem',
              marginBottom: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              listStyleType: 'none',
            }}
          >
            {[
              'Comply with statutory regulations or RERA-related legal requirements.',
              'Protect the safety of our visitors and the integrity of our digital infrastructure.',
              'Prevent fraudulent activity or unauthorized attempts to access our servers.',
            ].map((item) => (
              <li
                key={item}
                style={{
                  position: 'relative',
                  paddingLeft: '1.25rem',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.35em',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    opacity: 0.7,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* External Connectivity */}
          <SectionHeading>External Connectivity</SectionHeading>
          <p style={{ marginBottom: '3rem' }}>
            Our website may feature links to external portals (such as virtual tour
            providers or mapping services). Regal Empirus does not exercise control
            over the privacy protocols of these external sites. We recommend
            reviewing their individual policies before sharing personal data.
          </p>

          {/* Information Protection */}
          <SectionHeading>
            Information Protection &amp; Intellectual Property
          </SectionHeading>
          <p style={{ marginBottom: '1.5rem' }}>
            We maintain a strict &quot;No-Sale&quot; policy; your personal
            information will never be sold, leased, or traded to third-party
            marketing agencies.
          </p>
          <p style={{ marginBottom: '3rem' }}>
            <strong style={{ color: 'var(--gold-lt)' }}>Copyright Notice:</strong>{' '}
            All architectural renders, site plans, logos, and textual content
            featured on this site are the intellectual property of Regal Empirus.
            Unauthorized reproduction or distribution of these assets is strictly
            prohibited and subject to legal action.
          </p>

          {/* Policy Amendments */}
          <SectionHeading>Policy Amendments</SectionHeading>
          <p>
            Regal Empirus may periodically refine this Privacy Policy to reflect
            changes in digital laws or project updates. Users are encouraged to
            revisit this page to stay informed of how their data is protected.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ── Reusable sub-heading ── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
        fontWeight: 400,
        color: 'var(--gold-lt)',
        marginBottom: '1.25rem',
        letterSpacing: '0.02em',
        lineHeight: 1.3,
      }}
    >
      {children}
    </h2>
  );
}
