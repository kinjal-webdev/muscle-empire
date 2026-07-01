import { useEffect, useRef } from "react";

const TEXT = "MUSCLE EMPIRE • GHATKOPAR • ELITE TRAINING • TRANSFORM YOUR BODY • ";
const REPEAT = 3; // repeat text on the path for density

export default function CurvedMarquee() {
  const textRef1 = useRef<SVGTextPathElement>(null);
  const textRef2 = useRef<SVGTextPathElement>(null);
  const offset = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const tick = () => {
      offset.current = (offset.current - 0.04) % 100;
      const val = `${offset.current}%`;
      if (textRef1.current) textRef1.current.setAttribute("startOffset", val);
      // second layer offset by 50% for seamless fill
      const val2 = `${(offset.current + 50) % 100}%`;
      if (textRef2.current) textRef2.current.setAttribute("startOffset", val2);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const full = TEXT.repeat(REPEAT);

  return (
    <div
      className="curved-loop-jacket"
      style={{
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        background: "#1C1C1E",
        overflow: "hidden",
        padding: "0",
      }}
    >
      <svg
        className="curved-loop-svg"
        style={{
          userSelect: "none",
          width: "100%",
          aspectRatio: "100 / 12",
          overflow: "visible",
          display: "block",
          fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
          fill: "#ffffff",
          fontWeight: 700,
          textTransform: "uppercase",
          lineHeight: 1,
        }}
        viewBox="0 0 1000 120"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Arc path — gentle upward curve */}
          <path
            id="curvePath"
            d="M -500,100 Q 250,10 500,60 Q 750,110 1500,40"
          />
        </defs>

        {/* Layer 1 */}
        <text>
          <textPath
            ref={textRef1}
            href="#curvePath"
            startOffset="0%"
            style={{ fontFamily: "'Syne', 'Inter', sans-serif", fontWeight: 800, letterSpacing: "0.08em" }}
          >
            {full}
          </textPath>
        </text>

        {/* Layer 2 — offset for seamless fill */}
        <text>
          <textPath
            ref={textRef2}
            href="#curvePath"
            startOffset="50%"
            style={{ fontFamily: "'Syne', 'Inter', sans-serif", fontWeight: 800, letterSpacing: "0.08em" }}
          >
            {full}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
