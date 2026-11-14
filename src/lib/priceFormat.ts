// Die Preise des Inhabers sind Nettopreise (Wunsch vom 04.11.2026). Gegenüber Verbrauchern ist
// der Gesamtpreis inkl. MwSt. anzugeben und bei einer Aufgliederung hervorzuheben (§ 3 Abs. 1
// und 3 PAngV). Jede Preisangabe läuft deshalb über diese Datei: zuerst der Endpreis inkl. MwSt.,
// daneben der Nettopreis. Übergeben wird immer der Nettobetrag, Hinweistexte stehen nur hier.

export const MWST_SATZ = 19;
export const NETTO = 'netto';
export const INKL_MWST = 'inkl. MwSt.';
export const PREISHINWEIS = `Alle Preise sind als Endpreis inkl. ${MWST_SATZ} % MwSt. und als Nettopreis angegeben.`;

// Geschütztes Leerzeichen zwischen Betrag und €, damit das Zeichen nie allein umbricht.
const GESCHUETZT = String.fromCodePoint(0x00a0);

// In Cent gerechnet, damit 770 € netto genau 916,30 € ergibt und kein Rundungsrest bleibt.
export const brutto = (netto: number): number => Math.round(netto * (100 + MWST_SATZ)) / 100;

// Ganze Beträge ohne Nachkommastellen, sonst immer mit zwei (416,50 €).
export const euro = (betrag: number): string => {
    const stellen = Number.isInteger(betrag) ? 0 : 2;
    const zahl = betrag.toLocaleString('de-DE', { minimumFractionDigits: stellen, maximumFractionDigits: 2 });
    return `${zahl}${GESCHUETZT}€`;
};

export const euroNetto = (netto: number): string => `${euro(netto)} ${NETTO}`;

export const euroBrutto = (netto: number): string => `${euro(brutto(netto))} ${INKL_MWST}`;

// Für Fließtext: "416,50 € inkl. MwSt. (350 € netto)".
export const preisText = (netto: number): string => `${euroBrutto(netto)} (${euroNetto(netto)})`;
