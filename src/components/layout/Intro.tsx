"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Ornament } from "@/components/ui/Ornament";

/** Keep in sync with the inline script in app/layout.tsx */
const INTRO_KEY = "basamunka.intro.seen";

/**
 * Logo reveal on a linen curtain — once per browser session: the rhombus drops onto the U,
 * the wordmark rises, a stitched line runs underneath, then the curtain lifts.
 * Rendered on the server so there is no flash of the page; an inline script in <head>
 * adds `intro-seen` to <html> on repeat views (CSS hides it).
 */
export function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(INTRO_KEY));
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      seen = true;
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    const t = window.setTimeout(() => setShow(false), 2700);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__inner">
        <Image className="intro__logo" src="/brand/logo.png" alt="" width={1026} height={507} priority sizes="320px" />
        <Ornament variant="line" cell={4} className="intro__stitch" />
        <span className="intro__tag">Текстиль та одяг · Україна</span>
      </div>
    </div>
  );
}
