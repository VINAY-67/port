import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../data.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const cardRefs    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0, rotate: 3 },
        {
          y: 0, opacity: 1, rotate: 1,
          duration: 0.75,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      // Cards — stagger from bottom
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );

        // Hover tilt with gsap quickTo
        const xTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" });
        const yTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" });

        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top  + rect.height / 2;
          xTo(((e.clientX - cx) / rect.width)  *  8);
          yTo(((e.clientY - cy) / rect.height) * -8);
        };
        const onLeave = () => { xTo(0); yTo(0); };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        card._cleanupTilt = () => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        };
      });
    }, sectionRef);

    return () => {
      cardRefs.current.forEach((c) => c?._cleanupTilt?.());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="w-full border-t-4 border-[#1c1b1b] bg-[#fdf8f8] py-20 px-4 md:px-16 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">

        {/* Heading */}
        <div className="flex justify-center">
          <h2
            ref={headingRef}
            className="font-display text-2xl md:text-4xl uppercase font-black bg-[#c8f232] border-4 border-[#1c1b1b] py-4 px-10 shadow-brutal-lg inline-block"
            style={{ rotate: "1deg" }}
          >
            Core Stack
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: "800px" }}>
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`${skill.cardBg} border-4 border-[#1c1b1b] p-6 shadow-brutal-lg
                cursor-default select-none`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <h4 className="font-display text-xl md:text-2xl uppercase font-bold border-b-4 border-[#1c1b1b] pb-2 mb-5 text-[#1c1b1b]">
                {skill.title}
              </h4>
              <ul className="font-label-bold uppercase space-y-4 text-[#1c1b1b]">
{skill.items.map(({ icon: Icon, label }) => (
  <li
    key={label}
    className="flex items-center gap-3 text-sm"
  >
    <Icon className="text-[20px]" />
    {label}
  </li>
))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
