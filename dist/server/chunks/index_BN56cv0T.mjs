import { c as createComponent, e as renderComponent, r as renderTemplate, am as maybeRenderHead, an as addAttribute } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import { $ as $$Layout } from './Layout_Bl4oGuow.mjs';
import { $ as $$Breadcrumbs } from './Breadcrumbs_B8mLItpZ.mjs';
import { g as getCollection } from './_astro_content_DX0JPfJj.mjs';
import { Book, ArrowRight } from 'lucide-react';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const glossaryEntries = await getCollection("glossary");
  const sortedEntries = glossaryEntries.sort((a, b) => a.data.title.localeCompare(b.data.title));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Glossar & Fachbegriffe | RG Detailing", "description": "Das RG Detailing Lexikon. Wir erkl\xE4ren Fachbegriffe aus der Fahrzeugaufbereitung wie Hologramme, Standzeit und Keramikversiegelung." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-black"> <div class="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div> <div class="container mx-auto px-4 z-10 text-center pt-20"> <span class="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-bold tracking-wider mb-6 uppercase backdrop-blur-md">
Wissen schafft Vertrauen
</span> <h1 class="text-4xl md:text-6xl font-bold mb-6 text-white">Fahrzeugpflege <br> <span class="text-red-500">Lexikon</span></h1> </div> </div> <main class="container mx-auto px-4 py-12 -mt-20 relative z-20"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "crumbs": [
    { label: "Startseite", href: "/" },
    { label: "Glossar", href: "/glossar" }
  ] })} <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"> ${sortedEntries.map((entry) => renderTemplate`<a${addAttribute(`/glossar/${entry.slug}`, "href")} class="glass-panel p-8 hover:bg-zinc-800 transition-colors group flex flex-col h-full"> <div class="flex items-center gap-3 mb-4 text-red-500"> ${renderComponent($$result2, "Book", Book, { "size": 20 })} <span class="text-xs font-bold uppercase tracking-widest">${entry.data.category}</span> </div> <h2 class="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">${entry.data.title}</h2> <p class="text-zinc-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow"> ${entry.data.description} </p> <div class="flex items-center text-sm font-bold text-white mt-auto pt-4 border-t border-white/5">
Definition lesen ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" })} </div> </a>`)} </div> ${sortedEntries.length === 0 && renderTemplate`<div class="text-center py-20"> <p class="text-zinc-400">Das Glossar wird gerade befüllt. Schauen Sie bald wieder vorbei!</p> </div>`} </main> ` })}`;
}, "/app/src/pages/glossar/index.astro", void 0);

const $$file = "/app/src/pages/glossar/index.astro";
const $$url = "/glossar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
