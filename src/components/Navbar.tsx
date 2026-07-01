import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import logo from "@/assets/images/logo.jpeg";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Achievements", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
  { name: "Products", href: "/products", isPage: true },
  { name: "Offers", href: "/offers", isPage: true },
  { name: "Nutrition", href: "/nutrition", isPage: true },
];

const pricingLinks = [
  { name: "Unisex Gym", href: "/unisex-gym-plans" },
  { name: "Female Gym", href: "/female-gym-plans" },
];

function scrollTo(href: string) {
  const element = document.querySelector(href);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [pricingOpen, setPricingOpen] = useState(false);
  const [mobilePricingOpen, setMobilePricingOpen] = useState(false);
  const pricingRef = useRef<HTMLLIElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pricingRef.current && !pricingRef.current.contains(e.target as Node)) {
        setPricingOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string, isPage?: boolean) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setPricingOpen(false);
    if (isPage || href.startsWith("/")) {
      sessionStorage.setItem("scroll_before_plans", String(window.scrollY));
      navigate(href);
    } else {
      setTimeout(() => scrollTo(href), 10);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-[#111111]/90 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.4)] border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="flex items-center gap-3 group select-none"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#FFC107]/20 blur-md group-hover:bg-[#FFC107]/40 transition-all duration-300" />
              <img
                src={logo}
                alt="Muscle Empire"
                className="relative h-12 w-12 object-cover rounded-full border-2 border-[#FFC107]/60 group-hover:border-[#FFC107] transition-all duration-300 shrink-0"
              />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-[#FFC107] leading-none">
              Muscle Empire
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.isPage)}
                      className={`relative px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 rounded-lg ${
                        isActive
                          ? "text-[#FFC107]"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#FFC107] rounded-full"
                        />
                      )}
                    </a>
                  </li>
                );
              })}

              {/* Pricing dropdown */}
              <li className="relative" ref={pricingRef}>
                <button
                  onClick={() => setPricingOpen((o) => !o)}
                  className={`flex items-center gap-1 px-3 py-2 text-[13px] font-semibold tracking-wide rounded-lg transition-colors duration-200 ${
                    pricingOpen ? "text-[#FFC107]" : "text-white/70 hover:text-white"
                  }`}
                >
                  Pricing
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${pricingOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {pricingOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#1c1c1c] border border-white/10 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] z-50 overflow-hidden p-1"
                    >
                      {pricingLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="flex items-center gap-2 px-4 py-3 text-[13px] font-semibold text-white/70 hover:text-white hover:bg-white/[0.07] rounded-xl transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                          {link.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="ml-2 bg-[#FFC107] text-black hover:bg-[#e6ae06] font-bold text-[13px] tracking-wide uppercase px-6 py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(255,193,7,0.4)] hover:-translate-y-0.5"
            >
              Join Now
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white rounded-xl hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#111111]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  onClick={(e) => handleNavClick(e, link.href, link.isPage)}
                  className={`py-3 px-4 text-[15px] font-semibold rounded-xl transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "text-[#FFC107] bg-[#FFC107]/10"
                      : "text-white/80 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile Pricing */}
              <div>
                <button
                  onClick={() => setMobilePricingOpen((o) => !o)}
                  className="w-full flex items-center justify-between py-3 px-4 text-[15px] font-semibold text-white/80 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors"
                >
                  Pricing / Branches
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobilePricingOpen ? "rotate-180 text-[#FFC107]" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobilePricingOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      {pricingLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="flex items-center gap-2 py-2.5 px-4 text-[14px] font-semibold text-white/60 hover:text-[#FFC107] rounded-xl transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                          {link.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-2 pb-1">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="block w-full text-center bg-[#FFC107] text-black font-black uppercase tracking-wider py-3.5 rounded-xl text-[14px] hover:bg-[#e6ae06] transition-colors"
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
