import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import logo from "@/assets/images/logo.jpeg";

/* All links go into the hamburger menu */
const allLinks = [
  { name: "Home",         href: "#home" },
  { name: "Achievements", href: "#about" },
  { name: "Services",     href: "#services" },
  { name: "Why Us",       href: "#why-us" },
  { name: "Reviews",      href: "#reviews" },
  { name: "Contact",      href: "#contact" },
  { name: "Products",     href: "/products",  isPage: true },
  { name: "Offers",       href: "/offers",    isPage: true },
  { name: "Nutrition",    href: "/nutrition", isPage: true },
];
const pricingLinks = [
  { name: "Unisex Gym", href: "/unisex-gym-plans" },
  { name: "Female Gym", href: "/female-gym-plans" },
];

function smoothScroll(href: string) {
  const el = document.querySelector(href);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [open, setOpen]             = useState(false);
  const [pricingOpen, setPricing]   = useState(false);
  const [, navigate]                = useLocation();
  const pricingRef                  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* close pricing dropdown on outside click */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (pricingRef.current && !pricingRef.current.contains(e.target as Node)) setPricing(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleNav = (e: React.MouseEvent, href: string, isPage?: boolean) => {
    e.preventDefault();
    setOpen(false); setPricing(false);
    if (isPage || href.startsWith("/")) { sessionStorage.setItem("scroll_before_plans", String(window.scrollY)); navigate(href); }
    else setTimeout(() => smoothScroll(href), 10);
  };

  return (
    <motion.nav
      initial={{ y:-80, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-2xl border-b border-white/[0.055] shadow-[0_6px_24px_rgba(0,0,0,0.35)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <a href="/" onClick={e=>{ e.preventDefault(); navigate("/"); }}
            className="flex items-center gap-3 group select-none shrink-0">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#E8A820]/20 blur-lg group-hover:bg-[#E8A820]/35 transition-all"/>
              <img src={logo} alt="Muscle Empire"
                className="relative h-10 w-10 rounded-full object-cover border-[1.5px] border-[#E8A820]/55 group-hover:border-[#E8A820] transition-all"/>
            </div>
            <span className="font-display font-black text-[1.05rem] tracking-tight leading-none text-[#E8A820]">
              Muscle Empire
            </span>
          </a>

          {/* Right side: Join Now + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Join Now — always visible */}
            <a href="#contact" onClick={e=>handleNav(e,"#contact")}
              className="btn-gold text-[13px] px-5 py-2.5 hidden sm:inline-flex">
              Join Now
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(o=>!o)}
              className="w-10 h-10 flex items-center justify-center text-white/80 rounded-xl hover:bg-white/[0.07] transition-colors"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {open
                  ? <motion.div key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.15}}><X size={22}/></motion.div>
                  : <motion.div key="m" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.15}}><Menu size={22}/></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ── Full menu drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity:0, height:0 }}
            animate={{ opacity:1, height:"auto" }}
            exit={{ opacity:0, height:0 }}
            transition={{ duration:0.28, ease:"easeInOut" }}
            className="overflow-hidden bg-[#0d0d0d]/96 backdrop-blur-2xl border-b border-white/[0.05]"
          >
            <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col gap-0.5">

              {allLinks.map((link, i) => (
                <motion.a key={link.name} href={link.href}
                  initial={{ x:-12, opacity:0 }} animate={{ x:0, opacity:1 }}
                  transition={{ delay: i*0.03, duration:0.22 }}
                  onClick={e=>handleNav(e, link.href, link.isPage)}
                  className="flex items-center justify-between py-3 px-4 rounded-xl text-[15px] font-semibold text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Pricing submenu */}
              <div ref={pricingRef}>
                <motion.button
                  initial={{ x:-12, opacity:0 }} animate={{ x:0, opacity:1 }}
                  transition={{ delay: allLinks.length*0.03, duration:0.22 }}
                  onClick={() => setPricing(o=>!o)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-[15px] font-semibold text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  Pricing / Branches
                  <ChevronDown size={15} className={`transition-transform duration-200 ${pricingOpen?"rotate-180 text-[#E8A820]":""}`}/>
                </motion.button>
                <AnimatePresence>
                  {pricingOpen && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.2}} className="overflow-hidden pl-4">
                      {pricingLinks.map(l=>(
                        <a key={l.name} href={l.href} onClick={e=>handleNav(e,l.href,true)}
                          className="flex items-center gap-2.5 py-2.5 px-4 text-[14px] font-medium text-white/55 hover:text-[#E8A820] rounded-xl transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8A820]/60"/>
                          {l.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Join Now */}
              <div className="pt-3 pb-1 sm:hidden">
                <a href="#contact" onClick={e=>handleNav(e,"#contact")}
                  className="btn-gold block w-full text-center text-[14px]">
                  Join Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
