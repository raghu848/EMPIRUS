'use client';

const NAV_GROUPS = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Investments', href: '#investments' },
      { label: 'Team', href: '#team' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '+91 77890 00077', href: 'tel:+917789000077' },
      { label: 'info@regalempirus.com', href: 'mailto:info@regalempirus.com' },
      { label: 'Sector 91, Mohali', href: '#' },
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
      {/* Main footer */}
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4rem',
          paddingTop: '5rem',
          paddingBottom: '5rem',
          justifyContent: 'space-between',
        }}
      >
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
                filter: 'brightness(0)' /* Turns the white text to black */
              }}
            />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              lineHeight: 1.75,
              color: '#333',
            }}
          >
            Ultra-premium residential towers in Sector 91, Mohali. Crafted by Ar. Reza Kabul. Liberating Spaces.
          </p>
        </div>

        {/* Map */}
        <div style={{ 
          flex: 1, 
          minWidth: '280px', 
          maxWidth: '450px', 
          height: '240px', 
          borderRadius: '8px', 
          overflow: 'hidden', 
          border: '1px solid rgba(0,0,0,0.1)',
          background: 'rgba(0,0,0,0.02)'
        }}>
          <iframe 
            src="https://maps.google.com/maps?q=Sector%2091,%20Mohali&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>

        {/* Nav groups */}
        <div style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap' }}>
          {NAV_GROUPS.map(g => (
            <div key={g.title} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#666',
                }}
              >
                {g.title}
              </p>
              {g.links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
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
          ))}
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
              fontSize: '11px',
              color: '#444',
              letterSpacing: '0.05em',
            }}
          >
            © {new Date().getFullYear()} Regal Empirus. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              color: '#555',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            This information does not constitute an offer. Any offering will only be made through formal documents. RERA registration pending.
          </p>
        </div>
      </div>
    </footer>
  );
};
