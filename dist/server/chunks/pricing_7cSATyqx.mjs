const basePrice = 0;
const sizes = {"small":{"name":"Kleinwagen","multiplier":1},"medium":{"name":"Limousine / Kombi","multiplier":1.2},"large":{"name":"SUV / Bus","multiplier":1.4},"camper":{"name":"Wohnmobil / Caravan","multiplier":null,"isRequestOnly":true}};
const conditions = {"good":{"name":"Gepflegt","multiplier":1},"normal":{"name":"Normal (Alltag)","multiplier":1.1},"bad":{"name":"Stark verschmutzt / Tierhaare","multiplier":1.3}};
const packages = {"wash_interior":{"name":"Basis Aufbereitung","basePrice":350,"description":"Hygienische Tiefenreinigung (Trockendampf) & Außenwäsche. Inklusive Polster- & Lederreinigung.","badge":"Einstieg"},"leasing":{"name":"Leasing Rückgabe","basePrice":400,"description":"Minimierung von Nachzahlungen. Komplette Aufbereitung innen & außen nach Rückgabe-Standards.","badge":"Spar-Tipp"},"all_in_one":{"name":"Premium Aufbereitung","basePrice":500,"description":"Das Rundum-Sorglos-Paket: Tiefenreinigung, Lederpflege, Hochglanzpolitur & Versiegelung. Ideal für Verkauf & Werterhalt.","badge":"Bestseller","highlight":true},"full_detailing":{"name":"High-End Detailing","basePrice":800,"description":"Mehrstufige Defektkorrektur & Keramikversiegelung. Maximale Perfektion & Langzeitschutz.","badge":"Königsklasse","hasClubAbo":true}};
const config = {
  basePrice,
  sizes,
  conditions,
  packages,
};

function calculatePrice(packageId, sizeId, conditionId) {
  if (!config.packages[packageId] || !config.sizes[sizeId] || !config.conditions[conditionId]) {
    throw new Error("Invalid selection parameters");
  }
  const pkg = config.packages[packageId];
  const size = config.sizes[sizeId];
  const cond = config.conditions[conditionId];
  if (size.isRequestOnly) {
    return {
      minPrice: 0,
      maxPrice: 0,
      packageId,
      sizeId,
      conditionId,
      isRequestOnly: true
    };
  }
  const sizeMult = size.multiplier;
  const condMult = cond.multiplier;
  const calculatedBase = pkg.basePrice * sizeMult * condMult;
  const minPrice = Math.round(calculatedBase / 10) * 10;
  const maxPrice = Math.round(minPrice * 1.15 / 10) * 10;
  return {
    minPrice,
    maxPrice,
    packageId,
    sizeId,
    conditionId,
    isRequestOnly: false
  };
}

export { calculatePrice as a, config as c };
