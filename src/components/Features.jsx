import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { services } from "../data.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Section label + heading stagger in
      gsap.fromTo(
        headingRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      // Cards: each slides up with stagger
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full bg-[#1c1b1b] border-t-4 border-[#1c1b1b] py-24 px-4 md:px-16 overflow-hidden relative"
    >
      {/* Ghost watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <span
          className="font-display text-[22vw] leading-none uppercase font-black tracking-tighter absolute -bottom-4 -right-8 opacity-[0.06] text-[#fdf8f8]"
          style={{ rotate: "-6deg" }}
        >
          DO
        </span>
      </div>

      <div className="max-w-[1280px] mx-auto relative">

        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <p className="font-label-bold uppercase text-xs tracking-[0.3em] text-[#c8f232] mb-4">
            — What I Do
          </p>
          <div className="flex flex-wrap items-end gap-4">
            <h2 className="font-display text-5xl md:text-7xl uppercase font-black text-[#fdf8f8] leading-none">
              Services
            </h2>
            <div
              className="bg-[#c8f232] border-4 border-[#fdf8f8] px-5 py-1.5 shadow-[6px_6px_0px_#c8f232] mb-1"
              style={{ rotate: "-1.5deg" }}
            >
              <span className="font-label-bold text-sm uppercase text-[#1c1b1b]">
                {services.length} disciplines
              </span>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-4 border-[#fdf8f8]/20">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`group hover:bg-[#fdf8f8]  relative border-r-4 border-b-4 md:border-b-0 border-[#fdf8f8]/20 p-8 md:p-10 cursor-default
                hover:${svc.accent} transition-colors duration-300`}
            >
              {/* Number */}
              <div className={`${svc.accent} border-2 border-[#1c1b1b] w-12 h-12 flex items-center justify-center mb-8 group-hover:shadow-[4px_4px_0px_#1c1b1b] transition-shadow`}>
                <span className="font-display text-lg font-black text-[#1c1b1b]">{svc.number}</span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl uppercase font-black text-[#fdf8f8] mb-4 group-hover:text-[#1c1b1b] transition-colors">
                {svc.title}
              </h3>

              <div className="w-8 h-1 bg-[#c8f232] mb-5 group-hover:bg-[#1c1b1b] transition-colors" />

              <p className="font-body-md text-[#a09f9e] leading-relaxed mb-8 group-hover:text-[#1c1b1b]/80 transition-colors text-sm md:text-base">
                {svc.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-label-bold text-[10px] uppercase tracking-widest border-2 border-[#fdf8f8]/30 text-[#fdf8f8]/70 px-2 py-1 group-hover:border-[#1c1b1b] group-hover:text-[#1c1b1b] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 font-label-bold text-xs uppercase tracking-widest text-[#fdf8f8]/40 group-hover:text-[#1c1b1b] transition-colors">
                <ArrowRight size={14} />
                Explore
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
