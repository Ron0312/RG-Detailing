import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const cities = await getCollection('cities');
  const blogEntries = await getCollection('blog');
  const glossaryEntries = await getCollection('glossary');

  // Automatically find all static pages in src/pages
  const pageFiles = import.meta.glob('/src/pages/**/*.{astro,md,mdx}');

  const staticPages = Object.keys(pageFiles)
    .filter((path) => {
      // Exclude dynamic routes (e.g., [slug].astro), API routes, and hidden/error pages
      const isDynamic = path.includes('[');
      const isApi = path.includes('/api/');
      const is404 = path.includes('404');
      return !isDynamic && !isApi && !is404;
    })
    .map((path) => {
      // Convert file path to URL path
      // e.g., /src/pages/index.astro -> ''
      // e.g., /src/pages/impressum.astro -> 'impressum'
      let route = path
        .replace('/src/pages/', '')
        .replace(/\.(astro|md|mdx)$/, '');

      if (route === 'index') return '';
      if (route.endsWith('/index')) {
        route = route.replace('/index', '');
      }

      return route;
    });

  const cityUrls = cities.map((city) => ({
    loc: new URL(city.data.slug, site).href,
    lastmod: new Date().toISOString()
  }));

  const blogUrls = blogEntries.map((entry) => ({
    loc: new URL(`blog/${entry.slug}`, site).href,
    lastmod: entry.data.date ? new Date(entry.data.date).toISOString() : new Date().toISOString()
  }));

   const glossaryUrls = glossaryEntries.map((entry) => ({
    loc: new URL(`glossar/${entry.slug}`, site).href,
    lastmod: new Date().toISOString()
  }));

  const staticUrls = staticPages.map((page) => ({
    loc: new URL(page, site).href,
    lastmod: new Date().toISOString()
  }));

  const allUrls = [...staticUrls, ...cityUrls, ...blogUrls, ...glossaryUrls];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map((url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`).join('')}
</urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
}
