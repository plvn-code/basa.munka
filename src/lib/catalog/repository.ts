import "server-only";
import { baseFamily, categories, collections, colorFilters, looks, products, sizeGuide } from "./data";
import { minPrice, priceFor } from "./price";
import type { CategorySlug, CollectionSlug, ColorFamily, Look, Product } from "./types";

/**
 * Catalog repository — the only place the UI reads products from.
 * Today it reads the static seed; later each function becomes a DB query
 * (Prisma) without changing any page or component.
 */

export type SortKey = "new" | "price-asc" | "price-desc";

export interface ProductQuery {
  category?: CategorySlug;
  color?: ColorFamily;
  collection?: CollectionSlug;
  size?: string;
  sort?: SortKey;
}

const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
  new: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
  "price-asc": (a, b) => minPrice(a) - minPrice(b),
  "price-desc": (a, b) => minPrice(b) - minPrice(a),
};

/** Colour families of a product: its colour variants, or the base family of a single-colour item (milk by default). */
export function familiesOf(p: Product): ColorFamily[] {
  return p.colors.length ? p.colors.map((c) => c.family) : [baseFamily[p.slug] ?? "milk"];
}

function fitsSize(p: Product, size: string) {
  return p.options.includes(size);
}

export async function listProducts(query: ProductQuery = {}): Promise<Product[]> {
  const { category, color, collection, size, sort = "new" } = query;
  return products
    .filter((p) => !category || p.category === category)
    .filter((p) => !color || familiesOf(p).includes(color))
    .filter((p) => !collection || p.collection === collection)
    .filter((p) => !size || fitsSize(p, size))
    .sort(sorters[sort] ?? sorters.new);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  return products.find((p) => p.id === id) ?? null;
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  return slugs.map((s) => products.find((p) => p.slug === s)).filter((p): p is Product => Boolean(p));
}

export async function getAllProductSlugs(): Promise<string[]> {
  return products.map((p) => p.slug);
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  return [...products].sort(sorters.new).slice(0, limit);
}

export async function getBestsellers(limit = 8): Promise<Product[]> {
  return products.filter((p) => p.badges?.includes("bestseller")).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const others = [...products].filter((p) => p.id !== product.id).sort(sorters.new);
  const sameCollection = others.filter((p) => p.collection === product.collection);
  const sameCategory = others.filter((p) => p.category === product.category && !sameCollection.includes(p));
  const rest = others.filter((p) => !sameCollection.includes(p) && !sameCategory.includes(p));
  return [...sameCollection, ...sameCategory, ...rest].slice(0, limit);
}

export interface ResolvedLook extends Look {
  products: { product: Product; color?: string; price: number }[];
  /** Sum of the separate prices */
  sum: number;
  /** What the set costs: the brand's set price, or the sum */
  total: number;
}

function resolveLook(look: Look): ResolvedLook {
  const items = look.items.flatMap((i) => {
    const product = products.find((p) => p.slug === i.slug);
    return product ? [{ product, color: i.color, price: priceFor(product, i.color) }] : [];
  });
  const sum = items.reduce((s, i) => s + i.price, 0);
  return { ...look, products: items, sum, total: look.setPrice ?? sum };
}

export async function getLooks(): Promise<ResolvedLook[]> {
  return looks.map(resolveLook);
}

/** Sets that include this product — for "Complete the look" on the product page */
export async function getLooksFor(product: Product): Promise<ResolvedLook[]> {
  return looks.filter((l) => l.items.some((i) => i.slug === product.slug)).map(resolveLook);
}

export async function getCategories() {
  const counts = new Map<CategorySlug, number>();
  for (const p of products) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return categories.map((c) => ({ ...c, count: counts.get(c.slug) ?? 0 }));
}

export async function getColorFilters() {
  return colorFilters;
}

export async function getCollections() {
  const counts = new Map<CollectionSlug, number>();
  for (const p of products) counts.set(p.collection, (counts.get(p.collection) ?? 0) + 1);
  return collections.map((c) => ({ ...c, count: counts.get(c.slug) ?? 0 }));
}

export async function getSizeGuide() {
  return sizeGuide;
}
