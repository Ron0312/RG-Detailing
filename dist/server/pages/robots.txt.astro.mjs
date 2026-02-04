export { renderers } from '../renderers.mjs';

const GET = ({ site }) => {
  const sitemapURL = new URL("sitemap.xml", site);
  return new Response(
    `
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemapURL.href}
`.trim(),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
