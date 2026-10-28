import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { startingPrices, sizeMarkupText } from '../lib/priceFacts';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '../data/reviews';

export const prerender = true;

// Kurzprofil fuer KI-Assistenten (llms.txt). Preise und Bewertungen kommen aus
// denselben Quellen wie die Website, damit nichts auseinanderlaeuft.
export const GET: APIRoute = async ({ site }) => {
    const cities = (await getCollection('cities'))
        .map((c) => c.data.name)
        .sort((a, b) => a.localeCompare(b, 'de'));
    const url = (path: string) => new URL(path, site).href;

    const body = `# RG Detailing

> Fahrzeugaufbereitung und Keramikversiegelung in eigener Halle in Tensfeld (Kreis Segeberg, Schleswig-Holstein). Inhaber Remo Gerhardt, zertifizierter Labocosmetica-Detailer. ${GOOGLE_RATING} von 5 Sternen bei ${GOOGLE_REVIEW_COUNT} Google-Bewertungen.

## Kontakt
- Adresse: Dorfstraße 11, 23824 Tensfeld
- Telefon: 0163 38 45 08 1
- E-Mail: kontakt@rg-detailing.de
- Website: ${url('/')}
- Arbeit in der eigenen Halle, kein mobiler Service. Termine nach Vereinbarung.

## Leistungen und Einstiegspreise
Richtwerte für einen Kleinwagen in gutem Zustand. ${sizeMarkupText} Den genauen Preis zeigt der Preisrechner auf der Startseite.
- Basis-Aufbereitung: Innenraum-Tiefenreinigung mit Trockendampf, Polster- und Lederreinigung, Außenwäsche. Ab ${startingPrices.basis} €.
- Leasing-Rückgabe: komplette Aufbereitung innen und außen vor der Rückgabe, um Nachzahlungen zu vermeiden. Ab ${startingPrices.leasing} €. ${url('/leasing/')}
- Premium-Aufbereitung: Tiefenreinigung, Lederpflege, Hochglanzpolitur und Versiegelung. Ab ${startingPrices.premium} €. ${url('/all-in-one/')}
- High-End Detailing: Lackkorrektur und zertifizierte Keramikversiegelung mit bis zu 5 Jahren Garantie. Ab ${startingPrices.highEnd} €. ${url('/keramikversiegelung/')}
- Wohnmobil und Caravan: Halle für Fahrzeuge bis 8 m, GFK-Pflege und Keramikversiegelung gegen Auskreiden. Preis auf Anfrage. ${url('/wohnmobil/')}
- Dampfreinigung: ${url('/dampfreinigung/')}
- Smart Repair für Kratzer, Dellen und Felgen über ein Partnernetzwerk: ${url('/smart-repair/')}
- Werterhalt-Garantie (Pflege-Abo) für Keramik-Kunden: ${url('/werterhalt-garantie/')}

## Einzugsgebiet
Kunden kommen aus ganz Schleswig-Holstein und dem Hamburger Umland, unter anderem aus: ${cities.join(', ')}.

## Weitere Seiten
- Galerie mit Ergebnissen: ${url('/galerie/')}
- Häufige Fragen: ${url('/faq/')}
- Glossar zur Fahrzeugpflege: ${url('/glossar/')}
- Impressum: ${url('/impressum/')}
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
};
