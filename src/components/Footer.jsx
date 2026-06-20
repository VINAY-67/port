import { FaLinkedin, FaGithub, FaDribbble } from "react-icons/fa";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../data.jsx";

const socialLinks = [
  { label: "LinkedIn",  href: "#", Icon: FaLinkedin },
  { label: "GitHub",    href: "#", Icon: FaGithub   },
  { label: "Dribbble",  href: "#", Icon: FaDribbble },
  { label: "Read.cv",   href: "#", Icon: ExternalLink },
];

export default function Footer() {
  return (
    <footer className="bg-[#1c1b1b] text-[#fdf8f8] border-t-4 border-[#1c1b1b]">

      {/* Top: big CTA row */}
      <div className="border-b-4 border-[#fdf8f8]/10 px-6 md:px-16 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-[1280px] mx-auto">
        <div>
          <p className="font-label-bold uppercase text-xs tracking-[0.3em] text-[#c8f232] mb-4">
            — Available for work
          </p>
          <h2 className="font-display text-4xl md:text-6xl uppercase font-black leading-none">
            Let's Build
            <br />
            <span className="bg-[#c8f232] text-[#1c1b1b] px-4 inline-block border-4 border-[#c8f232]">
              Something
            </span>
          </h2>
        </div>
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex-shrink-0 inline-flex items-center gap-3 font-label-bold uppercase text-sm bg-[#c8f232] text-[#1c1b1b] border-4 border-[#c8f232] px-8 py-4 shadow-[6px_6px_0px_#fdf8f8] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-150 font-black"
        >
          <ArrowUpRight size={18} />
          {siteConfig.email}
        </a>
      </div>

      {/* Middle: brand + social + nav */}
      <div className="px-6 md:px-16 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 border-b-4 border-[#fdf8f8]/10 max-w-[1280px] mx-auto">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#c8f232] border-2 border-[#c8f232] flex items-center justify-center">
              <span className="font-display font-black text-[#1c1b1b] text-lg">V</span>
            </div>
            <span className="font-display text-xl uppercase font-black tracking-tight">{siteConfig.brand}</span>
          </div>
          <p className="font-body-md text-sm text-[#a09f9e] leading-6 max-w-xs">
            Digital designer & developer building bold, honest, and high-performance web experiences.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-label-bold uppercase text-xs tracking-widest text-[#a09f9e] mb-5">Navigation</h4>
          <ul className="space-y-3">
            {["Work", "Services", "Journey", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="font-label-bold uppercase text-sm text-[#fdf8f8] hover:text-[#c8f232] hover:translate-x-1 transition-all inline-block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-label-bold uppercase text-xs tracking-widest text-[#a09f9e] mb-5">Socials</h4>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 font-label-bold text-xs uppercase text-[#fdf8f8] border-2 border-[#fdf8f8]/20 px-3 py-2 hover:border-[#c8f232] hover:text-[#c8f232] transition-colors"
                aria-label={label}
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: copyright */}
      <div className="px-6 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-2 max-w-[1280px] mx-auto">
        <p className="font-body-md text-xs text-[#a09f9e]">{siteConfig.copyright}</p>
        <p className="font-body-md text-xs text-[#a09f9e]">Handcrafted with GSAP & React</p>
      </div>
    </footer>
  );
}
