import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories, getCollections, getColorFilters, listProducts } from "@/lib/catalog/repository";
import { parseListParams, SIZES, type SearchParams } from "@/lib/catalog/params";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSelect } from "@/components/catalog/SortSelect";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Вишиванки з льону, хустини, ранери, серветки та святковий текстиль BASAMUNKA.",
};

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = parseListParams(await searchParams);
  const [products, categories, colors, allCollections] = await Promise.all([
    listProducts(params),
    getCategories(),
    getColorFilters(),
    getCollections(),
  ]);
  const collections = allCollections.filter((c) => c.count > 0);
  const category = categories.find((c) => c.slug === params.category);
  const collection = collections.find((a) => a.slug === params.collection);
  const color = colors.find((c) => c.family === params.color);

  /** Builds a /shop URL from the current filters with one key changed (undefined removes it). */
  const href = (patch: Record<string, string | undefined>) => {
    const q = new URLSearchParams();
    const merged = { category: params.category, color: params.color, size: params.size, collection: params.collection, sort: params.sort === "new" ? undefined : params.sort, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v) q.set(k, v);
    const s = q.toString();
    return s ? `/shop?${s}` : "/shop";
  };
  const filtered = Boolean(params.color || params.size || params.collection);
  const title = collection ? `«${collection.title}»` : category?.title ?? "Каталог";

  return (
    <div className="container">
      <div className="page-hero">
        <nav aria-label="Хлібні крихти">
          <ol className="breadcrumbs">
            <li>
              <Link href="/">Головна</Link>
            </li>
            {category || collection ? (
              <>
                <li>
                  <Link href="/shop">Каталог</Link>
                </li>
                <li aria-current="page">{title}</li>
              </>
            ) : (
              <li aria-current="page">Каталог</li>
            )}
          </ol>
        </nav>
        <h1 className="page-title">
          {title}
          <sup>{products.length}</sup>
        </h1>
        {collection ? <p className="lead">{collection.tagline}. {collection.story}</p> : category && <p className="lead">{category.description}</p>}
      </div>

      <nav className="tabs" aria-label="Категорії">
        <Link href={href({ category: undefined })} className="chip" aria-current={!params.category}>
          Усі
        </Link>
        {categories.map((c) => (
          <Link key={c.slug} href={href({ category: c.slug })} className="chip" aria-current={params.category === c.slug}>
            {c.title} <small>{c.count}</small>
          </Link>
        ))}
      </nav>

      <div className="filters">
        <div className="filters__group" role="group" aria-label="Колір">
          <span className="filters__label">Колір</span>
          {colors.map((c) => (
            <Link
              key={c.family}
              href={href({ color: params.color === c.family ? undefined : c.family })}
              className="color-dot"
              style={{ background: c.hex }}
              aria-current={params.color === c.family}
              aria-label={c.label}
              title={c.label}
            />
          ))}
        </div>
        <div className="filters__group" role="group" aria-label="Розмір">
          <span className="filters__label">Розмір</span>
          {SIZES.map((s) => (
            <Link key={s} href={href({ size: params.size === s ? undefined : s })} className="size-link" aria-current={params.size === s}>
              {s}
            </Link>
          ))}
        </div>
        <div className="filters__group" role="group" aria-label="Колекція">
          <span className="filters__label">Колекція</span>
          {collections.map((a) => (
            <Link
              key={a.slug}
              href={href({ collection: params.collection === a.slug ? undefined : a.slug })}
              className="chip"
              aria-current={params.collection === a.slug}
            >
              {a.title}
            </Link>
          ))}
        </div>
        <div className="filters__group">
          {filtered && (
            <Link href={href({ color: undefined, size: undefined, collection: undefined })} className="reset-link">
              Скинути фільтри{color ? ` (${color.label})` : ""}
            </Link>
          )}
          <Suspense>
            <SortSelect value={params.sort} />
          </Suspense>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty">
          <h2>Нічого не знайшли</h2>
          <p>Спробуйте інший колір чи розмір — або напишіть нам у Direct, підкажемо, що є в наявності.</p>
          <Link href="/shop" className="btn">
            Весь каталог
          </Link>
        </div>
      ) : (
        <div className="grid" style={{ paddingBottom: 40 }}>
          {products.map((p, i) => (
            // One card per product; with a colour filter the card opens in the matching colour.
            <ProductCard key={p.id} product={p} initialColor={Math.max(0, p.colors.findIndex((c) => c.family === params.color))} priority={i < 4} />
          )).flatMap((card, i) =>
            // Editorial tile after the 6th product on the unfiltered catalog.
            i === 5 && !params.category && !filtered
              ? [
                  card,
                  <Link key="promo" href="/looks" className="grid-promo">
                    <Image src="/images/editorial/look-kvitka.jpg" alt="" fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center 25%" }} />
                    <div>
                      <span className="eyebrow" style={{ color: "#fff" }}>
                        Парні образи
                      </span>
                      <span className="title">
                        Один оберіг <em>на двох</em>
                      </span>
                      <span className="btn btn--light btn--sm">Дивитися колекції</span>
                    </div>
                  </Link>,
                ]
              : [card],
          )}
        </div>
      )}
    </div>
  );
}
