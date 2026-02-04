import { c as createComponent, e as renderComponent, ar as renderScript, r as renderTemplate, am as maybeRenderHead } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import { $ as $$Layout } from './Layout_Bl4oGuow.mjs';
import { Home, ArrowRight, HelpCircle, Phone } from 'lucide-react';

const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 - Seite nicht gefunden | RG Detailing", "description": "Die angeforderte Seite konnte nicht gefunden werden. Nutzen Sie unsere \xDCbersicht, um zur gew\xFCnschten Information zu gelangen." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">  <div class="absolute inset-0 bg-red-900/5 z-0"></div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div> <div class="text-center relative z-10 px-4 max-w-2xl w-full"> <h1 class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 mb-4 select-none">404</h1> <h2 class="text-4xl text-white font-bold mb-6">Seite nicht gefunden</h2> <p class="text-zinc-400 text-xl mb-12">
Ups! Die Seite, die Sie suchen, existiert nicht mehr oder wurde verschoben.
</p> <div class="grid md:grid-cols-2 gap-4 mb-12"> <a href="/" class="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-red-500/30 transition-all group text-left"> <div class="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white group-hover:text-red-500 transition-colors shrink-0"> ${renderComponent($$result2, "Home", Home, { "size": 24 })} </div> <div> <div class="font-bold text-white">Startseite</div> <div class="text-sm text-zinc-400">Zurück zum Anfang</div> </div> ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "ml-auto w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" })} </a> <a href="/#leistungen" class="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-red-500/30 transition-all group text-left"> <div class="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white group-hover:text-red-500 transition-colors shrink-0"> ${renderComponent($$result2, "ArrowRight", ArrowRight, { "size": 24 })} </div> <div> <div class="font-bold text-white">Leistungen</div> <div class="text-sm text-zinc-400">Was wir anbieten</div> </div> ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "ml-auto w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" })} </a> <a href="/#rechner" class="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-red-500/30 transition-all group text-left"> <div class="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white group-hover:text-red-500 transition-colors shrink-0"> ${renderComponent($$result2, "HelpCircle", HelpCircle, { "size": 24 })} </div> <div> <div class="font-bold text-white">Preisrechner</div> <div class="text-sm text-zinc-400">Kosten kalkulieren</div> </div> ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "ml-auto w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" })} </a> <a href="#kontakt" class="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-red-500/30 transition-all group text-left"> <div class="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white group-hover:text-red-500 transition-colors shrink-0"> ${renderComponent($$result2, "Phone", Phone, { "size": 24 })} </div> <div> <div class="font-bold text-white">Kontakt</div> <div class="text-sm text-zinc-400">Direkt anfragen</div> </div> ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "ml-auto w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" })} </a> </div> <div class="text-zinc-400 text-sm">
Fehlercode: 404_NOT_FOUND
</div> </div> </div> ` })} ${renderScript($$result, "/app/src/pages/404.astro?astro&type=script&index=0&lang.ts")}`;
}, "/app/src/pages/404.astro", void 0);

const $$file = "/app/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
