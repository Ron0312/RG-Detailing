import { ak as createAstro, c as createComponent, r as renderTemplate, u as unescapeHTML } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://rg-detailing.de");
const $$ServiceSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ServiceSchema;
  const { name, description, image, price, priceCurrency = "EUR", priceRange = "$$$" } = Astro2.props;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "AutoDetailing",
      "name": "RG Detailing",
      "image": "https://rg-detailing.de/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dorfstra\xDFe 11",
        "addressLocality": "Tensfeld",
        "postalCode": "23824",
        "addressCountry": "DE"
      },
      "telephone": "+491633845081",
      "priceRange": priceRange
    },
    "areaServed": {
      "@type": "State",
      "name": "Schleswig-Holstein"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": name,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": name
          },
          "price": price,
          "priceCurrency": priceCurrency
        }
      ]
    },
    ...image && { "image": image }
  };
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/app/src/components/ServiceSchema.astro", void 0);

export { $$ServiceSchema as $ };
