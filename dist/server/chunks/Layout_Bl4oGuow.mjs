import { c as createComponent, am as maybeRenderHead, e as renderComponent, ar as renderScript, r as renderTemplate, ak as createAstro, an as addAttribute, u as unescapeHTML, as as renderSlot, at as renderHead } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
/* empty css                               */
import { $ as $$Image, a as getImage } from './_astro_assets_C42mOPnA.mjs';
import { g as getCollection } from './_astro_content_DX0JPfJj.mjs';
import 'clsx';
import { Podcast, Youtube, MessageCircle, Phone, Calculator } from 'lucide-react';

const logoImage = new Proxy({"src":"/_astro/logo.LSQj7wdP.png","width":1080,"height":1080,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/logo.png";
							}

							return target[name];
						}
					});

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="bg-zinc-950/80 border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl"> <div class="container mx-auto px-4 py-4 flex justify-between items-center"> <a href="/" class="flex items-center gap-3 group"> ${renderComponent($$result, "Image", $$Image, { "src": logoImage, "alt": "RG Detailing Logo", "width": 56, "height": 56, "class": "h-14 w-auto group-hover:scale-105 transition-transform duration-300", "loading": "eager", "format": "avif" })} <div class="hidden sm:block leading-tight"> <span class="text-xl font-bold text-white tracking-tighter block group-hover:text-red-500 transition-colors">RG Detailing</span> <span class="text-xs font-bold text-red-500 uppercase tracking-widest block group-hover:text-white transition-colors">Car Processing</span> </div> </a> <nav class="hidden md:flex gap-8 text-zinc-400 font-medium text-sm"> <a href="/" class="hover:text-white transition py-2 relative group" data-astro-prefetch>
Startseite
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span> </a> <a href="/keramikversiegelung" class="hover:text-white transition py-2 relative group" data-astro-prefetch>
Keramikversiegelung
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span> </a> <a href="/#leistungen" class="hover:text-white transition py-2 relative group" data-astro-prefetch>
Leistungen
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span> </a> <a href="/#gallery" class="hover:text-white transition py-2 relative group" data-astro-prefetch>
Galerie
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span> </a> <a href="/#rechner" class="bg-red-900/20 border border-red-500/30 text-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_-5px_rgba(220,38,38,0.3)]" data-astro-prefetch>
Preisrechner
</a> <a href="/#about" class="hover:text-white transition py-2 relative group" data-astro-prefetch>
Über mich
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span> </a> <a href="/#faq" class="hover:text-white transition py-2 relative group" data-astro-prefetch>
FAQ
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span> </a> </nav> <div class="flex items-center gap-3 md:gap-6">  <a href="https://www.google.com/maps?ll=54.041087,10.321787&z=13&t=m&hl=de-DE&gl=US&mapclient=embed&cid=8746412923922866124" target="_blank" rel="noopener noreferrer" aria-label="Google Bewertungen: 5,0 Sterne" class="xl:hidden flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5 hover:bg-white/10 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> <span class="text-xs font-bold text-white">5,0</span> </a>  <a href="tel:+491633845081" aria-label="Jetzt anrufen" class="md:hidden flex items-center justify-center w-9 h-9 bg-gradient-to-r from-red-900/40 to-red-800/40 border border-red-500/20 rounded-full text-red-100 hover:text-white transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> </a>  <a href="https://www.google.com/maps?ll=54.041087,10.321787&z=13&t=m&hl=de-DE&gl=US&mapclient=embed&cid=8746412923922866124" target="_blank" rel="noopener noreferrer" aria-label="Google Rezensionen ansehen" class="hidden xl:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group cursor-pointer"> <div class="bg-white p-1.5 rounded-full shrink-0 shadow-lg"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path></svg> </div> <div class="flex flex-col"> <div class="flex items-center gap-1.5 text-xs font-bold text-white"> <span>5,0 <span class="text-zinc-400 font-normal">(47)</span></span> <div class="flex text-yellow-400 gap-0.5"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> </div> </div> <span class="text-[10px] text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors uppercase tracking-wider">Google Rezensionen</span> </div> </a> <a href="tel:+491633845081" aria-label="Anrufen: 0163 38 45 08 1" class="hidden md:flex bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white pl-5 pr-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_4px_20px_-5px_rgba(220,38,38,0.5)] hover:shadow-[0_4px_25px_-5px_rgba(220,38,38,0.7)] hover:-translate-y-0.5 items-center gap-3"> <div class="bg-white/20 p-1 rounded-full"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> </div> <div class="flex flex-col items-start leading-none gap-0.5"> <span class="text-[10px] text-red-100 uppercase tracking-widest font-medium">Beratung & Termin</span> <span class="text-sm">0163 38 45 08 1</span> </div> </a>  <button id="mobile-menu-btn" class="md:hidden text-zinc-300 hover:text-white p-3 transition-colors" aria-label="Menü öffnen"> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> </button> </div> </div> </header>  <div id="mobile-menu" class="fixed inset-0 h-[100dvh] w-full bg-zinc-950/95 backdrop-blur-xl z-[100] transform translate-x-full transition-transform duration-300 flex flex-col items-center justify-center gap-8 md:hidden invisible"> <button id="close-menu-btn" class="absolute top-6 right-6 text-zinc-400 hover:text-white p-3 transition-colors" aria-label="Menü schließen"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> </button> <a href="/" class="mobile-link text-3xl font-bold text-white hover:text-red-500 transition-colors">Startseite</a> <a href="/keramikversiegelung" class="mobile-link text-3xl font-bold text-white hover:text-red-500 transition-colors">Keramikversiegelung</a> <a href="/#leistungen" class="mobile-link text-3xl font-bold text-white hover:text-red-500 transition-colors">Leistungen</a> <a href="/#gallery" class="mobile-link text-3xl font-bold text-white hover:text-red-500 transition-colors">Galerie</a> <a href="/#rechner" class="mobile-link text-3xl font-bold text-white hover:text-red-500 transition-colors">Preisrechner</a> <a href="/#about" class="mobile-link text-3xl font-bold text-white hover:text-red-500 transition-colors">Über mich</a> <a href="/#faq" class="mobile-link text-3xl font-bold text-white hover:text-red-500 transition-colors">FAQ</a> <div class="flex flex-col gap-4 mt-8 w-full max-w-xs px-4"> <a href="tel:+491633845081" class="bg-red-700 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-red-900/40 flex items-center justify-center gap-3 w-full"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
Anrufen
</a> <a href="https://wa.me/491633845081" target="_blank" rel="noopener noreferrer" class="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-green-900/40 flex items-center justify-center gap-3 w-full"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
WhatsApp
</a> </div> </div> ${renderScript($$result, "/app/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/app/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro("https://rg-detailing.de");
const $$PrivacyMap = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PrivacyMap;
  const { src, title, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`relative w-full h-full bg-zinc-900 rounded-lg overflow-hidden privacy-map-container ${className}`, "class")}${addAttribute(src, "data-src")}${addAttribute(title, "data-title")}> <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-zinc-900 z-10 privacy-overlay"> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600 mb-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> <p class="text-white font-bold mb-2">Google Maps laden</p> <p class="text-xs text-zinc-400 mb-6 max-w-xs mx-auto">
Mit dem Laden der Karte akzeptieren Sie die Datenschutzerklärung von Google.
            Es werden personenbezogene Daten an Google übertragen.
</p> <button class="bg-red-700 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-lg shadow-red-900/20 load-map-btn cursor-pointer">
Karte anzeigen
</button> </div>  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 opacity-50 pointer-events-none"></div> </div> ${renderScript($$result, "/app/src/components/PrivacyMap.astro?astro&type=script&index=0&lang.ts")}`;
}, "/app/src/components/PrivacyMap.astro", void 0);

const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const cities = await getCollection("cities");
  cities.sort((a, b) => a.data.name.localeCompare(b.data.name));
  return renderTemplate`${maybeRenderHead()}<footer id="kontakt" class="bg-zinc-950 text-zinc-400 py-12 mt-20 border-t border-zinc-900 content-auto"> <div class="container mx-auto px-4 grid md:grid-cols-4 gap-8 mb-12"> <div class="md:col-span-1"> <div class="flex items-center gap-3 mb-4"> ${renderComponent($$result, "Image", $$Image, { "src": logoImage, "alt": "RG Detailing Logo", "width": 40, "height": 40, "class": "h-10 w-auto" })} <span class="text-white font-bold text-xl">RG Detailing</span> </div> <p class="max-w-xs mb-4 text-sm leading-relaxed">Premium Fahrzeugaufbereitung, Keramikversiegelung und Lackveredelung für Schleswig-Holstein. Wir bringen den Neuwagen-Glanz zurück.</p> <div class="flex gap-4 mt-6"> <a href="https://open.spotify.com/show/63m3iI02yHqeENGb2CtBwa?si=d07c55fca4b843bc" target="_blank" rel="noopener noreferrer" class="p-3 bg-zinc-900 rounded-full hover:bg-green-600 hover:text-white transition-colors border border-zinc-800" aria-label="Podcast auf Spotify"> ${renderComponent($$result, "Podcast", Podcast, { "className": "w-5 h-5" })} </a> <a href="https://www.youtube.com/channel/UC-_u0Tc9YmcniT7Q93XPRwg" target="_blank" rel="noopener noreferrer" class="p-3 bg-zinc-900 rounded-full hover:bg-red-600 hover:text-white transition-colors border border-zinc-800" aria-label="YouTube Kanal"> ${renderComponent($$result, "Youtube", Youtube, { "className": "w-5 h-5" })} </a> </div> </div> <div> <h3 class="text-white font-bold text-lg mb-4">Service</h3> <ul class="space-y-3"> <li><a href="/keramikversiegelung" class="hover:text-red-500 transition py-3 md:py-1 block font-bold text-white" data-astro-prefetch>Keramikversiegelung</a></li> <li><a href="/fahrzeugaufbereitung-bad-segeberg" class="hover:text-red-500 transition py-3 md:py-1 block" data-astro-prefetch>Bad Segeberg</a></li> <li><a href="/fahrzeugaufbereitung-kiel" class="hover:text-red-500 transition py-3 md:py-1 block" data-astro-prefetch>Kiel</a></li> <li><a href="/fahrzeugaufbereitung-luebeck" class="hover:text-red-500 transition py-3 md:py-1 block" data-astro-prefetch>Lübeck</a></li> <li><a href="/fahrzeugaufbereitung-neumuenster" class="hover:text-red-500 transition py-3 md:py-1 block" data-astro-prefetch>Neumünster</a></li> <li><a href="/werterhalt-garantie" class="hover:text-red-500 transition py-3 md:py-1 block" data-astro-prefetch>Werterhalt-Garantie</a></li> <li><a href="/#rechner" class="hover:text-red-500 transition py-3 md:py-1 block" data-astro-prefetch>Preisrechner</a></li> </ul> </div> <div> <h3 class="text-white font-bold text-lg mb-4">Kontakt</h3> <div> <div> <span>Dorfstraße 11</span><br> <span>23824</span> <span>Tensfeld</span> </div> </div> <p class="mt-2 mb-4"> <a href="https://www.google.com/maps/search/?api=1&query=28RC%2BCP+Tensfeld%2C+Deutschland" target="_blank" rel="noopener noreferrer" aria-label="Standort auf Google Maps anzeigen" class="text-xs text-zinc-400 hover:text-red-500 transition flex items-center gap-1 p-2 -ml-2 rounded-lg hover:bg-white/5"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
28RC+CP Tensfeld, Deutschland
</a> </p> <p class="mt-4"><a href="tel:+491633845081" class="text-white hover:text-red-500 font-bold py-3 block text-lg">0163 38 45 08 1</a></p> <p><a href="https://wa.me/491633845081" target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-400 font-bold py-2 block flex items-center gap-2">${renderComponent($$result, "MessageCircle", MessageCircle, { "size": 18 })} WhatsApp Chat</a></p> <p><a href="mailto:kontakt@rg-detailing.de" class="hover:text-red-500 py-3 block">kontakt@rg-detailing.de</a></p> </div> <div class="h-48 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition duration-500 border border-zinc-800"> ${renderComponent($$result, "PrivacyMap", $$PrivacyMap, { "src": "https://maps.google.com/maps?q=RG+Detailing+Tensfeld&t=&z=13&ie=UTF8&iwloc=&output=embed", "title": "RG Detailing Standort Tensfeld" })} </div> </div> <div class="text-center mt-8 pt-8 border-t border-zinc-900 text-sm"> <p class="text-zinc-400 mb-4 text-xs">Alle Preise inkl. gesetzl. MwSt.</p> <div class="flex justify-center gap-6 mb-4 flex-wrap items-center"> <a href="/impressum" class="hover:text-white py-2 px-2">Impressum</a> <a href="/datenschutz" class="hover:text-white py-2 px-2">Datenschutz</a> <a href="/agb" class="hover:text-white py-2 px-2">AGB</a> <a href="/sitemap" class="hover:text-white py-2 px-2">Sitemap</a> <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" class="hover:text-white py-2 px-2">OS-Plattform</a> </div>
&copy; ${currentYear} RG Detailing. <span class="mx-2 text-zinc-600">|</span> <a href="https://webaion.de" target="_blank" rel="noopener noreferrer" class="hover:text-red-500 transition-colors text-zinc-400 hover:text-red-500 hover:opacity-100">Made by webaion.de</a> </div> </footer>`;
}, "/app/src/components/Footer.astro", void 0);

const services = [
  {
    title: "Full Detailing",
    description: "Das ultimative Upgrade für Liebhaber. Mehrstufige Lackkorrektur entfernt Swirls & Kratzer für einen Zustand 'Besser als Neu'. Veredelt mit zertifizierter Labocosmetica Keramikversiegelung (bis zu 6 Jahre Schutz).",
    icon: "shield",
    shortDescription: "High-End Lackkorrektur + zertifiziertes Coating für extremen Tiefenglanz. Das Beste für Ihren Wagen. Ab 800 €.",
    link: "/keramikversiegelung"
  },
  {
    title: "All-in-One (Werterhalt)",
    description: "Der perfekte Einstieg in die Welt des Detailings. Innenraum-Pflege, Hochglanzpolitur und Lackschutz sichern den Wert Ihres Fahrzeugs langfristig.",
    icon: "sparkles",
    shortDescription: "Werterhalt und Glanz in einem Paket. Ideal für gepflegte Daily Driver. Ab 500 €.",
    link: "#rechner"
  },
  {
    title: "Wohnmobil-Spezial",
    description: "Spezialisierte Wohnmobil Aufbereitung und Keramikversiegelung. Wir schützen GFK und Lack vor Auskreiden und Vergilben.",
    icon: "bus",
    shortDescription: "Halle für Fahrzeuge bis 8m. GFK-Pflege und Versiegelung gegen Auskreiden. Außenwäsche ab 125 €.",
    link: "/wohnmobil"
  },
  {
    title: "Leasing-Rettung",
    description: "Vermeiden Sie teure Nachzahlungen bei der Rückgabe. Wir beseitigen Kratzer und Dellen kostengünstig vor dem Gutachter-Termin.",
    icon: "file-check",
    shortDescription: "Sparen Sie durchschnittlich 40-60% gegenüber den Autohaus-Gebühren. Stressfreie Rückgabe.",
    link: "/leasing"
  },
  {
    title: "Innen & Hygiene",
    description: "Professionelle Innenraumreinigung inkl. Polster, Teppich und Türeinstiege. Tiefenreinigung mit 170°C Trockendampf tötet Bakterien ohne Chemie. Nur in Kombination mit Außenwäsche.",
    icon: "droplet",
    shortDescription: "Tiefenreinigung mit 170°C Trockendampf. Nur in Kombination mit Außenwäsche buchbar. Ab 350 €.",
    link: "/dampfreinigung"
  },
  {
    title: "Spezial-Leistungen",
    description: "Schonende Motorwäsche mit Trockendampf und Cabrioverdeck-Imprägnierung. Schonend für Material und Umwelt.",
    icon: "sparkles",
    shortDescription: "Motorwäsche (Trockendampf) und Cabrio-Verdeck Imprägnierung.",
    link: "#kontakt"
  }
];

const remoImage = new Proxy({"src":"/_astro/remo-steam-cleaning.CQNTa6Yp.jpg","width":1200,"height":1600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/certificates/remo-steam-cleaning.jpg";
							}

							return target[name];
						}
					});

const imgKeramik3 = new Proxy({"src":"/_astro/fahrzeugaufbereitung-tensfeld-keramikversiegelung-03.duiPRFCU.jpg","width":2560,"height":2035,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/gallery/fahrzeugaufbereitung-tensfeld-keramikversiegelung-03.jpg";
							}

							return target[name];
						}
					});

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$LocalSchema = createComponent(async ($$result, $$props, $$slots) => {
  const optimizedRemo = await getImage({ src: remoImage, format: "jpg", width: 800 });
  const optimizedProject = await getImage({ src: imgKeramik3, format: "jpg", width: 1200 });
  const domain = "https://rg-detailing.de";
  return renderTemplate(_a$2 || (_a$2 = __template$2(['<script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoDetailing",
        "@id": "https://rg-detailing.de/#localBusiness",
        "name": "RG Detailing",
        "image": "https://rg-detailing.de/logo.png",
        "founder": {
          "@type": "Person",
          "name": "Remo Gerhardt",
          "jobTitle": "Inhaber & Detailer",
          "image": `${domain}${optimizedRemo.src}`,
          "sameAs": [
            "https://www.instagram.com/rg_detailing",
            "https://www.facebook.com/rgdetailing"
          ]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Dorfstra\xDFe 11",
          "addressLocality": "Tensfeld",
          "postalCode": "23824",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 54.045,
          "longitude": 10.31917
        },
        "url": "https://rg-detailing.de",
        "telephone": "+491633845081",
        "email": "kontakt@rg-detailing.de",
        "sameAs": [
          "https://www.instagram.com/rg_detailing",
          "https://www.facebook.com/rgdetailing",
          "https://open.spotify.com/show/63m3iI02yHqeENGb2CtBwa",
          "https://www.youtube.com/channel/UC-_u0Tc9YmcniT7Q93XPRwg"
        ],
        "hasMap": "https://www.google.com/maps/search/?api=1&query=RG+Detailing+Tensfeld",
        "paymentAccepted": "Cash, Credit Card, Invoice",
        "currenciesAccepted": "EUR",
        "areaServed": [
          { "@type": "City", "name": "Tensfeld" },
          { "@type": "City", "name": "Bad Segeberg" },
          { "@type": "City", "name": "Wahlstedt" },
          { "@type": "City", "name": "Neum\xFCnster" },
          { "@type": "City", "name": "Bornh\xF6ved" },
          { "@type": "City", "name": "L\xFCbeck" },
          { "@type": "City", "name": "Kiel" },
          {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 54.045,
              "longitude": 10.31917
            },
            "geoRadius": "40000"
          }
        ],
        "priceRange": "\u20AC\u20AC-\u20AC\u20AC\u20AC",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "10:00",
            "closes": "14:00"
          }
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Certified Labocosmetica Detailer"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Dampftec Partner"
          }
        ]
      },
      {
        "@type": "Product",
        "name": "Premium Fahrzeugaufbereitung & Keramikversiegelung",
        "description": "High-End Lackveredelung und zertifizierte Keramikversiegelung in Schleswig-Holstein. Professionelle Aufbereitung f\xFCr Enthusiasten.",
        "image": `${domain}${optimizedProject.src}`,
        "brand": {
          "@id": "https://rg-detailing.de/#localBusiness"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://rg-detailing.de/#prices",
          "priceCurrency": "EUR",
          "lowPrice": "125",
          "offerCount": services.length
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 5,
          "reviewCount": 47
        }
      }
    ]
  })));
}, "/app/src/components/LocalSchema.astro", void 0);

const $$WhatsAppButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="https://wa.me/491633845081" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group" aria-label="Kontakt per WhatsApp"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg> </a>`;
}, "/app/src/components/WhatsAppButton.astro", void 0);

const $$MobileStickyBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="mobile-sticky-bar" class="fixed bottom-0 left-0 right-0 z-[100] bg-zinc-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 md:hidden flex justify-between items-center safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.5)] translate-y-[150%] transition-transform duration-500" data-astro-cid-od6bqyjf> <a href="tel:+491633845081" class="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors active:scale-95 w-16" data-astro-cid-od6bqyjf> ${renderComponent($$result, "Phone", Phone, { "size": 22, "strokeWidth": 1.5, "data-astro-cid-od6bqyjf": true })} <span class="text-[9px] font-bold uppercase tracking-wider" data-astro-cid-od6bqyjf>Anrufen</span> </a> <a href="https://wa.me/491633845081" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:bg-[#20bd5a] transition-all active:scale-95 -translate-y-4 border border-white/10" data-astro-cid-od6bqyjf> ${renderComponent($$result, "MessageCircle", MessageCircle, { "size": 20, "fill": "currentColor", "data-astro-cid-od6bqyjf": true })} <span data-astro-cid-od6bqyjf>WhatsApp</span> </a> <a href="/#rechner" class="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors active:scale-95 w-16" data-astro-cid-od6bqyjf> ${renderComponent($$result, "Calculator", Calculator, { "size": 22, "strokeWidth": 1.5, "data-astro-cid-od6bqyjf": true })} <span class="text-[9px] font-bold uppercase tracking-wider" data-astro-cid-od6bqyjf>Preis</span> </a> </div>  ${renderScript($$result, "/app/src/components/MobileStickyBar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/app/src/components/MobileStickyBar.astro", void 0);

const $$ScrollToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="scrollToTopBtn" aria-label="Nach oben scrollen" class="fixed bottom-24 right-6 z-40 bg-zinc-800 text-white p-3 rounded-full shadow-lg border border-zinc-700 opacity-0 translate-y-10 transition-all duration-300 hover:bg-red-600 hover:border-red-500"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"></path></svg> </button> ${renderScript($$result, "/app/src/components/ScrollToTop.astro?astro&type=script&index=0&lang.ts")}`;
}, "/app/src/components/ScrollToTop.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$CookieBanner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", `<div id="cookie-banner" class="fixed bottom-0 left-0 right-0 z-[200] p-4 bg-zinc-950/95 border-t border-white/10 backdrop-blur-md translate-y-full transition-transform duration-500 ease-out invisible"> <div class="container mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-4 justify-between"> <div class="text-sm text-zinc-300"> <p>
Wir nutzen Cookies und externe Dienste (Google Maps), um Ihr Nutzererlebnis zu verbessern.
                Weitere Informationen finden Sie in unserer <a href="/datenschutz" class="text-white underline hover:text-red-500">Datenschutzerkl\xE4rung</a>.
</p> </div> <div class="flex gap-3 shrink-0"> <button id="cookie-decline" class="px-4 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition text-xs font-bold uppercase tracking-wider">
Ablehnen
</button> <button id="cookie-accept" class="px-6 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-900/20 transition text-xs font-bold uppercase tracking-wider">
Akzeptieren
</button> </div> </div> </div> <script>
    // Simple Vanilla JS Cookie Consent
    window.addEventListener('load', () => {
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('cookie-accept');
        const declineBtn = document.getElementById('cookie-decline');

        if (!localStorage.getItem('cookie-consent')) {
            // Show banner
            banner.classList.remove('invisible', 'translate-y-full');
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'accepted');
            // Dispatch event for components like PrivacyMap
            window.dispatchEvent(new Event('cookie-consent-accepted'));
            banner.classList.add('translate-y-full');
            setTimeout(() => banner.classList.add('invisible'), 500);
        });

        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'declined');
            banner.classList.add('translate-y-full');
            setTimeout(() => banner.classList.add('invisible'), 500);
        });
    });
<\/script>`])), maybeRenderHead());
}, "/app/src/components/CookieBanner.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://rg-detailing.de");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "RG Detailing: Premium Fahrzeugaufbereitung in Schleswig-Holstein. Zertifizierte Keramikversiegelung & Lackveredelung in Tensfeld. Jetzt Termin vereinbaren!",
    schema,
    keywords = "Fahrzeugaufbereitung, Autoaufbereitung, Autoreinigung, Innenraumreinigung, KFZ Aufbereitung, Keramikversiegelung, Lackaufbereitung, Leasing R\xFCckgabe, Motorw\xE4sche, Schleswig-Holstein, Bad Segeberg, Neum\xFCnster, Tensfeld",
    image = "/images/logo-og.png",
    preloadImage
  } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const socialImageURL = image.startsWith("http") ? image : new URL(image, Astro2.site);
  return renderTemplate(_b || (_b = __template(['<html lang="de" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/logo.png"><title>', ' | RG Detailing</title><meta name="description"', '><meta name="keywords"', '><link rel="canonical"', '><!-- GEO & Local --><meta name="geo.region" content="DE-SH"><meta name="geo.placename" content="Tensfeld"><meta name="geo.position" content="54.04500;10.31917"><meta name="ICBM" content="54.04500, 10.31917"><link rel="manifest" href="/manifest.json"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:locale" content="de_DE"><meta property="og:site_name" content="RG Detailing"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', ">", "", "", "<script>\n            if ('serviceWorker' in navigator) {\n                window.addEventListener('load', () => {\n                    navigator.serviceWorker.register('/sw.js?v=3').catch(err => console.error('SW registration failed:', err));\n                });\n            }\n        <\/script>", '</head> <body class="bg-black text-zinc-100 antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white overflow-x-hidden"> <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-white text-black font-bold rounded shadow-lg ring-2 ring-red-500">\nZum Inhalt springen\n</a> ', ' <div id="main-content" class="flex-grow"> ', " </div> ", ' <div class="hidden md:block"> ', " </div> ", " ", " ", " </body></html>"])), title, addAttribute(description, "content"), addAttribute(keywords, "content"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(socialImageURL, "content"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(socialImageURL, "content"), preloadImage && renderTemplate`<link rel="preload" as="image"${addAttribute(preloadImage, "href")} fetchpriority="high">`, schema && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema))), renderComponent($$result, "LocalSchema", $$LocalSchema, {}), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "WhatsAppButton", $$WhatsAppButton, {}), renderComponent($$result, "MobileStickyBar", $$MobileStickyBar, {}), renderComponent($$result, "ScrollToTop", $$ScrollToTop, {}), renderComponent($$result, "CookieBanner", $$CookieBanner, {}));
}, "/app/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$PrivacyMap as a, imgKeramik3 as i, remoImage as r, services as s };
