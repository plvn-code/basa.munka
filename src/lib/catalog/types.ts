/**
 * Catalog domain types.
 * These mirror a future database schema so that swapping the static seed
 * for a DB doesn't touch the UI.
 */

export type CategorySlug = "zhinkam" | "cholovikam" | "aksesuary" | "stil" | "velykden";

/** Colour families for the colour filter */
export type ColorFamily = "milk" | "black" | "beige" | "green";

/** Named BASAMUNKA collections (each one is built around one ornament) */
export type CollectionSlug = "lemkivska" | "kvitka" | "heseky" | "zirka" | "rizdvo" | "velykden" | "barvinok" | "personal";

export interface ProductColor {
  name: string;
  /** Swatch colour */
  hex: string;
  family: ColorFamily;
  /** Index of the first gallery photo in this colour */
  image?: number;
  /** Price override for this colour */
  price?: number;
  /** Out of stock, coming back («Очікується»): shown with its photos, but can't be ordered */
  soon?: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
}

/** Body measurements in cm, one row per size */
export interface SizeChart {
  columns: string[];
  rows: { size: string; values: string[] }[];
  note?: string;
}

export interface Product {
  id: string;
  slug: string;
  /** Model name: «Квітка на комині», «Гесики» */
  name: string;
  /** Item type in Ukrainian: "Жіноча вишиванка" */
  kind: string;
  /** Collection the item belongs to */
  collection: CollectionSlug;
  /** Short line shown above the name */
  tagline?: string;
  /** Base price (UAH); a colour or an option may override it — always read it through priceFor() */
  price: number;
  compareAtPrice?: number;
  currency: "UAH";
  category: CategorySlug;
  colors: ProductColor[];
  /** Sizes / variants exactly as published: ["XS", "S"], ["200 × 40 см", "250 × 40 см"], ["Один розмір"] */
  options: string[];
  /** What the options are: «Розмір» for clothes, «Розмір ранера», «Комплект» … */
  optionLabel?: string;
  /** Price per option (runners priced by length, sets by number of napkins) */
  optionPrices?: Record<string, number>;
  /** Price is not published: shown as «Ціна в Direct» (or «від …» with `price`), can't be added to the cart */
  onRequest?: boolean;
  fabric?: string;
  composition?: string;
  description: string;
  details: string[];
  care: string[];
  images: ProductImage[];
  badges?: ("new" | "bestseller" | "limited")[];
  /** Original Instagram posts (@basamunka) */
  sources: string[];
  publishedAt: string; // ISO date of the latest post
  inStock: boolean;
  /** Sewn to order: lead time before dispatch */
  madeToOrder?: string;
}

export interface Category {
  slug: CategorySlug;
  title: string;
  description: string;
  image: string;
}

export interface CollectionInfo {
  slug: CollectionSlug;
  title: string;
  /** One line: what the ornament means */
  tagline: string;
  story: string;
  image: string;
}

/** A styled set ("look") sold as separate items */
export interface Look {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  items: { slug: string; color?: string }[];
  /** Special price for the whole set, when the brand publishes one */
  setPrice?: number;
}

export interface ColorFilter {
  family: ColorFamily;
  label: string;
  hex: string;
}
