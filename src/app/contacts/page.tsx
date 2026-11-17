import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/config/site";
import { BagIcon, InstagramIcon, SendIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Зв'язатися з BASAMUNKA: Instagram Direct. Відповіді на часті питання про доставку, розміри, персоналізацію та догляд.",
};

const faq = [
  {
    q: "Як оформити замовлення?",
    a: "Додайте речі в кошик і заповніть коротку форму. Ми зв'яжемося з вами в зручному месенджері або за телефоном, підтвердимо наявність і розмір та надішлемо реквізити для оплати. Також можна просто написати нам у Direct.",
  },
  {
    q: "Як ви доставляєте?",
    a: "Новою поштою по всій Україні — до відділення, поштомату або кур'єром. Терміни відправки уточнимо під час підтвердження замовлення.",
  },
  {
    q: "Як обрати розмір вишиванки?",
    a: "Звірте свої обхвати з розмірною сіткою на сторінці «Розміри та догляд» або напишіть нам у Direct свій зріст і параметри — підберемо посадку для конкретної моделі.",
  },
  {
    q: "Чи можна вишити наше лого чи дату весілля?",
    a: "Так! Вишиваємо лого, текст чи дату на скатертині — ціна від 2 600 ₴. Напишіть у Direct, що саме хочете, і ми розрахуємо вартість і терміни.",
  },
  {
    q: "Як доглядати за тефлоновим текстилем?",
    a: "Рідина залишається на поверхні краплями — просто промокніть серветкою. Періть делікатно при 30 °C без відбілювачів і прасуйте з виворітного боку.",
  },
  {
    q: "Де можна побачити речі наживо?",
    a: `У галереї українських ремесел ${site.offline.name}: ${site.offline.address}. А ще ми буваємо на маркетах — анонси в Instagram.`,
  },
];

export default function ContactsPage() {
  return (
    <div className="container">
      <div className="page-hero">
        <nav aria-label="Хлібні крихти">
          <ol className="breadcrumbs">
            <li>
              <Link href="/">Головна</Link>
            </li>
            <li aria-current="page">Контакти</li>
          </ol>
        </nav>
        <h1 className="page-title">
          Ми на <em className="serif-em">зв&apos;язку</em>
        </h1>
        <p className="lead">Питання щодо розміру, наявності, персоналізації чи замовлення — пишіть нам, відповімо й допоможемо з вибором.</p>
      </div>

      <div className="contact-cards">
        <a className="contact-card" href={site.directUrl} target="_blank" rel="noreferrer">
          <SendIcon width={26} height={26} />
          <h3>Direct</h3>
          <p>Найшвидший спосіб: підбір розміру, наявність, статус замовлення.</p>
          <span className="link-u" style={{ justifySelf: "start" }}>
            Написати
          </span>
        </a>
        <a className="contact-card" href={site.socials.instagram.url} target="_blank" rel="noreferrer">
          <InstagramIcon width={26} height={26} />
          <h3>Instagram</h3>
          <p>Новинки, історії орнаментів і відгуки — {site.socials.instagram.handle}.</p>
          <span className="link-u" style={{ justifySelf: "start" }}>
            Відкрити
          </span>
        </a>
        <a className="contact-card" href={site.offline.instagram} target="_blank" rel="noreferrer">
          <BagIcon width={26} height={26} />
          <h3>{site.offline.name}</h3>
          <p>
            {site.offline.note}: {site.offline.address}. Приміряти й роздивитися кожну деталь.
          </p>
          <span className="link-u" style={{ justifySelf: "start" }}>
            @rikka_khust
          </span>
        </a>
      </div>

      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="section-head">
          <div className="section-head__text">
            <span className="eyebrow">FAQ</span>
            <h2 className="title">
              Часті <em>питання</em>
            </h2>
          </div>
        </div>
        <div className="accordion faq">
          {faq.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <div className="accordion__body">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
