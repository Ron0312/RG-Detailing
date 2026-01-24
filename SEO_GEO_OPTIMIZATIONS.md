# 30-Point Optimization Plan: Performance, SEO, & GEO

This roadmap outlines 30 actionable improvements for `rg-detailing.de`, categorized by impact area.

## 🚀 Performance (Speed & Core Web Vitals)

1.  **Link Prefetching:** Enable `data-astro-prefetch` on all primary navigation links (Header/Footer) to preload pages on hover/viewport visibility.
2.  **Image Decoding:** Explicitly add `decoding="async"` to all images below the fold to unblock the main thread during parsing.
3.  **Lazy Loading Enforcement:** Audit all `<img>` tags (especially in generic components) to ensure `loading="lazy"` is present, except for the LCP (Hero) image.
4.  **Font Display Strategy:** Enforce `font-display: swap` globally to prevent "Flash of Invisible Text" (FOIT) during font loading.
5.  **Content Visibility:** Apply `content-visibility: auto` to off-screen sections like the Footer and FAQ to skip rendering work until they approach the viewport.
6.  **Explicit Image Dimensions:** Ensure every `<img>` and `<svg>` has explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
7.  **Cache-Control Headers:** Configure middleware or host (Vercel/Netlify/Node) to serve static assets (`/images`, `/fonts`) with `Cache-Control: public, max-age=31536000, immutable`.
8.  **JavaScript Deferral:** Review inline scripts in `Header.astro` and move non-critical logic to deferred external scripts or use `type="module"`.
9.  **DOM Size Reduction:** Simplify nested `<div>` wrappers in the `PriceCalculator` and `CeramicComparison` components to reduce style calculation costs.
10. **Third-Party Script Facades:** Ensure the Google Maps iframe is strictly loaded only after user interaction (Two-Click solution) – *Already implemented, verify on all pages.*

## 🔍 SEO (Technical & On-Page)

11. **Refined LocalBusiness Schema:** Enhance `LocalSchema.astro` with `paymentAccepted`, `currenciesAccepted`, and a precise `GeoCircle` for the service area.
12. **Author/Founder Schema:** Add a `Person` schema for "Remo Gerhardt" linked via `founder` to the `Organization` to build E-E-A-T (Experience, Expertise, Authoritativeness, Trust).
13. **HowTo Schema:** Implement `HowTo` structured data for the "4-Step Process" (Check, Wash, Polish, Protect) on the homepage.
14. **Service Schema:** Ensure every service card (Politur, Keramik, etc.) is wrapped or referenced in a `Service` schema with `provider` and `areaServed`.
15. **BreadcrumbList Schema:** Implement `BreadcrumbList` structured data on all sub-pages (Cities, Services) to enhance SERP snippets.
16. **Canonical Logic:** Verify that all "Micro-Landingpages" (City pages) have self-referencing canonical tags to prevent duplicate content issues.
17. **Accessibility Labels:** Add `aria-label` attributes to all icon-only links (Social Media, Phone, Maps) in the Header and Footer.
18. **Heading Hierarchy:** Audit `h1` through `h6` order. Ensure the homepage has exactly one `h1` and logical `h2`/`h3` subsections.
19. **Image Alt Text Strategy:** Audit `alt` text to be descriptive but not keyword-stuffed. Ensure hero images describe the *feeling* and *content* (e.g., "Gleaming black Porsche hood reflecting studio lights").
20. **404 Tracking:** Monitor the custom 404 page logs to identify and fix broken internal or external backlinks.

## 🤖 GEO (Generative Engine Optimization & AI Trust)

21. **Entity Linking:** In `About.astro`, explicitly link brand mentions (Labocosmetica, Gtechniq) to their official websites or Wikidata entries using `sameAs` or standard links to establish topical authority.
22. **"Zero Click" Answers:** Optimize FAQ answers to be concise (< 50 words) and direct, increasing the chance of being cited by AI as a direct answer.
23. **Glossary Definitions:** Create a "Glossary" section or use `DefinedTerm` schema for industry-specific terms (e.g., "HPC Coating", "Trockendampf") to become the source of truth for these definitions.
24. **Trust Signals:** Ensure the "Impressum", "Datenschutz", and "AGB" pages are easily crawlable and linked in the footer (AI looks for these to verify legitimacy).
25. **Social Proof Aggregation:** Ensure the `AggregateRating` schema accurately reflects the Google Maps rating and is present on the homepage.
26. **VideoObject Schema:** If embedding YouTube videos, wrap them in `VideoObject` schema to help AI understand the video content without watching it.
27. **Podcast Series Schema:** Add `PodcastSeries` schema for the Spotify/YouTube podcast links to capture audio-search traffic.
28. **Structure Data for Pricing:** Ensure `PriceSpecification` in schema matches the visible prices in the calculator to prevent "hallucinations" by AI regarding costs.
29. **Contextual Captions:** Add captions below complex images (like Before/After sliders) to give AI context about what is being demonstrated.
30. **Date Modified:** Add `dateModified` to the `WebPage` schema to signal freshness to search engines and AI bots.
