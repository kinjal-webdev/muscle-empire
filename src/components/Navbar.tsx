import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import logo from "@/assets/images/logo.jpeg";

const navLinks = [
  { name: "Home",         href: "#home" },
  { name: "Achievements", href: "#about" },
  { name: "Services",     href: "#services" },
  { name: "Reviews",      href: "#reviews" },
  { name: "Contact",      href: "#contact" },
  { name: "Products",     href: "/products",   isPage: true },
  { name: "Offers",       href: "/offers",     isPage: true },
  { name: "Nutrition",    href: "/nutrition",  isPage: true },
];

const pricingLinks = [
  { name: "Unisex Gym",  href: "/unisex-gym-plans" },
  { name: "Female Gym",  href: "/female-gym-plans" },
];

function smoothScroll(href: string) {
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Navbar() {
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileOpen,      setMobileOpen]       = useState(false);
  const [activeSection,   setActiveSection]    = useState("home");
  const [pricingOpen,     setPricingOpen]      = useState(false);
  const [mobilePricing,   setMobilePricing]    = useState(false);
  const pricingRef = useRef<HTMLLIElement>(null);
  const [, navigate] = useLocation();

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active section via IntersectionObserver */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* close pricing dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pricingRef.current && !pricingRef.current.contains(e.target as Node))
        setPricingOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (e: React.MouseEvent, href: string, isPage?: boolean) => {
    e.preventDefault();
    setMobileOpen(false);
    setPricingOpen(false);
    if (isPage || href.startsWith("/")) {
      sessionStorage.setItem("scroll_before_plans", String(window.scrollY));
      navigate(href);
    } else {
      setTimeout(() => smoothScroll(href), 10);
    }
  };

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/88 backdrop-blur-2xl border-b border-white/[0.055] shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Logo ────────────────────────────────── */}
          <a
            href="/"
            onClick={e => { e.preventDefault(); navigate("/"); }}
            className="flex items-center gap-3 group select-none"
          >
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#FFC107]/20 blur-lg scale-110 group-hover:bg-[#FFC107]/35 transition-all duration-400" />
              <img
                src={logo}
                alt="Muscle Empire"
                className="relative h-11 w-11 rounded-full object-cover border-[1.5px] border-[#FFC107]/60 group-hover:border-[#FFC107] transition-all duration-300"
              />
            </div>
            <span className="font-display font-black text-[1.15rem] tracking-tight leading-none text-[#FFC107]">
              Muscle Empire
            </span>
          </a>

          {/* ── Desktop links ───────────────────────── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={e => handleNav(e, link.href, link.isPage)}
                className={`relative px-3.5 py-2 text-[13px] font-semibold rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-[#FFC107]"
                    : "text-white/60 hover:text-white/90 hover:bg-white/[0.05]"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="active-dot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FFC107]"
                  />
                )}
              </a>
            ))}

            {/* pricing dropdown */}
            <li className="list-none relative" ref={pricingRef}>
              <button
                onClick={() => setPricingOpen(o => !o)}
                className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold rounded-xl transition-all duration-200 ${
                  pricingOpen ? "text-[#FFC107] bg-[#FFC107]/[0.06]" : "text-white/60 hover:text-white/90 hover:bg-white/[0.05]"
                }`}
              >
                Pricing
                <ChevronDown size={13} className={`transition-transform duration-250 ${pricingOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {pricingOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-52 bg-[#161616] border border-white/10 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.6)] z-50 overflow-hidden p-1.5"
                  >
                    {pricingLinks.map(link => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={e => handleNav(e, link.href)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-white/65 hover:text-white hover:bg-white/[0.07] rounded-xl transition-all duration-150"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] shrink-0" />
                        {link.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <a
              href="#contact"
              onClick={e => handleNav(e, "#contact")}
              className="ml-3 btn-gold text-[13px] px-5 py-2.5"
            >
              Join Now
            </a>
          </div>

          {/* ── Hamburger ───────────────────────────── */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white/80 rounded-xl hover:bg-white/[0.07] transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.span key="x" initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:.15 }}><X size={22}/></motion.span>
                : <motion.span key="m" initial={{ rotate:90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:-90,opacity:0 }} transition={{ duration:.15 }}><Menu size={22}/></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mob"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#0a0a0a]/96 backdrop-blur-2xl border-b border-white/[0.05]"
          >
            <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.035, duration: 0.22 }}
                  onClick={e => handleNav(e, link.href, link.isPage)}
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl text-[15px] font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[#FFC107] bg-[#FFC107]/[0.07]"
                      : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] shrink-0" />}
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile pricing */}
              <div>
                <button
                  onClick={() => setMobilePricing(o => !o)}
                  className="w-full flex items-center justify-between py-3 px-4 text-[15px] font-medium text-white/70 hover:text-white rounded-xl hover:bg-white/[0.05] transition-colors"
                >
                  Pricing / Branches
                  <ChevronDown size={15} className={`transition-transform duration-200 ${mobilePricing ? "rotate-180 text-[#FFC107]" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobilePricing && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      {pricingLinks.map(link => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={e => handleNav(e, link.href)}
                          className="flex items-center gap-2.5 py-2.5 px-4 text-[14px] font-medium text-white/55 hover:text-[#FFC107] rounded-xl transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]/60" />
                          {link.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-3 pb-1">
                <a
                  href="#contact"
                  onClick={e => handleNav(e, "#contact")}
                  className="btn-gold block w-full text-center text-[14px]"
                >
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
