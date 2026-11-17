import type { Category, CollectionInfo, ColorFilter, Look, Product, ProductColor, SizeChart } from "./types";
import imageCounts from "./image-counts.json";

/**
 * Static catalog seed — every fact (price, sizes, fabric) comes from @basamunka post captions
 * (research/captions.txt). Photos: scripts/catalog_images.py → build_images.py.
 * Items whose price was never published are `onRequest` («Ціна в Direct») and can't go to the cart.
 * UI code must read it only through repository.ts.
 */

const counts = imageCounts as Record<string, number>;

const ig = (code: string) => `https://www.instagram.com/p/${code}/`;

/** Approximate chart — BASAMUNKA has not published one (see docs/STATUS.md). */
export const sizeGuide: SizeChart = {
  columns: ["Український", "Обхват грудей, жін.", "Обхват грудей, чол.", "Обхват стегон, жін."],
  rows: [
    { size: "XS", values: ["40–42", "80–84", "—", "86–90"] },
    { size: "S", values: ["42–44", "84–88", "88–92", "90–94"] },
    { size: "M", values: ["44–46", "88–92", "92–100", "94–98"] },
    { size: "L", values: ["46–48", "92–96", "100–108", "98–102"] },
    { size: "XL", values: ["48–50", "96–100", "108–116", "102–106"] },
  ],
  note: "Обхвати в сантиметрах. Сітка орієнтовна: льон і вільний крій мають запас — точні заміри кожної моделі надішлемо в Direct.",
};

/** Published size range of the «Квітка на комині» collection (post DVg0jUnjPCj): XS–XL */
const SIZES = ["XS", "S", "M", "L", "XL"];
const LINEN = "100% натуральний льон";
const LINEN_CARE = ["Делікатне прання при 30 °C", "Не відбілювати", "Прасувати вологим з виворітного боку, не по вишивці", "Сушити розправленим"];
const TEFLON_CARE = ["Рідина залишається краплями на поверхні — просто промокніть серветкою", "Прання при 30 °C без відбілювачів", "Прасувати з виворітного боку"];

type Seed = Omit<Product, "id" | "currency" | "images" | "care" | "details" | "colors"> & {
  details?: string[];
  care?: string[];
  colors?: ProductColor[];
};

let n = 0;
const P = ({ details = [], care = [], colors = [], ...p }: Seed): Product => {
  n += 1;
  const count = counts[p.slug];
  if (!count) throw new Error(`No photos built for ${p.slug} — run scripts/build_images.py`);
  return {
    ...p,
    id: `bs${String(n).padStart(2, "0")}`,
    currency: "UAH",
    colors,
    care,
    details,
    images: Array.from({ length: count }, (_, i) => ({
      src: `/images/products/${p.slug}/${String(i + 1).padStart(2, "0")}.jpg`,
      alt: `${p.kind} «${p.name}» — фото ${i + 1}`,
    })),
  };
};

export const products: Product[] = [
  // ───────────── Вишиванки · жінкам ─────────────
  P({
    slug: "lemko-zhinocha",
    name: "Лемківська",
    kind: "Жіноча вишиванка",
    collection: "lemkivska",
    tagline: "Червоний хрестик на білому льоні",
    price: 8500,
    category: "zhinkam",
    options: SIZES,
    fabric: LINEN,
    description:
      "Червоний хрестик на білому льоні. Пишні рукава, вишиті манжети з воланом і зав'язка на горловині, яку хочеться торкатися. Орнамент натхненний роботами лемківського дизайнера Вільяма Джули, чиї візерунки колись одягав Голлівуд.",
    details: ["Машинна вишивка", "Пишні рукава з вишитими манжетами", "Зав'язка на горловині", "Захипи на пілочці"],
    care: LINEN_CARE,
    badges: ["bestseller", "limited"],
    sources: [ig("DcGjolLDHUK"), ig("DdCMQBeqd7-")],
    publishedAt: "2026-09-08",
    inStock: true,
  }),
  P({
    slug: "kvitka-zhinocha",
    name: "Квітка на комині",
    kind: "Жіноча вишиванка",
    collection: "kvitka",
    tagline: "Біле по білому",
    price: 5100,
    category: "zhinkam",
    options: SIZES,
    fabric: LINEN,
    composition: "Льон 100%, вишивка — бавовняна нитка",
    description:
      "Вишивка «білим по білому» — про глибину, яку не треба доводити яскравістю. Орнаменти ми віднайшли в етнографічному виданні «Квітка на комині»: колись ними розписували комини й стіни хат Уманщини. Об'ємні рукави, пояс з китицями.",
    details: ["Вишивка білим по білому", "Об'ємні рукави на манжеті", "Пояс із китицями", "Розміри XS–XL"],
    care: LINEN_CARE,
    badges: ["bestseller"],
    sources: [ig("DVg0jUnjPCj"), ig("DWOJLDhjGLV"), ig("DWD3jy6jAE8")],
    publishedAt: "2026-03-23",
    inStock: true,
  }),
  P({
    slug: "kvitka-kolorova",
    name: "Квітка на комині",
    kind: "Жіноча вишиванка · кольорова",
    collection: "kvitka",
    tagline: "Два кольори — один стиль",
    price: 5100,
    category: "zhinkam",
    colors: [
      { name: "Молочна з зеленою вишивкою", hex: "#EFE9DC", family: "milk", image: 0 },
      { name: "Зелена з білою вишивкою", hex: "#2F6B57", family: "green", image: 5 },
    ],
    options: SIZES,
    fabric: LINEN,
    description:
      "Квіти на комині розцвіли знову — яскравіше, сміливіше. Зелень і білий цвіт, як ранок у саду: свіжий і справжній. Для тих, хто носить традицію не тихо. Обирай свій колір — або, як наші клієнтки, обидва.",
    details: ["Машинна вишивка", "Об'ємні рукави", "Два кольори: молочна і зелена"],
    care: LINEN_CARE,
    badges: ["new"],
    sources: [ig("DYKi-ABjHBr"), ig("DX9clBGMIr0"), ig("DX7PfIVjOrT"), ig("DYUqjjBMDK8"), ig("DYmNB9ODDh_")],
    publishedAt: "2026-05-21",
    inStock: true,
  }),
  P({
    slug: "heseky-vyshyvanka",
    name: "Гесики",
    kind: "Жіноча вишиванка зі зйомним комірцем",
    collection: "heseky",
    tagline: "Одна вишиванка — два настрої",
    price: 4850,
    category: "zhinkam",
    options: ["S", "M", "L", "XL"],
    fabric: LINEN,
    description:
      "Ваша ідеальна база з душею. Орнамент «гесики» — давній знак захисту й гармонії — виступає як стильний оберіг, а зйомний комірець змінює образ за секунду: від стриманої класики до яскравого акценту. Кава зранку, зустрічі, прогулянки містом.",
    details: ["Зйомний комірець на зав'язках", "Вишивка «гесики» на рукавах", "Вільний силует, пишний рукав", "Розміри S–XL"],
    care: LINEN_CARE,
    badges: ["bestseller"],
    sources: [ig("DUqEGGjjaaj"), ig("DV3bYXfDCEw"), ig("DXbxcJ3jK_f"), ig("DXoVUi5jHGn")],
    publishedAt: "2026-04-27",
    inStock: true,
  }),
  P({
    slug: "kvitka-suknia",
    name: "Квітка на комині",
    kind: "Вишита сукня",
    collection: "kvitka",
    tagline: "Сукня, в якій хочеться йти босоніж",
    price: 6100,
    category: "zhinkam",
    options: SIZES,
    fabric: LINEN,
    description:
      "Сукня, в якій хочеться йти босоніж і нікуди не поспішати. Вишивка не придумана, а знайдена — серед орнаментів, що колись прикрашали оселі Уманщини. Ми просто повернули їм життя. Без яскравих акцентів, тож легко поєднується і в кежуал, і в етно-образах.",
    details: ["Довжина максі", "Вишиті рукави на манжеті", "Носіть з поясом або вільно"],
    care: LINEN_CARE,
    sources: [ig("DXyvdxys02w"), ig("DWZKXmCjPbF"), ig("DW6vvgXDO8k")],
    publishedAt: "2026-05-01",
    inStock: true,
  }),
  P({
    slug: "lemko-chorna-zhinocha",
    name: "Лемківська · чорний льон",
    kind: "Жіноча вишиванка",
    collection: "lemkivska",
    tagline: "Білий стібок на глибокому чорному",
    price: 0,
    onRequest: true,
    category: "zhinkam",
    options: SIZES,
    fabric: "Чорний льон",
    description:
      "У кожному білому стібку на глибокому чорному льоні — продовження нашої лемківської історії, яке так тепло відчувати на собі. М'який льон, вишиті рукави й манжети з білим кантом, зав'язка на горловині.",
    details: ["Вишивка білою ниткою", "Манжети з кантом", "Пара до чоловічої моделі в чорному"],
    care: LINEN_CARE,
    badges: ["new"],
    sources: [ig("DfceMSnRx4e"), ig("DfZ7AYVs_ie"), ig("DfU1PSQRbj3")],
    publishedAt: "2026-11-07",
    inStock: true,
  }),
  P({
    slug: "kvitka-khustyna",
    name: "Квітка на комині",
    kind: "Лляна хустина",
    collection: "kvitka",
    tagline: "Деталь, що змінює весь образ",
    price: 3100,
    category: "aksesuary",
    options: ["Один розмір"],
    optionLabel: "Розмір",
    fabric: "100% натуральний молочний льон",
    description:
      "Легка, невагома й трансформується під настрій: на плечах, на голові чи як шарф. Тонкі лінії орнаменту вздовж хвилястого краю — реверанс українським традиціям у сучасному прочитанні.",
    details: ["Делікатна вишивка вздовж краю", "Хвиляста обробка краю", "Носіть на плечах, на голові чи як шарф"],
    care: LINEN_CARE,
    badges: ["bestseller"],
    sources: [ig("DWwbdopDdW8"), ig("DclPhW7igeS"), ig("DcyLwDeCr2g")],
    publishedAt: "2026-08-28",
    inStock: true,
  }),
  P({
    slug: "korset-palazzo",
    name: "Корсет і палаццо",
    kind: "Лляний комплект",
    collection: "kvitka",
    tagline: "Цілісний образ до хустини",
    price: 0,
    onRequest: true,
    madeToOrder: "індивідуальний пошив",
    category: "zhinkam",
    options: SIZES,
    fabric: LINEN,
    description:
      "Створюємо цілісний образ: відшиємо для вас силуетний корсет на шнурівці та штани палаццо з молочного льону — у пару до хустини «Квітка на комині». Шиємо індивідуально, вартість і терміни — у Direct.",
    details: ["Корсет на шнурівці", "Широкі штани палаццо", "Індивідуальний пошив"],
    care: LINEN_CARE,
    sources: [ig("DclPhW7igeS")],
    publishedAt: "2026-08-28",
    inStock: true,
  }),

  // ───────────── Вишиванки · чоловікам ─────────────
  P({
    slug: "lemko-cholovicha",
    name: "Лемківська",
    kind: "Чоловіча вишиванка",
    collection: "lemkivska",
    tagline: "Лемківщина в чоловічому характері",
    price: 6400,
    category: "cholovikam",
    options: SIZES,
    fabric: LINEN,
    description:
      "Геометрія цих візерунків — не просто декор, а стародавній код, який чоловіки-лемки носили поколіннями, зберігаючи гідність попри всі заборони. Давній хрестик поєднали з лаконічними вертикальними захипами, щоб річ звучала сучасно, але мала глибоке коріння.",
    details: ["Геометричний орнамент уздовж застібки", "Вишиті манжети", "Відкладний комір", "Вертикальні захипи", "Машинна вишивка"],
    care: LINEN_CARE,
    badges: ["bestseller"],
    sources: [ig("DcV2qbeioGl"), ig("DdTxIFeqaTV")],
    publishedAt: "2026-09-15",
    inStock: true,
  }),
  P({
    slug: "kvitka-cholovicha",
    name: "Квітка на комині",
    kind: "Чоловіча вишиванка",
    collection: "kvitka",
    tagline: "Біле по білому: чоловічий характер",
    price: 5000,
    category: "cholovikam",
    options: SIZES,
    fabric: LINEN,
    composition: "Льон 100%, вишивка — бавовна",
    description:
      "Вишивка, яка не кричить, а заявляє про себе текстурою. Візерунки, що оберігали стіни та печі хат на Уманщині, перенесені на полотно — ваш особистий оберіг і символ смаку. Комір-стійка, розріз на ґудзиках.",
    details: ["Вишивка білим по білому", "Комір-стійка", "Вишиті манжети", "Розміри XS–XL"],
    care: LINEN_CARE,
    sources: [ig("DV_HXTvDMLV"), ig("DVg0jUnjPCj")],
    publishedAt: "2026-03-17",
    inStock: true,
  }),
  P({
    slug: "lemko-chorna-cholovicha",
    name: "Лемківська · чорний льон",
    kind: "Чоловіча вишиванка",
    collection: "lemkivska",
    tagline: "Стриманий ритм вишивки",
    price: 0,
    onRequest: true,
    category: "cholovikam",
    options: SIZES,
    fabric: "Чорний льон",
    description:
      "Чоловіча вишиванка в чорному кольорі — стриманий ритм вишивки та традиція, яку приємно носити щодня. Відкладний комір, біла вишивка вздовж планки.",
    details: ["Вишивка білою ниткою вздовж планки", "Відкладний комір", "Пара до жіночої моделі в чорному"],
    care: LINEN_CARE,
    badges: ["new"],
    sources: [ig("DfZ8OOiMWZU"), ig("Dfcegm3RGoQ")],
    publishedAt: "2026-11-06",
    inStock: true,
  }),
  P({
    slug: "lliana-sorochka",
    name: "Лляна сорочка",
    kind: "Чоловіча сорочка",
    collection: "kvitka",
    tagline: "Стриманість і свобода",
    price: 0,
    onRequest: true,
    category: "cholovikam",
    options: SIZES,
    fabric: LINEN,
    description:
      "Стриманість, у якій відчувається характер та абсолютна свобода. Вільний крій, м'який молочний відтінок і приємна до тіла фактура, що дозволяє тілу дихати. Гармонійно поєднується з хустиною «Квітка на комині».",
    details: ["Вільний крій", "Молочний відтінок", "Нагрудна кишеня"],
    care: LINEN_CARE,
    sources: [ig("DdZBqf5KMUP"), ig("DcyLwDeCr2g")],
    publishedAt: "2026-09-17",
    inStock: true,
  }),

  // ───────────── Святковий стіл ─────────────
  P({
    slug: "zirka-raner",
    name: "Зірка",
    kind: "Ранер з вишивкою",
    collection: "zirka",
    tagline: "Зірка-оберіг на вашому столі",
    price: 3000,
    category: "stil",
    options: ["200 × 40 см", "250 × 40 см"],
    optionLabel: "Розмір ранера",
    optionPrices: { "200 × 40 см": 3000, "250 × 40 см": 3200 },
    fabric: "Тканина з тефлоновим покриттям",
    composition: "70% бавовна, 30% поліестер",
    description:
      "Деталі, які збирають усю родину за одним столом. Ранер із вишитою зіркою — оберіг і особливий акцент: у давніх українських орнаментах зірка означала народження нового, натхнення та чисту енергію. Тефлонове покриття відштовхує вологу.",
    details: ["Вишита зірка-оберіг", "Водовідштовхувальне тефлонове покриття", "200 × 40 см — 3 000 ₴ · 250 × 40 см — 3 200 ₴"],
    care: TEFLON_CARE,
    badges: ["new"],
    sources: [ig("Dfj07qaRclk"), ig("DRZ5v14DJWg")],
    publishedAt: "2026-11-10",
    inStock: true,
  }),
  P({
    slug: "zirka-komplekt",
    name: "Зірка",
    kind: "Комплект: ранер і серветки",
    collection: "zirka",
    tagline: "Тепло сімейних вечорів",
    price: 4700,
    category: "stil",
    options: ["Ранер + 4 серветки", "Ранер + 6 серветок"],
    optionLabel: "Комплект",
    optionPrices: { "Ранер + 4 серветки": 4700, "Ранер + 6 серветок": 5700 },
    fabric: "Тканина з тефлоновим покриттям",
    composition: "70% бавовна, 30% поліестер",
    description:
      "Тепло сімейних вечорів починається з деталей. Вишитий орнамент наповнює дім особливим світлом і гармонією. За бажанням комплект можна доповнити скатертиною — напишіть про це в коментарі до замовлення.",
    details: ["Ранер + 4 серветки — 4 700 ₴", "Ранер + 6 серветок — 5 700 ₴", "Скатертина до комплекту: +1 100 ₴ (у коментарі до замовлення)"],
    care: TEFLON_CARE,
    badges: ["new"],
    sources: [ig("Dfotfi_RRtq")],
    publishedAt: "2026-11-12",
    inStock: true,
  }),
  P({
    slug: "rizdvo-komplekt",
    name: "Символи Різдва",
    kind: "Комплект: ранер і серветки",
    collection: "rizdvo",
    tagline: "Святкова атмосфера починається з деталей",
    price: 4500,
    category: "stil",
    options: ["Ранер + 4 серветки", "Ранер + 6 серветок"],
    optionLabel: "Комплект",
    optionPrices: { "Ранер + 4 серветки": 4500, "Ранер + 6 серветок": 5500 },
    fabric: "Тканина з водовідштовхувальним покриттям",
    description:
      "Дідух, коза, свічка й зірка — символи українського Різдва в акуратній вишивці. Ранер і серветки пасують до будь-якого інтер'єру, від мінімалізму до класичної святкової сервіровки, а краплі не проникають у волокна. Подарунок зі змістом, який щороку дістають на свята.",
    details: ["Ранер + 4 серветки — 4 500 ₴", "Ранер + 6 серветок — 5 500 ₴", "Скатертина до комплекту: +1 100 ₴ (у коментарі до замовлення)", "Святкове пакування"],
    care: TEFLON_CARE,
    badges: ["new", "bestseller"],
    sources: [ig("Df2Jmi2RqUW"), ig("DSkafgSDInX"), ig("DRaESDSDHuJ")],
    publishedAt: "2026-11-17",
    inStock: true,
  }),
  P({
    slug: "rizdvo-raner",
    name: "Символи Різдва",
    kind: "Ранер з вишивкою",
    collection: "rizdvo",
    tagline: "Тепло, яке видно",
    price: 1800,
    category: "stil",
    options: ["150 × 40 см", "200 × 40 см", "250 × 40 см"],
    optionLabel: "Розмір ранера",
    optionPrices: { "150 × 40 см": 1800, "200 × 40 см": 2000, "250 × 40 см": 2200 },
    fabric: "Тканина з водовідштовхувальним покриттям",
    description:
      "Коли вдома з'являється ранер із різдвяними символами, починається атмосфера. Кожен елемент вишивки не випадковий: вони несуть українські сенси, оберігають і наповнюють простір нашою культурою та корінням.",
    details: ["150 × 40 см — 1 800 ₴", "200 × 40 см — 2 000 ₴", "250 × 40 см — 2 200 ₴"],
    care: TEFLON_CARE,
    sources: [ig("DRaGfS5jMvG"), ig("DRaESDSDHuJ")],
    publishedAt: "2025-11-23",
    inStock: true,
  }),
  P({
    slug: "rizdvo-servetky",
    name: "Символи Різдва",
    kind: "Серветки 40 × 40 см",
    collection: "rizdvo",
    tagline: "Справжній різдвяний затишок",
    price: 500,
    category: "stil",
    options: ["1 шт", "4 шт", "6 шт"],
    optionLabel: "Кількість",
    optionPrices: { "1 шт": 500, "4 шт": 1500, "6 шт": 2500 },
    fabric: "Тканина з водовідштовхувальним покриттям",
    description:
      "Серветки, що створюють ту атмосферу, яку хочеться відчути взимку. Різні символи на кожній — свічка, коза, зірка — тож набір виглядає живим і святковим.",
    details: ["Розмір 40 × 40 см", "1 шт — 500 ₴ · 4 шт — 1 500 ₴ · 6 шт — 2 500 ₴"],
    care: TEFLON_CARE,
    sources: [ig("DR-FNpEDGS_")],
    publishedAt: "2025-12-07",
    inStock: true,
  }),
  P({
    slug: "heseky-raner",
    name: "Гесики",
    kind: "Ранер і серветки",
    collection: "heseky",
    tagline: "Текстиль, що оберігає простір",
    price: 2500,
    category: "stil",
    options: ["150 см", "200 см", "250 см", "Серветка 40 × 40 см"],
    optionLabel: "Варіант",
    optionPrices: { "150 см": 2500, "200 см": 2600, "250 см": 2700, "Серветка 40 × 40 см": 450 },
    fabric: "Тканина з тефлоновим покриттям",
    description:
      "Гесики — давній орнамент ключів, що здавна символізує захист, достаток і безперервність життя. Ранер створений для тих, хто цінує естетику з історією, але обирає сучасний комфорт: тканина відштовхує вологу й бруд.",
    details: ["Ранер 150 см — 2 500 ₴ · 200 см — 2 600 ₴ · 250 см — 2 700 ₴", "Серветка 40 × 40 см — 450 ₴", "Тефлонове покриття"],
    care: TEFLON_CARE,
    sources: [ig("DUvFrB9jLdb"), ig("DVNtBk8jI5Y"), ig("DUlsOKAjKlv")],
    publishedAt: "2026-02-26",
    inStock: true,
  }),
  P({
    slug: "skatertyna-logo",
    name: "З вашим лого",
    kind: "Скатертина з вишивкою на замовлення",
    collection: "personal",
    tagline: "Дата весілля, особлива фраза чи лого",
    price: 2600,
    onRequest: true,
    madeToOrder: "індивідуальна вишивка",
    category: "stil",
    options: ["На замовлення"],
    description:
      "На кожному маркеті наша скатертина з вишитим лого збирала більше запитань, ніж будь-що інше на столі — тож ми зробили з цього послугу. Вишиваємо лого бренду, дату весілля чи особливу фразу. Не декор, а річ, яка залишиться з вами на роки.",
    details: ["Ціна від 2 600 ₴", "Лого, текст або дата", "Створюємо індивідуально для кожного замовлення", "Разом з @dzvina.studio"],
    sources: [ig("DZzsMRHM9J1"), ig("DZ7MI1KMucV"), ig("DadWq9-MuPq")],
    publishedAt: "2026-07-06",
    inStock: true,
  }),

  // ───────────── Великдень ─────────────
  P({
    slug: "barvinok-rushnyk",
    name: "Барвінок",
    kind: "Великодній рушничок",
    collection: "barvinok",
    tagline: "Орнамент № 39 — ритм вічнозеленого листя",
    price: 1200,
    category: "velykden",
    options: ["Рушничок 30 × 50 см", "Набір: рушничок + стрічка"],
    optionLabel: "Варіант",
    optionPrices: { "Рушничок 30 × 50 см": 1200, "Набір: рушничок + стрічка": 1650 },
    fabric: LINEN,
    description:
      "Як вічнозелений барвінок чи самшит на святковому кошику, цей орнамент не боїться плину часу: він несе звістку про вічне життя і про те, що рід триває. Рушничок і стрічка на кошик — тандем для тих, хто цінує естетику в кожній деталі.",
    details: ["Рушничок 30 × 50 см — 1 200 ₴", "Набір зі стрічкою на кошик — 1 650 ₴", "Китиця на куті"],
    care: LINEN_CARE,
    sources: [ig("DVbtRdcjNx6"), ig("DWBGbjojHTP"), ig("DVWpZuqjJ1F")],
    publishedAt: "2026-03-18",
    inStock: true,
  }),
  P({
    slug: "kvitka-rushnyk",
    name: "Квітка на комині",
    kind: "Рушник, смарагдова вишивка",
    collection: "kvitka",
    tagline: "Орнамент у насиченому смарагді",
    price: 1450,
    category: "velykden",
    options: ["30 × 50 см"],
    optionLabel: "Розмір",
    fabric: LINEN,
    composition: "Льон 100%, вишивка бавовняною ниткою",
    description:
      "Орнамент «Квітки на комині» оживає в насиченому смарагдовому кольорі, що ідеально контрастує з натуральною фактурою льону. Для великоднього кошика чи святкового столу.",
    details: ["Розмір 30 × 50 см", "Смарагдова вишивка", "Китиця на куті"],
    care: LINEN_CARE,
    sources: [ig("DWWRfdLjCPD")],
    publishedAt: "2026-03-26",
    inStock: true,
  }),
  P({
    slug: "velykden-tekstyl",
    name: "Символи Великодня",
    kind: "Скатертини, ранери, серветки",
    collection: "velykden",
    tagline: "Лімітована серія",
    price: 0,
    onRequest: true,
    category: "velykden",
    options: ["Скатертина", "Ранер", "Серветка"],
    optionLabel: "Виріб",
    fabric: "Тканина з тефлоновим покриттям",
    description:
      "Пам'ятаєте дитяче відчуття, коли мама дістає найкращу святкову скатертину? Ми відтворили цю магію: верба, писанка й паска у вишивці. Тефлонове покриття — жодна крапля вина чи соусу не зіпсує святковий обід.",
    details: ["Скатертини, ранери та декоративні серветки", "Тефлонове покриття", "Лімітована серія"],
    care: TEFLON_CARE,
    badges: ["limited"],
    sources: [ig("DVnyrBnjIgc"), ig("DWHFEiGDOx-")],
    publishedAt: "2026-03-20",
    inStock: true,
  }),
];

export const categories: Category[] = [
  { slug: "zhinkam", title: "Жінкам", description: "Вишиванки, сукня та лляні комплекти — лімітовані колекції з льону.", image: "/images/editorial/cat-women.jpg" },
  { slug: "cholovikam", title: "Чоловікам", description: "Чоловічі вишиванки та лляні сорочки з характером.", image: "/images/editorial/cat-men.jpg" },
  { slug: "aksesuary", title: "Хустини", description: "Лляні хустини з делікатною вишивкою.", image: "/images/products/kvitka-khustyna/01.jpg" },
  { slug: "stil", title: "Святковий стіл", description: "Ранери, серветки, комплекти та скатертини з вишивкою.", image: "/images/editorial/cat-home.jpg" },
  { slug: "velykden", title: "Великдень", description: "Рушнички, стрічки на кошик і святковий текстиль.", image: "/images/editorial/cat-easter.jpg" },
];

export const collections: CollectionInfo[] = [
  {
    slug: "lemkivska",
    title: "Лемківська",
    tagline: "Код, який лемки носили поколіннями",
    story:
      "Ці орнаменти ми побачили в музеї на Тернопільщині — роботи Вільяма Джули, лемка, чиї візерунки колись одягав сам Голлівуд. Ми вивчили геометрію, кольори й техніки — і вплели своє бачення. Данина культурі, яка вижила попри все.",
    image: "/images/editorial/col-lemko.jpg",
  },
  {
    slug: "kvitka",
    title: "Квітка на комині",
    tagline: "Квіти, що ніколи не в'януть",
    story:
      "Орнаменти з етнографічного видання «Квітка на комині» колись прикрашали комини й стіни хат Уманщини. Ми перенесли старовинний розпис на льон — у вишиванки, хустини, рушники. Кожен стібок — як спогад, кожна квітка — як оберіг.",
    image: "/images/editorial/col-kvitka.jpg",
  },
  {
    slug: "heseky",
    title: "Гесики",
    tagline: "Давній знак захисту й гармонії",
    story:
      "Гесики — орнамент ключів, безкінечник. Здавна вважалося, що його зображення не пускає зло в дім і в серце. Він структурує, дарує відчуття стійкості й безперервності життя — тому ми зробили з нього і вишиванку на щодень, і текстиль для дому.",
    image: "/images/editorial/col-heseky.jpg",
  },
  {
    slug: "zirka",
    title: "Зірка",
    tagline: "Народження нового і чиста енергія",
    story:
      "Наш перший ранер ми вишили для мам на Різдво. Зірка в давніх українських орнаментах — символ тепла, гармонії та світла, яке завжди повертається додому.",
    image: "/images/editorial/col-zirka.jpg",
  },
  {
    slug: "rizdvo",
    title: "Символи Різдва",
    tagline: "Магія свята в кожній деталі",
    story:
      "Дідух, коза, свічка, зірка. Кожна деталь Святвечора має свій сенс і пам'ять поколінь — і кожна живе в нашій вишивці. Текстиль, який дістають щороку з любов'ю.",
    image: "/images/editorial/col-rizdvo.jpg",
  },
  {
    slug: "velykden",
    title: "Символи Великодня",
    tagline: "Родина за одним столом",
    story:
      "Аромат паски, дитячий сміх і найкраща святкова скатертина. Верба, писанка й паска у вишивці — на тканині, якій не страшні святкові краплі.",
    image: "/images/editorial/col-velykden.jpg",
  },
  {
    slug: "barvinok",
    title: "Барвінок",
    tagline: "Традиція житиме, доки ми її плекаємо",
    story: "Орнамент № 39 — ритм вічнозеленого листя, що в'ється навколо нашої пам'яті.",
    image: "/images/products/barvinok-rushnyk/01.jpg",
  },
  {
    slug: "personal",
    title: "Персоналізація",
    tagline: "Ваш знак у вишивці",
    story: "Лого, дата весілля чи особлива фраза — вишиваємо індивідуально.",
    image: "/images/editorial/custom-1.jpg",
  },
];

/** Paired looks — items are sold separately; `setPrice` is the brand's published price for the pair. */
export const looks: Look[] = [
  {
    slug: "kvitka-para",
    name: "Квітка на комині",
    tagline: "Парний образ · спеціальна ціна",
    description:
      "Жіноча й чоловіча вишиванки «білим по білому» — ваш спільний оберіг, адаптований до сучасного ритму життя. Шляхетно, стримано й по-справжньому.",
    image: "/images/editorial/look-kvitka.jpg",
    items: [{ slug: "kvitka-zhinocha" }, { slug: "kvitka-cholovicha" }],
    setPrice: 9500,
  },
  {
    slug: "lemko-para",
    name: "Лемківська пара",
    tagline: "Червоний хрестик на білому льоні",
    description: "Пишні рукави з воланом і чоловіча сорочка з геометрією вздовж застібки — одна історія на двох.",
    image: "/images/editorial/look-lemko.jpg",
    items: [{ slug: "lemko-zhinocha" }, { slug: "lemko-cholovicha" }],
  },
  {
    slug: "kvitka-obraz",
    name: "Сукня і хустина",
    tagline: "Весняний образ",
    description: "Лляна сукня «Квітка на комині» і хустина з хвилястим краєм — тепло, легко й дуже по-нашому.",
    image: "/images/editorial/dress-1.jpg",
    items: [{ slug: "kvitka-suknia" }, { slug: "kvitka-khustyna" }],
  },
];

export const colorFilters: ColorFilter[] = [
  { family: "milk", label: "Білий і молочний", hex: "#F1ECE1" },
  { family: "beige", label: "Натуральний льон", hex: "#D8C7A8" },
  { family: "green", label: "Зелений", hex: "#2F6B57" },
  { family: "black", label: "Чорний", hex: "#151210" },
];

/** Colour family of products without colour variants (for the colour filter) */
export const baseFamily: Record<string, ColorFilter["family"]> = {
  "heseky-vyshyvanka": "beige",
  "lemko-chorna-zhinocha": "black",
  "lemko-chorna-cholovicha": "black",
  "korset-palazzo": "milk",
  "lliana-sorochka": "milk",
};
