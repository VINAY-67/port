import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutCards } from "../data.jsx";
import { Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const starRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel: slide in from left
      gsap.fromTo(
        leftRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      // Right panel: slide in from right with delay
      gsap.fromTo(
        rightRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      // Cards inside right panel — stagger
      const cards = rightRef.current?.querySelectorAll(".about-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.5)",
            delay: 0.3,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full h-auto md:h-[100vh] border-y-4 border-[#1c1b1b] overflow-hidden relative bg-white"
    >
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">

        {/* Left — purple panel */}
        <div
          ref={leftRef}
          className="relative bg-[#bc87fe] border-r-0 md:border-r-4 border-b-4 md:border-b-0 border-[#1c1b1b] flex flex-col justify-between p-8 md:p-12 overflow-hidden"
        >
          <img src="/vinay.png" alt=""  className="-z-9"/>
          {/* Watermark */}
          <div className="absolute top-[-40px] left-[-40px] opacity-10 pointer-events-none select-none">
            <h2
              className="font-display text-[20vw] leading-none uppercase text-[#1c1b1b] font-black tracking-tighter"
              style={{ rotate: "-15deg" }}
            >
              ABOUT
            </h2>
          </div>

          {/* Section label */}
          <p className="font-label-bold uppercase text-xs tracking-[0.3em] text-[#1c1b1b]/60 z-10">
            — The Person
          </p>

          {/* Story card */}
          <div className="z-10 mt-auto">
            <div
              className="about-card absolute bottom-0 bg-[#fdf8f8] border-4 border-[#1c1b1b] p-6 md:p-8 shadow-brutal-2xl inline-block hover:rotate-0 transition-transform duration-300 cursor-default"
              style={{ rotate: "-3deg" }}
            >
              <h3 className="font-display  text-2xl md:text-4xl uppercase font-black text-[#1c1b1b] mb-4">
                THE STORY
              </h3>
              <p className="font-body-lg text-base md:text-lg font-bold text-[#1c1b1b] max-w-md leading-7">
                Digital architect pushing pixels and code to their absolute limits. I don't just build
                interfaces — I engineer experiences that demand attention and refuse to be ignored.
              </p>
              {/* Download CV */}
              <a
                href="#"
                className="about-card mt-6 inline-flex items-center gap-2 font-label-bold text-xs uppercase tracking-widest bg-[#1c1b1b] text-[#fdf8f8] border-4 border-[#1c1b1b] px-5 py-2.5 shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <Download size={14} />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Right — cream panel */}
        <div
          ref={rightRef}
          className="relative bg-[#fdf8f8] flex flex-col items-center justify-center p-8 md:p-12"
        >
          {/* Spinning star */}
          <div className="absolute top-10 right-10 w-22 h-22 md:w-24 md:h-24 bg-[#c8f232] border-4 border-[#1c1b1b] rounded-full shadow-brutal-lg flex items-center justify-center animate-slow-spin z-10">
            <span className="material-symbols-outlined text-[36px] text-[#1c1b1b] font-black">star</span>
          </div>

          <div className="w-full max-w-lg space-y-8 z-10">
            {/* Design Philosophy */}
            <div
              className="about-card bg-[#000000] border-4 border-[#1c1b1b] p-6 shadow-brutal-xl hover:rotate-[1deg] transition-transform duration-300 cursor-default"
              style={{ rotate: "-1deg" }}
            >
              <h4 className="font-display text-white uppercase font-bold border-b-4 border-white pb-2 mb-4">
                {aboutCards.designPhilosophy.title}
              </h4>
              <p className="font-body-md text-[#e5e2e1] leading-6">
                {aboutCards.designPhilosophy.body}
              </p>
            </div>

            {/* Core Stack */}
            <div
              className="about-card bg-[#c8f232] border-4 border-[#1c1b1b] p-6 shadow-brutal-xl hover:rotate-[-1deg] transition-transform duration-300 ml-8 md:ml-16 cursor-default"
              style={{ rotate: "1deg" }}
            >
              <h4 className="font-display text-[#1c1b1b] uppercase font-bold border-b-4 border-[#1c1b1b] pb-2 mb-4">
                {aboutCards.coreStack.title}
              </h4>
              <ul className="font-label-bold uppercase text-[#1c1b1b] space-y-2 text-sm">
                {aboutCards.coreStack.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">check_box</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Decorative ghost text */}
          <h2
            className="absolute bottom-[-16px] right-6 font-display text-[8vw] uppercase font-black"
            style={{ WebkitTextStroke: "2px #1c1b1b", color: "transparent" }}
          >
            <img src="/eat.gif" alt="eat" className="h-30" />
          </h2>
        </div>
      </div>
    </section>
  );
}
