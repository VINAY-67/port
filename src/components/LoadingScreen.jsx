import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }) {
  const screenRef = useRef(null);
  const textRef = useRef(null);
  const lettersRef = useRef([]);
  const stripsRef = useRef([]);

  useEffect(() => {
    const screenEl = screenRef.current;
    const textEl = textRef.current;
    if (!screenEl || !textEl) return;

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => onComplete(),
    });

    gsap.set(screenEl, { clipPath: "inset(0%)" });
    gsap.set(stripsRef.current, { y: "-100%" });
    gsap.set(textEl, { opacity: 0 });

    tl.to(stripsRef.current, {
      y: "0%",
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
    })
    .to(textEl, { opacity: 1, duration: 0.3 }, "-=0.2")
    .fromTo(lettersRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.7)" }, "-=0.1")
    .to(textEl, { scale: 6, opacity: 0, duration: 0.8, ease: "power2.in" }, "+=0.4")
    .to(screenEl, { clipPath: "inset(100% 0% 0% 0%)", duration: 0.8, ease: "power2.inOut" }, "-=0.5")
    .to(screenEl, { opacity: 0, duration: 0.1 }, "+=0.05");

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (stripsRef.current[i] = el)}
            className={`h-full w-1/6 ${i < 5 ? "border-r-2 border-[#a3d11e]" : ""}`}
            style={{ backgroundColor: i % 2 === 0 ? "#c8f232" : "#bde62e" }}
          />
        ))}
      </div>
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center select-none"
      >
        <div className="flex items-baseline justify-center gap-[0.02em]">
          {["V", "i", "N", "A", "Y"].map((letter, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="font-display text-[20vw] font-black text-[#1c1b1b] leading-[0.85] inline-block"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
