import { c as createComponent, e as renderComponent, r as renderTemplate, am as maybeRenderHead } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import { $ as $$Layout } from './Layout_Bl4oGuow.mjs';

const $$Impressum = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Impressum | RG Detailing", "description": "Impressum von RG Detailing" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-32 text-zinc-300"> <h1 class="text-4xl font-bold text-white mb-8">Impressum</h1> <div class="prose prose-invert max-w-3xl"> <h3>Angaben gemäß § 5 TMG</h3> <p>
RG Detailing<br>
Remo Gerhardt<br>
Dorfstraße 11<br>
23824 Tensfeld
</p> <h3>Kontakt</h3> <p>
Telefon: 0163 38 45 08 1<br>
E-Mail: kontakt@rg-detailing.de
</p> <h3>Öffnungszeiten</h3> <p>
Mo. - Fr.: 09:00 - 18:00 Uhr<br>
Sa.: 10:00 - 14:00 Uhr
</p> <h3>Redaktionell verantwortlich</h3> <p>
Remo Gerhardt<br>
Dorfstraße 11<br>
23824 Tensfeld
</p> <h3>EU-Streitschlichtung</h3> <p>
Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
<a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" class="text-red-500 hover:text-red-400">https://ec.europa.eu/consumers/odr/</a>.<br>
Unsere E-Mail-Adresse finden Sie oben im Impressum.
</p> <h3>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3> <p>
Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
</p> </div> </div> ` })}`;
}, "/app/src/pages/impressum.astro", void 0);

const $$file = "/app/src/pages/impressum.astro";
const $$url = "/impressum";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Impressum,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
