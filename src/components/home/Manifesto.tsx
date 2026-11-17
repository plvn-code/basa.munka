"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Brand statement — lines light up one by one as they scroll into view. */
export function Manifesto({ lines, eyebrow = "Про нас" }: { lines: React.ReactNode[]; eyebrow?: string }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [seen, setSeen] = useState<boolean[]>(() => lines.map(() => false));

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = refs.current.indexOf(e.target as HTMLSpanElement);
          if (i >= 0) setSeen((s) => (s[i] ? s : s.map((v, k) => (k === i ? true : v))));
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="manifesto">
      <span className="eyebrow">{eyebrow}</span>
      <p className="manifesto__text">
        {lines.map((l, i) => (
          <span
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`manifesto__line ${seen[i] ? "manifesto__line--in" : ""}`}
          >
            {l}{" "}
          </span>
        ))}
      </p>
      <Image className="manifesto__logo" src="/brand/mark.png" alt="" width={304} height={444} sizes="40px" />
    </div>
  );
}
