import { Header }           from '@/components/Header';
import { HeroSlider }        from '@/components/HeroSlider';
import { StatsBar }          from '@/components/StatsBar';
import { AboutSection }      from '@/components/AboutSection';
import { VisionarySection }  from '@/components/VisionarySection';
import { InvestmentsSection } from '@/components/InvestmentsSection';
import { Timeline }          from '@/components/Timeline';
import { LocationAdvantage } from '@/components/LocationAdvantage';
import { ContactForm }       from '@/components/ContactForm';
import { Footer }            from '@/components/Footer';

import { VisuraGallery }      from '@/components/VisuraGallery';
import { LeadershipSection }  from '@/components/LeadershipSection';

export default function Home() {
  return (
    <main>
      <Header />

      {/* ── Hero ── */}
      <HeroSlider />

      {/* ── Key Numbers ── */}
      <StatsBar />

      {/* ── About the Project ── */}
      <AboutSection
        id="about"
        eyebrow="About the Project"
        title={<>Multi-Family Real Estate Investments with <em style={{ fontStyle: 'italic', color: 'var(--gold-lt)' }}>Proven Returns</em></>}
        body={
          <>
            <p style={{ marginBottom: '1rem' }}>
              Regal Empirus is an ultra-premium residential project in Sector 91, Mohali. Designed by Ar. Reza Kabul,
              it represents the pinnacle of high-rise excellence — a rare 3-side open site delivering maximum
              ventilation and 100% sun-facing apartments.
            </p>
            <p>
              Priced at ₹8,600/sq. ft., this is an investment for those who understand that true value is
              found not in quantity, but in the irreplaceable quality of space and light.
            </p>
          </>
        }
        image="/images/render-about.jpg"
        cta={{ label: 'Learn More', href: '#investments' }}
      />

      {/* ── Visionary ── */}
      <VisionarySection />

      {/* ── Investment Case ── */}
      <InvestmentsSection />

      {/* ── Approach / Podium Story ── */}
      <AboutSection
        id="podium"
        eyebrow="The Podium Story"
        title={<>A 2-Acre Elevated <em style={{ fontStyle: 'italic', color: 'var(--gold-lt)' }}>Sanctuary</em></>}
        body={
          <>
            <p style={{ marginBottom: '1rem' }}>
              The Podium Park is not just a garden. It is a lush, elevated oasis that lifts residents
              above the city — a sanctuary of calm curated for the most discerning lifestyles.
            </p>
            <p>
              From resort-style splash zones for children to high-performance wellness studios and al fresco
              pavilions, every centimetre of the podium is an experience.
            </p>
          </>
        }
        image="/images/render-hero-1.jpg"
        reverse
        cta={{ label: 'View Amenities', href: '#location' }}
      />

      {/* ── Visura Gallery ── */}
      <VisuraGallery />

      {/* ── Leadership Team ── */}
      <LeadershipSection />

      {/* ── Location & Floor Plans ── */}
      <LocationAdvantage />

      {/* ── Track Record / Timeline ── */}
      <Timeline />

      {/* ── Contact & Lead Form ── */}
      <ContactForm />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
