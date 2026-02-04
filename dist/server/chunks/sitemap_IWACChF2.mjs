import { c as createComponent, e as renderComponent, r as renderTemplate, am as maybeRenderHead, an as addAttribute } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import { $ as $$Layout } from './Layout_Bl4oGuow.mjs';
import { g as getCollection } from './_astro_content_DX0JPfJj.mjs';

const $$Sitemap = createComponent(async ($$result, $$props, $$slots) => {
  const cities = await getCollection("cities");
  const sortedCities = cities.sort((a, b) => a.data.name.localeCompare(b.data.name));
  const glossaryEntries = await getCollection("glossary");
  const sortedGlossary = glossaryEntries.sort((a, b) => a.data.title.localeCompare(b.data.title));
  const mainPages = [
    { title: "Startseite", href: "/" },
    { title: "Leistungen", href: "/#leistungen" },
    { title: "Wohnmobil-Aufbereitung", href: "/wohnmobil" },
    { title: "Leasing-R\xFCckgabe", href: "/leasing" },
    { title: "Dampfreinigung", href: "/dampfreinigung" },
    { title: "Werterhalt-Garantie", href: "/werterhalt-garantie" },
    { title: "Galerie", href: "/#gallery" },
    { title: "\xDCber mich", href: "/#about" },
    { title: "Preisrechner", href: "/#rechner" },
    { title: "FAQ", href: "/#faq" }
  ];
  const legalPages = [
    { title: "Impressum", href: "/impressum" },
    { title: "Datenschutz", href: "/datenschutz" },
    { title: "AGB", href: "/agb" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sitemap | RG Detailing", "description": "\xDCbersicht aller Seiten von RG Detailing." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-32 text-zinc-300"> <h1 class="text-4xl font-bold text-white mb-12">Sitemap</h1> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12">  <div> <h2 class="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Hauptseiten</h2> <ul class="space-y-3"> ${mainPages.map((page) => renderTemplate`<li> <a${addAttribute(page.href, "href")} class="hover:text-red-500 transition-colors block py-1"> ${page.title} </a> </li>`)} </ul> </div>  <div> <h2 class="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Standorte</h2> <ul class="space-y-3"> ${sortedCities.map((city) => renderTemplate`<li> <a${addAttribute(`/${city.data.slug}`, "href")} class="hover:text-red-500 transition-colors block py-1">
Fahrzeugaufbereitung ${city.data.name} </a> </li>`)} </ul> </div>  <div> <h2 class="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Glossar</h2> <ul class="space-y-3"> ${sortedGlossary.map((entry) => renderTemplate`<li> <a${addAttribute(`/glossar/${entry.slug}`, "href")} class="hover:text-red-500 transition-colors block py-1"> ${entry.data.title} </a> </li>`)} </ul> </div>  <div> <h2 class="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Rechtliches</h2> <ul class="space-y-3"> ${legalPages.map((page) => renderTemplate`<li> <a${addAttribute(page.href, "href")} class="hover:text-red-500 transition-colors block py-1"> ${page.title} </a> </li>`)} <li> <a href="/sitemap.xml" class="hover:text-red-500 transition-colors block py-1 text-zinc-500 text-sm mt-4">
XML Sitemap (für Bots)
</a> </li> </ul> </div> </div> </div> ` })}`;
}, "/app/src/pages/sitemap.astro", void 0);

const $$file = "/app/src/pages/sitemap.astro";
const $$url = "/sitemap";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Sitemap,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
