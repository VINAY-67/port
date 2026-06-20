import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "../data.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef      = useRef(null);
  const progressRef     = useRef(null);
  const titleRef        = useRef(null);
  const bodyRef         = useRef(null);
  const dotRefs         = useRef([]);
  const [activeIndex,   setActiveIndex]   = useState(0);
  const lastIndexRef    = useRef(0);
  const isAnimatingRef  = useRef(false);

  /* ── Animate out old content, then swap ── */
  const animateOut = useCallback((callback) => {
    const title = titleRef.current;
    const body  = bodyRef.current;
    if (!title || !body) { callback(); return; }
    isAnimatingRef.current = true;
    gsap.to([title, body], {
      opacity: 0, y: -20,
      duration: 0.22,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => { isAnimatingRef.current = false; callback(); },
    });
  }, []);

  /* ── Main scroll progress ── */
  useEffect(() => {
    const section  = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress) return;

    gsap.set(progress, { scaleY: 0, transformOrigin: "top" });

    ScrollTrigger.create({
      trigger: section,
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: `+=${timeline.length * 750 + 500}`,
      scrub: 1.8,
      onUpdate: (self) => {
        // Drive the lime progress bar
        gsap.set(progress, { scaleY: self.progress });

        const newIndex = Math.min(Math.floor(self.progress * timeline.length), timeline.length - 1);

        // Highlight active dot
        dotRefs.current.forEach((dot, i) => {
          if (!dot) return;
          const isPast = i <= newIndex;
          gsap.to(dot, {
            backgroundColor: isPast ? "#c8f232" : "#1c1b1b",
            scale: i === newIndex ? 1.4 : 1,
            duration: 0.3,
            overwrite: "auto",
          });
        });

        if (newIndex !== lastIndexRef.current && !isAnimatingRef.current) {
          lastIndexRef.current = newIndex;
          animateOut(() => setActiveIndex(newIndex));
        }
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [animateOut]);

  /* ── Animate in new content ── */
  useEffect(() => {
    const title = titleRef.current;
    const body  = bodyRef.current;
    if (!title || !body) return;
    gsap.fromTo(
      [title, body],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.38, ease: "power3.out", delay: 0.04, overwrite: "auto" }
    );
  }, [activeIndex]);

  const item = timeline[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="w-full border-t-4 border-[#1c1b1b] overflow-hidden relative bg-[#f7f3f2]"
    >
      {/* Ghost watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <h2
          className="font-display text-[28vw] leading-none uppercase font-black tracking-tighter absolute -bottom-8 -left-8 opacity-[0.04] text-[#1c1b1b]"
          style={{ rotate: "-5deg" }}
        >
          JOURNEY
        </h2>
      </div>

      {/* Top accent strip */}
      <div className="border-b-4 border-[#1c1b1b] flex items-stretch">
        <div className="px-6 md:px-16 py-4 flex-1 flex items-center">
          <p className="font-label-bold uppercase text-xs tracking-[0.3em] text-[#1c1b1b]/50">— My Journey</p>
        </div>
        <div className="bg-[#c8f232] border-l-4 border-[#1c1b1b] px-8 py-4 flex items-center">
          <span className="font-display uppercase font-black text-[#1c1b1b] text-sm tracking-widest">Timeline</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">

        {/* Left — timeline list */}
        <div className="relative pl-10">
          {/* Track */}
          <div className="absolute top-0 bottom-0 left-[3px] w-7 bg-[#1c1b1b] rounded-full" />
          {/* Progress fill */}
          <div ref={progressRef} className="absolute top-0 bottom-0 left-[3px] w-7 bg-[#c8f232] z-10 rounded-full" />

          {timeline.map((entry, i) => (
            <div key={entry.id} className="relative mb-20 last:mb-0">
              <div
                ref={(el) => (dotRefs.current[i] = el)}
                className="absolute -left-[35px] top-1 w-6 h-6 rounded-full border-4 border-[#1c1b1b] z-20"
                style={{ backgroundColor: "#1c1b1b" }}
              />
              <h4 className={`font-display text-xl md:text-2xl uppercase font-bold transition-colors duration-300 ${i === activeIndex ? "text-[#1c1b1b]" : "text-[#888]"}`}>
                {entry.period}
              </h4>
              <p className={`font-label-bold uppercase text-sm tracking-widest mt-1 transition-colors duration-300 ${i === activeIndex ? "text-[#444748]" : "text-[#aaa]"}`}>
                {entry.role}
              </p>
            </div>
          ))}
        </div>

        {/* Right — dynamic card + decoratives */}
        <div className="relative flex flex-col gap-5">

          {/* Spinning star */}
          <div className="absolute -top-13 -right-9 md:-right-10 w-20 h-20 bg-[#c8f232] border-4 border-[#1c1b1b] rounded-full  flex items-center justify-center animate-slow-spin z-10 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[28px] text-[#1c1b1b] font-black">star</span>
          </div>

          {/* Period sticker */}
          <div
            className="self-end bg-[#bc87fe] border-4 border-[#1c1b1b] px-5 py-2 shadow-[5px_5px_0px_#1c1b1b]"
            style={{ rotate: "2deg" }}
          >
            <span className="font-label-bold text-xs uppercase tracking-widest text-[#1c1b1b]">
              {item.period}
            </span>
          </div>

          {/* Story card */}
          <div
            className="bg-[#1c1b1b] text-white border-4 border-[#1c1b1b] p-8 shadow-[8px_8px_0px_#1c1b1b] hover:shadow-[12px_12px_0px_#1c1b1b] hover:-translate-y-1 transition-all duration-300 cursor-default"
            style={{ rotate: "-1deg" }}
          >
            <div className="inline-block bg-[#c8f232] px-3 py-0.5 mb-4">
              <span className="font-label-bold text-[10px] uppercase tracking-widest text-[#1c1b1b]">
                {item.role}
              </span>
            </div>
            <h3 ref={titleRef} className="font-display text-3xl md:text-4xl uppercase font-black mb-4 text-[#c8f232]">
              {item.title}
            </h3>
            <p ref={bodyRef} className="font-body-lg text-base font-bold leading-7 text-[#e5e2e1]">
              {item.body}
            </p>
          </div>

          {/* Step counter */}
          <div className="flex items-center gap-3">
            <div className="bg-[#1c1b1b] border-4 border-[#1c1b1b] px-4 py-2 shadow-[4px_4px_0px_#1c1b1b]">
              <span className="font-display text-xl font-black text-[#fdf8f8]">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="text-[#555] text-sm mx-1">/</span>
                {String(timeline.length).padStart(2, "0")}
              </span>
            </div>
            <p className="font-label-bold text-xs uppercase tracking-widest text-[#888]">Scroll to advance</p>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="border-t-4 border-[#1c1b1b] bg-[#1c1b1b] overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="font-label-bold text-xs uppercase tracking-[0.3em] text-[#c8f232] mx-6">
              Journey ✦ Timeline ✦ Growth ✦
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
