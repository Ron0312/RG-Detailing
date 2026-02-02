export const siteConfig = {
  metadata: {
    title: "RG Detailing",
    baseTitle: "RG Detailing | Keramikversiegelung & Lackveredelung Schleswig-Holstein",
    description: "RG Detailing: Premium Fahrzeugaufbereitung in Schleswig-Holstein. Zertifizierte Keramikversiegelung & Lackveredelung in Tensfeld. Jetzt Termin vereinbaren!",
    keywords: "Fahrzeugaufbereitung, Autoaufbereitung, Autoreinigung, Innenraumreinigung, KFZ Aufbereitung, Keramikversiegelung, Lackaufbereitung, Leasing Rückgabe, Motorwäsche, Schleswig-Holstein, Bad Segeberg, Neumünster, Tensfeld",
    siteName: "RG Detailing",
    locale: "de_DE",
    geo: {
      region: "DE-SH",
      placename: "Tensfeld",
      position: "54.04500;10.31917",
      icbm: "54.04500, 10.31917"
    }
  },
  company: {
    name: "RG Detailing",
    slogan: "Car Processing",
    description: "Premium Fahrzeugaufbereitung, Keramikversiegelung und Lackveredelung für Schleswig-Holstein. Wir bringen den Neuwagen-Glanz zurück.",
    logo: "/logo.png", // Assuming this will be handled via import in components, but string reference for now
    address: {
      street: "Dorfstraße 11",
      zip: "23824",
      city: "Tensfeld",
      country: "Deutschland",
      mapsLink: "https://www.google.com/maps?ll=54.041087,10.321787&z=13&t=m&hl=de-DE&gl=US&mapclient=embed&cid=8746412923922866124"
    },
    contact: {
      phone: "+491633845081",
      phoneFormatted: "0163 38 45 08 1",
      email: "kontakt@rg-detailing.de",
      whatsapp: "https://wa.me/491633845081"
    },
    social: {
      youtube: "https://www.youtube.com/channel/UC-_u0Tc9YmcniT7Q93XPRwg",
      spotify: "https://open.spotify.com/show/63m3iI02yHqeENGb2CtBwa?si=d07c55fca4b843bc",
      instagram: "https://www.instagram.com/r.g.detailing/"
    }
  },
  navigation: {
    main: [
      { name: "Startseite", href: "/" },
      { name: "Keramikversiegelung", href: "/keramikversiegelung" },
      { name: "Leistungen", href: "/#leistungen" },
      { name: "Galerie", href: "/#gallery" },
      { name: "Preisrechner", href: "/#rechner", highlight: true },
      { name: "Über mich", href: "/#about" },
      { name: "FAQ", href: "/#faq" }
    ],
    footer: {
      service: [
        { name: "Keramikversiegelung", href: "/keramikversiegelung" },
        { name: "Bad Segeberg", href: "/fahrzeugaufbereitung-bad-segeberg" },
        { name: "Kiel", href: "/fahrzeugaufbereitung-kiel" },
        { name: "Lübeck", href: "/fahrzeugaufbereitung-luebeck" },
        { name: "Neumünster", href: "/fahrzeugaufbereitung-neumuenster" },
        { name: "Werterhalt-Garantie", href: "/werterhalt-garantie" },
        { name: "Preisrechner", href: "/#rechner" }
      ],
      legal: [
        { name: "Impressum", href: "/impressum" },
        { name: "Datenschutz", href: "/datenschutz" },
        { name: "AGB", href: "/agb" },
        { name: "Sitemap", href: "/sitemap" },
        { name: "OS-Plattform", href: "https://ec.europa.eu/consumers/odr/", external: true }
      ]
    }
  },
  features: {
    enableParticles: true,
    enableSmoothScroll: true,
    showTopBar: false, // Mobile sticky bar is handled separately
    showReviews: true,
    showCalculator: true,
    showGallery: true
  }
};
