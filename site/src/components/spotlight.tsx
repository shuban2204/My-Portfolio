"use client";

import { useEffect, useRef } from "react";

export default function Spotlight() {
  const dotRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -500, y: -500 });
  const current = useRef({ x: -500, y: -500 });
  const coreCurrent = useRef({ x: -500, y: -500 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let rafId = 0;
    const loop = () => {
      // Soft glow: lazier follow
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      // Tight core: faster follow
      coreCurrent.current.x += (target.current.x - coreCurrent.current.x) * 0.45;
      coreCurrent.current.y += (target.current.y - coreCurrent.current.y) * 0.45;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${coreCurrent.current.x}px, ${coreCurrent.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="spotlight" />
      <div aria-hidden ref={dotRef} className="cursor-glow" />
      <div aria-hidden ref={coreRef} className="cursor-core" />
    </>
  );
}
