import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider';
import { StatsBar } from '@/components/StatsBar';
import { AboutSection } from '@/components/AboutSection';
import { VisionarySection } from '@/components/VisionarySection';

import { LocationAdvantage } from '@/components/LocationAdvantage';
import { LocationContext } from '@/components/LocationContext';
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
        title={<>Presenting an address that defines power  <em style={{ fontStyle: 'italic', color: 'var(--gold-lt)' }}>In Mohali</em></>}
        body={
          <>
            <p style={{ marginBottom: '1rem' }}>
              Regal Empirus is an expression of ultra-luxury—crafted for those who belong to a class above. Set across 5.37 acres in Sector 91, it rises as a landmark of prestige, where iconic architecture meets expansive green landscapes.
            </p>
            <p>
              Every residence is designed to deliver a sense of grandeur, with spacious layouts, 3-side open living, and abundant natural light—creating homes that feel open, elegant, and truly exceptional. Complemented by world-class amenities and a 2 Acre podium park, every detail is curated to offer a lifestyle defined by comfort, privacy, and indulgence.
            </p>
            <p>
              Featuring exclusive 3+1 (2200 sq. ft.) and 4+1 (3200 sq. ft.) residences, offering a compelling investment opportunity.
            </p>
            <p>
              This is not just a place to live—it is a statement of power, status, and refined living.
            </p>

          </>
        }
        image="/images/regal_empirus/WhatsApp Image 2026-03-23 at 12.33.52 PM.jpeg"
      />

      {/* ── Visionary ── */}
      <VisionarySection />

      {/* ── Visura Gallery (Amenities) ── */}
      <VisuraGallery />

      {/* ── Location & Floor Plans ── */}
      <LocationContext />
      <LocationAdvantage />

      {/* ── Leadership Team ── */}
      <LeadershipSection />


      {/* ── Contact & Lead Form ── */}
      <ContactForm />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
