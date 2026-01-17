
export const GET = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(
    `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`.trim(),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
};
