export const site = {
  name: "BASAMUNKA",
  handle: "basamunka",
  tagline: "Текстиль та одяг",
  motto: "Сучасна українська естетика у вишивці",
  description:
    "BASAMUNKA — сучасна українська естетика у вишивці: лімітовані вишиванки з 100% льону, хустини, ранери, серветки та святковий текстиль з орнаментами, що мають сенс.",
  /** Canonical origin: NEXT_PUBLIC_SITE_URL (custom domain) → Vercel production URL → localhost */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3019"),
  /** Search indexing is off until the client approves the launch */
  indexable: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  locale: "uk-UA",
  currency: "UAH",
  socials: {
    instagram: { label: "Instagram", handle: "@basamunka", url: "https://www.instagram.com/basamunka/" },
  },
  /** Direct — orders, sizing, personalisation */
  directUrl: "https://ig.me/m/basamunka",
  /** Not published by the brand yet — see docs/STATUS.md */
  delivery: {
    term: "1–3 дні по Україні",
  },
  /** Offline: Rikka concept store (post DW9NM3WDKY6) */
  offline: {
    name: "Rikka concept store",
    note: "Галерея українських ремесел",
    address: "м. Хуст, вул. Августина Волошина, 131а",
    instagram: "https://www.instagram.com/rikka_khust/",
  },
} as const;

export const navigation = [
  { href: "/shop?category=zhinkam", label: "Жінкам" },
  { href: "/shop?category=cholovikam", label: "Чоловікам" },
  { href: "/shop?category=stil", label: "Святковий стіл" },
  { href: "/looks", label: "Колекції" },
  { href: "/about", label: "Про бренд" },
] as const;
