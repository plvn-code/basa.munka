# BASAMUNKA — online store (client project)

Store for **BASAMUNKA** (Instagram @basamunka, «Текстиль та одяг», ~1.1K followers): «Сучасна українська естетика у вишивці» — limited vyshyvanky in 100% linen (women's, men's, a dress, a linen shawl) and embroidered table textile (runners, napkins, sets, Easter rushnyky, tablecloths with a client's logo). Name = «смужка» in Lemko dialect. Until now sold only via Direct; offline at Rikka concept store (Хуст). The repo owner is a developer (studio Superio) building the site for that client.

Built 2026-11-17/18 on the architecture of `~/Desktop/egoest` (cart → checkout → order to Telegram → «Дякуємо»). Brief: expensive animated site modelled on **soleya.com.ua**, **mostly white with Ukrainian details**; first screen = **daytime drone video of Kyiv showing landmarks**; products from the Instagram photos.

**Talk to the user in Russian.** Site UI copy is **Ukrainian**, polite «ви» like the brand's captions. Prices in **UAH** (`5 100 ₴`).

Before doing anything substantial, read `docs/STATUS.md` (done / open questions for the client).

## Commands

```bash
npm run build && npm start                  # production on :3019 (3017 ego · 3018 ego dev)
npm run dev                                 # dev on :3019 — orders are printed to the terminal instead of Telegram
npm run lint && npx tsc --noEmit            # must stay clean
open -a "Google Chrome" http://localhost:3019
kill $(lsof -ti tcp:3019 -sTCP:LISTEN)      # restart only our port
~/Desktop/nudes/research/.venv/bin/python -I scripts/build_images.py   # rebuild public/images from originals/ig (Pillow venv borrowed from nudes)
~/Desktop/nudes/research/.venv/bin/python -I scripts/logo.py           # logo PNGs + icons, cut from post DdCMQBeqd7-
```

`node_modules` is a **symlink** to `~/Desktop/nudes/node_modules` (same package.json; the Mac is short on disk). No git remote yet — ask the user before creating a GitHub repo / Vercel project.

## Stack

Next.js 15 App Router · React 19 · TypeScript strict · plain CSS (`src/app/globals.css`; the BASAMUNKA layer is the last block — base rules above it come from the EGO/NUDES family) · self-hosted fonts: **Forum** (display, Trajan-like with Cyrillic), **Cormorant Garamond italic** (`em` accents), **Montserrat** (UI labels, the logo wordmark), **Lato** (text) · `next/image`. No DB / auth / online payment by design. Orders → Telegram via `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` (`.env.example`); without them production refuses orders on purpose.

## Layout

```
src/app/            / · /shop (?category= &color= &size= &collection= &sort=) · /product/[slug] (?color=) · /looks (Колекції + парні образи)
                    /about · /size-guide (розміри та догляд) · /contacts · /cart · /checkout · /wishlist · /info/[slug]
                    api/orders (POST → validate → recompute price per option from catalog → Telegram; onRequest items rejected)
src/lib/catalog/    types.ts · data.ts (22 products, categories, 8 collections, 3 looks, colour filters, size chart) · repository.ts (ONLY read path)
                    price.ts — priceFor(product, colour, option): option price → colour price → base
src/components/home HeroVideo (Kyiv montage, scene captions synced to video.currentTime) · CollectionsTabs · Manifesto
src/components/ui   Ornament (cross-stitch band, «stitches in» on scroll) · Parallax · Reveal · Rail
public/video/       kyiv.mp4 (26 s, 1280×720, 5 MB, no audio) + kyiv-poster.jpg
public/brand/       logo.png / logo-white.png (orange U + wordmark), mark.png (U only), icons
public/images/      products/<slug>/NN.jpg (3:4) · editorial/*.jpg
scripts/            catalog_images.py (slug → IG frames; "pack" = packshot on white) · build_images.py · fetch_ig.py · sheets.py · logo.py
originals/ig/<post>/NN.jpg (NNv = reel cover)   research/ig.json, captions.txt, sheets/   — git-ignored
```

## Hero video

Montage of 6 free Pexels clips (Pexels licence, commercial use OK, no attribution required): 11998021 Дніпро · 17032927 Михайлівський собор · 17027991 Андріївська церква · 14615723 Майдан · 13800681 Арка Свободи · 17032918 Михайлівський згори. 5 s each, 0.8 s crossfades, built with a portable ffmpeg (imageio-ffmpeg wheel in the session scratchpad — re-download if needed). Scene start times live in `SCENES` in `HeroVideo.tsx` (multiples of 4.2 s) — change both together.

## Rules

- **Never invent product facts** (price, sizes, fabric). Source: `research/captions.txt`. Items whose price was never published are `onRequest` («Ціна в Direct», can't be added to the cart). Runner/set prices differ per option → `optionPrices`.
- Product names are the brand's ornament/collection names in «ёлочках»; `kind` says what the item is.
- Palette: white/linen base, chocolate `--choco #33200D` for dark blocks, logo terracotta `--brand #F15D15` as the only bright accent; embroidery red `--thread` and flag blue/yellow only as thin details (`.ua-line`, `.ua-dot`, Ornament). Motion behind `prefers-reduced-motion`.
- Don't reuse class names from the base CSS for new sections (`.story`, `.line` already exist) — prefix new blocks.
- Keep the security baseline: CSP/headers in `next.config.ts`, server recomputes prices, never commit `.env*`, `originals/`, `research/`.
