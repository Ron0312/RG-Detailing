export const GET = ({ site }) => {
  const sitemapURL = new URL('sitemap.xml', site);
  return new Response(
    `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${sitemapURL.href}
`.trim(),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
};
