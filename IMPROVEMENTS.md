# Verbesserungsvorschläge für RG Detailing

Hier sind 80 Punkte, aufgeteilt in vier Kategorien, um die Webseite, SEO, UX/UI und den Content zu verbessern.

## Website (Technik & Allgemein)
1.  **Lazy Loading:** Implementieren Sie Lazy Loading für alle Bilder unterhalb des sichtbaren Bereichs ("below the fold").
2.  **Content-Visibility:** Nutzen Sie CSS `content-visibility` für lange Seiten, um die Render-Performance zu steigern.
3.  **Bild-Dimensionen:** Stellen Sie sicher, dass alle `img`-Tags explizite `width` und `height` Attribute haben, um Layout Shifts (CLS) zu vermeiden.
4.  **Service Worker:** Richten Sie einen Service Worker für Offline-Fähigkeiten (PWA) und Caching ein.
5.  **CDN Nutzung:** Liefern Sie statische Assets (Bilder, Fonts) über ein Content Delivery Network (CDN) aus.
6.  **SVG Optimierung:** Minifizieren und komprimieren Sie alle SVG-Dateien (z.B. mit SVGO).
7.  **Critical CSS:** Inlinen Sie das kritische CSS für den "Above-the-Fold"-Bereich.
8.  **Link-Sicherheit:** Ergänzen Sie alle externen Links mit `rel="noopener noreferrer"`.
9.  **Automatisierte Sitemap:** Generieren Sie eine `sitemap.xml`, die sich bei neuen Seiten automatisch aktualisiert.
10. **Robots.txt:** Pflegen Sie eine saubere `robots.txt` zur Steuerung der Crawler.
11. **Logging:** Implementieren Sie ein strukturiertes Error-Logging für serverseitige Fehler.
12. **Semantisches HTML:** Nutzen Sie konsequent HTML5-Tags (`<article>`, `<section>`, `<nav>`, `<aside>`).
13. **Custom 404:** Erstellen Sie eine hilfreiche 404-Fehlerseite, die Nutzer zurück zu relevanten Inhalten führt.
14. **Barrierefreiheit:** Prüfen Sie die Seite auf WCAG 2.1 AA Konformität (Kontraste, Screenreader-Support).
15. **Tastatur-Navigation:** Stellen Sie sicher, dass alle Menüs und Slider per Tastatur bedienbar sind.
16. **Font-Loading:** Nutzen Sie `font-display: swap` für Webfonts, um Text sofort sichtbar zu machen.
17. **Code-Cleaning:** Entfernen Sie ungenutztes CSS und JavaScript aus dem Bundle.
18. **Security Headers:** Setzen Sie HTTP Security Headers (CSP, X-Frame-Options, HSTS).
19. **Moderne Bildformate:** Nutzen Sie das `<picture>` Element für WebP/AVIF Formate mit Fallbacks.
20. **Backups:** Richten Sie regelmäßige, automatisierte Backups für Code und Inhalte ein.

## SEO (Suchmaschinenoptimierung)
1.  **Meta Titles:** Optimieren Sie alle Titel (50-60 Zeichen) mit den Haupt-Keywords an vorderer Stelle.
2.  **Meta Descriptions:** Schreiben Sie klickstarke Beschreibungen (150-160 Zeichen) mit klarem Call-to-Action.
3.  **Schema Markup:** Nutzen Sie strukturiertes Daten-Markup für `AutoDetailing`, `Service` und `FAQPage`.
4.  **Local SEO:** Implementieren Sie `LocalBusiness` Schema mit exakten Geo-Koordinaten.
5.  **Landing Pages:** Erstellen Sie dedizierte Unterseiten für jede Hauptdienstleistung (nicht nur Sektionen auf der Startseite).
6.  **URL-Struktur:** Nutzen Sie sprechende, kurze URLs (z.B. `/keramikversiegelung` statt `/service?id=12`).
7.  **Alt-Texte:** Versehen Sie jedes Bild mit beschreibenden Alt-Texten, die Keywords natürlich enthalten.
8.  **Blog/Ratgeber:** Starten Sie einen Blog, um Long-Tail-Keywords (z.B. "Lackpflege im Winter") abzudecken.
9.  **Interne Verlinkung:** Bauen Sie Themen-Cluster auf und verlinken Sie verwandte Inhalte stark untereinander.
10. **HTTPS/HSTS:** Stellen Sie sicher, dass alle Varianten der Domain auf die HTTPS-Version weiterleiten.
11. **Standort-Seiten:** Erstellen Sie Landingpages für umliegende Städte (wie bereits begonnen), optimiert auf "Aufbereitung [Stadt]".
12. **Google Reviews:** Binden Sie Bewertungen direkt auf den Service-Seiten ein (Social Proof).
13. **Broken Links:** Prüfen und korrigieren Sie regelmäßig 404-Fehler.
14. **Core Web Vitals:** Optimieren Sie LCP, FID und CLS, da diese Ranking-Faktoren sind.
15. **Canonicals:** Setzen Sie Canonical Tags korrekt, um Duplicate Content zu vermeiden.
16. **Search Console:** Reichen Sie die Sitemap bei der Google Search Console ein und prüfen Sie auf Indexierungsfehler.
17. **Keyword-Monitoring:** Überwachen Sie Rankings und passen Sie Inhalte bei Bedarf an.
18. **Social Meta Tags:** Implementieren Sie Open Graph und Twitter Cards für schönes Teilen in sozialen Medien.
19. **Heading-Struktur:** Nutzen Sie H1-H6 hierarchisch korrekt (nur eine H1 pro Seite).
20. **Google My Business:** Halten Sie das GMB-Profil aktuell (Öffnungszeiten, neue Fotos, Beiträge).

## UX/UI (User Experience & Interface)
1.  **Sticky CTA:** Halten Sie den "Termin vereinbaren"-Button auf Mobile immer im sichtbaren Bereich.
2.  **Formular-Optimierung:** Reduzieren Sie Formularfelder auf das Nötigste, um die Hürde zu senken.
3.  **Authentizität:** Nutzen Sie echte Fotos der Arbeit statt Stock-Fotos.
4.  **Kontraste:** Erhöhen Sie den Kontrast bei Texten (besonders grau auf schwarz) für bessere Lesbarkeit.
5.  **Mobile Navigation:** Gestalten Sie das Hamburger-Menü großflächig und einfach bedienbar.
6.  **Back-to-Top:** Fügen Sie bei langen Seiten einen "Nach oben"-Button hinzu.
7.  **Touch Targets:** Stellen Sie sicher, dass alle klickbaren Elemente auf Mobile mindestens 44x44px groß sind.
8.  **Konsistenz:** Nutzen Sie einheitliche Abstände (Spacing System) und Farben auf allen Seiten.
9.  **Feedback:** Geben Sie visuelles Feedback bei Interaktionen (Hover, Focus, Klick, Ladezustand).
10. **Testimonials:** Platzieren Sie Kundenstimmen strategisch nah an den Conversion-Elementen.
11. **Preistransparenz:** Zeigen Sie "Ab"-Preise, um Vertrauen zu schaffen und falsche Erwartungen zu vermeiden.
12. **Loading States:** Nutzen Sie Skeletons statt Spinnern für ein gefühlt schnelleres Laden.
13. **Schriftgröße:** Nutzen Sie mindestens 16px für Fließtext, um die Lesbarkeit auf allen Geräten zu sichern.
14. **Whitespace:** Nutzen Sie mehr Weißraum (bzw. Schwarzraum), um Inhalte atmen zu lassen und den Fokus zu lenken.
15. **Hierarchie:** Gestalten Sie Überschriften visuell deutlich unterschiedlich, um die Struktur scannbar zu machen.
16. **Breadcrumbs:** Nutzen Sie Brotkrumen-Navigation für tiefere Seitenstrukturen.
17. **Suche:** Fügen Sie eine Suchfunktion hinzu, wenn der Content-Umfang wächst.
18. **Validierung:** Validieren Sie Formulareingaben in Echtzeit (inline).
19. **Micro-Interactions:** Nutzen Sie dezente Animationen, um die Wertigkeit der Seite zu unterstreichen.
20. **Responsive Testing:** Testen Sie regelmäßig auf echten Geräten (iOS, Android, Tablet).

## Content (Inhalt & Text)
1.  **Nutzen statt Features:** Schreiben Sie darüber, was der Kunde davon hat (z.B. "Werterhalt" statt "Politur").
2.  **Kurze Absätze:** Halten Sie Textblöcke kurz (max. 3-4 Zeilen) für bessere Lesbarkeit am Bildschirm.
3.  **Listen:** Nutzen Sie Aufzählungszeichen für Vorteile und Fakten.
4.  **Einwandbehandlung:** Adressieren Sie Bedenken (z.B. "Ist das teuer?", "Dauert das lange?") proaktiv im Text.
5.  **Tonalität:** Behalten Sie den "Norddeutsch-direkt" Stil bei – ehrlich, hochwertig, ohne Übertreibungen.
6.  **Case Studies:** Zeigen Sie detaillierte "Vorher-Nachher"-Vergleiche mit Erklärung der durchführten Schritte.
7.  **Video-Content:** Binden Sie kurze Videos ein, die Arbeitsschritte oder Ergebnisse zeigen.
8.  **FAQ:** Ergänzen Sie jede Serviceseite mit spezifischen Fragen und Antworten.
9.  **USP Highlight:** Stellen Sie Alleinstellungsmerkmale (z.B. "Zertifiziert", "Dampf statt Chemie") heraus.
10. **Storytelling:** Erzählen Sie Geschichten von geretteten "Härtefällen", um Emotionalität zu wecken.
11. **Einfache Sprache:** Vermeiden Sie Fachjargon oder erklären Sie ihn sofort verständlich.
12. **Aktualität:** Halten Sie Inhalte aktuell (z.B. saisonale Angebote für Winter/Frühling).
13. **Handlungsaufforderung:** Sagen Sie dem Nutzer klar, was der nächste Schritt ist (z.B. "Jetzt anrufen").
14. **Team-Vorstellung:** Zeigen Sie die Menschen hinter der Arbeit ("Über uns"), das schafft Vertrauen.
15. **Glossar:** Erklären Sie Begriffe wie "Coating", "Hologramme" oder "Kneten" in einem Glossar.
16. **Vergleiche:** Erstellen Sie Entscheidungshilfen (z.B. "Wachs vs. Keramik – was passt zu mir?").
17. **Lektorat:** Prüfen Sie Texte penibel auf Rechtschreib- und Grammatikfehler.
18. **Daten & Fakten:** Untermauern Sie Aussagen mit Zahlen (z.B. "Hält bis zu 50 Wäschen").
19. **Lokalisierung:** Sprechen Sie Nutzer auf Landingpages direkt mit ihrem Wohnort an.
20. **Lead Magnets:** Bieten Sie Checklisten (z.B. "Leasing-Rückgabe Checkliste") als PDF zum Download an.
