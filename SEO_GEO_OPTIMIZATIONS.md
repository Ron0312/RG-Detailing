# SEO & GEO Optimierungs-Analyse (50 Punkte)

Diese Liste enthält 50 spezifische, bisher nicht implementierte Maßnahmen zur Verbesserung der SEO (Search Engine Optimization) und GEO (Generative Engine Optimization für KI-Suchmaschinen).

## GEO (Generative Engine Optimization) & KI-Sichtbarkeit
1.  **Entity-Glossar:** Einführung eines `/glossar/` Verzeichnisses für Fachbegriffe (z.B. "Standzeit", "Hologramme"), da LLMs Definitionen lieben.
2.  **Citation-Links:** Externe Links zu Herstellerseiten (Labocosmetica, Gtechniq) im Fließtext, um den "Knowledge Graph" zu stärken (Co-Citation).
3.  **Data-Tables:** Technische Daten (Härtegrad, pH-Resistenz) in HTML `<table>` Tags statt Listen formatieren, für bessere Extraktion durch KIs.
4.  **HowTo Schema:** Strukturiertes Daten-Markup für Prozesse wie "Wasch-Anleitung" oder "Ablauf der Aufbereitung".
5.  **Speakable Schema:** Markierung von FAQ-Antworten als "Speakable" für Voice Search (Alexa/Siri).
6.  **FactCheck Schema:** Nutzung von `ClaimReview` für "Mythen-Checks" (z.B. "Spüli im Wischwasser").
7.  **VideoObject Schema:** Detailliertes Markup für eingebettete Videos (Dauer, Thumbnail, Transkript).
8.  **AboutPage Schema:** Spezifisches `AboutPage` Markup auf der "Über Uns" Sektion/Seite zur Stärkung der Unternehmens-Entität.
9.  **Author Profiles:** Ausbau der Autoren-Box (Remo Gerhardt) mit `sameAs` zu LinkedIn/Xing für E-E-A-T.
10. **Dataset Schema:** Falls Statistiken (z.B. "1000+ Autos aufbereitet") genannt werden, diese als Datensatz markieren.
11. **Mentions Schema:** Markup für "Mentions" von Partnern (Dampfdrachen) auf der Seite.
12. **FAQ Entity Linking:** Verlinkung von Entitäten innerhalb der FAQ-Antworten (z.B. Link zum Glossar "Keramik").
13. **Contextual Inteallinking:** KI-freundliche interne Links ("Erfahren Sie mehr über Keramik im Vergleich zu Wachs...").

## Technische SEO (Basis & Hygiene)
14. **Security.txt:** Datei unter `/.well-known/security.txt` für Sicherheitsforscher (Trust Signal).
15. **Humans.txt:** Datei unter `/humans.txt` mit Team-Credits (Transparenz Signal).
16. **X-Default Hreflang:** Auch bei einsprachigen Seiten `x-default` setzen (Best Practice).
17. **Strict-Transport-Security (HSTS):** Header serverseitig erzwingen (falls noch nicht strikt genug).
18. **Referrer-Policy:** Setzen auf `strict-origin-when-cross-origin` für Datenschutz/Security.
19. **X-Content-Type-Options:** `nosniff` Header setzen.
20. **Permissions-Policy:** Restriktive Richtlinie für Browser-Features (Kamera/Mikrofon blockieren).
21. **DNS-Prefetch:** Pre-Resolve für Google Maps und Analytics Domains im `<head>`.
22. **Preconnect:** Verbindungsaufbau zu Font-Servern priorisieren.
23. **Async CSS:** Nicht-kritisches CSS (z.B. für Footer-Elemente) asynchron laden.
24. **Image Decoding:** `decoding="async"` auf allen Bildern unterhalb des Fold.
25. **Fetchpriority:** `fetchpriority="high"` explizit für das LCP (Hero) Image setzen.
26. **Remove Generator Tag:** Entfernen des `<meta name="generator" content="Astro...">` aus Sicherheitsgründen.

## Local SEO (Hyper-Lokalisierung)
27. **Geo-Region Metas:** `geo.region` (DE-SH), `geo.placename` (Tensfeld), `geo.position` im Head.
28. **ICBM Tag:** Geo-Koordinaten als ICBM Meta-Tag (Legacy Support).
29. **KML Datei:** Bereitstellung einer `.kml` Datei (Google Earth) mit dem Standort.
30. **Driving Directions:** Textuelle Wegbeschreibung ("A21 Abfahrt Trappenkamp...") auf der Kontaktseite.
31. **LocalBusiness Department:** Falls z.B. "Shop" und "Werkstatt" getrennt sind, als Sub-Entitäten markieren.
32. **AreaServed Polygon:** Definition des Einzugsgebiets als Polygon im Schema (statt nur Radius).
33. **HasMap Link:** Sicherstellen, dass der `hasMap` Link im Schema direkt zur Route führt.
34. **Review Aggregation:** Aggregiertes Rating nicht nur auf Startseite, sondern auch auf Landingpages ausspielen (falls relevant).

## Content & Struktur
35. **PDF Indexierung:** Pflegeanleitungen als PDF mit optimierten Meta-Daten (Titel/Autor) anbieten.
36. **DateModified:** Sichtbares "Zuletzt aktualisiert" Datum auf Service-Seiten (Freshness Signal).
37. **Table of Contents:** Automatisches Inhaltsverzeichnis für lange Service-Seiten (User Signals & Sitelinks).
38. **Breadcrumb Schema Global:** Sicherstellen, dass Breadcrumbs auf *jeder* Unterseite validiert sind.
39. **Image License Info:** Lizenzinformationen in den IPTC Daten oder via Schema für eigene Bilder.
40. **Sitelinks Search Box:** `SearchAction` Schema implementieren (vorbereitend für Site-Suche).
41. **404 Custom Tracking:** Event-Tracking für 404-Hits in Google Analytics/Logfiles (ist geplant, hier als Prio).

## UX & Conversion (Core Web Vitals & PWA)
42. **Web App Manifest:** `manifest.json` für "Add to Homescreen" Funktionalität.
43. **Apple Touch Icons:** Spezifische Icons für iOS (180x180, 152x152, etc.).
44. **Mask Icon:** SVG-Icon für Safari Pinned Tabs (Monochrom).
45. **Theme Color:** Meta-Tag für die Farbe der Browser-Leiste (passend zum Dark Mode).
46. **Mobile-WebApp-Capable:** Tag für Vollbildmodus auf iOS.
47. **Apple-Status-Bar-Style:** `black-translucent` für immersive Optik.
48. **Instant.page:** Library für Preloading bei Mouse-Hover (schnelleres Navigieren).
49. **Form Autocomplete:** Korrekte `autocomplete` Attribute für alle Kontaktformular-Felder.
50. **Print Stylesheet:** CSS `@media print` um Navigation/Footer beim Drucken auszublenden (für Rechnungen/Angebote).
