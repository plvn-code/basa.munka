import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/config/site";
import { getCategories } from "@/lib/catalog/repository";
import { CartProvider } from "@/lib/cart/CartProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/layout/Intro";
import { CartDrawer } from "@/components/cart/CartDrawer";

/**
 * Fonts = the Superio studio system, self-hosted (public/fonts + @font-face in globals.css):
 * Onest (headings), Manrope (text, buttons), JetBrains Mono (labels). Nothing is fetched at build time.
 */
const preloadFonts = ["/fonts/onest-cyrillic.woff2", "/fonts/manrope-cyrillic.woff2", "/fonts/manrope-latin.woff2"];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "BASAMUNKA — сучасна українська естетика у вишивці", template: "%s — BASAMUNKA" },
  description: site.description,
  robots: site.indexable ? undefined : { index: false, follow: false },
  icons: {
    icon: [{ url: "/brand/icon-32.png", sizes: "32x32" }, { url: "/brand/icon-512.png", sizes: "512x512" }],
    apple: "/brand/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "uk_UA",
    images: ["/images/editorial/col-kvitka.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

/** Skips the intro on repeat views within a session (key shared with components/layout/Intro.tsx). */
const introScript = `try{if(sessionStorage.getItem("basamunka.intro.seen"))document.documentElement.classList.add("intro-seen")}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  return (
    <html lang="uk" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {preloadFonts.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
      </head>
      <body>
        <CartProvider>
          <a href="#main" className="skip-link">
            Перейти до вмісту
          </a>
          <Intro />
          <AnnouncementBar />
          <Header categories={categories.map(({ slug, title, image }) => ({ slug, title, image }))} />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
