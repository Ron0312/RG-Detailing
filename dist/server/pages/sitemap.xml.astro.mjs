import { g as getCollection } from '../chunks/_astro_content_DX0JPfJj.mjs';
export { renderers } from '../renderers.mjs';

async function GET({ site }) {
  const cities = await getCollection("cities");
  const glossaryEntries = await getCollection("glossary");
  const pageFiles = /* #__PURE__ */ Object.assign({"/src/pages/404.astro": () => import('../chunks/404_CZAM5LZS.mjs').then(n => n._),"/src/pages/[city].astro": () => import('../chunks/_city__Dd6VKCDf.mjs').then(n => n._),"/src/pages/agb.astro": () => import('../chunks/agb_DEB0pK-w.mjs').then(n => n._),"/src/pages/dampfreinigung.astro": () => import('../chunks/dampfreinigung_BJoW8u8B.mjs').then(n => n._),"/src/pages/datenschutz.astro": () => import('../chunks/datenschutz_C25Szcwg.mjs').then(n => n._),"/src/pages/glossar/[slug].astro": () => import('../chunks/_slug__BKd2GBPn.mjs').then(n => n._),"/src/pages/glossar/index.astro": () => import('../chunks/index_BN56cv0T.mjs').then(n => n._),"/src/pages/impressum.astro": () => import('../chunks/impressum_DoWs7gjJ.mjs').then(n => n._),"/src/pages/index.astro": () => import('../chunks/index_CR_KHYD6.mjs').then(n => n._),"/src/pages/keramikversiegelung.astro": () => import('../chunks/keramikversiegelung_BOvxGK7i.mjs').then(n => n._),"/src/pages/leasing.astro": () => import('../chunks/leasing_CdwazSoy.mjs').then(n => n._),"/src/pages/sitemap.astro": () => import('../chunks/sitemap_IWACChF2.mjs').then(n => n._),"/src/pages/werterhalt-garantie.astro": () => import('../chunks/werterhalt-garantie_DalTpudB.mjs').then(n => n._),"/src/pages/wohnmobil.astro": () => import('../chunks/wohnmobil_BPMcjhSa.mjs').then(n => n._)});
  const staticPages = Object.keys(pageFiles).filter((path) => {
    const isDynamic = path.includes("[");
    const isApi = path.includes("/api/");
    const is404 = path.includes("404");
    return !isDynamic && !isApi && !is404;
  }).map((path) => {
    let route = path.replace("/src/pages/", "").replace(/\.(astro|md|mdx)$/, "");
    if (route === "index") return "";
    if (route.endsWith("/index")) {
      route = route.replace("/index", "");
    }
    return route;
  });
  const cityUrls = cities.map((city) => ({
    loc: new URL(city.data.slug, site).href,
    lastmod: (/* @__PURE__ */ new Date()).toISOString()
  }));
  const glossaryUrls = glossaryEntries.map((entry) => ({
    loc: new URL(`glossar/${entry.slug}`, site).href,
    lastmod: (/* @__PURE__ */ new Date()).toISOString()
  }));
  const staticUrls = staticPages.map((page) => ({
    loc: new URL(page, site).href,
    lastmod: (/* @__PURE__ */ new Date()).toISOString()
  }));
  const allUrls = [...staticUrls, ...cityUrls, ...glossaryUrls];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map((url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`).join("")}
</urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml"
      }
    }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
