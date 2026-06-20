import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "../data.jsx";

/* ─── Character-swap hover text ─────────────────────────── */
function HoverText({ children }) {
  const text   = typeof children === "string" ? children : "";
  const chars  = text.split("");
  const containerRef = useRef(null);
  const origRef      = useRef(null);
  const replRef      = useRef(null);

  useEffect(() => {
    const el   = containerRef.current;
    const orig = origRef.current;
    const repl = replRef.current;
    if (!el || !orig || !repl) return;

    const origChars = [...orig.children];
    const replChars = [...repl.children];

    gsap.set(replChars, { y: "100%" });

    const enter = () => {
      gsap.to(origChars, { y: "-100%", stagger: 0.03, duration: 0.28, ease: "power2.in",  overwrite: "auto" });
      gsap.fromTo(replChars, { y: "100%" }, { y: "0%", stagger: 0.03, duration: 0.28, ease: "power2.out", overwrite: "auto" });
    };
    const leave = () => {
      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(replChars, { y: "-100%", stagger: 0.03, duration: 0.25, ease: "power2.in" }, 0)
        .set(origChars, { y: "100%" }, 0)
        .to(origChars, { y: "0%", stagger: 0.03, duration: 0.25, ease: "power2.out" }, 0);
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      gsap.killTweensOf([origChars, replChars]);
    };
  }, [text]);

  return (
    <span ref={containerRef} className="relative overflow-hidden inline-block align-middle">
      <span ref={origRef} className="block whitespace-nowrap">
        {chars.map((ch, i) => <span key={i} className="inline-block">{ch === " " ? "\u00A0" : ch}</span>)}
      </span>
      <span ref={replRef} className="absolute top-0 left-0 block whitespace-nowrap">
        {chars.map((ch, i) => <span key={i} className="inline-block">{ch === " " ? "\u00A0" : ch}</span>)}
      </span>
    </span>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */
export default function Navbar({ loaded }) {
  const navRef      = useRef(null);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* initial hide */
  useEffect(() => {
    gsap.set(navRef.current, { y: -80, opacity: 0 });
  }, []);

  /* entrance after loading */
  useEffect(() => {
    if (!loaded) return;
    gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.4 });
  }, [loaded]);

  /* scroll-aware background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`sticky top-0 z-50 w-full border-b-4 border-[#1c1b1b] transition-colors duration-300 ${
          scrolled ? "bg-[#fdf8f8]" : "bg-[#fdf8f8]/80 backdrop-blur-md"
        }`}
      >
        <div className="flex justify-between items-center w-full px-4 md:px-16 py-3 max-w-[1280px] mx-auto">

          {/* Brand */}
          <a className="flex items-center gap-2 group" href="#">
            <div className="w-9 h-9 bg-[#c8f232] border-2 border-[#1c1b1b] shadow-brutal-sm flex items-center justify-center group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all duration-100">
              <span className="font-display font-black text-[#1c1b1b] text-base leading-none">V</span>
            </div>
            <span className="font-display text-lg uppercase font-black text-[#1c1b1b] tracking-tight">
              {siteConfig.brand}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 font-label-bold uppercase text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-bold text-[#444748] hover:text-[#1c1b1b] transition-colors"
              >
                <HoverText>{link.label}</HoverText>
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 bg-[#c8f232] text-[#1c1b1b] border-4 border-[#1c1b1b] px-5 py-2 font-label-bold uppercase text-sm shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150 font-black"
            >
              <HoverText>Let's Build</HoverText>
            </a>
            <button
              className="md:hidden text-[#1c1b1b] p-2 border-4 border-[#1c1b1b] shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all bg-[#c8f232]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#fdf8f8] border-b-4 border-[#1c1b1b] flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-5xl uppercase font-black text-[#1c1b1b] hover:text-[#444748] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-[#c8f232] text-[#1c1b1b] border-4 border-[#1c1b1b] px-8 py-4 font-display text-xl uppercase font-black shadow-brutal-md"
          >
            Let's Build
          </a>
        </div>
      )}
    </>
  );
}
