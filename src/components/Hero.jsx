import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "../data.jsx";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero({ loaded }) {
  const sectionRef   = useRef(null);
  const imgRef       = useRef(null);
  const tagRef       = useRef(null);
  const nameRef      = useRef(null);
  const energyRef    = useRef(null);
  const marqueeRef   = useRef(null);

  /* ---------- set initial hidden states ---------- */
  useEffect(() => {
    gsap.set(imgRef.current,    { scale: 2.2, opacity: 1 });
    gsap.set(tagRef.current,    { rotate: -8, opacity: 0, y: 20 });
    gsap.set(nameRef.current,   { opacity: 0 });
    gsap.set(energyRef.current, { opacity: 0.8 });
    if (marqueeRef.current) gsap.set(marqueeRef.current, { opacity: 0, y: 20 });
  }, []);

  /* ---------- entrance on load ---------- */
  useEffect(() => {
    if (!loaded) return;

    const split = new SplitText(nameRef.current, { type: "chars" });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl
      .to(imgRef.current,    { scale: 1, duration: 1.4, ease: "power3.out" }, 0)
      .to(energyRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" }, 0)
      .to(tagRef.current,    { rotate: -3, opacity: 1, y: 0, duration: 0.7 }, ">-0.3")
      .set(nameRef.current,  { opacity: 1 })
      .from(split.chars, {
        y: -60, opacity: 0, stagger: 0.07, duration: 0.6, ease: "back.out(1.5)",
      }, ">-0.2")
      .to(marqueeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, ">-0.1");

    return () => split.revert();
  }, [loaded]);

  /* ---------- scroll parallax on portrait ---------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-4 md:px-16 pt-5 pb-0 max-w-[1280px] mx-auto relative">
      <div className="w-full relative flex flex-col items-center">

        {/* Portrait */}
        <div className="w-full h-[60vh] md:h-[80vh] relative border-4 border-[#1c1b1b] shadow-brutal-2xl overflow-hidden bg-[#e5e2e1]">
          <img
            ref={imgRef}
            src={hero.portraitImage}
            alt={hero.portraitAlt}
            className="w-full h-full object-cover object-top grayscale mix-blend-multiply"
          />
          {/* Lime glow overlay */}
          <div
            ref={energyRef}
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 120px rgba(200,242,50,0.8), 0 0 80px rgba(200,242,50,0.4)" }}
          />
          {/* Status chip — top right of image */}
          <div className="absolute top-4 right-4 bg-[#c8f232] border-4 border-[#1c1b1b] px-4 py-1 shadow-brutal-sm">
            <span className="font-label-bold text-xs uppercase tracking-widest text-[#1c1b1b] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1c1b1b] animate-pulse inline-block" />
              Open to Work
            </span>
          </div>
        </div>

        {/* Overlaid Typography */}
        <div className="relative flex flex-col items-center w-full z-10 -mt-14 md:-mt-28">
          {/* "I'm" sticker */}
          <div className="w-full max-w-6xl flex justify-start md:justify-center px-4 md:px-0">
            <span
              ref={tagRef}
              className="font-display text-2xl md:text-6xl uppercase font-black text-[#1c1b1b] md:-translate-x-[350px] mb-[-12px] md:mb-[-22px] z-10 bg-[#fdf8f8] px-6 py-2 border-4 border-[#1c1b1b] shadow-brutal-md inline-block"
              style={{ rotate: "-3deg" }}
            >
              I'm
            </span>
          </div>
          {/* Name */}
          <h1
            ref={nameRef}
            className="font-display text-[16vw] md:text-[13vw] leading-none uppercase font-black text-[#fdf8f8] tracking-widest text-center"
            style={{
              WebkitTextStroke: "4px #1c1b1b",
              filter: "drop-shadow(8px 8px 0px #1c1b1b)",
            }}
          >
            {hero.name}
          </h1>
        </div>
      </div>

      {/* Marquee strip below name */}
      <div ref={marqueeRef} className="w-screen relative -left-4 md:-left-16 mt-6 border-y-4 border-[#1c1b1b] bg-[#1c1b1b] overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-3">
          {[...hero.marqueeItems, ...hero.marqueeItems, ...hero.marqueeItems, ...hero.marqueeItems].map((item, i) => (
            <span key={i} className="font-label-bold text-sm uppercase tracking-[0.25em] text-[#c8f232] mx-8">
              {item} <span className="text-[#c8f232]/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
