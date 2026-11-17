import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/config/site";
import { Manifesto } from "@/components/home/Manifesto";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { InstagramIcon, SendIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Про бренд",
  description:
    "BASAMUNKA — український бренд текстилю та одягу з вишивкою. Лемківською «басамунка» — смужка, елемент національного строю. Ми молоді, але глибоко вкорінені у свої традиції.",
};

const manifesto = [
  "Ми — молоді, але глибоко вкорінені у свої традиції.",
  "Українські символи та орнаменти — наша ідентичність,",
  <em key="g">наш генокод.</em>,
  <Fragment key="t">
    Ми хочемо, щоб українське звучало <em>голосно й красиво.</em>
  </Fragment>,
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero__media">
          {["story-1", "col-kvitka", "col-heseky"].map((n) => (
            <div key={n}>
              <Image src={`/images/editorial/${n}.jpg`} alt="" fill priority sizes="(max-width: 960px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
        <div className="container about-hero__body">
          <span className="eyebrow">BASAMUNKA · Текстиль та одяг</span>
          <h1 className="display">
            Спадщина, яка <em>оживає у сьогоденні</em>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container story">
          <Reveal className="story__media">
            <Image src="/images/editorial/col-lemko.jpg" alt="Чоловіча лемківська вишиванка BASAMUNKA" fill sizes="(max-width: 960px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </Reveal>
          <div className="story__body">
            <span className="eyebrow">Звідки наша назва</span>
            <h2 className="title">
              Басамунка — <em>смужка лемківською</em>
            </h2>
            <p className="lead">
              Лемківщина — край, звідки походить наша назва. Басамунка — смужка, елемент, який завжди присутній у національному строї.
              Ми почали з текстилю для дому: ранерів і серветок із символами, що несуть добро, затишок і світло в дім.
            </p>
            <p className="lead">
              Сьогодні BASAMUNKA — це вишиванки з натурального льону й святковий текстиль. Ми вивчаємо орнаменти в музеях та етнографічних
              виданнях, відтворюємо техніки, що передавались із покоління в покоління, — і вкладаємо цю глибину в речі для сучасного життя.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">BASAMUNKA</span>
            <h2 className="title">
              Що для нас <em>важливо</em>
            </h2>
            <Ornament variant="line" cell={4} className="section-head__stitch" />
          </div>
          <div className="values">
            <Reveal className="value">
              <b>01</b>
              <h3>Орнамент зі змістом</h3>
              <p>Кожна колекція побудована навколо одного орнаменту: лемківський хрестик, «Квітка на комині», гесики, зірка.</p>
            </Reveal>
            <Reveal className="value" delay={100}>
              <b>02</b>
              <h3>Натуральні тканини</h3>
              <p>Вишиванки — зі 100% льону, що дихає й з роками стає лише кращим. Святковий текстиль — з водовідштовхувальним покриттям.</p>
            </Reveal>
            <Reveal className="value" delay={200}>
              <b>03</b>
              <h3>Українське — щодня</h3>
              <p>Щоб вишивка була не лише атрибутом свята, а частиною стильного повсякденного життя.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Manifesto eyebrow="Наш маніфест" lines={manifesto} />
        </div>
      </section>

      <section className="feature feature--dark">
        <div className="feature__media">
          <Image src="/images/editorial/market-2.jpg" alt="BASAMUNKA на маркеті" fill sizes="(max-width: 960px) 100vw, 52vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="feature__panel">
          <span className="eyebrow">{site.socials.instagram.handle}</span>
          <h2 className="display">
            Пишіть нам <em>у Direct</em>
          </h2>
          <p className="lead">
            Новинки, історії орнаментів і зйомки — в Instagram. А в Direct підберемо розмір, порадимо комплект для святкового столу чи
            вишиємо ваше лого.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={site.directUrl} target="_blank" rel="noreferrer" className="btn btn--light">
              <SendIcon width={16} height={16} /> Написати
            </a>
            <a href={site.socials.instagram.url} target="_blank" rel="noreferrer" className="btn btn--ghost">
              <InstagramIcon width={16} height={16} /> Instagram
            </a>
            <Link href="/shop" className="btn btn--ghost">
              До каталогу
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
