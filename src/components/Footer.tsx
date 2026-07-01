import { FaInstagram, FaFacebookF } from "react-icons/fa";
import logo from "@/assets/images/logo.jpeg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#0d0d0d] pt-20 pb-10 border-t border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 mb-6 group"
            >
              <img
                src={logo}
                alt="Muscle Empire"
                className="h-14 w-14 object-cover rounded-full border-2 border-[#FFC107]/40 group-hover:border-[#FFC107] transition-colors"
              />
              <span className="font-display font-black text-lg text-[#FFC107] tracking-tight">
                Muscle Empire
              </span>
            </button>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              Ghatkopar's premier hardcore training facility. We provide the iron, you provide the dedication.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/musclempire_15"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/[0.06] rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all"
              >
                <FaInstagram size={17} />
              </a>
              <a
                href="https://www.facebook.com/musclemmpire"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/[0.06] rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all"
              >
                <FaFacebookF size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-[13px] uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {["#about|Achievements","#services|Programs","#pricing|Membership","#reviews|Reviews","#contact|Contact"].map((item) => {
                const [href, label] = item.split("|");
                return (
                  <li key={href}>
                    <a href={href} className="text-white/45 hover:text-[#FFC107] text-sm transition-colors">
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Training */}
          <div>
            <h4 className="text-white font-bold text-[13px] uppercase tracking-wider mb-5">Training</h4>
            <ul className="space-y-3">
              {["Personal Training","Strength & Conditioning","CrossFit","Weight Loss","Nutrition Planning"].map((s) => (
                <li key={s} className="text-white/45 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-[13px] uppercase tracking-wider mb-5">Visit Us</h4>
            <address className="not-italic text-sm text-white/45 space-y-4 leading-relaxed">
              <p>
                <strong className="text-white/80 block mb-0.5">Unisex Gym</strong>
                J/16, Jay Hanuman Mandir,<br />
                Barvenagar Colony, Bhatwadi,<br />
                Ghatkopar (West), Mumbai – 400084
              </p>
              <p>
                <strong className="text-white/80 block mb-0.5">Female Gym</strong>
                1st Floor, Ranveer Apartment,<br />
                Sanjay Kokate Lane, Bhatwadi,<br />
                Ghatkopar (West), Mumbai – 400084
              </p>
              <p>
                <strong className="text-white/80 block mb-0.5">Call / WhatsApp</strong>
                <a href="tel:+919773053632" className="hover:text-[#FFC107] transition-colors block">+91 97730 53632</a>
                <a href="tel:+919702268603" className="hover:text-[#FFC107] transition-colors block">+91 97022 68603 (Office)</a>
              </p>
              <p>
                <strong className="text-white/80 block mb-0.5">Email</strong>
                <a href="mailto:musclempire616@gmail.com" className="hover:text-[#FFC107] transition-colors">musclempire616@gmail.com</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-white/30 uppercase tracking-widest">
            &copy; {currentYear} Muscle Empire Gymnasium. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[12px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-[12px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
