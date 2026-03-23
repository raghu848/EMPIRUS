'use client';

const NAV_GROUPS = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Amenities', href: '#amenities' },
      { label: 'Location', href: '#location' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '+91 77890 00077', href: 'tel:+917789000077' },
      { label: 'info@gdplmohali.in', href: 'mailto:info@gdplmohali.in' },
      { label: 'Sector 91, Mohali', href: '#' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer
      style={{
        background: 'var(--white)',
        color: '#333',
        borderTop: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <style>{`
        .footer-main {
          display: flex;
          flex-wrap: wrap;
          gap: 4rem;
          padding-top: 5rem;
          padding-bottom: 5rem;
          justify-content: space-between;
        }
        .footer-nav-groups {
          display: flex;
          gap: 5rem;
          flex-wrap: wrap;
        }
        .footer-map {
          flex: 1;
          min-width: 280px;
          max-width: 450px;
          height: 240px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.1);
          background: rgba(0,0,0,0.02);
        }
        @media (max-width: 767px) {
          .footer-main {
            gap: 2rem;
            flex-direction: column;
          }
          .footer-nav-groups {
            gap: 2rem;
          }
          .footer-map {
            min-width: 100%;
            max-width: 100%;
            height: 200px;
          }
        }
      `}</style>
      {/* Main footer */}
      <div className="container footer-main">
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', alignItems: 'flex-start' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.5rem', width: '220px' }}>
            {/* Hidden base image for layout sizing */}
            <img
              src="/images/regal_empirus/Asset 1.png"
              alt=""
              style={{ height: '40px', width: 'auto', display: 'block', visibility: 'hidden' }}
            />
            {/* Top half: REGAL & gold lines (original colors) */}
            <img
              src="/images/regal_empirus/Asset 1.png"
              alt="Regal Empirus Logo Top"
              style={{
                position: 'absolute', top: 0, left: 0, height: '100%', width: '100%',
                objectFit: 'contain', objectPosition: 'left center',
                clipPath: 'inset(0 0 50% 0)' /* Slices the bottom half off */
              }}
            />
            {/* Bottom half: Empirus text (turned black) */}
            <img
              src="/images/regal_empirus/Asset 1.png"
              alt="Regal Empirus Logo Bottom"
              style={{
                position: 'absolute', top: 0, left: 0, height: '100%', width: '100%',
                objectFit: 'contain', objectPosition: 'left center',
                clipPath: 'inset(50% 0 0 0)', /* Slices the top half off */
                filter: 'brightness(0)' /* Makes the bottom part black */
              }}
            />
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: '#666',
            lineHeight: 1.6,
            marginTop: '0.5rem'
          }}>
            Regal Empirus is more than just a home. It is a legacy of luxury, meticulously designed for those who have arrived.
          </p>
        </div>

        {/* Links */}
        <div className="footer-nav-groups">
          {NAV_GROUPS.map((g, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h4 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#000',
              }}>
                {g.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {g.links.map((l, j) => (
                  <a
                    key={j}
                    href={l.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      color: '#333',
                      opacity: 0.8,
                      transition: 'opacity 0.3s, color 0.3s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.opacity = '1';
                      (e.currentTarget as HTMLElement).style.color = '#000';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.opacity = '0.8';
                      (e.currentTarget as HTMLElement).style.color = '#333';
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="footer-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.57143419385!2d76.6805!3d30.7011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef935!2sSector%2091%2C%20Mohali%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}
        className="container"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: '#444',
              letterSpacing: '0.05em',
            }}
          >
            © {new Date().getFullYear()} Regal Empirus. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              color: '#555',
              maxWidth: '600px',
              lineHeight: 1.6,
              textAlign: 'right',
            }}
          >
            Offer subject to formal documents. RERA registration pending.
          </p>
        </div>
      </div>
    </footer>
  );
};
