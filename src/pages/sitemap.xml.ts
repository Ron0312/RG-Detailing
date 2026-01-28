import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const cities = await getCollection('cities');
  const blogEntries = await getCollection('blog');
  const glossaryEntries = await getCollection('glossary');

  // Static pages
  const staticPages = [
    '',
    'agb',
    'dampfreinigung',
    'datenschutz',
    'impressum',
    'leasing',
    'werterhalt-garantie',
    'wohnmobil',
    'blog',
    'glossar'
  ];

  const cityUrls = cities.map((city) => ({
    loc: new URL(city.data.slug, site).href,
    lastmod: new Date().toISOString() // In a real app, you might track file mtime
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
