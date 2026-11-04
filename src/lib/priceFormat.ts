// Alle Preise auf der Seite sind Nettopreise (Wunsch des Inhabers, 04.11.2026).
// Jede Preisangabe läuft deshalb über euroNetto(), Hinweistexte stehen nur hier.

export const NETTO = 'netto';
export const MWST_ZUSATZ = 'zzgl. gesetzl. MwSt.';
export const PREISHINWEIS = 'Alle Preise sind Nettopreise zzgl. der gesetzlichen MwSt.';

// Geschütztes Leerzeichen zwischen Betrag und €, damit das Zeichen nie allein umbricht.
const GESCHUETZT = String.fromCodePoint(0x00a0);

export const euro = (betrag: number): string => `${betrag.toLocaleString('de-DE')}${GESCHUETZT}€`;

export const euroNetto = (betrag: number): string => `${euro(betrag)} ${NETTO}`;
