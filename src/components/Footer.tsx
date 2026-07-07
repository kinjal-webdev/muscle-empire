import { FaInstagram, FaFacebookF } from "react-icons/fa";
import logo from "@/assets/images/logo.jpeg";

const quickLinks = [
  { href: "#about",    label: "Achievements" },
  { href: "#services", label: "Programs" },
  { href: "#pricing",  label: "Membership" },
  { href: "#reviews",  label: "Reviews" },
  { href: "#contact",  label: "Contact" },
];

const training = ["Personal training", "Strength & conditioning", "CrossFit", "Weight loss", "Nutrition planning"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-20 pb-10 border-t border-black/[0.08]" style={{ background: "#F0EEE9" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 mb-5 group">
              <img src={logo} alt="Muscle Empire"
                className="h-12 w-12 rounded-full object-cover border-[1.5px] border-[#E8A820]/60 group-hover:border-[#E8A820] transition-colors" />
              <span className="font-display font-black text-[1.1rem] text-[#E8A820] tracking-tight">Muscle Empire</span>
            </button>
            <p className="text-[#444] text-[0.92rem] leading-relaxed mb-6">
              Ghatkopar's premier hardcore training facility. We provide the iron, you provide the dedication.
            </p>
            <div className="flex gap-2.5">
              {[
                { href: "https://www.instagram.com/musclempire_15", Icon: FaInstagram },
                { href: "https://www.facebook.com/musclemmpire", Icon: FaFacebookF },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-black/[0.06] flex items-center justify-center text-[#444] hover:text-[#1C1C1E] hover:bg-black/[0.12] transition-all duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[#1C1C1E] font-bold text-[13px] uppercase tracking-widest mb-5">Quick links</h4>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-[#555] hover:text-[#E8A820] text-[0.92rem] transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training */}
          <div>
            <h4 className="text-[#1C1C1E] font-bold text-[13px] uppercase tracking-widest mb-5">Training</h4>
            <ul className="space-y-3">
              {training.map(t => (
                <li key={t} className="text-[#555] text-[0.92rem]">{t}</li>
              ))}
            </ul>
          </div>

          {/* Visit us */}
          <div>
            <h4 className="text-[#1C1C1E] font-bold text-[13px] uppercase tracking-widest mb-5">Visit us</h4>
            <address className="not-italic text-[0.9rem] text-[#555] space-y-4 leading-relaxed">
              <p>
                <strong className="text-[#1C1C1E] block mb-0.5 font-semibold">Unisex gym</strong>
                J/16, Jay Hanuman Mandir, Barvenagar Colony,<br />Bhatwadi, Ghatkopar West, Mumbai – 400084
              </p>
              <p>
                <strong className="text-[#1C1C1E] block mb-0.5 font-semibold">Female gym</strong>
                1st Floor, Ranveer Apartment, Sanjay Kokate Lane,<br />Bhatwadi, Ghatkopar West, Mumbai – 400084
              </p>
              <p>
                <strong className="text-[#1C1C1E] block mb-0.5 font-semibold">Call / WhatsApp</strong>
                <a href="tel:+919773053632" className="hover:text-[#E8A820] transition-colors block">+91 97730 53632</a>
                <a href="tel:+919702268603" className="hover:text-[#E8A820] transition-colors block">+91 97022 68603 (Office)</a>
              </p>
              <p>
                <strong className="text-[#1C1C1E] block mb-0.5 font-semibold">Email</strong>
                <a href="mailto:musclempire616@gmail.com" className="hover:text-[#E8A820] transition-colors">musclempire616@gmail.com</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-black/[0.07] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#777] uppercase tracking-widest">
            &copy; {year} Muscle Empire Gymnasium. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[12px] text-[#777] hover:text-[#333] transition-colors uppercase tracking-widest">Privacy policy</a>
            <a href="#" className="text-[12px] text-[#777] hover:text-[#333] transition-colors uppercase tracking-widest">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
