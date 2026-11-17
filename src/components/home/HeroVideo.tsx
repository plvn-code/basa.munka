"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Full-screen hero over a daytime drone montage of Kyiv (public/video/kyiv.mp4, 26 s loop,
 * Pexels licence — sources in docs/STATUS.md). Scene names + coordinates follow the video clock;
 * the story-style bars show progress. With prefers-reduced-motion the poster stays still.
 */
const SCENES = [
  { at: 0, name: "Дніпро", note: "Панорама столиці", coords: "50.4580° N · 30.5530° E" },
  { at: 4.2, name: "Михайлівський золотоверхий собор", note: "Заснований у XII столітті", coords: "50.4556° N · 30.5228° E" },
  { at: 8.4, name: "Андріївська церква", note: "Бароко Растреллі над Подолом", coords: "50.4590° N · 30.5179° E" },
  { at: 12.6, name: "Майдан Незалежності", note: "Серце Києва", coords: "50.4501° N · 30.5241° E" },
  { at: 16.8, name: "Арка Свободи українського народу", note: "Над схилами Дніпра", coords: "50.4547° N · 30.5296° E" },
  { at: 21, name: "Золоті бані Михайлівського", note: "Погляд згори", coords: "50.4556° N · 30.5228° E" },
];
const DURATION = 25.96;

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const [scene, setScene] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
    let raf = 0;
    const tick = () => {
      const t = v.currentTime;
      let idx = 0;
      for (let i = 0; i < SCENES.length; i++) if (t >= SCENES[i].at) idx = i;
      setScene((s) => (s === idx ? s : idx));
      SCENES.forEach((s, i) => {
        const end = SCENES[i + 1]?.at ?? DURATION;
        const p = Math.min(1, Math.max(0, (t - s.at) / (end - s.at)));
        const el = bars.current[i];
        if (el) el.style.transform = `scaleX(${p})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const s = SCENES[scene];

  return (
    <section className="hero-v" data-ready={ready || undefined} aria-label="Київ з висоти пташиного польоту">
      <video
        ref={video}
        className="hero-v__video"
        src="/video/kyiv.mp4"
        poster="/video/kyiv-poster.jpg"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={() => setReady(true)}
        aria-hidden="true"
      />
      <div className="hero-v__shade" aria-hidden="true" />

      <div className="container hero-v__content">
        <span className="hero-v__eyebrow">
          <i className="ua-dot" aria-hidden="true" /> Сучасна українська естетика у вишивці
        </span>
        <h1 className="hero-v__title">
          <span className="hero-v__line">
            <span>Традиція</span>
          </span>{" "}
          <span className="hero-v__line">
            <span>
              <em>йде поруч</em>
            </span>
          </span>
        </h1>
        <p className="hero-v__text">
          Лімітовані вишиванки зі 100% льону та текстиль для дому з орнаментами, що мають сенс. Створено в Україні — з любов&apos;ю до коріння.
        </p>
        <div className="hero-v__ctas">
          <Link href="/shop" className="btn btn--light">
            Перейти до каталогу
          </Link>
          <Link href="/looks" className="btn btn--ghost">
            Колекції
          </Link>
        </div>
      </div>

      <div className="container hero-v__bottom">
        <div className="hero-v__place" aria-live="polite">
          <span className="hero-v__pin" aria-hidden="true">
            <svg viewBox="0 0 12 16" width="12" height="16">
              <path d="M6 0C2.7 0 0 2.6 0 5.9 0 10.3 6 16 6 16s6-5.7 6-10.1C12 2.6 9.3 0 6 0Zm0 8.2A2.3 2.3 0 1 1 6 3.6a2.3 2.3 0 0 1 0 4.6Z" fill="currentColor" />
            </svg>
          </span>
          <span key={scene} className="hero-v__place-text">
            <small>Київ · {s.coords}</small>
            <strong>{s.name}</strong>
            <span>{s.note}</span>
          </span>
        </div>
        <div className="hero-v__bars" aria-hidden="true">
          {SCENES.map((x, i) => (
            <span key={x.at} className="hero-v__bar" data-done={i < scene || undefined}>
              <span ref={(el) => void (bars.current[i] = el)} />
            </span>
          ))}
        </div>
        <a href="#start" className="hero-v__scroll">
          <span>Гортайте</span>
          <i aria-hidden="true" />
        </a>
      </div>
      <div className="ua-line" aria-hidden="true" />
    </section>
  );
}
