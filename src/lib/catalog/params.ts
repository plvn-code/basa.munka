import type { SortKey } from "./repository";
import type { CategorySlug, CollectionSlug, ColorFamily } from "./types";

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const SORTS: SortKey[] = ["new", "price-asc", "price-desc"];
const CATEGORIES: CategorySlug[] = ["zhinkam", "cholovikam", "aksesuary", "stil", "velykden"];
const COLORS: ColorFamily[] = ["milk", "beige", "green", "black"];
const COLLECTIONS: CollectionSlug[] = ["lemkivska", "kvitka", "heseky", "zirka", "rizdvo", "velykden", "barvinok", "personal"];
export const SIZES = ["XS", "S", "M", "L", "XL"] as const;

const pick = <T extends string>(value: string | undefined, allowed: readonly T[]) =>
  value && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;

export function parseListParams(sp: Record<string, string | string[] | undefined>) {
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) as string | undefined;
  return {
    sort: pick(one("sort"), SORTS) ?? "new",
    category: pick(one("category"), CATEGORIES),
    color: pick(one("color"), COLORS),
    collection: pick(one("collection"), COLLECTIONS),
    size: pick(one("size"), SIZES),
  };
}
