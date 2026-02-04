import { ak as createAstro, c as createComponent, e as renderComponent, r as renderTemplate, am as maybeRenderHead } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import { g as getCollection } from './_astro_content_DX0JPfJj.mjs';
import { $ as $$Layout } from './Layout_Bl4oGuow.mjs';
import { $ as $$Breadcrumbs } from './Breadcrumbs_B8mLItpZ.mjs';
import { jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const ticking = useRef(false);
  const scrollHeight = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const el = document.documentElement;
        const scrollTop = el.scrollTop || document.body.scrollTop;
        const scrollHeight2 = el.scrollHeight || document.body.scrollHeight;
        const height = scrollTop / (scrollHeight2 - el.clientHeight) * 100;
        setWidth(height);
        ticking.current = false;
      });
      ticking.current = true;
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 h-1 z-[1000] bg-zinc-800 w-full", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "h-full bg-red-600 transition-all duration-100 ease-out",
      style: { width: `${width}%` }
    }
  ) });
}

const $$Astro = createAstro("https://rg-detailing.de");
const prerender = true;
async function getStaticPaths() {
  const glossaryEntries = await getCollection("glossary");
  return glossaryEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { entry } = Astro2.props;
  const { Content } = await entry.render();
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": entry.data.title,
    "description": entry.data.description,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Fahrzeugpflege Lexikon",
      "url": "https://rg-detailing.de/glossar"
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${entry.data.title} - Glossar | RG Detailing`, "description": entry.data.description, "schema": schema }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ScrollProgress", ScrollProgress, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/app/src/components/ScrollProgress.jsx", "client:component-export": "default" })} ${maybeRenderHead()}<div class="container mx-auto px-4 py-32"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "crumbs": [
    { label: "Startseite", href: "/" },
    { label: "Glossar", href: "/glossar" },
    { label: entry.data.title, href: `/glossar/${entry.slug}` }
  ] })} <article class="max-w-3xl mx-auto mt-12"> <header class="mb-12 text-center"> <span class="inline-block py-1 px-3 rounded-full bg-red-900/20 text-red-500 text-xs font-bold tracking-wider mb-6 uppercase border border-red-500/20"> ${entry.data.category} </span> <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">${entry.data.title}</h1> <p class="text-xl text-zinc-400 leading-relaxed">${entry.data.description}</p> </header> <div class="prose prose-invert prose-lg mx-auto bg-zinc-900/30 p-8 md:p-12 rounded-3xl border border-white/5"> ${renderComponent($$result2, "Content", Content, {})} </div> <div class="mt-12 text-center"> <a href="/glossar" class="text-zinc-400 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4">Zurück zur Übersicht</a> </div> </article> </div> ` })}`;
}, "/app/src/pages/glossar/[slug].astro", void 0);

const $$file = "/app/src/pages/glossar/[slug].astro";
const $$url = "/glossar/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
