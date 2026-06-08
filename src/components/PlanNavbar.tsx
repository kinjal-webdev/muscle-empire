import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import logo from "@/assets/images/logo.png";

interface Props {
  scrollKey: string; // key used to save/restore scroll position
}

export default function PlanNavbar({ scrollKey }: Props) {
  const [, navigate] = useLocation();

  const handleBack = () => {
    navigate("/");
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
            <img
              src={logo}
              alt="Muscle Empire"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
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
