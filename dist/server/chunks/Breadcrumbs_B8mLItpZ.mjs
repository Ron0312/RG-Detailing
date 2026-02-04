import { ak as createAstro, c as createComponent, r as renderTemplate, u as unescapeHTML, an as addAttribute, am as maybeRenderHead } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://rg-detailing.de");
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { crumbs } = Astro2.props;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://rg-detailing.de${crumb.href}`
    }))
  };
  return renderTemplate(_a || (_a = __template(["", '<nav aria-label="Breadcrumb" class="py-4 text-sm text-zinc-400"> <ol class="flex items-center space-x-2"> ', ' </ol> <script type="application/ld+json">', "<\/script> </nav>"])), maybeRenderHead(), crumbs.map((crumb, index) => renderTemplate`<li class="flex items-center"> ${index > 0 && renderTemplate`<span class="mx-2 text-zinc-600">/</span>`} ${index === crumbs.length - 1 ? renderTemplate`<span class="text-white font-medium" aria-current="page">${crumb.label}</span>` : renderTemplate`<a${addAttribute(crumb.href, "href")} class="hover:text-red-500 transition-colors"> ${crumb.label} </a>`} </li>`), unescapeHTML(JSON.stringify(schema)));
}, "/app/src/components/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
