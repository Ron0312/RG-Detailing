# 60 Punkte Optimierungsplan für RG Detailing

Dieser Plan priorisiert Fehlerbehebung, Konsistenz und technische Exzellenz, basierend auf einem aktuellen Audit der Codebasis.

## 1. Korrektheit & Rechtliches (Priorität: Hoch)
1.  **Impressum Name:** Korrektur von "Robert G." zu "Remo Gerhardt" in `src/pages/impressum.astro` (Konsistenz mit `humans.txt`).
2.  **Wohnmobil Preis:** Änderung von "Ab 210 €" in `wohnmobil.astro` zu "Individuelles Angebot", um Diskrepanz zum Rechner (Waschen vs. Polieren) zu beheben.
3.  **Service Preise:** Hinzufügen der "Ab"-Preise (350€, 500€, 800€) in die Service-Karten auf der Startseite (`src/data/services.ts`).
4.  **Datenschutz Name:** Prüfung und Korrektur des Verantwortlichen in `datenschutz.astro`.
5.  **MwSt Hinweis:** Expliziter Hinweis im Footer/Rechner, ob Preise inkl. MwSt. sind (z.B. "Alle Preise inkl. gesetzl. MwSt.").
6.  **ODR-Link:** Sicherstellen, dass der Link zur Online-Streitbeilegung im Impressum klickbar und aktuell ist.
7.  **AGB:** Falls vorhanden, Link im Footer ergänzen (fehlt aktuell).
8.  **Rechner "Leasing":** "Geschätzte Investition" klarer als "Startpreis" vs. "Endpreis" kennzeichnen.
9.  **Wohnmobil Paket:** Im Rechner explizit machen, dass "Politur" nur auf Anfrage berechnet wird (aktuell nur Wäsche kalkuliert).
10. **Kontakt Konsistenz:** Telefonnummer-Formatierung überall vereinheitlichen (z.B. +49 vs 0163).
11. **Öffnungszeiten:** Abgleich der Schema.org Daten mit den tatsächlichen Google Maps Zeiten.
12. **Cookie Banner:** Implementierung einer DSGVO-konformen Consent-Lösung (falls Tracking/Maps genutzt wird).

## 2. SEO & GEO (Traffic & Sichtbarkeit)
13. **Schema "sameAs":** Hinzufügen von Social Media Links (Spotify, YouTube) zum `Organization` Schema.
14. **Breadcrumbs Schema:** Implementierung von `BreadcrumbList` Structured Data auf allen Unterseiten.
15. **Local SEO Footer:** "Einsatzgebiet" Textblock im Footer lesbarer gestalten (nicht nur als Accordion verstecken).
16. **Meta Descriptions:** Länge aller Descriptions auf 150-160 Zeichen optimieren (einige wirken zu kurz/generisch).
17. **Image Alt-Tags:** Audit aller Galerie-Bilder auf beschreibende Keywords (z.B. "Lackaufbereitung Porsche 911 Tensfeld").
18. **H1 Hierarchie:** Sicherstellen, dass auf jeder Seite genau eine H1 existiert (besonders auf Landingpages).
19. **Internal Linking:** Verlinkung von `wohnmobil.astro` zurück zum Rechner mit Pre-Selection Parameter.
20. **Bing Webmaster:** Verifizierung der Seite für Bing Search Console.
21. **GEO Meta:** Prüfung der `geo.position` Koordinaten auf exakte Werkstatt-Position.
22. **Service Schema:** "priceRange" in allen Service-Schemas spezifizieren (nicht nur global).
23. **FAQ Schema:** Auf `wohnmobil.astro` und `leasing.astro` spezifische FAQ-Schemas hinzufügen.
24. **Sitemap:** Prüfen, ob `sitemap-index.xml` korrekt alle Unterseiten (auch Cities) enthält.
25. **Canonical Tags:** Selbst-referenzierende Canonicals auf allen parametrisierten Seiten (falls vorhanden) erzwingen.

## 3. UX / UI (Nutzererfahrung)
26. **Skip Link:** "Zum Inhalt springen" Link für Tastatur-Nutzer implementieren (Barrierefreiheit).
27. **Focus States:** Sichtbare Fokus-Outlines für alle interaktiven Elemente (Buttons, Links) sicherstellen.
28. **Form Feedback:** Lade-Indikatoren im Preisrechner deutlicher machen (Spinner ist gut, Text-Feedback besser).
29. **404 Seite:** Custom 404 Page mit "Zurück zur Startseite" und Hilfreichen Links (statt Standard Astro 404).
30. **Touch Targets:** Klickflächen auf Mobile auf mind. 44x44px vergrößern (besonders Footer-Links).
31. **Kontrast:** Prüfen, ob graue Schrift auf schwarzem Grund (Footer) WCAG AA erfüllt.
32. **Back-to-Top:** Button auch auf Mobile gut positionieren (nicht überlappend mit WhatsApp Button).
33. **Breadcrumbs Mobile:** Sichtbarkeit der Brotkrumen-Navigation auf kleinen Screens optimieren.
34. **Rechner Reset:** "Neu berechnen" Button prominenter platzieren nach Erfolg.
35. **Input Types:** `type="tel"` und `type="email"` in allen Formularen erzwingen (für Mobile Keyboards).
36. **Sticky Header:** Smooth Transition beim Scrollen prüfen (Vermeidung von Layout-Sprüngen).
37. **Galerie Zoom:** Pinch-to-Zoom in der Lightbox auf Mobile ermöglichen.

## 4. Tech & Performance
38. **Service Worker:** Basis-Implementierung für "Installierbarkeit" (PWA Kriterien erfüllen).
39. **Manifest Icons:** `maskable` Icons im Manifest definieren (Android Standard).
40. **Bild-Formate:** Konsequente Nutzung von AVIF/WebP für alle Assets (via Astro Image Tools).
41. **LCP Preload:** Das Hero-Image auf der Startseite und Unterseiten per `<link rel="preload">` laden.
42. **Font Subsetting:** Google Fonts lokal hosten und ungenutzte Glyphen entfernen (Performance).
43. **Print CSS:** Stylesheet für den Druck optimieren (Navigation ausblenden, schwarz-weiß Text).
44. **Security Headers:** CSP (Content Security Policy) verfeinern, um XSS zu verhindern.
45. **Lazy Loading:** `loading="lazy"` für alle Bilder "below the fold" und besonders für iframes (Maps).
46. **JS Minification:** Build-Prozess prüfen, ob Console-Logs entfernt werden.
47. **Cache-Control:** Lange Caching-Zeiten für statische Assets (Fonts, Images) in Vercel/Netlify Config setzen.
48. **Error Logging:** Client-Side Error Tracking (z.B. Sentry) vorbereiten.

## 5. Content & Vertrauen
49. **Glossar:** Erstellung einer `/glossar` Seite für SEO-Begriffe (Hologramme, Standzeit, etc.).
50. **Team-Foto:** Aktuelles Bild von Remo im "Über Uns" Bereich (baut persönliches Vertrauen auf).
51. **Zertifikate:** Verlinkung oder Download-Möglichkeit der Labocosmetica-Zertifikate.
52. **Garantie-Seite:** Detaillierte Seite für "Werterhalt-Garantie" Bedingungen (Transparenz).
53. **Video-Einbindung:** Kurzes Vorstellungsvideo (YouTube Short) auf der Startseite einbetten.
54. **Podcast Transkripte:** Text-Versionen der Podcast-Folgen für SEO nutzen.
55. **Partner:** "Dampfdrachen" Vertriebs-Seite mit konkreten Produktbildern anreichern.
56. **Kunden-Stimmen:** Fotos zu den Google-Reviews hinzufügen (falls DSGVO-konform möglich).
57. **Blog:** Start eines Ratgeber-Blogs ("Lederpflege im Sommer", "Keramik vs Wachs").
58. **Fallstudien:** "Case Studies" mit detaillierter Story zu besonderen Fahrzeugen (nicht nur Galerie).
59. **Newsletter:** Optionales Anmeldeformular für Pflege-Tipps (Kundenbindung).
60. **Saisonale Banner:** Möglichkeit schaffen, saisonale Angebote (Frühjahrs-Check) global einzublenden.
