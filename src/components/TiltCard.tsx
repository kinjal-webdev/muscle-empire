import { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

export default function TiltCard({ children, className = "", glowColor = "rgba(232,168,32,0.18)", style = {} }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ rx: (0.5 - y) * 14, ry: (x - 0.5) * 14, gx: x * 100, gy: y * 100 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }); setHovered(false); }}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hovered ? 1.03 : 1})`,
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        willChange: "transform",
        cursor: "default",
      }}
    >
      {/* Cursor-following glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${glowColor} 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Top shimmer on hover */}
      <div
        className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(232,168,32,0.8), transparent)",
          opacity: hovered ? 0.7 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {children}
    </div>
  );
}
