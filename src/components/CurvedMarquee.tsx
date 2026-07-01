import { useEffect, useRef } from "react";

const WORDS = "MUSCLE EMPIRE \u2022 GHATKOPAR \u2022 ELITE TRAINING \u2022 TRANSFORM YOUR BODY \u2022 ";
const TEXT = WORDS.repeat(4);

export default function CurvedMarquee() {
  const g1Ref = useRef<SVGGElement>(null);
  const g2Ref = useRef<SVGGElement>(null);
  const xRef  = useRef(0);
  const raf   = useRef(0);

  // total pixel width of one copy — estimated, adjusted by speed
  // We animate translateX on two copies so it loops seamlessly
  useEffect(() => {
    const SPEED = 0.5; // px per frame
    // each "set" is half the total duplicated text — we shift until -50% and reset
    // but since SVG text width is unknown upfront we use a large enough shift
    const LOOP_W = 3800; // approx px for one full text set at this font size

    let x = 0;
    const tick = () => {
      x -= SPEED;
      if (x <= -LOOP_W) x = 0;

      if (g1Ref.current) g1Ref.current.setAttribute("transform", `translate(${x}, 0)`);
      if (g2Ref.current) g2Ref.current.setAttribute("transform", `translate(${x + LOOP_W}, 0)`);

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "#1C1C1E",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px 0",
      }}
    >
      <svg
        viewBox="0 0 1000 90"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          display: "block",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        <defs>
          {/* Gentle arc: starts low-left, rises to middle, falls to low-right */}
          <path
            id="arc"
            d="M 0,70 Q 250,10 500,45 Q 750,80 1000,30"
          />
          <clipPath id="clip">
            <rect x="0" y="0" width="1000" height="90" />
          </clipPath>
        </defs>

        <g clipPath="url(#clip)">
          {/* Group 1 */}
          <g ref={g1Ref}>
            <text
              style={{
                fontSize: "2.2rem",
                fontFamily: "'Syne', 'Inter', sans-serif",
                fontWeight: 800,
                fill: "#ffffff",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              <textPath href="#arc" startOffset="0%">
                {TEXT}
              </textPath>
            </text>
          </g>

          {/* Group 2 — offset copy for seamless loop */}
          <g ref={g2Ref}>
            <text
              style={{
                fontSize: "2.2rem",
                fontFamily: "'Syne', 'Inter', sans-serif",
                fontWeight: 800,
                fill: "#ffffff",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              <textPath href="#arc" startOffset="0%">
                {TEXT}
              </textPath>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
