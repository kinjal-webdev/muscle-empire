import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

interface Props {
  scrollKey: string; // key used to save/restore scroll position
}

export default function PlanNavbar({ scrollKey }: Props) {
  const [, navigate] = useLocation();

  const handleBack = () => {
    const saved = sessionStorage.getItem(scrollKey);
    navigate("/");
    // Restore scroll after route change renders
    if (saved !== null) {
      const y = parseInt(saved, 10);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: y, behavior: "instant" });
        });
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); handleBack(); }}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-primary clip-path-slant flex items-center justify-center text-black font-black text-xl group-hover:scale-110 transition-transform shrink-0">
              ME
            </div>
            <span className="font-display font-bold text-base sm:text-xl tracking-tighter uppercase">
              Muscle <span className="text-primary">Empire</span>
            </span>
          </a>

          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
