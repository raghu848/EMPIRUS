import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider';
import { StatsBar } from '@/components/StatsBar';
import { AboutSection } from '@/components/AboutSection';
import { VisionarySection } from '@/components/VisionarySection';
import { InvestmentsSection } from '@/components/InvestmentsSection';

import { LocationAdvantage } from '@/components/LocationAdvantage';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

import { VisuraGallery } from '@/components/VisuraGallery';
import { LeadershipSection } from '@/components/LeadershipSection';

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
        title={<>Presenting an address that defines power . <em style={{ fontStyle: 'italic', color: 'var(--gold-lt)' }}>In Mohali</em></>}
        body={
          <>
            <p style={{ marginBottom: '1rem' }}>
              Regal Empirus is an expression of ultra-luxury—crafted for those who belong to a class above. Set across 5.37 acres in Sector 91, it rises as a landmark of prestige, where iconic architecture meets expansive green landscapes.
            </p>
            <p>
              Every residence is designed to deliver a sense of grandeur, with spacious layouts, 3-side open living, and abundant natural light—creating homes that feel open, elegant, and truly exceptional. Complemented by world-class amenities and a 2-acre podium park, every detail is curated to offer a lifestyle defined by comfort, privacy, and indulgence.
            </p>
            <p>
              Featuring exclusive 3+1 (2200 sq. ft.) and 4+1 (3200 sq. ft.) residences, offering a compelling investment opportunity.
            </p>
            <p>
              This is not just a place to live—it is a statement of power, status, and refined living.
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
        cta={{ label: 'View Amenities', href: '#amenities' }}
      />

      {/* ── Visura Gallery ── */}
      <VisuraGallery />

      {/* ── Leadership Team ── */}
      <LeadershipSection />

      {/* ── Location & Floor Plans ── */}
      <LocationAdvantage />



      {/* ── Contact & Lead Form ── */}
      <ContactForm />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
