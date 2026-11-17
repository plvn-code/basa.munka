import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCollections, getLooks, listProducts } from "@/lib/catalog/repository";
import { formatPrice } from "@/lib/format";
import { minPrice } from "@/lib/catalog/price";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";

export const metadata: Metadata = {
  title: "Колекції",
  description: "Колекції BASAMUNKA: Лемківська, «Квітка на комині», «Гесики», «Зірка», «Символи Різдва», «Символи Великодня» — і парні образи.",
};

export default async function CollectionsPage() {
  const [all, looks, products] = await Promise.all([getCollections(), getLooks(), listProducts()]);
  const collections = all.filter((c) => c.count > 0 && c.slug !== "personal" && c.slug !== "barvinok");

  return (
    <>
      <div className="container">
        <div className="page-hero">
          <nav aria-label="Хлібні крихти">
            <ol className="breadcrumbs">
              <li>
                <Link href="/">Головна</Link>
              </li>
              <li aria-current="page">Колекції</li>
            </ol>
          </nav>
          <h1 className="page-title">
            Кожен орнамент <em className="serif-em">має голос</em>
          </h1>
          <p className="lead">
            Ми не вигадуємо візерунки — ми їх знаходимо: у музеях, етнографічних виданнях, бабусиних скринях. Кожна колекція BASAMUNKA
            побудована навколо одного орнаменту і його сенсу.
          </p>
        </div>
      </div>

      <div className="container">
        {collections.map((c, i) => {
          const items = products.filter((p) => p.collection === c.slug);
          return (
            <section key={c.slug} id={c.slug} className="col-row" aria-labelledby={`col-${c.slug}`}>
              <Reveal className="col-row__media">
                <Image src={c.image} alt={`Колекція «${c.title}»`} fill priority={i === 0} sizes="(max-width: 960px) 100vw, 46vw" style={{ objectFit: "cover" }} />
                <span className="col-row__num">{String(i + 1).padStart(2, "0")}</span>
              </Reveal>
              <div className="col-row__body">
                <span className="eyebrow">{c.tagline}</span>
                <h2 className="display" id={`col-${c.slug}`}>
                  «{c.title}»
                </h2>
                <p className="lead">{c.story}</p>
                <div className="col-row__items">
                  {items.map((p) => (
                    <Link key={p.id} href={`/product/${p.slug}`} className="col-item">
                      <span className="col-item__img">
                        <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="120px" style={{ objectFit: "cover" }} />
                      </span>
                      <span className="col-item__kind">{p.kind}</span>
                      <span className="col-item__price">{p.onRequest ? (p.price ? `від ${formatPrice(p.price)}` : "Ціна в Direct") : formatPrice(minPrice(p))}</span>
                    </Link>
                  ))}
                </div>
                <Link href={`/shop?collection=${c.slug}`} className="link-u" style={{ justifySelf: "start" }}>
                  Уся колекція · {c.count}
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      <section className="section section--soft" id="pary">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Одна історія на двох</span>
            <h2 className="title">
              Парні <em>образи</em>
            </h2>
            <Ornament variant="line" cell={4} className="section-head__stitch" />
          </div>
          <div className="looks-grid">
            {looks.map((l) => (
              <article key={l.slug} id={l.slug} className="look-card2">
                <div className="look-card2__media">
                  <Image src={l.image} alt={`Образ «${l.name}»`} fill sizes="(max-width: 960px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="look-card2__body">
                  <span className="eyebrow">{l.tagline}</span>
                  <h3 className="title">«{l.name}»</h3>
                  <p>{l.description}</p>
                  <ul>
                    {l.products.map(({ product: p, price }) => (
                      <li key={p.id}>
                        <Link href={`/product/${p.slug}`}>
                          {p.kind} «{p.name}»
                        </Link>
                        <span>{formatPrice(price)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="look-card2__total">
                    <span>{l.setPrice ? "Ціна за пару" : "Разом"}</span>
                    <b>
                      {l.setPrice && l.sum > l.total && <s>{formatPrice(l.sum)}</s>} {formatPrice(l.total)}
                    </b>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="note" style={{ textAlign: "center", marginTop: 28 }}>
            Спеціальну ціну за парний образ ми застосуємо після підтвердження замовлення — додайте обидві вишиванки в кошик.
          </p>
        </div>
      </section>
    </>
  );
}
