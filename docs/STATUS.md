# Status

_Last updated: 2026-11-18._ Update this file at the end of every session.

## Done (2026-11-17/18)

- Instagram @basamunka researched: 91 posts (captions in `research/captions.txt`), soleya.com.ua studied as the layout reference (transparent header over full-screen video, bestsellers rail, category tiles, «Good set», Instagram strip).
- Hero: 26 s daytime drone montage of Kyiv (Дніпро, Михайлівський собор, Андріївська церква, Майдан, Арка Свободи, золоті бані) with landmark name + coordinates and story-style progress bars; header floats over it.
- Ukrainian details: animated cross-stitch ornament bands (red + black thread), blue/yellow hairlines under the hero and footer, «UA» stat, flag dot.
- Catalogue: **22 products, 104 photos** (studio frames and the brand's two packshots on white first). 5 categories, 8 collections, 3 paired looks («Квітка на комині» pair at the published 9 500 ₴).
- Pages: home (intro, video hero, statement, category tiles, bestsellers, collections tabs, Lemko story, pair set, textile rail, details, personalisation, offline store, Instagram, perks), `/shop` with filters, product page, `/looks` (collections), `/about`, `/size-guide`, `/contacts` + FAQ, info pages, cart, checkout, wishlist.
- Checked: tsc + lint clean, build OK, 1440 and 390 px, no horizontal overflow.

## Questions for the client

1. **Prices not published**: black linen Lemko vyshyvanky (women's & men's), men's linen shirt, corset + palazzo, «Символи Великодня» textile — now «Ціна в Direct».
2. **Old prices**: «Символи Різдва» runner (1 800 / 2 000 / 2 200 ₴) and napkins (500 / 1 500 / 2 500 ₴) are from Nov 2025 — still valid? The set's price was raised in Nov 2026 (4 500 / 5 500 ₴).
3. **Sizes**: only «Квітка на комині» (XS–XL) and «Гесики» (S–XL) were published; the same XS–XL is used for the Lemko models, the dress and men's shirts — confirm, and send a real size chart (the site shows an approximate one).
4. **Pair price 9 500 ₴**: the cart charges the two items separately; the note says the special price is applied on confirmation. Should the site apply it automatically?
5. **Stock**: what is in stock now; is Easter / Christmas textile seasonal (hide off-season)?
6. **Delivery & returns** terms, payment methods (card / IBAN / COD), international shipping?
7. **Contacts**: phone / Telegram / e-mail, city, FOP details for the public offer.
8. **Telegram bot** for orders: token from @BotFather + chat id → `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
9. **Photos**: some products only have Instagram reel covers (640 px): «Символи Різдва» runner & napkins, «Квітка на комині» rushnyk, logo tablecloth. Packshots on white for every item would make the catalogue look like soleya.
10. **Logo**: we cut it from post DdCMQBeqd7- — a vector (SVG/PDF) would be sharper.
11. **Domain** and whether to deploy on Vercel.

## Next steps

1. Show the client, collect answers.
2. GitHub repo + Vercel (ask the user first), bot env, domain, launch (`NEXT_PUBLIC_ALLOW_INDEXING=true`).
