import Image from "next/image";
import Link from "next/link";
import { getCategories, getCollections, getLooks, getProductBySlug, listProducts } from "@/lib/catalog/repository";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/config/site";
import { HeroVideo } from "@/components/home/HeroVideo";
import { CollectionsTabs } from "@/components/home/CollectionsTabs";
import { ProductCard } from "@/components/product/ProductCard";
import { Rail } from "@/components/ui/Rail";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { Parallax } from "@/components/ui/Parallax";
import { ArrowRight, InstagramIcon, SendIcon } from "@/components/ui/Icons";


/** 1 модель · 2–4 моделі · 5+ моделей */
const models = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? "модель" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "моделі" : "моделей");

const instagram = Array.from({ length: 12 }, (_, i) => `ig-${i + 1}`);

export default async function HomePage() {
  const [categories, all, collections, looks, textile, kvitkaW, kvitkaM] = await Promise.all([
    getCategories(),
    listProducts(),
    getCollections(),
    getLooks(),
    listProducts({ category: "stil" }),
    getProductBySlug("kvitka-zhinocha"),
    getProductBySlug("kvitka-cholovicha"),
  ]);
  // Bestsellers first, then new arrivals (clothes before textile)
  const rank = (b?: string[]) => (b?.includes("bestseller") ? 0 : b?.includes("new") ? 1 : 2);
  const best = all.filter((p) => rank(p.badges) < 2 && p.category !== "stil").sort((a, b) => rank(a.badges) - rank(b.badges));
  const tiles = categories.filter((c) => ["zhinkam", "cholovikam", "stil"].includes(c.slug));
  const tabs = collections.filter((c) => !["personal", "barvinok"].includes(c.slug));
  const pair = looks.find((l) => l.slug === "kvitka-para");

  return (
    <>
      <HeroVideo />

      {/* Categories */}
      <section className="tiles" id="start" aria-label="Категорії">
        {tiles.map((c, i) => (
          <Link key={c.slug} href={`/shop?category=${c.slug}`} className="tile">
            <Parallax speed={0.06} className="tile__img">
              <Image src={c.image} alt="" fill sizes="(max-width: 760px) 100vw, 34vw" priority={i === 0} style={{ objectFit: "cover" }} />
            </Parallax>
            <span className="tile__top">
              <span className="tile__num">0{i + 1}</span>
              <span className="tile__count">{c.count} {models(c.count)}</span>
            </span>
            <span className="tile__bottom">
              <span className="tile__title">{c.title}</span>
              <span className="tile__desc">{c.description}</span>
              <span className="tile__btn">
                Перейти до категорії <ArrowRight width={14} height={14} />
              </span>
            </span>
          </Link>
        ))}
      </section>

      {/* Bestsellers */}
      <section className="section">
        <div className="container">
          <Rail
            label="Бестселери"
            head={
              <>
                <span className="eyebrow">Обирають найчастіше</span>
                <h2 className="title">
                  Наші <em>бестселери</em>
                </h2>
              </>
            }
            extra={
              <Link href="/shop" className="link-u">
                Весь каталог
              </Link>
            }
          >
            {best.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} />
            ))}
          </Rail>
        </div>
      </section>

      {/* Collections */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <span className="eyebrow">Колекції</span>
              <h2 className="title">
                Кожен орнамент <em>має голос</em>
              </h2>
            </div>
            <Link href="/looks" className="link-u">
              Усі колекції
            </Link>
          </div>
          <CollectionsTabs items={tabs} />
        </div>
      </section>

      {/* Lemko story */}
      <section className="lstory" aria-labelledby="story-title">
        <div className="container lstory__grid">
          <div className="lstory__text">
            <Reveal>
              <span className="eyebrow">Лемківська колекція</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display" id="story-title">
                Лемківщина, <em>яку не забули</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead">
                Ми побачили ці орнаменти в музеї на Тернопільщині — роботи Вільяма Джули, лемка й костюмера, чиї візерунки колись
                одягав Голлівуд. Того дня ми закохались у цю геометрію: код, який лемки носили поколіннями, навіть коли їм забороняли
                пам&apos;ятати, хто вони.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <blockquote className="lstory__quote">Тренди минають. А спадок — залишається.</blockquote>
            </Reveal>
            <Reveal delay={280}>
              <div className="lstory__ctas">
                <Link href="/product/lemko-zhinocha" className="btn btn--light">
                  Жіноча · {formatPrice(8500)}
                </Link>
                <Link href="/product/lemko-cholovicha" className="btn btn--ghost">
                  Чоловіча · {formatPrice(6400)}
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lstory__media">
            <Parallax speed={0.08} className="lstory__img lstory__img--a">
              <Image src="/images/editorial/story-1.jpg" alt="Лемківська вишиванка — рукав з червоним хрестиком" fill sizes="(max-width: 960px) 60vw, 26vw" style={{ objectFit: "cover" }} loading="eager" />
            </Parallax>
            <Parallax speed={-0.06} className="lstory__img lstory__img--b">
              <Image src="/images/editorial/story-2.jpg" alt="Чоловіча лемківська вишиванка — орнамент вздовж застібки" fill sizes="(max-width: 960px) 45vw, 20vw" style={{ objectFit: "cover" }} loading="eager" />
            </Parallax>
          </div>
        </div>
        <Ornament tone="light" variant="line" cell={5} className="lstory__stitch" />
      </section>

      {/* Pair look — soleya «Good set» layout */}
      {pair && kvitkaW && kvitkaM && (
        <section className="section">
          <div className="container">
            <div className="section-head section-head--center">
              <span className="eyebrow">{pair.tagline}</span>
              <h2 className="title">
                Один оберіг <em>на двох</em>
              </h2>
              <p className="lead" style={{ marginInline: "auto" }}>
                {pair.description}
              </p>
            </div>
            <div className="pairset">
              <div className="pairset__card">
                <ProductCard product={kvitkaW} sizes="(max-width: 960px) 50vw, 22vw" />
              </div>
              <div className="pairset__media">
                <Image src="/images/editorial/look-kvitka.jpg" alt="Парний образ «Квітка на комині»" fill sizes="(max-width: 960px) 100vw, 26vw" style={{ objectFit: "cover" }} loading="eager" />
              </div>
              <div className="pairset__media">
                <Image src="/images/editorial/col-kvitka.jpg" alt="Жіноча і чоловіча вишиванки «Квітка на комині»" fill sizes="(max-width: 960px) 100vw, 26vw" style={{ objectFit: "cover" }} loading="eager" />
              </div>
              <div className="pairset__card">
                <ProductCard product={kvitkaM} sizes="(max-width: 960px) 50vw, 22vw" />
              </div>
            </div>
            <div className="pairset__price">
              <span>Парний образ</span>
              <s>{formatPrice(pair.sum)}</s>
              <b>{formatPrice(pair.total)}</b>
              <Link href="/looks#pary" className="link-u">
                Усі парні образи
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Textile */}
      <section className="section section--soft">
        <div className="container">
          <Rail
            label="Святковий стіл"
            head={
              <>
                <span className="eyebrow">Текстиль для дому</span>
                <h2 className="title">
                  Для дому, в якому <em>хочеться бути</em>
                </h2>
                <p className="lead">
                  Ранери, серветки та комплекти з вишивкою — з водовідштовхувальним покриттям: краплі не проникають у волокна.
                </p>
              </>
            }
            extra={
              <Link href="/shop?category=stil" className="link-u">
                Святковий стіл
              </Link>
            }
          >
            {textile.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Rail>
        </div>
      </section>

      {/* Details */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Якість, яку відчуваєш</span>
            <h2 className="title">
              Деталі, що <em>мають сенс</em>
            </h2>
          </div>
          <div className="details3">
            {[
              { img: "detail-white", title: "Біле по білому", text: "Вишивка, яка не кричить, а заявляє про себе текстурою. 100% льон, бавовняна нитка." },
              { img: "detail-heseky", title: "Зйомний комірець", text: "Одна вишиванка — два настрої: від стриманої класики до яскравого акценту за секунду." },
              { img: "detail-teflon", title: "Тефлонове покриття", text: "Святковий текстиль, якому не страшні краплі вина чи соусу — просто промокніть серветкою." },
            ].map((d, i) => (
              <Reveal key={d.img} delay={i * 100} className="detail">
                <div className="detail__img">
                  <Image src={`/images/editorial/${d.img}.jpg`} alt={d.title} fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <span className="detail__num">0{i + 1}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Personalisation */}
      <section className="custom" aria-labelledby="custom-title">
        <div className="container custom__grid">
          <div className="custom__media">
            <Reveal className="custom__img">
              <Image src="/images/editorial/custom-1.jpg" alt="Скатертина з вишитим лого на замовлення" fill sizes="(max-width: 960px) 50vw, 22vw" style={{ objectFit: "cover" }} />
            </Reveal>
            <Reveal delay={120} className="custom__img custom__img--offset">
              <Image src="/images/editorial/custom-2.jpg" alt="Бірка BASAMUNKA на скатертині" fill sizes="(max-width: 960px) 50vw, 18vw" style={{ objectFit: "cover" }} />
            </Reveal>
          </div>
          <div className="custom__body">
            <span className="eyebrow">Персоналізація</span>
            <h2 className="display" id="custom-title">
              Скатертина <em>з вашим знаком</em>
            </h2>
            <p className="lead">
              Лого бренду, дата весілля чи особлива фраза — вишиваємо на скатертині. Не декор, а річ, яка залишиться з вами на роки.
              Створюємо індивідуально для кожної пари й кожної компанії.
            </p>
            <div className="custom__row">
              <span className="custom__price">
                від <b>{formatPrice(2600)}</b>
              </span>
              <a href={site.directUrl} target="_blank" rel="noreferrer" className="btn btn--light">
                <SendIcon width={17} height={17} /> Обговорити в Direct
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Offline */}
      <section className="section">
        <div className="container offline">
          <div className="offline__body">
            <span className="eyebrow">Приміряти наживо</span>
            <h2 className="title">
              Відчути тканину <em>руками</em>
            </h2>
            <p className="lead">
              Вишиванки та текстиль BASAMUNKA представлені в галереї українських ремесел {site.offline.name}. А ще ми буваємо на
              маркетах — стежте за анонсами в Instagram.
            </p>
            <address className="offline__addr">
              <strong>{site.offline.name}</strong>
              <span>{site.offline.address}</span>
            </address>
            <a href={site.offline.instagram} target="_blank" rel="noreferrer" className="link-u" style={{ justifySelf: "start" }}>
              <InstagramIcon width={15} height={15} /> @rikka_khust
            </a>
          </div>
          <div className="offline__media">
            <Reveal className="offline__img">
              <Image src="/images/editorial/rikka-1.jpg" alt="Вишиванка BASAMUNKA в Rikka concept store" fill sizes="(max-width: 960px) 50vw, 25vw" style={{ objectFit: "cover" }} />
            </Reveal>
            <Reveal delay={120} className="offline__img">
              <Image src="/images/editorial/market-1.jpg" alt="Стенд BASAMUNKA на маркеті" fill sizes="(max-width: 960px) 50vw, 25vw" style={{ objectFit: "cover" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <span className="eyebrow">{site.socials.instagram.handle}</span>
              <h2 className="title">
                Ми <em>в Instagram</em>
              </h2>
            </div>
            <a href={site.socials.instagram.url} target="_blank" rel="noreferrer" className="link-u">
              <InstagramIcon width={15} height={15} /> Підписатися
            </a>
          </div>
        </div>
        <div className="insta">
          <div className="insta__track">
            {[...instagram, ...instagram].map((name, i) => (
              <a
                key={i}
                href={site.socials.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="insta__item"
                aria-hidden={i >= instagram.length || undefined}
                tabIndex={i >= instagram.length ? -1 : undefined}
                aria-label={i < instagram.length ? `Фото BASAMUNKA в Instagram ${i + 1}` : undefined}
              >
                <Image src={`/images/editorial/${name}.jpg`} alt="" fill sizes="280px" style={{ objectFit: "cover" }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="container" style={{ paddingBottom: "clamp(40px, 5vw, 80px)" }}>
        <ul className="perks">
          <li>
            <strong>100% льон</strong>
            <span>Натуральна тканина, що дихає і з роками стає лише кращою</span>
          </li>
          <li>
            <strong>Нова пошта</strong>
            <span>Відділення, поштомат або кур&apos;єр по всій Україні</span>
          </li>
          <li>
            <strong>Святкове пакування</strong>
            <span>Даруйте з любов&apos;ю — ми подбали про шопер і мішечок</span>
          </li>
          <li>
            <strong>Підбір розміру</strong>
            <span>Напишіть параметри в Direct — підкажемо посадку</span>
          </li>
        </ul>
      </section>
    </>
  );
}
