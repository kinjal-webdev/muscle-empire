import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 bg-primary clip-path-slant flex items-center justify-center text-black font-black text-xl">
                ME
              </div>
              <span className="font-display font-bold text-xl tracking-tighter uppercase">
                Muscle <span className="text-primary">Empire</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Ghatkopar's premier hardcore training facility. We provide the iron, you provide the dedication.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/musclempire_15" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary flex items-center justify-center text-white hover:text-primary hover:bg-white/5 transition-all rounded-sm">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.facebook.com/musclemmpire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary flex items-center justify-center text-white hover:text-primary hover:bg-white/5 transition-all rounded-sm">
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-muted-foreground hover:text-primary text-sm transition-colors uppercase tracking-wider">About Us</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary text-sm transition-colors uppercase tracking-wider">Programs</a></li>
              <li><a href="#trainers" className="text-muted-foreground hover:text-primary text-sm transition-colors uppercase tracking-wider">Trainers</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary text-sm transition-colors uppercase tracking-wider">Membership</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary text-sm transition-colors uppercase tracking-wider">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Training</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm uppercase tracking-wider">Personal Training</li>
              <li className="text-muted-foreground text-sm uppercase tracking-wider">Strength & Conditioning</li>
              <li className="text-muted-foreground text-sm uppercase tracking-wider">CrossFit</li>
              <li className="text-muted-foreground text-sm uppercase tracking-wider">Weight Loss</li>
              <li className="text-muted-foreground text-sm uppercase tracking-wider">Nutrition Planning</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Visit Us</h4>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed space-y-4">
              <p>
                <strong className="text-white block mb-1">Unisex Gym</strong>
                J/16, Jay Hanuman Mandir,<br />
                Barvenagar Colony, Bhatwadi,<br />
                Ghatkopar (West), Mumbai – 400084
              </p>
              <p>
                <strong className="text-white block mb-1">Female Gym</strong>
                1st Floor, Ranveer Apartment,<br />
                Sanjay Kokate Lane, Bhatwadi,<br />
                Ghatkopar (West), Mumbai – 400084
              </p>
              <p>
                <strong className="text-white block mb-1">Call / WhatsApp</strong>
                <a href="tel:+919773053632" className="hover:text-primary transition-colors block">+91 97730 53632</a>
                <a href="tel:+919702268603" className="hover:text-primary transition-colors block">+91 97022 68603 (Office)</a>
              </p>
              <p>
                <strong className="text-white block mb-1">Email</strong>
                <a href="mailto:musclempire616@gmail.com" className="hover:text-primary transition-colors">musclempire616@gmail.com</a>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            &copy; {currentYear} Muscle Empire Gymnasium. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
