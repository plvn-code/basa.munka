"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface CollectionTab {
  slug: string;
  title: string;
  tagline: string;
  story: string;
  image: string;
  count: number;
}

/**
 * «Кожен орнамент має голос»: a list of collections on the left, a crossfading photo and the story on the right.
 * Hover / focus / click switches; on its own it advances every 6 s while in view.
 */
export function CollectionsTabs({ items }: { items: CollectionTab[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % items.length), 6000);
    return () => window.clearTimeout(t);
  }, [active, paused, visible, items.length]);

  const cur = items[active];

  return (
    <div className="ctabs" ref={root} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ol className="ctabs__list" role="tablist" aria-label="Колекції">
        {items.map((c, i) => (
          <li key={c.slug}>
            <button
              role="tab"
              aria-selected={i === active}
              aria-controls="ctabs-panel"
              className="ctabs__tab"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="ctabs__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ctabs__name">{c.title}</span>
              <span className="ctabs__count">{c.count}</span>
              {i === active && !paused && visible && <span className="ctabs__timer" key={`t${active}`} aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ol>
      <div className="ctabs__stage" id="ctabs-panel" role="tabpanel" aria-live="polite">
        <div className="ctabs__media">
          {items.map((c, i) => (
            <Image
              key={c.slug}
              src={c.image}
              alt={i === active ? `Колекція «${c.title}»` : ""}
              fill
              sizes="(max-width: 960px) 100vw, 40vw"
              className={i === active ? "is-on" : ""}
              style={{ objectFit: "cover" }}
            />
          ))}
        </div>
        <div className="ctabs__text" key={cur.slug}>
          <span className="eyebrow">{cur.tagline}</span>
          <p>{cur.story}</p>
          <Link href={`/shop?collection=${cur.slug}`} className="link-u">
            Дивитися колекцію «{cur.title}»
          </Link>
        </div>
      </div>
    </div>
  );
}
