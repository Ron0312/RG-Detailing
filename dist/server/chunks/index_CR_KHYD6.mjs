import { c as createComponent, am as maybeRenderHead, e as renderComponent, r as renderTemplate, an as addAttribute } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import { r as remoImage, i as imgKeramik3, $ as $$Layout, s as services } from './Layout_Bl4oGuow.mjs';
import { w as wohnmobilBefore, a as wohnmobilAfter, B as BeforeAfterSlider } from './wohnmobil-after_C3QcurJ9.mjs';
import { $ as $$Reviews, P as PriceCalculator } from './Reviews_Cx6_HvTy.mjs';
import { ChevronUp, ChevronDown, Podcast, Youtube, Instagram, Car, ShieldCheck, Droplets, Sparkles, CloudRain, Sun, ArrowRight, MessageCircle, CheckCircle2, Bike, RefreshCw, Caravan, Gem, FlaskConical, Handshake } from 'lucide-react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useMemo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
/* empty css                         */
import { a as getImage, $ as $$Image } from './_astro_assets_C42mOPnA.mjs';
import { h as hpcImage, S as ScrollReveal } from './labocosmetica-hpc-pro_xyPFjeqD.mjs';
import { F as FAQ } from './FAQ_CYMYf568.mjs';
import { g as getCollection } from './_astro_content_DX0JPfJj.mjs';
import { h as heroImage, d as dampfdrachenLogo } from './dampfdrachen-logo_DZc42pH_.mjs';

function ExpandableText({ children, initialHeight = 160 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  useEffect(() => {
    if (contentRef.current && contentRef.current.scrollHeight > initialHeight) {
      setShouldShowButton(true);
    }
  }, [initialHeight, children]);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "overflow-hidden transition-[max-height] duration-700 ease-in-out relative",
        style: { maxHeight: isExpanded ? `${contentRef.current?.scrollHeight + 40}px` : `${initialHeight}px` },
        ref: contentRef,
        children: [
          children,
          !isExpanded && shouldShowButton && /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" })
        ]
      }
    ),
    shouldShowButton && /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsExpanded(!isExpanded),
        className: "mt-6 flex items-center gap-2 text-red-500 hover:text-red-400 font-bold text-sm tracking-widest uppercase group transition-colors",
        "aria-expanded": isExpanded,
        children: [
          /* @__PURE__ */ jsx("span", { children: isExpanded ? "Weniger anzeigen" : "Mehr erfahren" }),
          isExpanded ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4 transition-transform duration-300" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" })
        ]
      }
    )
  ] });
}

function Certificates({ images }) {
  const [index, setIndex] = useState(-1);
  if (!images || images.length < 3) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: images[0].src,
          alt: images[0].alt,
          width: images[0].width,
          height: images[0].height,
          loading: "lazy",
          decoding: "async",
          onClick: () => setIndex(0),
          className: "rounded-xl border border-white/10 hover:scale-105 transition-transform duration-500 hover:border-red-500/30 hover:shadow-lg bg-zinc-900 cursor-pointer w-full h-auto"
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: images[1].src,
          alt: images[1].alt,
          width: images[1].width,
          height: images[1].height,
          loading: "lazy",
          decoding: "async",
          onClick: () => setIndex(1),
          className: "rounded-xl border border-white/10 hover:scale-105 transition-transform duration-500 hover:border-red-500/30 hover:shadow-lg bg-zinc-900 cursor-pointer w-full h-auto"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "relative group h-full rounded-xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-colors cursor-pointer",
          onClick: () => setIndex(2),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: images[2].src,
              alt: images[2].alt,
              width: images[2].width,
              height: images[2].height,
              loading: "lazy",
              decoding: "async",
              className: "h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Lightbox,
      {
        open: index >= 0,
        index,
        close: () => setIndex(-1),
        slides: images,
        plugins: [Zoom],
        zoom: { maxZoomPixelRatio: 3 }
      }
    )
  ] });
}

const cert1 = new Proxy({"src":"/_astro/remo-gerhardt-zertifikat.C9pmTep1.jpg","width":1200,"height":1600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/certificates/remo-gerhardt-zertifikat.jpg";
							}

							return target[name];
						}
					});

const cert2 = new Proxy({"src":"/_astro/remo-gerhardt-labocosmetica-zertifikat.GC_ASY-k.jpg","width":1202,"height":842,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/certificates/remo-gerhardt-labocosmetica-zertifikat.jpg";
							}

							return target[name];
						}
					});

const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const optimizedCert1 = await getImage({ src: cert1, format: "avif" });
  const optimizedCert2 = await getImage({ src: cert2, format: "avif" });
  const optimizedCert3 = await getImage({ src: remoImage, format: "avif" });
  const certificateImages = [
    { src: optimizedCert1.src, alt: "Remo Gerhardt Zertifikat", width: optimizedCert1.attributes.width, height: optimizedCert1.attributes.height },
    { src: optimizedCert2.src, alt: "Labocosmetica Zertifikat", width: optimizedCert2.attributes.width, height: optimizedCert2.attributes.height },
    { src: optimizedCert3.src, alt: "Remo Gerhardt Dampfdrachen Vertriebspartner", width: optimizedCert3.attributes.width, height: optimizedCert3.attributes.height }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="section-spacing bg-black relative overflow-hidden" id="about">  <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-zinc-900/30 rounded-full blur-[100px] pointer-events-none"></div> <div class="container mx-auto px-4 relative z-10"> <div class="grid md:grid-cols-2 gap-16 items-center">  <div class="relative order-2 md:order-1"> <div class="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-[2rem] rotate-3 transform translate-x-4 translate-y-4 blur-sm"></div> ${renderComponent($$result, "Image", $$Image, { "src": remoImage, "alt": "Remo Gerhardt - RG Detailing", "width": 957, "height": 1024, "class": "relative rounded-[2rem] shadow-2xl w-full max-w-md mx-auto object-cover border border-white/10" })}  <div class="absolute -bottom-6 -right-6 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hidden md:block"> <div class="text-3xl font-bold text-white mb-1">100%</div> <div class="text-sm text-zinc-400 font-medium">Kundenzufriedenheit</div> </div> </div>  <div class="order-1 md:order-2"> <h2 class="text-red-500 font-bold tracking-widest uppercase mb-4 text-sm">Über mich</h2> <h3 class="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Remo Gerhardt <br><span class="text-zinc-400">Vom Hobby zur Perfektion</span></h3> <div class="text-zinc-400 leading-relaxed text-lg"> ${renderComponent($$result, "ExpandableText", ExpandableText, { "client:visible": true, "initialHeight": 240, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ExpandableText.jsx", "client:component-export": "default" }, { "default": async ($$result2) => renderTemplate` <div class="space-y-6"> <p>
Moin, ich bin Remo. Früher habe ich mich über jeden Kratzer an meinem eigenen Auto geärgert. Die Waschanlage war für mich Sperrzone. Ich habe stundenlang in der Garage gestanden, poliert und versiegelt – immer auf der Jagd nach dem perfekten Glanz.
</p> <p>
Irgendwann wurde aus dem Hobby eine Berufung. Freunde fragten: "Kannst du das auch bei meinem machen?" Doch "Hobby-Niveau" reichte mir nicht. Ich wollte Profi-Qualität. Heute bin ich <a href="https://www.labocosmetica.de" target="_blank" rel="noopener noreferrer" class="font-bold text-white hover:text-red-500 transition-colors">zertifizierter Labocosmetica Detailer</a> und offizieller <a href="https://dampfdrache.de" target="_blank" rel="noopener noreferrer" class="font-bold text-white hover:text-red-500 transition-colors">Dampfdrachen Vertriebspartner</a>.
</p> <p>
Bei RG Detailing gibt es keine Massenabfertigung wie am Fließband. Ich nehme mir die Zeit, die Ihr Fahrzeug braucht. Das ist Wellness für das Auto. Egal ob Sportwagen oder Familienkombi – ich behandle jedes Fahrzeug, als wäre es mein eigenes.
</p> <p>
Ehrlich, direkt und norddeutsch: Ich schnacke Ihnen nichts an, was Sie nicht brauchen. Aber ich verspreche Ihnen: Wenn Sie Ihr Auto abholen, werden Sie den Unterschied sehen und fühlen.
</p> <div class="pt-4 flex items-center gap-4"> <div class="font-handwriting text-2xl text-red-500 -rotate-2">Remo Gerhardt</div> <div class="h-px bg-zinc-800 flex-grow"></div> <div class="text-xs uppercase tracking-widest font-bold text-zinc-600">Inhaber & Detailer</div> </div> </div> ` })} <div class="mt-8 flex flex-wrap gap-4"> <a href="https://open.spotify.com/show/63m3iI02yHqeENGb2CtBwa?si=d07c55fca4b843bc" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-3 bg-zinc-900 border border-white/10 rounded-xl hover:border-green-600/50 hover:bg-green-900/10 hover:text-green-500 transition-all text-sm font-bold text-zinc-300"> ${renderComponent($$result, "Podcast", Podcast, { "size": 18 })} <span>Podcast</span> </a> <a href="https://www.youtube.com/channel/UC-_u0Tc9YmcniT7Q93XPRwg" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-3 bg-zinc-900 border border-white/10 rounded-xl hover:border-red-600/50 hover:bg-red-900/10 hover:text-red-500 transition-all text-sm font-bold text-zinc-300"> ${renderComponent($$result, "Youtube", Youtube, { "size": 18 })} <span>YouTube</span> </a> <a href="https://www.instagram.com/r.g.detailing/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-3 bg-zinc-900 border border-white/10 rounded-xl hover:border-pink-600/50 hover:bg-pink-900/10 hover:text-pink-500 transition-all text-sm font-bold text-zinc-300"> ${renderComponent($$result, "Instagram", Instagram, { "size": 18 })} <span>Instagram</span> </a> </div> </div> <div class="mt-12 pt-12 border-t border-white/5"> <h4 class="text-white font-bold mb-6 text-sm tracking-widest uppercase">Zertifizierte Kompetenz</h4> ${renderComponent($$result, "Certificates", Certificates, { "client:visible": true, "images": certificateImages, "client:component-hydration": "visible", "client:component-path": "/app/src/components/Certificates.jsx", "client:component-export": "default" })} </div> </div> </div> </div> </section>`;
}, "/app/src/components/About.astro", void 0);

const $$CeramicComparison = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="glass-card p-4 md:p-10 rounded-3xl border border-white/10 bg-zinc-900/40 relative overflow-hidden">  <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div> <div class="flex flex-col md:flex-row items-center gap-8 mb-12"> <div class="md:w-1/3 relative group"> <div class="absolute inset-0 bg-red-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div> ${renderComponent($$result, "Image", $$Image, { "src": hpcImage, "alt": "Labocosmetica HPC-PRO Keramikversiegelung Anwendung", "class": "rounded-2xl border border-white/10 shadow-2xl relative z-10 w-full object-cover aspect-square", "widths": [320, 640, 960], "sizes": "(max-width: 768px) 100vw, 400px" })} </div> <div class="md:w-2/3 text-left"> <h3 class="text-2xl md:text-4xl font-bold text-white mb-4">Maximaler Lackschutz – Welches Paket passt zu Ihnen?</h3> <p class="text-zinc-400 text-lg leading-relaxed">
Als zertifizierter <strong>Labocosmetica Partner</strong> bieten wir Ihnen die Königsklasse der Keramikversiegelungen.
                Wählen Sie zwischen extremer Widerstandskraft für den Alltag oder dem ultimativen Showcar-Glanz.
                Die Basis bildet immer eine professionelle Lackaufbereitung, gefolgt von der High-End Versiegelung.
</p> </div> </div> <div class="grid lg:grid-cols-2 gap-8">  <div class="relative group"> <div class="absolute inset-0 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 rounded-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"></div> <div class="relative p-6 md:p-8 rounded-2xl border border-white/10 h-full flex flex-col hover:border-red-900/50 transition-colors"> <div class="mb-6 flex items-center justify-between"> <div> <h4 class="text-2xl font-bold text-white mb-1">BLINDO PLUS <span class="text-red-500">+ HPC PRO</span></h4> <span class="text-xs font-bold uppercase tracking-widest text-zinc-400">Der Alltags-Held</span> </div> <div class="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-white/5"> ${renderComponent($$result, "Car", Car, { "size": 24 })} </div> </div> <div class="space-y-6 mb-8 flex-grow"> <div class="flex items-start gap-4"> ${renderComponent($$result, "ShieldCheck", ShieldCheck, { "className": "text-red-500 mt-1 shrink-0", "size": 20 })} <div> <span class="block text-zinc-300 font-bold text-sm">Schutzdauer</span> <span class="text-white text-lg">Bis zu 5 Jahre / 75.000 km</span> </div> </div> <div class="flex items-start gap-4"> ${renderComponent($$result, "Droplets", Droplets, { "className": "text-blue-400 mt-1 shrink-0", "size": 20 })} <div> <span class="block text-zinc-300 font-bold text-sm">Wasserabweisung</span> <span class="text-zinc-400">Starker Lotus-Effekt, extrem einfache Reinigung.</span> </div> </div> <div class="flex items-start gap-4"> ${renderComponent($$result, "Sparkles", Sparkles, { "className": "text-yellow-400 mt-1 shrink-0", "size": 20 })} <div> <span class="block text-zinc-300 font-bold text-sm">Glanz & Optik</span> <span class="text-zinc-400">Tiefer, seidiger Spiegelglanz.</span> </div> </div> <div class="flex items-start gap-4"> ${renderComponent($$result, "CloudRain", CloudRain, { "className": "text-zinc-400 mt-1 shrink-0", "size": 20 })} <div> <span class="block text-zinc-300 font-bold text-sm">Resistenz</span> <span class="text-zinc-400 text-sm">Hohe Beständigkeit gegen Kalk, Chemikalien & extreme Temperaturen.</span> </div> </div> </div> <div class="bg-black/30 p-5 rounded-xl border border-white/5"> <span class="block text-xs font-bold text-red-500 uppercase tracking-widest mb-3">Perfekt geeignet für:</span> <ul class="space-y-2"> <li class="flex items-center gap-2 text-sm text-zinc-300"> <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Täglich genutzte Fahrzeuge (Daily Driver)
</li> <li class="flex items-center gap-2 text-sm text-zinc-300"> <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Laternenparker (draußen stehend)
</li> <li class="flex items-center gap-2 text-sm text-zinc-300"> <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Waschanlagen-Nutzer (hohe Härte)
</li> </ul> </div> </div> </div>  <div class="relative group"> <div class="absolute inset-0 bg-gradient-to-b from-red-900/10 to-zinc-900/50 rounded-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"></div> <div class="relative p-6 md:p-8 rounded-2xl border border-red-900/30 h-full flex flex-col hover:border-red-500/50 transition-colors shadow-[0_0_30px_-10px_rgba(220,38,38,0.1)]"> <div class="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">
Showcar Favorit
</div> <div class="mb-6 flex items-center justify-between"> <div> <h4 class="text-2xl font-bold text-white mb-1">STC <span class="text-red-500">+ HPC PRO</span></h4> <span class="text-xs font-bold uppercase tracking-widest text-zinc-400">Der Ästhet</span> </div> <div class="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center text-red-500 border border-red-500/20"> ${renderComponent($$result, "Sparkles", Sparkles, { "size": 24 })} </div> </div> <div class="space-y-6 mb-8 flex-grow"> <div class="flex items-start gap-4"> ${renderComponent($$result, "ShieldCheck", ShieldCheck, { "className": "text-red-500 mt-1 shrink-0", "size": 20 })} <div> <span class="block text-zinc-300 font-bold text-sm">Schutzdauer</span> <span class="text-white text-lg">Bis zu 6 Jahre / 90.000 km</span> </div> </div> <div class="flex items-start gap-4"> ${renderComponent($$result, "Droplets", Droplets, { "className": "text-blue-400 mt-1 shrink-0", "size": 20 })} <div> <span class="block text-zinc-300 font-bold text-sm">Wasserabweisung</span> <span class="text-zinc-400">Starker Lotus-Effekt & antistatische Wirkung.</span> </div> </div> <div class="flex items-start gap-4"> ${renderComponent($$result, "Sparkles", Sparkles, { "className": "text-yellow-400 mt-1 shrink-0", "size": 20 })} <div> <span class="block text-zinc-300 font-bold text-sm">Glanz & Optik</span> <span class="text-zinc-400">Intensiver "Candy Gloss" 3D-Effekt.</span> </div> </div> <div class="flex items-start gap-4"> ${renderComponent($$result, "Sun", Sun, { "className": "text-zinc-400 mt-1 shrink-0", "size": 20 })} <div> <span class="block text-zinc-300 font-bold text-sm">Resistenz</span> <span class="text-zinc-400 text-sm">Hohe Beständigkeit gegen Streusalz, Teer & UV-Strahlung.</span> </div> </div> </div> <div class="bg-black/30 p-5 rounded-xl border border-white/5"> <span class="block text-xs font-bold text-red-500 uppercase tracking-widest mb-3">Perfekt geeignet für:</span> <ul class="space-y-2"> <li class="flex items-center gap-2 text-sm text-zinc-300"> <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Neuwagen & frisch aufbereitete Fahrzeuge
</li> <li class="flex items-center gap-2 text-sm text-zinc-300"> <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Liebhaberfahrzeuge & Showcars
</li> <li class="flex items-center gap-2 text-sm text-zinc-300"> <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Garagenwagen & Handwäsche
</li> </ul> </div> </div> </div> </div> <div class="mt-8 text-center"> <p class="text-sm text-zinc-400 italic">
Beide Systeme basieren auf modernster Nanotechnologie und werden in mehreren Schichten (Base Coat + Top Coat) appliziert.
</p> </div> </div>`;
}, "/app/src/components/CeramicComparison.astro", void 0);

function GalleryLightbox({ images }) {
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState("Alle");
  const categories = useMemo(() => {
    return ["Alle", ...new Set(images.map((img) => img.category).filter(Boolean))];
  }, [images]);
  const filteredImages = useMemo(() => {
    return filter === "Alle" ? images : images.filter((img) => img.category === filter);
  }, [images, filter]);
  const handleImageClick = (filteredIndex) => {
    const originalIndex = images.findIndex((img) => img === filteredImages[filteredIndex]);
    setIndex(originalIndex);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    categories.length > 1 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2 mb-8", children: categories.map((cat) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setFilter(cat),
        className: `px-4 py-2 rounded-full text-sm font-bold transition-all border ${filter === cat ? "bg-red-700 border-red-700 text-white shadow-lg" : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"}`,
        children: cat
      },
      cat
    )) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: filteredImages.map((image, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "aspect-square bg-zinc-800 rounded-xl overflow-hidden group cursor-pointer relative",
        onClick: () => handleImageClick(i),
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: image.thumbnail || image.src,
              alt: image.alt,
              className: "w-full h-full object-cover group-hover:scale-110 transition duration-700",
              loading: "lazy",
              decoding: "async",
              width: "600",
              height: "600"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" })
        ]
      },
      image.src
    )) }),
    /* @__PURE__ */ jsx(
      Lightbox,
      {
        open: index >= 0,
        index,
        close: () => setIndex(-1),
        slides: images,
        plugins: [Zoom],
        zoom: { maxZoomPixelRatio: 3 }
      }
    )
  ] });
}

function debounce(func, wait) {
  let timeout = null;
  const debounced = function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
      timeout = null;
    }, wait);
  };
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounced;
}

function ParticleHero() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const handleResize = debounce(updateDimensions, 100);
    window.addEventListener("resize", handleResize);
    updateDimensions();
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const init = () => {
      particles = [];
      const numberOfParticles = Math.min(window.innerWidth * 0.05, 100);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    init();
    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60",
      style: { width: "100%", height: "100%" }
    }
  );
}

const TERMS = {
  "Keramikversiegelung": "/glossar/keramikversiegelung",
  "Trockendampf": "/glossar/trockendampf",
  "Hologramme": "/glossar/hologramme",
  "Standzeit": "/glossar/standzeit",
  "Kneten": "/glossar/kneten",
  "Polieren": "/glossar/polieren",
  "Flugrost": "/glossar/flugrost"
};
function GlossaryLinker({ text }) {
  if (!text) return null;
  const regex = new RegExp(`(${Object.keys(TERMS).join("|")})`, "gi");
  const parts = text.split(regex);
  return /* @__PURE__ */ jsx(Fragment, { children: parts.map((part, i) => {
    const lowerPart = part.toLowerCase();
    const matchedTerm = Object.keys(TERMS).find((t) => t.toLowerCase() === lowerPart);
    if (matchedTerm) {
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: TERMS[matchedTerm],
          className: "text-white border-b border-red-500/50 hover:text-red-500 hover:border-red-500 transition-colors cursor-help decoration-dotted pointer-events-auto relative z-20",
          title: `Definition: ${matchedTerm}`,
          children: part
        },
        i
      );
    }
    return part;
  }) });
}

const imgLack = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-lackveredelung-01.CDMWj8BO.png","width":1080,"height":1231,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-lackveredelung-01.png";
							}

							return target[name];
						}
					});

const imgInnen2 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-innenreinigung-02.DggvDlfm.jpg","width":1920,"height":2560,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-innenreinigung-02.jpg";
							}

							return target[name];
						}
					});

const imgVorherNachher4 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-vorher-nachher-04.CMj9WF-x.jpg","width":1200,"height":1600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-vorher-nachher-04.jpg";
							}

							return target[name];
						}
					});

const imgDetailing5 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-detailing-05.4b7zOwTi.jpg","width":1200,"height":1600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-detailing-05.jpg";
							}

							return target[name];
						}
					});

const imgCoating6 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-coating-06.HI6PR_Qg.jpg","width":1728,"height":3072,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-coating-06.jpg";
							}

							return target[name];
						}
					});

const imgCockpit7 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-innenreinigung-cockpit-07.ARm5gv9y.jpg","width":1200,"height":1600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-innenreinigung-cockpit-07.jpg";
							}

							return target[name];
						}
					});

const imgLackDefekt8 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-lackdefekt-korrektur-08.DqgW4RgD.jpg","width":1200,"height":1600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-lackdefekt-korrektur-08.jpg";
							}

							return target[name];
						}
					});

const imgKratzer9 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-kratzer-entfernen-09.DYZIuwtl.jpg","width":1599,"height":899,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-kratzer-entfernen-09.jpg";
							}

							return target[name];
						}
					});

const imgLackPolitur10 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-lackpolitur-detail-10.Dqh7N7ww.jpg","width":899,"height":1599,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-lackpolitur-detail-10.jpg";
							}

							return target[name];
						}
					});

const imgLackVorherNachher11 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-lack-vorher-nachher-11.BT_qyGVG.jpg","width":1200,"height":1600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-lack-vorher-nachher-11.jpg";
							}

							return target[name];
						}
					});

const imgHochglanz12 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-hochglanz-politur-12.CCO7nsKu.jpg","width":864,"height":1536,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-hochglanz-politur-12.jpg";
							}

							return target[name];
						}
					});

const glossbossLogo = new Proxy({"src":"/_astro/glossboss-logo.CAz2NWfO.jpg","width":775,"height":642,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/glossboss-logo.jpg";
							}

							return target[name];
						}
					});

const prerender = true;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const optimizedBefore = await getImage({ src: wohnmobilBefore, format: "avif", width: 1024 });
  const optimizedAfter = await getImage({ src: wohnmobilAfter, format: "avif", width: 1024 });
  const cities = await getCollection("cities");
  cities.sort((a, b) => a.data.name.localeCompare(b.data.name));
  const iconMap = {
    0: ShieldCheck,
    // Full Detailing
    1: Sparkles,
    // All-in-One
    2: Caravan,
    // Wohnmobil
    3: RefreshCw,
    // Leasing
    4: Droplets,
    // Innen & Hygiene
    5: Bike
    // Spezial
  };
  const galleryRawImages = [
    { src: imgLack, alt: "Lackveredelung und Fahrzeugaufbereitung Ergebnis in Tensfeld", category: "Lack" },
    { src: imgInnen2, alt: "Professionelle Innenraumreinigung Vorher-Nachher RG Detailing", category: "Innenraum" },
    { src: imgKeramik3, alt: "Keramikversiegelung Hochglanz Ergebnis Labocosmetica", category: "Keramik" },
    { src: imgVorherNachher4, alt: "Fahrzeugaufbereitung Detailarbeit Ergebnis", category: "Keramik" },
    { src: imgDetailing5, alt: "Exklusives Detailing Ergebnis Schleswig-Holstein", category: "Keramik" },
    { src: imgCoating6, alt: "Professionelles Coating / Keramikversiegelung Anwendung", category: "Keramik" },
    { src: imgCockpit7, alt: "Mercedes Cockpit Innenraumreinigung und Pflege Detail", category: "Innenraum" },
    { src: imgLackDefekt8, alt: "Lackdefekt Korrektur und Kratzerentfernung Tensfeld", category: "Lack" },
    { src: imgKratzer9, alt: "Tiefe Kratzer im Lack entfernen vorher nachher", category: "Lack" },
    { src: imgLackPolitur10, alt: "Professionelle Lackpolitur Detailaufnahme RG Detailing", category: "Lack" },
    { src: imgLackVorherNachher11, alt: "Starke Lackdefekte und Swirls unter Speziallicht", category: "Lack" },
    { src: imgHochglanz12, alt: "Hochglanz nach mehrstufiger Lackveredelung", category: "Lack" }
  ];
  const galleryImages = await Promise.all(galleryRawImages.map(async (img) => {
    const full = await getImage({ src: img.src, format: "webp", width: 1280 });
    const thumb = await getImage({ src: img.src, format: "webp", width: 600 });
    return {
      src: full.src,
      thumbnail: thumb.src,
      alt: img.alt,
      category: img.category
    };
  }));
  const faqItems = [
    {
      question: "Bieten Sie auch eine reine Innenraumreinigung an?",
      answer: 'Nur in Kombination mit einer Au\xDFenw\xE4sche. Wir legen Wert auf ein ganzheitliches Ergebnis \u2013 inklusive sauberer T\xFCreinstiege, damit Ihr Fahrzeug nicht "halbfertig" aussieht.'
    },
    {
      question: "Was kostet eine Fahrzeugaufbereitung?",
      answer: 'Die Kosten h\xE4ngen vom Zustand und der Gr\xF6\xDFe Ihres Fahrzeugs ab. Nutzen Sie unseren <a href="#rechner" class="text-red-500 hover:underline">Preisrechner</a> f\xFCr eine individuelle Sch\xE4tzung. Wir bieten Pakete von der einfachen Autoreinigung bis zum Full Detailing.'
    },
    {
      question: "Machen Sie auch Motorw\xE4sche?",
      answer: "Ja, aber ausschlie\xDFlich schonend mit Trockendampf. So gelangt nur minimale Feuchtigkeit an empfindliche Bauteile \u2013 f\xFCr maximale Sicherheit."
    },
    {
      question: "Wie lange muss mein Auto bei Ihnen bleiben?",
      answer: "Je nach Paket zwischen 1 Tag (Innenraum/Basis) und 3-4 Tagen (Full Detailing mit Keramikversiegelung inkl. Aush\xE4rtezeit)."
    }
  ];
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Fahrzeugaufbereitung Ablauf bei RG Detailing",
    "description": "Unser 4-Schritte Prozess zur perfekten Lackveredelung und Versiegelung.",
    "totalTime": "P3D",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Check & Analyse",
        "text": "Bestandsaufnahme und Lackanalyse unter Speziallicht in unserer Halle zur Ermittlung der Defekttiefe.",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Wash & Clay",
        "text": "Schonende Handw\xE4sche, chemische Dekontamination (Flugrost) und Kneten zur porentiefen Reinigung.",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Polish & Correct",
        "text": "Mehrstufige Defektkorrektur und Hochglanzpolitur zur Entfernung von Kratzern und Grauschleier.",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Protect & Seal",
        "text": "Applikation der Langzeitversiegelung (Keramik, Graphen oder Wachs) inkl. Aush\xE4rtezeit.",
        "position": 4
      }
    ]
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/<[^>]*>?/gm, "")
        // Strip HTML tags for schema
      }
    }))
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "RG Detailing | Keramikversiegelung & Lackveredelung Schleswig-Holstein", "description": "Ihr Experte f\xFCr High-End Fahrzeugaufbereitung & Keramikversiegelung. Wir machen Ihren Wagen besser als neu. Labocosmetica zertifiziert. Jetzt Glanz sichern!", "schema": [
    howToSchema,
    faqSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "RG Detailing Startseite",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "description": "High-End Detailing, Lackkorrektur und Keramikversiegelung f\xFCr Enthusiasten.",
      "url": "https://rg-detailing.de"
    }
  ], "preloadImage": heroImage.src }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">  <div class="absolute inset-0 z-10 pointer-events-none"> ${renderComponent($$result2, "ParticleHero", ParticleHero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/app/src/components/ParticleHero.jsx", "client:component-export": "default" })} </div>  <div class="absolute inset-0 z-0"> ${renderComponent($$result2, "Image", $$Image, { "src": heroImage, "alt": "Premium Fahrzeugaufbereitung in der Werkstatt Tensfeld - RG Detailing", "class": "w-full h-full object-cover object-bottom opacity-60", "loading": "eager", "fetchpriority": "high", "format": "avif", "widths": [640, 768, 1024, 1280, 1536, 1920], "sizes": "100vw" })} <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div> <div class="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div> </div>  <div class="absolute top-0 right-0 w-[50vw] h-[50vw] bg-red-600/10 blur-[150px] rounded-full animate-pulse z-0"></div> <div class="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-red-900/10 blur-[100px] rounded-full z-0"></div> <div class="container mx-auto px-4 z-20 text-center pt-20"> <div class="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up"> <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md"> <span class="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">Labocosmetica Zertifiziert</span> </div> <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md"> <span class="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">5.0 Google Bewertungen</span> </div> </div> <h1 class="text-5xl md:text-8xl font-bold mb-6 text-white tracking-tighter leading-[1.1] animate-fade-in-up delay-100">
Täglich <br class="md:hidden"> <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-800">Neuwagen-Gefühl</span> </h1> <p class="text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed animate-fade-in-up delay-200">
Mehr als nur Sauberkeit. Wir teilen Ihre Leidenschaft für Perfektion. Ihr Experte für <strong class="text-white">Lackveredelung</strong> und zertifizierte <strong class="text-white">Keramikversiegelung</strong>.
</p> <div class="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300 px-4"> <a href="#rechner" class="group relative px-8 py-5 bg-red-700 rounded-2xl font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(220,38,38,0.6)] w-full sm:w-auto"> <span class="relative z-10 flex items-center justify-center gap-2">Kostenlos Preis berechnen ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "w-5 h-5" })}</span> <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div> </a> <a href="https://wa.me/491633845081" target="_blank" class="px-8 py-5 rounded-2xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors backdrop-blur-sm w-full sm:w-auto flex items-center justify-center gap-2"> ${renderComponent($$result2, "MessageCircle", MessageCircle, { "className": "w-5 h-5 text-green-500" })} WhatsApp Anfrage
</a> </div> <div class="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-zinc-400 animate-fade-in-up delay-500"> <div class="flex items-center gap-2"> ${renderComponent($$result2, "CheckCircle2", CheckCircle2, { "className": "w-4 h-4 text-zinc-600" })} <span>Individuelle Beratung vor Ort</span> </div> <div class="hidden md:block w-1 h-1 bg-zinc-800 rounded-full"></div> <div class="flex items-center gap-2"> ${renderComponent($$result2, "CheckCircle2", CheckCircle2, { "className": "w-4 h-4 text-zinc-600" })} <span>Antwort innerhalb von 2 Std.</span> </div> </div> </div> </div> <main class="w-full overflow-x-hidden">  <section id="leistungen" class="section-spacing relative"> <div class="container mx-auto px-4"> ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="text-center mb-20"> <span class="text-red-500 font-bold tracking-widest text-sm uppercase">Ihr Fahrzeug in besten Händen</span> <h2 class="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">Das High-End Portfolio</h2> <p class="text-zinc-400 max-w-2xl mx-auto text-lg">
Von der hygienischen <strong>Innenreinigung</strong> mit Dampf bis zur mehrstufigen <strong>Lackpolitur</strong>.
                            Wir sind Ihr Ansprechpartner für Werterhalt in der Region Segeberg.
</p> </div> ` })}  <div class="mb-20"> ${renderComponent($$result2, "CeramicComparison", $$CeramicComparison, {})} </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${services.map((service, index) => {
    const IconComponent = iconMap[index] || Sparkles;
    return renderTemplate`${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": index * 100, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="group glass-card p-10 relative overflow-hidden block h-full flex flex-col"> <a${addAttribute(service.link, "href")} class="absolute inset-0 z-10"${addAttribute(`Mehr erfahren zu ${service.title}`, "aria-label")} data-astro-prefetch></a> <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-600/10 to-transparent rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-150 group-hover:from-red-600/20 pointer-events-none"></div> <div class="relative z-20 flex-grow pointer-events-none"> <div class="w-16 h-16 bg-zinc-900/50 rounded-2xl border border-white/10 flex items-center justify-center text-white mb-8 group-hover:border-red-500/50 transition-colors shadow-lg group-hover:text-red-500 group-hover:scale-110 duration-500"> ${renderComponent($$result3, "IconComponent", IconComponent, { "size": 28, "strokeWidth": 1.5 })} </div> <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">${service.title}</h3> <p class="text-zinc-400 leading-relaxed mb-6"> ${renderComponent($$result3, "GlossaryLinker", GlossaryLinker, { "text": service.shortDescription })} </p> </div> <div class="relative z-20 mt-auto pt-6 border-t border-white/5 pointer-events-none"> <div class="flex items-center text-sm font-bold text-zinc-300 group-hover:text-white">
Mehr erfahren ${renderComponent($$result3, "ArrowRight", ArrowRight, { "className": "ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" })} </div> </div> </div> ` })}`;
  })} </div> </div> </section>  <section class="section-spacing bg-zinc-900/20 border-y border-white/5"> <div class="container mx-auto px-4"> <div class="flex flex-col md:flex-row items-center gap-16"> <div class="md:w-1/3"> ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <span class="text-red-500 font-bold tracking-widest text-sm uppercase">Das Ergebnis</span> <h2 class="text-4xl font-bold mb-6 text-white mt-2">Glanz <br> ohne Kompromisse</h2> <p class="text-zinc-400 mb-8 text-lg leading-relaxed">
Perfektion bis ins Detail. Sehen Sie selbst, wie wir selbst verwitterte Oberflächen wieder in einen Spiegel verwandeln.
                                 Unsere <strong>Lackkorrektur</strong> entfernt Grauschleier dauerhaft und sorgt für maximalen Tiefenglanz.
</p> <div class="flex gap-8"> <div class="text-center"> <div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-red-700">85%</div> <div class="text-xs text-zinc-400 uppercase tracking-wider font-bold mt-2">Defekt-Korrektur</div> </div> <div class="text-center"> <div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-red-700">100%</div> <div class="text-xs text-zinc-400 uppercase tracking-wider font-bold mt-2">Tiefenglanz</div> </div> </div> ` })} </div> <div class="md:w-2/3 w-full"> ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 200, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group"> <div class="absolute inset-0 z-10 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none"></div> ${renderComponent($$result3, "BeforeAfterSlider", BeforeAfterSlider, { "client:visible": true, "beforeImage": optimizedBefore.src, "afterImage": optimizedAfter.src, "alt": "Fahrzeugaufbereitung Vorher Nachher Vergleich", "client:component-hydration": "visible", "client:component-path": "/app/src/components/BeforeAfterSlider.jsx", "client:component-export": "default" })} </div> ` })} </div> </div> </div> </section>  <section class="section-spacing"> <div class="container mx-auto px-4"> ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="text-center mb-16"> <span class="text-red-500 font-bold tracking-widest text-sm uppercase">Unsere Philosophie</span> <h2 class="text-3xl md:text-5xl font-bold mt-4 text-white">Warum RG Detailing?</h2> </div> ` })} <div class="grid md:grid-cols-3 gap-8"> ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 100, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="glass-panel p-10 flex flex-col items-center text-center hover:bg-zinc-900/60 transition-colors group"> <div class="w-20 h-20 bg-zinc-950 rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:border-red-500/50 shadow-lg"> ${renderComponent($$result3, "Gem", Gem, { "size": 32, "className": "text-red-500", "strokeWidth": 1.5 })} </div> <h3 class="text-xl font-bold text-white mb-4">Zertifizierte Keramikversiegelung</h3> <p class="text-zinc-400 leading-relaxed">Als Labocosmetica Certified Detailer garantieren wir höchste Standards bei Lackschutz und Standzeit.</p> </div> ` })} ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 200, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="glass-panel p-10 flex flex-col items-center text-center hover:bg-zinc-900/60 transition-colors group"> <div class="w-20 h-20 bg-zinc-950 rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:border-red-500/50 shadow-lg"> ${renderComponent($$result3, "FlaskConical", FlaskConical, { "size": 32, "className": "text-red-500", "strokeWidth": 1.5 })} </div> <h3 class="text-xl font-bold text-white mb-4">High-End Pflegeprodukte</h3> <p class="text-zinc-400 leading-relaxed">Wir nutzen exklusive Chemie (z.B. Labocosmetica, Gtechniq) für maximalen Glanz, den man in Schleswig-Holstein selten findet.</p> </div> ` })} ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 300, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="glass-panel p-10 flex flex-col items-center text-center hover:bg-zinc-900/60 transition-colors group"> <div class="w-20 h-20 bg-zinc-950 rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:border-red-500/50 shadow-lg"> ${renderComponent($$result3, "Handshake", Handshake, { "size": 32, "className": "text-red-500", "strokeWidth": 1.5 })} </div> <h3 class="text-xl font-bold text-white mb-4">Leidenschaft & Präzision</h3> <p class="text-zinc-400 leading-relaxed">Wir behandeln jedes Fahrzeug, als wäre es unser eigenes. Kompromisslose Qualität für Enthusiasten.</p> </div> ` })} </div> </div> </section>  ${renderComponent($$result2, "Reviews", $$Reviews, { "limit": 4 })}  <section class="section-spacing bg-zinc-950/50 border-y border-white/5 overflow-hidden"> <div class="container mx-auto px-4"> ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="text-center mb-16"> <span class="text-red-500 font-bold tracking-widest text-sm uppercase">Einblicke</span> <h2 class="text-3xl md:text-5xl font-bold mt-4 text-white">Transparenz schafft Vertrauen</h2> <p class="text-zinc-400 max-w-2xl mx-auto mt-4 text-lg">
Schauen Sie uns über die Schulter. Auf YouTube und in unserem Podcast erklären wir, wie High-End Aufbereitung wirklich funktioniert.
</p> </div> ` })} <div class="grid md:grid-cols-3 gap-4 md:gap-8">  ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 100, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <a href="https://www.youtube.com/channel/UC-_u0Tc9YmcniT7Q93XPRwg" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden rounded-3xl border border-white/10 aspect-video md:aspect-auto h-64 md:h-64 w-full flex items-center justify-center bg-zinc-900">  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-zinc-950 to-zinc-950 z-0"></div> <div class="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 bg-cover bg-center mix-blend-overlay"${addAttribute({ backgroundImage: `url(${optimizedAfter.src})` }, "style")}></div>  <div class="relative z-10 flex flex-col items-center gap-3 md:gap-6"> <div class="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-[0_0_30px_-5px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none" class="w-8 h-8"><path d="M6 4l15 8-15 8z"></path></svg> </div> <div class="text-center"> <h3 class="text-lg font-bold text-white mb-1">YouTube</h3> <p class="text-zinc-300 text-xs">Lackanalyse & Tutorials</p> </div> </div> </a> ` })}  ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 200, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <a href="https://open.spotify.com/show/63m3iI02yHqeENGb2CtBwa" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden rounded-3xl border border-white/10 aspect-video md:aspect-auto h-64 md:h-64 w-full flex items-center justify-center bg-zinc-900">  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-zinc-950 to-zinc-950 z-0"></div> <div class="relative z-10 flex flex-col items-center gap-3 md:gap-6"> <div class="w-14 h-14 bg-green-600/90 rounded-full flex items-center justify-center shadow-[0_0_30px_-5px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19.1"></path></svg> </div> <div class="text-center"> <h3 class="text-lg font-bold text-white mb-1">Podcast</h3> <span class="inline-block px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-green-400 text-[10px] font-bold uppercase tracking-wider">Jetzt hören</span> </div> </div> </a> ` })}  ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 300, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <a href="https://www.instagram.com/r.g.detailing/" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden rounded-3xl border border-white/10 aspect-video md:aspect-auto h-64 md:h-64 w-full flex items-center justify-center bg-zinc-900">  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-zinc-950 to-zinc-950 z-0"></div> <div class="relative z-10 flex flex-col items-center gap-3 md:gap-6"> <div class="w-14 h-14 bg-pink-600/90 rounded-full flex items-center justify-center shadow-[0_0_30px_-5px_rgba(219,39,119,0.5)] group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm"> ${renderComponent($$result3, "Instagram", Instagram, { "size": 28, "className": "text-white" })} </div> <div class="text-center"> <h3 class="text-lg font-bold text-white mb-1">Instagram</h3> <span class="inline-block px-3 py-1 bg-pink-900/30 border border-pink-500/30 rounded-full text-pink-400 text-[10px] font-bold uppercase tracking-wider">Folgen</span> </div> </div> </a> ` })} </div> </div> </section>  <section class="section-spacing relative overflow-hidden"> <div class="container mx-auto px-4"> ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="text-center mb-20"> <span class="text-red-500 font-bold tracking-widest text-sm uppercase">Transparenz</span> <h2 class="text-3xl md:text-5xl font-bold mt-4 text-white">Ablauf der Fahrzeugaufbereitung</h2> </div> ` })} <div class="relative">  <div class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-zinc-700 to-transparent -translate-y-1/2 z-0"></div> <div class="grid md:grid-cols-4 gap-8 relative z-10">  ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 100, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="group relative bg-zinc-950 p-8 rounded-3xl border border-white/10 text-center hover:-translate-y-2 transition-transform duration-500"> <div class="w-16 h-16 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-xl relative z-10 group-hover:border-red-500/50 group-hover:text-red-500 transition-colors">1</div> <h3 class="text-white font-bold text-xl mb-3">Check</h3> <p class="text-sm text-zinc-400 leading-relaxed">Bestandsaufnahme & Lackanalyse unter Speziallicht in unserer Halle.</p> </div> ` })}  ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 200, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="group relative bg-zinc-950 p-8 rounded-3xl border border-white/10 text-center hover:-translate-y-2 transition-transform duration-500"> <div class="w-16 h-16 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-xl relative z-10 group-hover:border-red-500/50 group-hover:text-red-500 transition-colors">2</div> <h3 class="text-white font-bold text-xl mb-3">Wash</h3> <p class="text-sm text-zinc-400 leading-relaxed">Schonende Handwäsche, Flugrostentfernung & Kneten.</p> </div> ` })}  ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 300, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="group relative bg-zinc-950 p-8 rounded-3xl border border-white/10 text-center hover:-translate-y-2 transition-transform duration-500"> <div class="w-16 h-16 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-xl relative z-10 group-hover:border-red-500/50 group-hover:text-red-500 transition-colors">3</div> <h3 class="text-white font-bold text-xl mb-3">Polish</h3> <p class="text-sm text-zinc-400 leading-relaxed">Defektkorrektur: Kratzer entfernen für ultimativen Tiefenglanz.</p> </div> ` })}  ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 400, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="group relative bg-zinc-950 p-8 rounded-3xl border border-white/10 text-center hover:-translate-y-2 transition-transform duration-500"> <div class="w-16 h-16 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-xl relative z-10 group-hover:border-red-500/50 group-hover:text-red-500 transition-colors">4</div> <h3 class="text-white font-bold text-xl mb-3">Protect</h3> <p class="text-sm text-zinc-400 leading-relaxed">Langzeitversiegelung mit Keramik, Graphen oder Wachs.</p> </div> ` })} </div> </div> </div> </section>  <section id="rechner" class="section-spacing relative overflow-hidden"> <div class="absolute inset-0 bg-red-900/5 z-0"></div> <div class="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div> <div class="container mx-auto px-4 relative z-10"> <div class="max-w-5xl mx-auto glass-panel p-4 md:p-16 rounded-3xl md:rounded-[3rem] shadow-2xl border border-red-500/20 bg-zinc-900/80 backdrop-blur-2xl"> <div class="text-center mb-8 md:mb-12 max-w-4xl mx-auto"> <h2 class="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-white">Kostenrechner Fahrzeugaufbereitung</h2> <div class="space-y-4 text-zinc-400 text-lg leading-relaxed text-left md:text-center"> <p> <strong class="text-white">Premium-Aufbereitung bedeutet Transparenz.</strong> Wir verzichten auf komplexe Baukästen: Von der Tiefenreinigung bis zur Lederpflege ist bereits alles für ein perfektes Ergebnis inklusive.
</p> <p>
Der angezeigte Preisrahmen deckt alle essenziellen Leistungen ab – ohne versteckte Kosten. Aufpreise fallen nur bei extremen Härtefällen an (nach Absprache).
</p> <p class="text-white font-medium">
Wir passen die Leistung dem Fahrzeug an – nicht umgekehrt.
</p> </div> </div> ${renderComponent($$result2, "PriceCalculator", PriceCalculator, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/app/src/components/PriceCalculator.jsx", "client:component-export": "default" })} </div> </div> </section>  ${renderComponent($$result2, "About", $$About, {})}  <section class="section-spacing pt-0 pb-20 border-b border-white/5 bg-gradient-to-b from-black to-zinc-900/20 overflow-hidden"> <div class="container mx-auto px-4"> <div class="grid md:grid-cols-2 gap-8">  ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 100, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="glass-panel p-8 md:p-12 border-red-900/30 bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden group"> <div class="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full transition group-hover:bg-red-600/20"></div> <div class="relative z-10"> <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-wider mb-6"> ${renderComponent($$result3, "CheckCircle2", CheckCircle2, { "size": 12 })} Offizieller Vertrieb
</div> <h3 class="text-3xl font-bold text-white mb-4">Dampfdrachen</h3> <p class="text-zinc-400 mb-8 leading-relaxed max-w-md">
Holen Sie sich die Kraft des Trockendampfs nach Hause oder in Ihr Unternehmen.
                                     Als zertifizierter Partner beraten wir Sie zu den besten Geräten – Made in Germany.
</p> <div class="flex items-center gap-4"> <a href="/dampfreinigung#vertrieb" class="px-6 py-3 bg-red-700 hover:bg-red-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-900/20">
Geräte ansehen
</a> </div> </div> ${renderComponent($$result3, "Image", $$Image, { "src": dampfdrachenLogo, "alt": "Dampfdrachen Logo", "width": 200, "class": "absolute bottom-6 right-6 w-32 md:w-40 h-auto object-contain opacity-30 group-hover:opacity-50 transition-opacity" })} </div> ` })}  ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "delay": 200, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <div class="glass-panel p-8 md:p-12 relative overflow-hidden group"> <div class="relative z-10"> <div class="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-6">
Car Care Products
</div> <h3 class="text-3xl font-bold text-white mb-4">Pflege & Zubehör</h3> <p class="text-zinc-400 mb-8 leading-relaxed max-w-md">
Nutzen Sie die Produkte, denen wir vertrauen.
<strong>Labocosmetica</strong> für High-End Pflege oder <strong>Glossboss</strong> für das beste Zubehör.
</p> <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center"> <a href="https://glossboss.de/" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold transition-colors">
Zum Glossboss Shop
</a> <span class="text-zinc-400 text-sm">Code: <span class="text-white font-bold">Remo10</span> (10% Rabatt)</span> </div> </div> ${renderComponent($$result3, "Image", $$Image, { "src": glossbossLogo, "alt": "Glossboss Logo", "width": 192, "class": "absolute bottom-0 right-0 w-48 h-48 object-contain opacity-50 rounded-tl-3xl group-hover:opacity-100 transition-opacity" })} </div> ` })} </div> </div> </section>  <section id="gallery" class="section-spacing"> <div class="container mx-auto px-4"> ${renderComponent($$result2, "ScrollReveal", ScrollReveal, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/app/src/components/ScrollReveal.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` <h2 class="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Ergebnisse aus unserer Werkstatt</h2> ${renderComponent($$result3, "GalleryLightbox", GalleryLightbox, { "client:visible": true, "images": galleryImages, "client:component-hydration": "visible", "client:component-path": "/app/src/components/GalleryLightbox.jsx", "client:component-export": "default" })} ` })} </div> </section>  <section id="faq" class="section-spacing border-t border-white/5 bg-zinc-900/20 content-auto"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto"> <h2 class="text-3xl font-bold text-white mb-8 text-center">Häufige Fragen zur Fahrzeugaufbereitung</h2> ${renderComponent($$result2, "FAQ", FAQ, { "client:visible": true, "items": faqItems, "client:component-hydration": "visible", "client:component-path": "/app/src/components/FAQ.jsx", "client:component-export": "default" })} </div> </div> </section> </main> ` })}`;
}, "/app/src/pages/index.astro", void 0);

const $$file = "/app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
