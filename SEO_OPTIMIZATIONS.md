# 30 SEO Verbesserungen für RG Detailing

## Technische SEO (Basis)
1.  **XML Sitemap:** Automatische Generierung einer `sitemap.xml` sicherstellen (via `@astrojs/sitemap`), die alle City-Pages inkludiert.
2.  **Robots.txt:** Optimieren, um Crawlern den Weg zu weisen und unwichtige Parameter-URLs auszuschließen.
3.  **Canonical Tags:** Sicherstellen, dass jede `[city].astro` Seite ein `rel="canonical"` auf sich selbst hat, um Duplicate Content Probleme zu minimieren.
4.  **404 Seite:** Eine custom 404-Seite erstellen, die Nutzer zurück zu den Services führt (statt einer Standard-Fehlerseite).
5.  **Strukturierte Daten (LocalBusiness):** Auf der Startseite das `LocalBusiness` Schema erweitern (z.B. `hasMap`, `sameAs` Profile).
6.  **Strukturierte Daten (Service):** Für jeden Service (Keramik, Politur) ein eigenes `Service` Schema implementieren.
7.  **Breadcrumbs:** Breadcrumb-Navigation ("Home > Leistungen > Keramikversiegelung") einfügen und mit Schema Markup versehen.
8.  **Open Graph Tags:** `og:image`, `og:title` für Social Media Sharing (WhatsApp/Facebook) optimieren, damit Links attraktiv aussehen.
9.  **Twitter Cards:** Spezifische Meta-Tags für Twitter Vorschauen hinzufügen.
10. **Bild-Komprimierung:** Alle Bilder (auch Hero-Images) ins WebP oder AVIF Format konvertieren, um Ladezeiten zu minimieren.

## Content SEO & Keywords
11. **Keyword-Mapping:** Für jede Unterseite ein Hauptkeyword definieren (z.B. "Keramikversiegelung Tensfeld" vs "Autoaufbereitung Bad Segeberg").
12. **Meta Title Optimierung:** Titel wie "Home | RG Detailing" vermeiden. Besser: "Fahrzeugaufbereitung Schleswig-Holstein | RG Detailing".
13. **Meta Description:** Jede Description muss einen Call-to-Action enthalten ("Jetzt Termin vereinbaren").
14. **H1-Konsistenz:** Sicherstellen, dass auf jeder Seite genau eine H1 existiert, die das Hauptkeyword enthält.
15. **Alt-Tags:** Alle Bilder müssen beschreibende Alt-Texte haben, z.B. "Politur Motorhaube Mercedes AMG".
16. **FAQ Schema:** Die FAQ-Sektion auf der Startseite mit `FAQPage` Schema auszeichnen (Rich Snippets in Google).
17. **Unique Content Cities:** Die Texte auf den Stadt-Landingpages (`[city].astro`) sollten sich zu mind. 30% unterscheiden, um nicht als "Doorway Pages" abgestraft zu werden.
18. **Blog / Ratgeber:** Einen Bereich "Wissen" einführen mit Artikeln wie "Keramik vs. Wachs - Was hält länger?", um Long-Tail-Keywords abzugreifen.
19. **Interne Verlinkung:** Aus den Blog-Artikeln oder Service-Texten auf die Stadt-Seiten verlinken ("Auch für Kunden aus Bad Segeberg").
20. **PDFs indexierbar machen:** Preislisten als HTML statt nur als PDF anbieten, damit Google die Preise lesen kann.

## Local SEO & Off-Page
21. **Google Unternehmensprofil:** Den Link zur Terminbuchung direkt im Google Profil hinterlegen.
22. **Google Posts:** Wöchentlich Updates (Vorher/Nachher Bilder) im Google Unternehmensprofil posten.
23. **Lokale Backlinks:** Partnerschaften mit lokalen Autohäusern oder Tunern eingehen und sich verlinken lassen.
24. **Verzeichnis-Einträge:** Eintragung in "Gelbe Seiten", "Das Örtliche" etc. mit konsistenter NAP (Name, Address, Phone).
25. **Bewertungs-Management:** Auf jede Google Bewertung antworten (auch nur ein "Danke"), das signalisiert Aktivität.
26. **Karte einbinden:** Eine Google Maps Karte auf der Kontaktseite oder im Footer einbinden.

## UX & Performance (Core Web Vitals)
27. **Lazy Loading:** Bilder "below the fold" (außerhalb des sichtbaren Bereichs) mit `loading="lazy"` versehen.
28. **CLS (Layout Shift):** Größenangaben (`width`/`height`) für alle Bilder und Icons festlegen, um Springen des Layouts zu verhindern.
29. **Tap Targets:** Buttons auf Mobilgeräten groß genug machen (mind. 44x44px), damit Google "Mobile Friendly" bestätigt.
30. **Ladezeit Server:** Caching auf dem Server (SSR) oder statischen Build (SSG) wo immer möglich nutzen (prerender: true ist bereits gut!).
