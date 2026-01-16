# RG Detailing - Digitale Relaunch Plattform

Dieses Projekt ist die neue digitale Plattform für RG Detailing, basierend auf Astro, Node.js und React.

## Features

- **High-Performance**: Astro SSR mit Node.js Adapter.
- **Local SEO**: Dynamische Landingpages für Städte (`/fahrzeugaufbereitung-bad-segeberg`).
- **Interaktiver Preisrechner**: React-basierter Wizard mit serverseitiger Validierung.
- **Vorher/Nachher Slider**: Visuelles Storytelling.
- **Trust Elements**: Bewertungen, Zertifikate und klare CTAs.

## Tech Stack

- **Framework**: Astro 5 (SSR mode)
- **UI**: React 19, Tailwind CSS 4
- **Backend**: Node.js (via Astro Endpoints)
- **Validation**: Zod
- **Testing**: Vitest

## Installation & Entwicklung

1.  **Repository klonen**
    ```bash
    git clone <repo-url>
    cd rg-detailing
    ```

2.  **Abhängigkeiten installieren**
    ```bash
    npm install
    ```

3.  **Dev-Server starten**
    ```bash
    npm run dev
    ```
    Der Server läuft unter `http://localhost:4321`.

## Deployment (Plesk)

Das Projekt ist für den Betrieb auf einem Plesk-Server mit Node.js konfiguriert.

1.  **Build**
    ```bash
    npm run build
    ```
    Erzeugt den `dist/` Ordner.

2.  **Upload**
    Laden Sie den Inhalt des `dist/` Ordners (oder das ganze Repo + Build auf dem Server) hoch.

3.  **Node.js Konfiguration**
    - Entry Point: `server.mjs` (oder direkt `dist/server/entry.mjs`)
    - Document Root: `dist/client` (für statische Assets)

4.  **Updates**
    Ein `touch tmp/restart.txt` startet die Node.js App neu.

## Projektstruktur

- `src/pages/[city].astro`: Dynamische Landingpage für Local SEO.
- `src/lib/pricing.ts`: Zentrale Preislogik.
- `src/components/PriceCalculator.jsx`: Interaktives Frontend für den Rechner.
- `src/content/cities/`: Daten für die verschiedenen Standorte.
