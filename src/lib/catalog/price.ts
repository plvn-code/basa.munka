import type { Product } from "./types";

/** Price of a product for a colour and option: option price → colour price → base price. */
export function priceFor(product: Product, colorName?: string, option?: string): number {
  if (option && product.optionPrices?.[option] !== undefined) return product.optionPrices[option];
  return product.colors.find((c) => c.name === colorName)?.price ?? product.price;
}

/** Lowest price across colours and options — for sorting, JSON-LD and "від …" labels. */
export function minPrice(product: Product): number {
  return Math.min(product.price, ...product.colors.map((c) => c.price ?? product.price), ...Object.values(product.optionPrices ?? {}));
}

/** True when the price differs between options («від 1 800 ₴») */
export function hasPriceRange(product: Product): boolean {
  const values = Object.values(product.optionPrices ?? {});
  return values.length > 1 && new Set(values).size > 1;
}
