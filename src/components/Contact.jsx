import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ExternalLink, Send } from "lucide-react";
import { siteConfig } from "../data.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef   = useRef(null);
  const formRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading drops in
      gsap.fromTo(
        headingRef.current,
        { y: -50, opacity: 0, rotate: 2 },
        {
          y: 0, opacity: 1, rotate: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      // Contact links stagger
      const links = linksRef.current?.querySelectorAll(".contact-link");
      if (links) {
        gsap.fromTo(
          links,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }

      // Form slides in from right
      gsap.fromTo(
        formRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      // Form fields stagger in
      const fields = formRef.current?.querySelectorAll(".form-field");
      if (fields) {
        gsap.fromTo(
          fields,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.4,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-[#f7f3f2] px-4 md:px-16 py-24 border-t-4 border-[#1c1b1b] relative overflow-hidden"
    >
      {/* Ghost watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <span
          className="font-display text-[22vw] leading-none uppercase font-black tracking-tighter absolute -top-6 -left-8 opacity-[0.04] text-[#1c1b1b]"
          style={{ rotate: "5deg" }}
        >
          HI
        </span>
      </div>

      <div className="max-w-[1280px] w-full mx-auto relative">

        {/* Big heading */}
        <div ref={headingRef} className="mb-16">
          <p className="font-label-bold uppercase text-xs tracking-[0.3em] text-[#1c1b1b]/40 mb-4">
            — Get in Touch
          </p>
          <h2 className="font-display text-[12vw] md:text-[7vw] leading-none uppercase font-black text-[#1c1b1b] tracking-tighter">
            Let's{" "}
            <span
              className="bg-[#c8f232] border-4 border-[#1c1b1b] px-4 inline-block shadow-brutal-lg"
              style={{ rotate: "-1.5deg" }}
            >
              Connect
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col justify-between ">
          <div className="flex flex-col gap-8">
            <p className="font-body-lg text-lg font-bold text-[#444748] max-w-md leading-7">
              Ready to build something extraordinary? Drop me a line — whether it's a new project,
              a creative collaboration, or just a chat about brutalist design.
            </p>

            <div ref={linksRef} className="flex flex-col gap-4">
              {[
                { href: `mailto:${siteConfig.email}`, icon: <Mail size={20} />, label: siteConfig.email, accent: "bg-[#bc87fe]" },
                { href: siteConfig.linkedin, icon: <ExternalLink size={20} />, label: "LinkedIn Profile", accent: "bg-[#e5e2e1]" },
                { href: siteConfig.github, icon: <ExternalLink size={20} />, label: "GitHub Projects", accent: "bg-[#c8f232]" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-link group flex items-center gap-4 font-label-bold text-sm uppercase text-[#1c1b1b] w-max"
                >
                  <div className={`w-12 h-12 ${item.accent} border-4 border-[#1c1b1b] flex items-center justify-center shadow-brutal-sm group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all`}>
                    {item.icon}
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
            <img src="/dab.gif" alt="dab" className="h-40  w-fit grayscale" />
          {/* Left — info & links */}
          </div>


          {/* Right — form */}
          <div
            ref={formRef}
            className="bg-[#fdf8f8] border-4 border-[#1c1b1b] p-8 md:p-10 shadow-brutal-2xl"
          >
            <form className="flex flex-col gap-5">
              {[
                { id: "name",    label: "Name",    type: "text",  placeholder: "YOUR NAME" },
                { id: "email",   label: "Email",   type: "email", placeholder: "YOUR@EMAIL.COM" },
              ].map((field) => (
                <div key={field.id} className="form-field flex flex-col gap-2">
                  <label className="font-label-bold uppercase text-xs tracking-widest text-[#1c1b1b]" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="brutal-input"
                  />
                </div>
              ))}

              <div className="form-field flex flex-col gap-2">
                <label className="font-label-bold uppercase text-xs tracking-widest text-[#1c1b1b]" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="WHAT'S ON YOUR MIND?"
                  className="brutal-input"
                />
              </div>

              <button
                type="button"
                className="form-field mt-2 flex items-center justify-center gap-3 bg-[#1c1b1b] text-[#fdf8f8] border-4 border-[#1c1b1b] py-4 font-display text-lg uppercase font-black shadow-brutal-lg hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-150"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
