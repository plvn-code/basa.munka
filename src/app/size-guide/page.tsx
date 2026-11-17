import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getSizeGuide, listProducts } from "@/lib/catalog/repository";
import { site } from "@/lib/config/site";
import { SizeChart } from "@/components/product/SizeChart";

export const metadata: Metadata = {
  title: "Розміри та догляд",
  description: "Розмірна сітка BASAMUNKA (XS–XL), як зняти мірки, розміри кожної моделі та догляд за льоном і тефлоновим текстилем.",
};

const howTo = [
  { t: "Груди", d: "Обхват по найбільш виступаючих точках грудей, стрічка паралельно підлозі." },
  { t: "Стегна", d: "Обхват по найбільш виступаючих точках сідниць." },
  { t: "Догляд за льоном", d: "Делікатне прання при 30 °C, без відбілювачів. Прасуйте вологим з виворітного боку, не по вишивці. Льон з кожним пранням стає м'якшим." },
  { t: "Догляд за святковим текстилем", d: "Тефлонове покриття відштовхує рідину — краплі просто промокніть серветкою. Прання при 30 °C, прасування з виворітного боку." },
];

export default async function SizeGuidePage() {
  const [chart, products, categories] = await Promise.all([getSizeGuide(), listProducts(), getCategories()]);

  return (
    <div className="container">
      <div className="page-hero">
        <nav aria-label="Хлібні крихти">
          <ol className="breadcrumbs">
            <li>
              <Link href="/">Головна</Link>
            </li>
            <li aria-current="page">Розміри та догляд</li>
          </ol>
        </nav>
        <h1 className="page-title">
          Розміри <em className="serif-em">та догляд</em>
        </h1>
        <p className="lead">Правильна посадка починається з точних параметрів. Звірте свої заміри з таблицею — або напишіть нам, і ми підберемо розмір.</p>
      </div>

      <section className="story" style={{ alignItems: "start", paddingBottom: "clamp(56px, 7vw, 110px)" }}>
        <div style={{ display: "grid", gap: 20 }}>
          <span className="eyebrow">Український розмір · обхвати, см</span>
          <SizeChart chart={chart} caption="Розмірна сітка BASAMUNKA" />
          <p className="note">{chart.note}</p>
          <div className="accordion" style={{ marginTop: 12 }}>
            {howTo.map((h) => (
              <details key={h.t}>
                <summary>{h.t}</summary>
                <div className="accordion__body">
                  <p>{h.d}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="pdp__help">
            <span>
              Між двома розмірами? Напишіть свій зріст і параметри{" "}
              <a href={site.directUrl} target="_blank" rel="noreferrer">
                нам у Direct
              </a>{" "}
              — підкажемо, як сяде конкретна модель.
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          <span className="eyebrow">Розміри моделей</span>
          {categories.map((c) => {
            const items = products.filter((p) => p.category === c.slug);
            if (!items.length) return null;
            return (
              <div key={c.slug} style={{ display: "grid", gap: 4 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 20 }}>{c.title}</h2>
                <dl className="spec-list" style={{ fontSize: 14 }}>
                  {items.map((p) => (
                    <div key={p.id} style={{ borderBottom: "1px solid var(--line)", padding: "8px 0" }}>
                      <dt>
                        <Link href={`/product/${p.slug}`} style={{ color: "var(--ink)" }}>
                          {p.kind} «{p.name}»
                        </Link>
                      </dt>
                      <dd>{p.options.join(" · ")}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
