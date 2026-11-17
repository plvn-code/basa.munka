"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Cross-stitch ornament band (вишивка хрестиком): a red rhombus with a black heart,
 * tiled across the width. «Stitches in» from left to right when it scrolls into view.
 * r = red thread, k = black thread, . = empty cell.
 */
const MOTIF = [
  "......r.......",
  ".....r.r......",
  "....r.k.r.....",
  "...r.k.k.r....",
  "k.r.k.r.k.r.k.",
  "...r.k.k.r....",
  "....r.k.r.....",
  ".....r.r......",
  "......r.......",
];

/** Small variant: a single row of alternating crosses with a rhombus every 8 cells */
const LINE = ["...r.......r....", "..r.r.....r.r...", "kr.k.rk.kr.k.rk.", "..r.r.....r.r...", "...r.......r...."];

function crosses(rows: string[], cell: number) {
  const out: { x: number; y: number; c: string }[] = [];
  rows.forEach((row, y) => [...row].forEach((ch, x) => ch !== "." && out.push({ x: x * cell, y: y * cell, c: ch })));
  return out;
}

export function Ornament({
  variant = "band",
  cell = 6,
  className = "",
  tone = "color",
}: {
  variant?: "band" | "line";
  cell?: number;
  className?: string;
  /** color = red + black thread; light = for dark backgrounds */
  tone?: "color" | "light";
}) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const rows = variant === "band" ? MOTIF : LINE;
  const w = rows[0].length * cell;
  const h = rows.length * cell;
  const pad = cell * 0.18;
  const red = tone === "light" ? "#f2a27a" : "var(--thread)";
  const black = tone === "light" ? "rgba(255,255,255,.75)" : "var(--ink)";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ornament ornament--${variant} ${className}`} data-in={inView || undefined} aria-hidden="true" style={{ height: h }}>
      <svg width="100%" height={h}>
        <defs>
          <pattern id={`orn-${id}`} width={w} height={h} patternUnits="userSpaceOnUse">
            {crosses(rows, cell).map(({ x, y, c }) => (
              <path
                key={`${x}-${y}`}
                d={`M${x + pad} ${y + pad}L${x + cell - pad} ${y + cell - pad}M${x + cell - pad} ${y + pad}L${x + pad} ${y + cell - pad}`}
                stroke={c === "r" ? red : black}
                strokeWidth={Math.max(1, cell * 0.22)}
                strokeLinecap="round"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height={h} fill={`url(#orn-${id})`} />
      </svg>
    </div>
  );
}
