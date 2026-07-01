import { FaWhatsapp } from "react-icons/fa";

const DEMO_MSG = encodeURIComponent(
  "Hi! I'd like to book a FREE demo session at Muscle Empire Gymnasium. Please share the available slots."
);
const DEMO_LINK = `https://wa.me/919773053632?text=${DEMO_MSG}`;

export default function DemoBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[998] h-[52px] bg-[#0d0d0d] border-t border-white/[0.06] flex items-center justify-center gap-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <p className="text-white/70 text-[13px] font-medium">
        Book a{" "}
        <a href={DEMO_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold hover:underline">
          demo session
        </a>{" "}
        for{" "}
        <span className="text-[#FFC107] font-bold">FREE</span>
      </p>
      <a
        href={DEMO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1db954] text-white text-[11px] font-bold uppercase tracking-wide px-3.5 py-1.5 rounded-lg transition-all duration-200 hover:shadow-[0_2px_12px_rgba(37,211,102,0.4)] whitespace-nowrap"
      >
        <FaWhatsapp size={13} />
        Book now
      </a>
    </div>
  );
}
