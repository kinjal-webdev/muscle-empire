import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cubes.css';

interface CubesProps {
  gridSize?: number;
  cubeSize?: number;
  maxAngle?: number;
  radius?: number;
  easing?: string;
  duration?: { enter: number; leave: number };
  cellGap?: number | { row?: number; col?: number };
  borderStyle?: string;
  faceColor?: string;
  shadow?: boolean | string;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  rippleColor?: string;
  rippleSpeed?: number;
}

const Cubes = ({
  gridSize = 10,
  cubeSize,
  maxAngle = 45,
  radius = 3,
  easing = 'power3.out',
  duration = { enter: 0.3, leave: 0.6 },
  cellGap,
  borderStyle = '1px solid #fff',
  faceColor = '#120F17',
  shadow = false,
  autoAnimate = true,
  rippleOnClick = true,
  rippleColor = '#fff',
  rippleSpeed = 2,
}: CubesProps) => {
  const sceneRef     = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userActiveRef = useRef(false);
  const simPosRef    = useRef({ x: 0, y: 0 });
  const simTargetRef = useRef({ x: 0, y: 0 });
  const simRAFRef    = useRef<number | null>(null);

  const colGap = typeof cellGap === 'number' ? `${cellGap}px`
    : (cellGap as any)?.col !== undefined ? `${(cellGap as any).col}px` : '5%';
  const rowGap = typeof cellGap === 'number' ? `${cellGap}px`
    : (cellGap as any)?.row !== undefined ? `${(cellGap as any).row}px` : '5%';
  const enterDur = duration.enter;
  const leaveDur = duration.leave;

  const tiltAt = useCallback((rowCenter: number, colCenter: number) => {
    if (!sceneRef.current) return;
    sceneRef.current.querySelectorAll('.cube').forEach(cube => {
      const el = cube as HTMLElement;
      const r = +el.dataset.row!;
      const c = +el.dataset.col!;
      const dist = Math.hypot(r - rowCenter, c - colCenter);
      if (dist <= radius) {
        const pct = 1 - dist / radius;
        const angle = pct * maxAngle;
        gsap.to(el, { duration: enterDur, ease: easing, overwrite: true, rotateX: -angle, rotateY: angle });
      } else {
        gsap.to(el, { duration: leaveDur, ease: 'power3.out', overwrite: true, rotateX: 0, rotateY: 0 });
      }
    });
  }, [radius, maxAngle, enterDur, leaveDur, easing]);

  const resetAll = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.querySelectorAll('.cube').forEach(cube =>
      gsap.to(cube, { duration: leaveDur, rotateX: 0, rotateY: 0, ease: 'power3.out' })
    );
  }, [leaveDur]);

  const onPointerMove = useCallback((e: Event) => {
    const pe = e as PointerEvent;
    userActiveRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    const rect = sceneRef.current!.getBoundingClientRect();
    const cellW = rect.width / gridSize;
    const cellH = rect.height / gridSize;
    const colCenter = (pe.clientX - rect.left) / cellW;
    const rowCenter = (pe.clientY - rect.top) / cellH;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));
    idleTimerRef.current = setTimeout(() => { userActiveRef.current = false; }, 3000);
  }, [gridSize, tiltAt]);

  const onClick = useCallback((e: Event) => {
    if (!rippleOnClick || !sceneRef.current) return;
    const me = e as MouseEvent;
    const rect = sceneRef.current.getBoundingClientRect();
    const cellW = rect.width / gridSize;
    const cellH = rect.height / gridSize;
    const colHit = Math.floor((me.clientX - rect.left) / cellW);
    const rowHit = Math.floor((me.clientY - rect.top) / cellH);
    const spreadDelay = 0.15 / rippleSpeed;
    const animDuration = 0.3 / rippleSpeed;
    const holdTime = 0.6 / rippleSpeed;
    const rings: Record<number, Element[]> = {};
    sceneRef.current.querySelectorAll('.cube').forEach(cube => {
      const el = cube as HTMLElement;
      const r = +el.dataset.row!; const c = +el.dataset.col!;
      const ring = Math.round(Math.hypot(r - rowHit, c - colHit));
      if (!rings[ring]) rings[ring] = [];
      rings[ring].push(el);
    });
    Object.keys(rings).map(Number).sort((a,b)=>a-b).forEach(ring => {
      const delay = ring * spreadDelay;
      const faces = rings[ring].flatMap(cube => Array.from(cube.querySelectorAll('.cube-face')));
      gsap.to(faces, { backgroundColor: rippleColor, duration: animDuration, delay, ease: 'power3.out' });
      gsap.to(faces, { backgroundColor: faceColor, duration: animDuration, delay: delay + animDuration + holdTime, ease: 'power3.out' });
    });
  }, [rippleOnClick, gridSize, faceColor, rippleColor, rippleSpeed]);

  const onTouchMove = useCallback((e: Event) => {
    e.preventDefault();
    userActiveRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    const te = e as TouchEvent;
    const rect = sceneRef.current!.getBoundingClientRect();
    const cellW = rect.width / gridSize;
    const cellH = rect.height / gridSize;
    const touch = te.touches[0];
    const colCenter = (touch.clientX - rect.left) / cellW;
    const rowCenter = (touch.clientY - rect.top) / cellH;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));
    idleTimerRef.current = setTimeout(() => { userActiveRef.current = false; }, 3000);
  }, [gridSize, tiltAt]);

  const onTouchStart = useCallback(() => { userActiveRef.current = true; }, []);
  const onTouchEnd   = useCallback(() => { resetAll(); }, [resetAll]);

  useEffect(() => {
    if (!autoAnimate || !sceneRef.current) return;
    simPosRef.current    = { x: Math.random() * gridSize, y: Math.random() * gridSize };
    simTargetRef.current = { x: Math.random() * gridSize, y: Math.random() * gridSize };
    const speed = 0.02;
    const loop = () => {
      if (!userActiveRef.current) {
        const pos = simPosRef.current; const tgt = simTargetRef.current;
        pos.x += (tgt.x - pos.x) * speed;
        pos.y += (tgt.y - pos.y) * speed;
        tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1)
          simTargetRef.current = { x: Math.random() * gridSize, y: Math.random() * gridSize };
      }
      simRAFRef.current = requestAnimationFrame(loop);
    };
    simRAFRef.current = requestAnimationFrame(loop);
    return () => { if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current); };
  }, [autoAnimate, gridSize, tiltAt]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', resetAll as EventListener);
    el.addEventListener('click', onClick);
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', resetAll as EventListener);
      el.removeEventListener('click', onClick);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);

  const cells = Array.from({ length: gridSize });
  const sceneStyle: React.CSSProperties = {
    gridTemplateColumns: cubeSize ? `repeat(${gridSize}, ${cubeSize}px)` : `repeat(${gridSize}, 1fr)`,
    gridTemplateRows:    cubeSize ? `repeat(${gridSize}, ${cubeSize}px)` : `repeat(${gridSize}, 1fr)`,
    columnGap: colGap,
    rowGap,
  };
  const wrapperStyle: React.CSSProperties & Record<string, string> = {
    '--cube-face-border': borderStyle,
    '--cube-face-bg': faceColor,
    '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : (shadow as string) || 'none',
    ...(cubeSize ? { width: `${gridSize * cubeSize}px`, height: `${gridSize * cubeSize}px` } : {}),
  };

  return (
    <div className="default-animation" style={wrapperStyle}>
      <div ref={sceneRef} className="default-animation--scene" style={sceneStyle}>
        {cells.map((_, r) =>
          cells.map((__, c) => (
            <div key={`${r}-${c}`} className="cube" data-row={r} data-col={c}>
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--bottom" />
              <div className="cube-face cube-face--left" />
              <div className="cube-face cube-face--right" />
              <div className="cube-face cube-face--front" />
              <div className="cube-face cube-face--back" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cubes;
