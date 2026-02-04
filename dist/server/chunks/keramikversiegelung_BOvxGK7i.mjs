import { c as createComponent, e as renderComponent, r as renderTemplate, am as maybeRenderHead, an as addAttribute } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import { $ as $$Layout } from './Layout_Bl4oGuow.mjs';
import { $ as $$Reviews, P as PriceCalculator } from './Reviews_Cx6_HvTy.mjs';
import { F as FAQ } from './FAQ_CYMYf568.mjs';
import { h as hpcImage, S as ScrollReveal } from './labocosmetica-hpc-pro_xyPFjeqD.mjs';
import { ShieldCheck, Droplets, Sun, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { $ as $$Image } from './_astro_assets_C42mOPnA.mjs';
import { h as heroImage } from './rg-detailing_Fahrzeugaufbereitung_Tensfeld_Hero_BLBImNMb.mjs';

const $$Keramikversiegelung = createComponent(($$result, $$props, $$slots) => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Maximaler Lackschutz",
      description: "Sch\xFCtzt effektiv vor UV-Strahlung, Vogelkot, Insektenresten und aggressiver Chemie. Ihr Lack bleibt makellos."
    },
    {
      icon: Droplets,
      title: "Extremer Hydrophobie-Effekt",
      description: "Wasser perlt einfach ab (Lotus-Effekt). Das Fahrzeug bleibt l\xE4nger sauber und die W\xE4sche wird zum Kinderspiel."
    },
    {
      icon: Sun,
      title: "Ultimativer Tiefenglanz",
      description: "Die glasartige Schicht verst\xE4rkt die Farbtiefe und Brillanz Ihres Lacks drastisch. Ein dauerhafter 'Wet-Look'."
    },
    {
      icon: Clock,
      title: "Bis zu 60 Monate Standzeit",
      description: "Anders als Wachs (Wochen) h\xE4lt unsere zertifizierte Keramikversiegelung \xFCber Jahre. Mit Garantie."
    }
  ];
  const processSteps = [
    {
      step: "01",
      title: "Intensive Vorbereitung",
      description: "Gr\xFCndliche Handw\xE4sche, chemische Dekontamination (Flugrost, Teer) und Kneten f\xFCr eine klinisch reine Oberfl\xE4che."
    },
    {
      step: "02",
      title: "Mehrstufige Defektkorrektur",
      description: "Entfernung von Kratzern und Swirls durch Polieren. Nur ein perfekter Lack kann perfekt versiegelt werden."
    },
    {
      step: "03",
      title: "Entfettung & Primer",
      description: "Spezielle Reinigungsl\xF6sung entfernt letzte Politurreste f\xFCr die optimale chemische Anbindung der Keramik."
    },
    {
      step: "04",
      title: "Coating Applikation",
      description: "Auftrag der Labocosmetica #HPC oder #SAM Beschichtung in mehreren Schichten (Base Coat + Top Coat)."
    },
    {
      step: "05",
      title: "Aush\xE4rtung (Curing)",
      description: "Aush\xE4rtung unter Infrarot-Strahlern in unserer kontrollierten Halle f\xFCr maximale H\xE4rte und Best\xE4ndigkeit."
    }
  ];
  const faqItems = [
    {
      question: "Was ist der Unterschied zu Wachs?",
      answer: "Wachs liegt nur als Opferschicht auf dem Lack und verdunstet bei Hitze. Keramik geht eine feste chemische Bindung mit dem Klarlack ein, ist extrem hart und hitzebest\xE4ndig."
    },
    {
      question: "Wie lange muss das Auto bei euch bleiben?",
      answer: "F\xFCr eine hochwertige Keramikversiegelung ben\xF6tigen wir Ihr Fahrzeug in der Regel 3-4 Werktage, um die Schichten perfekt aush\xE4rten zu lassen."
    },
    {
      question: "Kann ich danach in die Waschanlage?",
      answer: "Ja, aber wir empfehlen Handw\xE4sche, um den Glanz maximal zu erhalten. Textilwaschanlagen sind okay, vermeiden Sie aber aggressive B\xFCrsten."
    },
    {
      question: "Gibt es eine Garantie?",
      answer: "Ja, als zertifizierter Labocosmetica Detailer erhalten Sie eine schriftliche Garantiekarte und ein Pflegeheft f\xFCr Ihre Versiegelung."
    }
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Keramikversiegelung Schleswig-Holstein",
    "provider": {
      "@type": "AutoDetailing",
      "name": "RG Detailing",
      "image": "https://rg-detailing.de/logo.png"
    },
    "description": "High-End Keramikversiegelung mit Labocosmetica Zertifizierung. Bis zu 5 Jahre Lackschutz und extremer Tiefenglanz.",
    "areaServed": "Schleswig-Holstein",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coating Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Basis Keramik (1 Schicht)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Premium Keramik (Mehrschichtig)"
          }
        }
      ]
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Keramikversiegelung Schleswig-Holstein | High-End Lackschutz", "description": "Zertifizierte Keramikversiegelung von RG Detailing. Sch\xFCtzen Sie Ihren Lack dauerhaft vor Kratzern & Umwelteinfl\xFCssen. Labocosmetica Partner.", "schema": schema }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black"> <div class="absolute inset-0 z-0"> ${renderComponent($$result2, "Image", $$Image, { "src": hpcImage, "alt": "Labocosmetica Keramikversiegelung Applikation", "class": "w-full h-full object-cover opacity-50", "loading": "eager", "fetchpriority": "high", "format": "avif" })} <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div> <div class="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div> </div> <div class="container mx-auto px-4 z-20 text-center pt-20"> <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md mb-8 animate-fade-in-up"> ${renderComponent($$result2, "ShieldCheck", ShieldCheck, { "size": 16, "class": "text-red-500" })} <span class="text-xs md:text-sm font-bold text-red-400 uppercase tracking-widest">Der ultimative Lackschutz</span> </div> <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tighter animate-fade-in-up delay-100">
Keramik<span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">versiegelung</span> </h1> <p class="text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up delay-200">
Mehr als nur Wachs. Eine physische Verbindung mit Ihrem Lack für jahrelangen Schutz, extremen Tiefenglanz und einfachste Pflege.
</p> <div class="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300"> <a href="#rechner" class="px-8 py-4 bg-red-700 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-red-900/40 flex items-center justify-center gap-2">
Preis berechnen ${renderComponent($$result2, "ArrowRight", ArrowRight, { "size": 20 })} </a> <a href="#vorteile" class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all backdrop-blur-sm">
Mehr erfahren
</a> </div> </div> </div> <main class="w-full overflow-x-hidden">  <section id="vorteile" class="section-spacing relative overflow-hidden"> <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div> <div class="container mx-auto px-4 relative z-10"> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8"> ${benefits.map((benefit, index) => renderTemplate`${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": index * 100, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="h-full p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-red-500/30 hover:bg-zinc-900 transition-all group"> <div class="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 transition-transform shadow-inner border border-white/5"> ${renderComponent($$result3, "benefit.icon", benefit.icon, { "size": 28, "strokeWidth": 1.5 })} </div> <h3 class="text-xl font-bold text-white mb-4">${benefit.title}</h3> <p class="text-zinc-400 leading-relaxed text-sm"> ${benefit.description} </p> </div> ` })}`)} </div> </div> </section>  <section class="section-spacing border-y border-white/5 bg-zinc-900/20"> <div class="container mx-auto px-4"> <div class="flex flex-col lg:flex-row items-center gap-16"> <div class="lg:w-1/2"> ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <span class="text-red-500 font-bold uppercase tracking-widest text-sm mb-4 block">Certified Detailer</span> <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Labocosmetica <br> Excellence Center</h2> <p class="text-zinc-400 text-lg leading-relaxed mb-8">
Wir setzen auf die Technologie von <strong>Labocosmetica</strong> aus Italien. Diese Keramikversiegelungen sind speziell für moderne, weiche Klarlacke entwickelt und bieten eine unvergleichliche "Selbstheilungs"-Fähigkeit (Self-Healing) bei feinen Kratzern sowie extreme chemische Beständigkeit.
</p> <ul class="space-y-4 mb-10"> <li class="flex items-center gap-3 text-zinc-300"> ${renderComponent($$result3, "CheckCircle2", CheckCircle2, { "class": "text-red-500 w-5 h-5" })} <span>Zertifizierte Anwendung vom Profi</span> </li> <li class="flex items-center gap-3 text-zinc-300"> ${renderComponent($$result3, "CheckCircle2", CheckCircle2, { "class": "text-red-500 w-5 h-5" })} <span>Schriftliche Garantiekarte</span> </li> <li class="flex items-center gap-3 text-zinc-300"> ${renderComponent($$result3, "CheckCircle2", CheckCircle2, { "class": "text-red-500 w-5 h-5" })} <span>Inklusive jährlichem Pflege-Check</span> </li> </ul> <a href="#rechner" class="inline-flex items-center gap-2 text-white font-bold border-b-2 border-red-500 pb-1 hover:text-red-400 transition-colors">
Jetzt Angebot einholen ${renderComponent($$result3, "ArrowRight", ArrowRight, { "size": 16 })} </a> ` })} </div> <div class="lg:w-1/2 relative"> <div class="absolute inset-0 bg-red-500/20 blur-[100px] rounded-full"></div> ${renderComponent($$result2, "Image", $$Image, { "src": heroImage, "alt": "Fahrzeugaufbereitung Detailarbeit", "class": "relative z-10 rounded-3xl border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700", "width": 800 })} </div> </div> </div> </section>  <section class="section-spacing bg-zinc-950"> <div class="container mx-auto px-4"> <div class="text-center mb-20"> <span class="text-red-500 font-bold uppercase tracking-widest text-sm">Transparenz</span> <h2 class="text-3xl md:text-5xl font-bold text-white mt-4">Der Weg zur Perfektion</h2> </div> <div class="relative"> <div class="absolute left-[19px] top-0 bottom-0 w-0.5 bg-zinc-800 md:left-1/2 md:-ml-px"></div> <div class="space-y-12"> ${processSteps.map((item, index) => renderTemplate`${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": index * 100, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div${addAttribute(`relative flex items-center md:justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`, "class")}> <div class="hidden md:block w-5/12"></div> <div class="absolute left-0 md:left-1/2 w-10 h-10 -ml-5 rounded-full border-4 border-zinc-950 bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-lg z-10"> ${index + 1} </div> <div class="pl-16 md:pl-0 md:w-5/12"> <div class="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 hover:border-red-500/20 transition-colors"> <h3 class="text-xl font-bold text-white mb-2">${item.title}</h3> <p class="text-zinc-400 text-sm leading-relaxed">${item.description}</p> </div> </div> </div> ` })}`)} </div> </div> </div> </section>  <section class="section-spacing bg-zinc-900/30 border-y border-white/5"> <div class="container mx-auto px-4 max-w-3xl"> <h2 class="text-3xl font-bold text-white text-center mb-12">Häufige Fragen zur Versiegelung</h2> ${renderComponent($$result2, "FAQ", FAQ, { "client:visible": true, "items": faqItems, "client:component-hydration": "visible", "client:component-path": "/app/src/components/FAQ.jsx", "client:component-export": "default" })} </div> </section>  ${renderComponent($$result2, "Reviews", $$Reviews, { "limit": 3 })}  <section id="rechner" class="section-spacing relative overflow-hidden"> <div class="container mx-auto px-4"> <div class="max-w-5xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-red-500/20 bg-zinc-900/80 backdrop-blur-xl relative overflow-hidden"> <div class="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[150px] rounded-full pointer-events-none"></div> <div class="text-center mb-12 relative z-10"> <h2 class="text-3xl md:text-5xl font-bold mb-6 text-white">Investieren Sie in den Werterhalt</h2> <p class="text-zinc-400 max-w-2xl mx-auto text-lg">
Wählen Sie Ihr Fahrzeug und erhalten Sie sofort eine unverbindliche Preisschätzung für Ihre Keramikversiegelung.
</p> </div> ${renderComponent($$result2, "PriceCalculator", PriceCalculator, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/app/src/components/PriceCalculator.jsx", "client:component-export": "default" })} </div> </div> </section> </main> ` })}`;
}, "/app/src/pages/keramikversiegelung.astro", void 0);

const $$file = "/app/src/pages/keramikversiegelung.astro";
const $$url = "/keramikversiegelung";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Keramikversiegelung,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
