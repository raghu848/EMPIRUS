'use client';

import { useInView } from '@/hooks/useInView';

export const ApproachSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section id="approach" ref={ref} className="bg-bg-section py-32 border-y border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-32">
          {/* Header Block */}
          <div className={`lg:w-1/2 border-l-4 border-gold pl-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
             <span className="block font-body text-[10px] tracking-[0.38em] text-gold uppercase mb-6">
                OUR APPROACH
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-text-primary leading-[1.1] max-w-[500px]">
              Crafting Liberating Spaces for the Next Generation
            </h2>
          </div>

          {/* Body Columns */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <p className="font-body text-[15px] leading-[1.75] text-text-secondary">
                At Regal Empirus, we believe architecture should liberate, not limit. Our visionary approach combines structural excellence with artistic expression to create homes that transcend traditional living. Each apartment is 100% sun-facing, ensuring a constant flow of natural vitality.
              </p>
            </div>
            <div className={`transition-all duration-700 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <p className="font-body text-[15px] leading-[1.75] text-text-secondary">
                 The 2-Acre Podium park stands as an elevated sanctuary, a lush escape from the urban tempo. From the high-performance wellness studio to the resort-style splash zones, every amenity is meticulously designed to foster community and well-being.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
