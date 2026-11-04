// Alle Preise auf der Seite sind Nettopreise (Wunsch des Inhabers, 04.11.2026).
// Jede Preisangabe läuft deshalb über euroNetto(), Hinweistexte stehen nur hier.

export const NETTO = 'netto';
export const MWST_ZUSATZ = 'zzgl. gesetzl. MwSt.';
export const PREISHINWEIS = 'Alle Preise sind Nettopreise zzgl. der gesetzlichen MwSt.';

export const euro = (betrag: number): string => `${betrag.toLocaleString('de-DE')} €`;

export const euroNetto = (betrag: number): string => `${euro(betrag)} ${NETTO}`;
