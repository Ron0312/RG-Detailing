# RG Detailing - Digitale Relaunch Plattform

Dieses Projekt ist die neue digitale Plattform für RG Detailing, basierend auf Astro, Node.js, React und Keystatic CMS.

## Features

- **High-Performance**: Astro SSR mit Node.js Adapter.
- **Local SEO**: Dynamische Landingpages für Städte (`/fahrzeugaufbereitung-bad-segeberg`).
- **Interaktiver Preisrechner**: React-basierter Wizard mit serverseitiger Validierung.
- **Vorher/Nachher Slider**: Visuelles Storytelling.
- **CMS**: Keystatic für die einfache Verwaltung von Inhalten (Services, Bewertungen) direkt über den Browser.
- **Trust Elements**: Bewertungen, Zertifikate und klare CTAs.

## Tech Stack

- **Framework**: Astro 5 (SSR mode)
- **UI**: React 19, Tailwind CSS 4
- **CMS**: Keystatic (GitHub Mode)
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
    Das CMS ist unter `http://localhost:4321/keystatic` erreichbar.

## Keystatic CMS Konfiguration (GitHub Mode)

Damit das CMS auf der Live-Seite (Plesk) funktioniert und Änderungen direkt in das GitHub-Repository schreiben kann, ist eine einmalige Einrichtung einer GitHub OAuth App erforderlich.

### 1. GitHub OAuth App erstellen
1.  Gehe zu deinen [GitHub Developer Settings](https://github.com/settings/developers) -> "OAuth Apps" -> "New OAuth App".
2.  **Application Name:** z.B. "RG Detailing CMS"
3.  **Homepage URL:** `https://deine-domain.de` (z.B. `https://rg-detailing.de`)
4.  **Authorization callback URL:** `https://deine-domain.de/keystatic/api/github/oauth/callback`
5.  Klicke auf "Register application".

### 2. Client ID und Secret kopieren
1.  Kopiere die **Client ID**.
2.  Erstelle ein **Client Secret** ("Generate a new client secret") und kopiere es.

### 3. Umgebungsvariablen setzen (Plesk / Server)
In der Node.js Umgebung auf deinem Server müssen diese beiden Variablen gesetzt werden:

```bash
KEYSTATIC_GITHUB_CLIENT_ID=deine_client_id_hier
KEYSTATIC_GITHUB_CLIENT_SECRET=dein_client_secret_hier
```

Ohne diese Variablen funktioniert der Login im CMS auf der Live-Seite nicht.

## Deployment (Plesk)

Das Projekt ist für den Betrieb auf einem Plesk-Server mit Node.js konfiguriert.

1.  **Build**
    ```bash
    npm run build
    ```
    Erzeugt den `dist/` Ordner.

2.  **Upload / Git Pull**
    Laden Sie den Inhalt hoch oder nutzen Sie die Plesk Git-Erweiterung für automatische Deployments.

3.  **Node.js Konfiguration**
    - Entry Point: `server.mjs` (oder direkt `dist/server/entry.mjs`)
    - Document Root: `dist/client` (für statische Assets)

4.  **Updates**
    Ein `touch tmp/restart.txt` startet die Node.js App neu.

## Projektstruktur

- `src/pages/[city].astro`: Dynamische Landingpage für Local SEO.
- `src/lib/pricing.ts`: Zentrale Preislogik.
- `src/components/PriceCalculator.jsx`: Interaktives Frontend für den Rechner.
- `src/content/`: CMS-Inhalte (Services, Reviews, Cities).
