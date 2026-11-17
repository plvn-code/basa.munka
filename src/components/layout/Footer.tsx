import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/catalog/repository";
import { site } from "@/lib/config/site";
import { InstagramIcon, SendIcon } from "@/components/ui/Icons";
import { Ornament } from "@/components/ui/Ornament";
import { MadeBy } from "./MadeBy";

export async function Footer() {
  const categories = await getCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Ornament variant="line" cell={5} tone="light" className="footer__stitch" />
      <div className="container footer__cta">
        <p className="footer__cta-text">
          Замовлення, підбір розміру та персоналізація — <em>у Direct</em>
        </p>
        <a href={site.directUrl} target="_blank" rel="noreferrer" className="btn btn--light">
          <SendIcon width={17} height={17} /> Написати в Direct
        </a>
      </div>

      <div className="container footer__top">
        <div className="footer__brand">
          <Image src="/brand/logo-white.png" alt="BASAMUNKA" width={1026} height={507} sizes="170px" />
          <p>Сучасна українська естетика у вишивці. Вишиванки з льону, хустини та текстиль для дому — лімітованими колекціями.</p>
          <div className="footer__social">
            <a href={site.socials.instagram.url} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon width={18} height={18} />
            </a>
            <a href={site.directUrl} target="_blank" rel="noreferrer" aria-label="Написати в Direct">
              <SendIcon width={18} height={18} />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h3>Каталог</h3>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`}>{c.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/looks">Колекції</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>Покупцям</h3>
          <ul>
            <li>
              <Link href="/info/delivery">Доставка та оплата</Link>
            </li>
            <li>
              <Link href="/info/returns">Обмін і повернення</Link>
            </li>
            <li>
              <Link href="/size-guide">Розміри та догляд</Link>
            </li>
            <li>
              <Link href="/wishlist">Обране</Link>
            </li>
            <li>
              <Link href="/contacts">Контакти</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>Наживо</h3>
          <ul>
            <li>
              <a href={site.offline.instagram} target="_blank" rel="noreferrer">
                {site.offline.name}
              </a>
            </li>
            <li className="footer__addr">{site.offline.address}</li>
            <li>
              <Link href="/about">Про бренд</Link>
            </li>
            <li>
              <a href={site.socials.instagram.url} target="_blank" rel="noreferrer">
                {site.socials.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} BASAMUNKA · Зроблено в Україні</span>
        <nav aria-label="Документи">
          <Link href="/info/offer">Публічна оферта</Link>
          <Link href="/info/privacy">Конфіденційність</Link>
        </nav>
        <MadeBy />
      </div>
      <div className="ua-line" aria-hidden="true" />
    </footer>
  );
}
