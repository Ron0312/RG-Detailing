import { c as createComponent, e as renderComponent, r as renderTemplate, am as maybeRenderHead } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import { $ as $$Layout } from './Layout_Bl4oGuow.mjs';
import { $ as $$Breadcrumbs } from './Breadcrumbs_B8mLItpZ.mjs';
import { $ as $$ServiceSchema } from './ServiceSchema_CT86Lw4C.mjs';
import { w as wohnmobilBefore, a as wohnmobilAfter, B as BeforeAfterSlider } from './wohnmobil-after_C3QcurJ9.mjs';
import { a as getImage, $ as $$Image } from './_astro_assets_C42mOPnA.mjs';
import { Check } from 'lucide-react';
import { F as FAQ } from './FAQ_CYMYf568.mjs';

const heroImage = new Proxy({"src":"/_astro/wohnmobil-hero.BDwkfUmJ.jpg","width":2752,"height":1536,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/wohnmobil-hero.jpg";
							}

							return target[name];
						}
					});

const prerender = true;
const $$Wohnmobil = createComponent(async ($$result, $$props, $$slots) => {
  const optimizedBefore = await getImage({ src: wohnmobilBefore, format: "avif" });
  const optimizedAfter = await getImage({ src: wohnmobilAfter, format: "avif" });
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    "name": "RG Detailing - Wohnmobil Aufbereitung",
    "description": "Professionelle Wohnmobil-Aufbereitung in Tensfeld. GFK-Pflege, Keramikversiegelung und hygienische Dampfreinigung.",
    "priceRange": "$$$",
    "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  };
  const faqItems = [
    {
      question: "Bis zu welcher Gr\xF6\xDFe k\xF6nnen Sie Wohnmobile waschen?",
      answer: "Unsere Halle in Tensfeld ist f\xFCr Fahrzeuge bis maximal 8 Meter L\xE4nge ausgelegt. Hier haben wir optimale Bedingungen mit Ger\xFCsten und entsprechender Beleuchtung."
    },
    {
      question: "Wie entfernen Sie Regenstreifen auf GFK?",
      answer: "Regenstreifen sind oft tief eingebrannt. Wir nutzen spezielle GFK-Polituren, um die Oberfl\xE4che zu gl\xE4tten, und versiegeln sie anschlie\xDFend, damit neue Streifen sich nicht festsetzen."
    },
    {
      question: "Reinigen Sie auch die Markise?",
      answer: "Ja, die Markisenreinigung ist Teil unseres Au\xDFenpakets. Wir entfernen Stockflecken und Gr\xFCnspan schonend mit Dampf und Spezialreinigern."
    }
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Wohnmobil & Caravan Aufbereitung Schleswig-Holstein | RG Detailing", "description": "Professionelle Wohnmobil-Aufbereitung in Schleswig-Holstein. Spezialisiert auf GFK-Pflege, Keramikversiegelung & hygienische Innenreinigung in Tensfeld.", "schema": [schema, faqSchema], "preloadImage": heroImage.src }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ServiceSchema", $$ServiceSchema, { "name": "Wohnmobil Aufbereitung", "description": "Spezialpflege f\xFCr Wohnmobile und Caravans. GFK-Politur, Keramikversiegelung und Innenraum-Hygiene in gro\xDFer Halle.", "priceRange": "$$$" })} ${maybeRenderHead()}<div class="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black"> <div class="absolute inset-0"> ${renderComponent($$result2, "Image", $$Image, { "src": heroImage, "alt": "Wohnmobil Aufbereitung in der Halle", "class": "w-full h-full object-cover opacity-60", "fetchpriority": "high", "loading": "eager", "format": "avif", "widths": [640, 768, 1024, 1280, 1536, 1920], "sizes": "100vw" })} <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div> <div class="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div> </div> <div class="container mx-auto px-4 z-10 text-center pt-20"> <h1 class="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">
Wohnmobil & Caravan <br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Urlaub fängt beim Einsteigen an</span> </h1> <p class="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
Nicht beim Putzen. Wir kümmern uns um die "Großen" – mit Halle, Gerüst und Spezialwissen.
</p> </div> </div> <main class="container mx-auto px-4 py-12"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "crumbs": [
    { label: "Startseite", href: "/" },
    { label: "Wohnmobil Aufbereitung", href: "/wohnmobil" }
  ] })}  <div class="grid md:grid-cols-2 gap-12 items-center mb-20 mt-12"> <div class="prose prose-invert prose-lg"> <h2 class="text-2xl font-bold text-white mb-4">Das Problem: Standzeit & Größe</h2> <p>
Sie kennen das: Das Wohnmobil stand monatelang. Grünspan hat sich angesetzt, das GFK-Dach ist matt und kreidet aus. Regenstreifen haben sich förmlich in die Oberfläche gefressen.
</p> <p>
Mal eben in die Waschanlage? Keine Chance bei der Höhe. Und mit der Handleiter in der Waschbox? Gefährlich und ineffektiv. Oft bleibt der Schmutz oben drauf, und das Material leidet weiter.
</p> <h2 class="text-2xl font-bold text-white mt-8 mb-4">Die Lösung: Platz & Technik</h2> <p>
Bei RG Detailing haben wir das, was den meisten fehlt: <strong>Platz</strong>. In unserer Halle in Tensfeld können wir Fahrzeuge bis 8 Meter Länge unter optimalen Bedingungen bearbeiten.
</p> <p>
Wir wissen genau: GFK ist kein normaler Autolack. Es braucht spezielle Polituren und Schutz. Wir versiegeln Ihr GFK-Dach (auf Wunsch mit <strong>Keramik</strong>), damit es glatt bleibt und sich nicht mehr vollsaugt. Der nächste Regen spült den Dreck dann einfach ab.
</p> <h2 class="text-2xl font-bold text-white mt-8 mb-4">Der Hygiene-Faktor: Dampf statt Chemie</h2> <p>
Gerade nach dem Winter sind Matratzen und Polster oft klamm oder staubig. Ein Fest für Milben. Wir gehen da nicht mit der Chemiekeule ran, sondern mit Physik.
</p> <p>
Unser 170°C heißer Trockendampf reinigt porentief, tötet Bakterien ab und entfernt Gerüche. Und das Beste: Es bleibt keine Feuchtigkeit zurück. Sie steigen in ein hygienisch reines Fahrzeug und können direkt losfahren.
</p> </div> <div> <div class="mb-6 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"> ${renderComponent($$result2, "BeforeAfterSlider", BeforeAfterSlider, { "client:visible": true, "beforeImage": optimizedBefore.src, "afterImage": optimizedAfter.src, "alt": "Wohnmobil Aufbereitung Vorher Nachher", "client:component-hydration": "visible", "client:component-path": "/app/src/components/BeforeAfterSlider.jsx", "client:component-export": "default" })} </div> <div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800"> <h3 class="font-bold text-white mb-2">Unser Wohnmobil-Spezial:</h3> <ul class="space-y-2 text-zinc-400"> <li class="flex items-center"><span class="text-red-500 mr-2 flex items-center justify-center">${renderComponent($$result2, "Check", Check, { "className": "w-4 h-4" })}</span> Halle für Fahrzeuge bis 8m</li> <li class="flex items-center"><span class="text-red-500 mr-2 flex items-center justify-center">${renderComponent($$result2, "Check", Check, { "className": "w-4 h-4" })}</span> GFK-Spezialpolitur gegen Auskreiden</li> <li class="flex items-center"><span class="text-red-500 mr-2 flex items-center justify-center">${renderComponent($$result2, "Check", Check, { "className": "w-4 h-4" })}</span> Keramikversiegelung für Langzeitschutz</li> <li class="flex items-center"><span class="text-red-500 mr-2 flex items-center justify-center">${renderComponent($$result2, "Check", Check, { "className": "w-4 h-4" })}</span> Hygienische Innenreinigung</li> <li class="flex items-center font-bold text-white"><span class="text-red-500 mr-2 flex items-center justify-center">${renderComponent($$result2, "Check", Check, { "className": "w-4 h-4" })}</span> Außenwäsche ab 125 €</li> </ul> </div> </div> </div>  <div class="bg-zinc-900 rounded-2xl p-8 md:p-12 text-center border border-zinc-800 mb-12"> <h2 class="text-3xl font-bold text-white mb-4">Bereit für die Saison?</h2> <p class="text-zinc-400 max-w-2xl mx-auto mb-8">
Da jedes Wohnmobil anders ist, machen wir Ihnen gerne ein individuelles Angebot nach Besichtigung.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="tel:+491633845081" class="inline-block bg-red-700 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-red-900/30">
Termin zur Besichtigung vereinbaren
</a> <a href="/#rechner?preselect=camper" class="inline-block bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-full font-bold text-lg transition border border-zinc-700">
Preisrechner starten
</a> </div> <p class="mt-4 text-sm text-zinc-400">Oder rufen Sie direkt an: 0163 38 45 08 1</p> </div>  <section class="mb-20"> <h2 class="text-3xl font-bold text-white mb-8 text-center">Häufige Fragen zu Wohnmobilen</h2> <div class="max-w-3xl mx-auto"> ${renderComponent($$result2, "FAQ", FAQ, { "client:visible": true, "items": faqItems, "client:component-hydration": "visible", "client:component-path": "/app/src/components/FAQ.jsx", "client:component-export": "default" })} </div> </section> </main> ` })}`;
}, "/app/src/pages/wohnmobil.astro", void 0);

const $$file = "/app/src/pages/wohnmobil.astro";
const $$url = "/wohnmobil";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Wohnmobil,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
