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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close pricing dropdown on outside click
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="flex items-center gap-3 group"
          >
            <img
              src={logo}
              alt="Muscle Empire"
              className="h-14 w-14 object-cover rounded-full border-2 border-primary group-hover:scale-105 transition-transform shrink-0"
            />
            <span className="font-display font-black text-lg sm:text-2xl tracking-tighter uppercase text-primary">
              Muscle Empire
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.isPage)}
                    className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary ${
                      activeSection === link.href.substring(1)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}

              {/* Pricing dropdown */}
              <li className="relative" ref={pricingRef}>
                <button
                  onClick={() => setPricingOpen((o) => !o)}
                  className={`flex items-center gap-1 text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary ${
                    pricingOpen ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Pricing / Branches
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${pricingOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {pricingOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-background border border-border shadow-xl z-50 overflow-hidden"
                    >
                      {pricingLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="block px-4 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-card transition-colors border-b border-border/40 last:border-0"
                        >
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
              className="bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider px-8 py-2 text-sm transition-colors clip-path-slant"
            >
              Join Now
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-foreground p-2 z-10"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isPage)}
                  className={`py-3 text-base font-bold uppercase tracking-wider border-b border-border/30 transition-colors active:text-primary ${
                    activeSection === link.href.substring(1) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile Pricing dropdown */}
              <div className="border-b border-border/30">
                <button
                  onClick={() => setMobilePricingOpen((o) => !o)}
                  className="w-full flex items-center justify-between py-3 text-base font-bold uppercase tracking-wider text-foreground"
                >
                  Pricing / Branches
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobilePricingOpen ? "rotate-180 text-primary" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobilePricingOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {pricingLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="block pl-4 py-2.5 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                        >
                          → {link.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-3 w-full text-center bg-primary text-black font-black uppercase tracking-widest py-3 text-sm transition-colors active:bg-primary/80"
              >
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
