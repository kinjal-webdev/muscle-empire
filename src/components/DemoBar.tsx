const DEMO_MSG = encodeURIComponent(
  "Hi! I'd like to book a FREE demo session at Muscle Empire Gymnasium. Please let me know the available slots."
);
const DEMO_LINK = `https://wa.me/919773053632?text=${DEMO_MSG}`;

export default function DemoBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[998] bg-white text-black flex items-center justify-center gap-2 py-3 px-4 shadow-[0_-4px_24px_rgba(0,0,0,0.25)]">
      <span className="text-sm md:text-base font-bold uppercase tracking-widest">
        Book a{" "}
        <a
          href={DEMO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#22a84a] underline underline-offset-2 decoration-2 hover:text-[#1a8a3a] transition-colors font-black"
        >
          demo
        </a>{" "}
        session for{" "}
        <span className="text-primary font-black" style={{ color: "#e6b800" }}>
          FREE
        </span>
      </span>
      <a
        href={DEMO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-black uppercase tracking-widest px-4 py-2 transition-colors whitespace-nowrap"
      >
        Book Now →
      </a>
    </div>
  );
}
