import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Share2, Bookmark } from "lucide-react";
import { projects } from "../data.jsx";

gsap.registerPlugin(ScrollTrigger);

// Accent colors cycling per card — true to the site palette
const CARD_ACCENTS = ["bg-[#c8f232]", "bg-[#bc87fe]", "bg-[#fdf8f8]"];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Heading stamp drop
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: -40, opacity: 0, rotate: -2 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;

        const imgWrap = card.querySelector(".proj-img");
        const infoCard = card.querySelector(".proj-info");
        const techCard = card.querySelector(".proj-tech");
        const numStamp = card.querySelector(".proj-num");
        const tags = card.querySelectorAll(".proj-tag");
        const cta = card.querySelector(".proj-cta");

        // ── Main card slides in from left / right ──
        gsap.fromTo(
          card,
          { x: isLeft ? -120 : 120, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // ── Image wipe from entry side ──
        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            {
              clipPath: isLeft
                ? "inset(0 100% 0 0)"
                : "inset(0 0 0 100%)",
            },
            {
              clipPath: "inset(0 0% 0 0%)",
              duration: 1.15,
              ease: "power4.out",
              delay: 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // ── Number stamp bounces in ──
        if (numStamp) {
          gsap.fromTo(
            numStamp,
            { scale: 0, rotate: isLeft ? -15 : 15, opacity: 0 },
            {
              scale: 1,
              rotate: isLeft ? -3 : 3,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(2.5)",
              delay: 0.25,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // ── Info card pops up from below ──
        if (infoCard) {
          gsap.fromTo(
            infoCard,
            { y: 50, opacity: 0, rotate: isLeft ? 2 : -2 },
            {
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.85,
              ease: "power3.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // ── Tech card wobbles in ──
        if (techCard) {
          gsap.fromTo(
            techCard,
            { y: 40, opacity: 0, rotate: isLeft ? -4 : 4 },
            {
              y: 0,
              opacity: 1,
              rotate: isLeft ? 2 : -2,
              duration: 0.75,
              ease: "back.out(1.8)",
              delay: 0.35,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // ── Tags stagger ──
        if (tags.length) {
          gsap.fromTo(
            tags,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.4,
              ease: "power2.out",
              delay: 0.45,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // ── CTA slides in ──
        if (cta) {
          gsap.fromTo(
            cta,
            { x: isLeft ? -30 : 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
              delay: 0.55,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[#fdf8f8] border-t-4 border-[#1c1b1b] py-24 px-4 md:px-16 overflow-hidden"
    >
      {/* ── Background watermark ── */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.04]"
        aria-hidden
      >
        <h2
          className="font-display text-[22vw] leading-none uppercase text-[#1c1b1b] font-black tracking-tighter absolute -bottom-10 -right-10"
          style={{ rotate: "-8deg" }}
        >
          WORK
        </h2>
      </div>

      {/* ── Section heading ── */}
      <div ref={headingRef} className="mb-20 flex justify-between">
        <div>
        <p className="font-label-bold uppercase text-xs tracking-[0.3em] text-[#1c1b1b] mb-4">
          — Selected Work
        </p>
        <div className="flex flex-wrap items-end gap-6">
          <h2 className="font-display text-6xl md:text-8xl uppercase font-black text-[#1c1b1b] leading-none border-b-4 border-[#1c1b1b]">
            Projects
          </h2>
          {/* Lime accent badge */}
          <div
            className="bg-[#c8f232] border-4 border-[#1c1b1b] px-5 py-2 shadow-[6px_6px_0px_#1c1b1b] mb-1"
            style={{ rotate: "-2deg" }}
          >
            <span className="font-label-bold text-sm uppercase text-[#1c1b1b]">
              {projects.length} Cases
            </span>
          </div>
        </div>
        </div>
        <img src="/work.gif" alt="funny" className="h-35 grayscale" />
      </div>

      {/* ── Cards ── */}
      <div className="flex flex-col gap-28 max-w-6xl mx-auto">
        {projects.map((project, i) => {
          const isLeft = i % 2 === 0;
          const accentBg = CARD_ACCENTS[i % CARD_ACCENTS.length];

          return (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`relative flex flex-col ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              } gap-6 md:gap-10 items-start`}
            >
              {/* ── Number stamp ── */}
              <div
                className={`proj-num absolute z-20 ${
                  isLeft
                    ? "-top-6 -left-4 md:-left-8"
                    : "-top-6 -right-4 md:-right-8"
                } ${accentBg} border-4 border-[#1c1b1b] shadow-[5px_5px_0px_#1c1b1b] px-4 py-2`}
                style={{ rotate: isLeft ? "-3deg" : "3deg" }}
              >
                <span className="font-display text-2xl font-black text-[#1c1b1b] uppercase leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* ── Image ── */}
              <div
                className="proj-img relative w-full md:w-[55%] aspect-[16/10] overflow-hidden border-4 border-[#1c1b1b] shadow-[8px_8px_0px_#1c1b1b] group flex-shrink-0"
              >
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Dark scrim */}
                <div className="absolute inset-0 bg-[#1c1b1b]/30" />

                {/* Category chip — neo-brutal style */}
                <div
                  className={`absolute bottom-4 ${isLeft ? "left-4" : "right-4"} ${accentBg} border-2 border-[#1c1b1b] px-3 py-1`}
                >
                  <span className="font-label-bold text-[10px] uppercase tracking-widest text-[#1c1b1b]">
                    {project.category}
                  </span>
                </div>

                {/* Hover: action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button className="bg-[#fdf8f8] text-[#1c1b1b] border-2 border-[#1c1b1b] p-2 hover:-translate-y-1 hover:shadow-[4px_4px_0_#1c1b1b] transition-all">
                    <Share2 size={14} />
                  </button>
                  <button
                    className={`${accentBg} text-[#1c1b1b] border-2 border-[#1c1b1b] p-2 hover:-translate-y-1 hover:shadow-[4px_4px_0_#1c1b1b] transition-all`}
                  >
                    <Bookmark size={14} />
                  </button>
                </div>
              </div>

              {/* ── Right/Left content column ── */}
              <div className="flex flex-col gap-5 w-full md:w-[45%] pt-8 md:pt-10">

                {/* ── Info card (title + desc) — the brutalist "sticker" ── */}
                <div
                  className="proj-info bg-[#1c1b1b] border-4 border-[#1c1b1b] p-6 md:p-8 shadow-[8px_8px_0px_#1c1b1b] hover:shadow-[12px_12px_0px_#1c1b1b] hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <h3 className="font-display text-2xl md:text-4xl uppercase font-black text-[#fdf8f8] leading-tight mb-3">
                    {project.title}
                  </h3>
                  {/* Thick underline accent */}
                  <div className={`w-10 h-1 ${accentBg} mb-4`} />
                  <p className="font-body-md text-[#a09f9e] leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>
                </div>

                {/* ── Tech card — tilted brutalist card ── */}
                <div
                  className={`proj-tech ${accentBg} border-4 border-[#1c1b1b] p-5 shadow-[6px_6px_0px_#1c1b1b] self-start`}
                  style={{ rotate: isLeft ? "2deg" : "-2deg" }}
                >
                  <h4 className="font-label-bold uppercase text-xs border-b-2 border-[#1c1b1b] mb-3 pb-1 text-[#1c1b1b]">
                    Tech Stack
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="proj-tag font-label-bold text-xs uppercase bg-[#1c1b1b] text-[#fdf8f8] border border-[#1c1b1b] px-2 py-1 hover:bg-[#fdf8f8] hover:text-[#1c1b1b] transition-colors duration-150"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── CTA button ── */}
                <div className="proj-cta">
                  <a
                    href={project.link}
                    className={`inline-flex items-center gap-3 font-label-bold uppercase text-sm ${accentBg} text-[#1c1b1b] border-4 border-[#1c1b1b] px-6 py-3 shadow-[5px_5px_0px_#1c1b1b] hover:shadow-[8px_8px_0px_#1c1b1b] hover:-translate-y-1 hover:-translate-x-0.5 transition-all duration-200`}
                  >
                    View Project
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer divider strip ── */}
      <div className="mt-28 border-t-4 border-[#1c1b1b] pt-6 flex justify-between items-center">
        <span className="font-label-bold text-xs uppercase tracking-widest text-[#1c1b1b]">
          End of selected work
        </span>
        <div className="bg-[#c8f232] border-4 border-[#1c1b1b] px-4 py-2 shadow-[4px_4px_0px_#1c1b1b]">
          <span className="font-label-bold text-xs uppercase text-[#1c1b1b]">
            More coming soon ↓
          </span>
        </div>
      </div>
    </section>
  );
}
