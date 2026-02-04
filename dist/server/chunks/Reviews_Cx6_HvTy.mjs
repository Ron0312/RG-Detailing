import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { c as config, a as calculatePrice } from './pricing_7cSATyqx.mjs';
import { Check, Truck, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { ak as createAstro, c as createComponent, am as maybeRenderHead, e as renderComponent, r as renderTemplate } from './astro/server_BFEvG0-X.mjs';
import 'piccolore';

const STEPS = {
  SIZE: 0,
  CAMPER_LENGTH: 0.5,
  CONDITION: 1,
  PACKAGE: 2,
  RESULT: 3
};
const Spinner = () => /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
  /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
  /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
] });
const StepTitle = ({ children }) => /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-4xl font-bold text-white mb-3 text-center tracking-tight drop-shadow-lg", children });
const StepSubtitle = ({ children }) => /* @__PURE__ */ jsx("p", { className: "text-zinc-400 text-center mb-8 md:mb-10 max-w-lg mx-auto text-base md:text-lg leading-relaxed px-4", children });
const Card = ({ title, desc, price, badge, highlight, onClick, active }) => /* @__PURE__ */ jsxs(
  "button",
  {
    onClick,
    className: `relative p-5 md:p-6 rounded-2xl border transition-all duration-300 w-full text-left group overflow-hidden flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 min-h-[140px] cursor-pointer
            ${active ? "border-red-500 bg-red-900/20 shadow-[0_0_30px_rgba(220,38,38,0.15)] ring-1 ring-red-500/50 scale-[1.02]" : highlight ? "border-yellow-600/30 bg-gradient-to-br from-zinc-900/80 to-yellow-900/10 hover:border-yellow-500/50 hover:bg-zinc-800 hover:scale-[1.02]" : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-red-500/30 hover:scale-[1.02]"}
        `,
    children: [
      /* @__PURE__ */ jsx("div", { className: `absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
            ${active ? "bg-gradient-to-tr from-red-600/10 to-transparent" : "bg-gradient-to-tr from-white/5 to-transparent"}
        ` }),
      badge && /* @__PURE__ */ jsx("div", { className: `absolute top-0 right-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-bl-xl shadow-lg z-10
                ${highlight ? "bg-gradient-to-r from-yellow-600 to-yellow-500 text-black" : "bg-gradient-to-r from-red-700 to-red-600 text-white"}
            `, children: badge }),
      /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between mb-4 relative z-10", children: /* @__PURE__ */ jsx("div", { className: `font-bold text-xl tracking-tight transition-colors ${active ? "text-red-400" : "text-white group-hover:text-red-400"}`, children: title }) }),
      /* @__PURE__ */ jsx("div", { className: "text-zinc-400 text-base md:text-sm leading-relaxed mb-6 flex-grow relative z-10 font-medium", children: desc }),
      price && /* @__PURE__ */ jsxs("div", { className: `mt-auto pt-4 border-t transition-colors ${active ? "border-red-500/20" : "border-white/5 group-hover:border-white/10"} flex justify-between items-center relative z-10`, children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-400 uppercase tracking-wider font-bold", children: "Ab" }),
        /* @__PURE__ */ jsxs("span", { className: `font-bold text-xl tracking-tighter ${highlight ? "text-yellow-500" : "text-red-500"}`, children: [
          price,
          "€"
        ] })
      ] })
    ]
  }
);
const WhatsAppButton = ({ message }) => /* @__PURE__ */ jsxs(
  "a",
  {
    href: `https://wa.me/491633845081?text=${encodeURIComponent(message)}`,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:-translate-y-1 w-full mb-6 group border border-white/10 text-lg active:scale-95",
    children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", viewBox: "0 0 24 24", fill: "currentColor", className: "shrink-0 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx("path", { d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" }) }),
      "Beratung & Termin"
    ]
  }
);
function PriceCalculator() {
  const [step, setStep] = useState(STEPS.SIZE);
  const [selections, setSelections] = useState({
    size: null,
    condition: null,
    package: null,
    camperLength: 6.5
  });
  const [quote, setQuote] = useState(null);
  const [email, setEmail] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preselect = params.get("preselect");
    if (preselect === "camper") {
      handleSelect("size", "camper");
    }
  }, []);
  useEffect(() => {
    if (containerRef.current && step !== STEPS.SIZE) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);
  const handleSelect = (key, value) => {
    let newSelections = { ...selections, [key]: value };
    if (key === "size") {
      if (value === "camper") {
        setSelections(newSelections);
        setStep(STEPS.CAMPER_LENGTH);
        return;
      }
      const params = new URLSearchParams(window.location.search);
      if (params.get("preselect") === "leasing") ;
      setStep(STEPS.CONDITION);
    } else if (key === "condition") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("preselect") === "leasing") {
        const result = calculatePrice("leasing", newSelections.size, value);
        setQuote(result);
        setSelections({ ...newSelections, package: "leasing" });
        setStep(STEPS.RESULT);
        return;
      }
      setStep(STEPS.PACKAGE);
    } else if (key === "package") {
      const result = calculatePrice(value, newSelections.size, newSelections.condition);
      setQuote(result);
      setStep(STEPS.RESULT);
    }
    setSelections(newSelections);
  };
  const handleCamperConfirm = () => {
    const newSelections = { ...selections, condition: "good", package: "all_in_one" };
    const result = calculatePrice("all_in_one", "camper", "good");
    setQuote(result);
    setSelections(newSelections);
    setStep(STEPS.RESULT);
  };
  const submitQuote = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...selections, quote, email, botcheck };
      await fetch("/api/submit-quote", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    }
    setLoading(false);
  };
  const reset = () => {
    setStep(STEPS.SIZE);
    setSelections({ size: null, condition: null, package: null, camperLength: 6.5 });
    setQuote(null);
    setSubmitted(false);
    setEmail("");
    setBotcheck(false);
    window.history.replaceState({}, "", window.location.pathname);
  };
  const renderResult = () => {
    const sizeName = config.sizes[selections.size]?.name;
    const conditionName = config.conditions[selections.condition]?.name;
    const pkg = config.packages[selections.package];
    const packageName = pkg?.name;
    if (quote.isRequestOnly) {
      const meterPrice = 25;
      const washPrice = Math.round(selections.camperLength * meterPrice);
      const message2 = `Hallo RG-Detailing, ich interessiere mich für eine Wohnmobil-Aufbereitung (${selections.camperLength}m). Bitte um Rückruf.`;
      return /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 mb-8 w-full max-w-lg mx-auto relative overflow-hidden shadow-2xl group hover:border-red-500/30 transition-colors duration-500", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl md:text-3xl font-bold text-white mb-6 text-center", children: "Wohnmobil Spezial" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-zinc-950/50 p-6 rounded-2xl border border-white/5 mb-8 text-center shadow-inner", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-zinc-400 text-xs uppercase tracking-widest mb-2 font-bold", children: [
            "Wäsche-Preis (",
            selections.camperLength,
            "m)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold text-white mb-2 tracking-tight", children: [
            washPrice,
            "€"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-zinc-400 mb-6", children: [
            "*Basiswäsche inkl. Dach (ca. ",
            meterPrice,
            "€/m). Politur auf Anfrage."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full my-4" }),
          /* @__PURE__ */ jsxs("div", { className: "text-zinc-300 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { className: "text-red-400 font-bold uppercase tracking-wide text-xs block mb-1", children: "Keramik & Politur" }),
            "Individuelles Angebot nach Besichtigung"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-8", children: /* @__PURE__ */ jsx("div", { className: "flex gap-4 items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-white block mb-0.5", children: "GFK & Gelcoat Schutz" }),
          /* @__PURE__ */ jsx("span", { className: "text-zinc-400", children: "Werterhalt gegen UV-Schäden." })
        ] }) }) }),
        /* @__PURE__ */ jsx(WhatsAppButton, { message: message2 }),
        /* @__PURE__ */ jsx("div", { className: "text-center text-zinc-600 text-xs", children: "Oder E-Mail unten nutzen" })
      ] });
    }
    if (selections.package === "leasing") {
      const message2 = `Hallo RG-Detailing, ich brauche Hilfe bei der Leasing-Rückgabe (${sizeName}). Bitte um Termin zur Vorab-Inspektion.`;
      return /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 mb-8 w-full max-w-lg mx-auto relative overflow-hidden shadow-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 relative z-10", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block py-1.5 px-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(220,38,38,0.2)]", children: "Investition statt Strafe" }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl md:text-4xl font-bold text-white mb-3", children: "Leasing Rettung" }),
          /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Vermeiden Sie teure Nachzahlungen." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-red-900/20 to-transparent border-l-4 border-red-500 p-6 rounded-r-xl mb-8 flex items-start gap-5 relative z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-white text-lg mb-1", children: "Expertentipp" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-zinc-300 leading-relaxed", children: [
            "Ein Kratzer im Protokoll kostet oft 300-600€. Wir entfernen ihn für einen Bruchteil.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-red-400 font-bold mt-1 block", children: "Sparpotenzial: bis zu 70%" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-zinc-400 uppercase tracking-widest font-bold mb-2", children: "Ihre Investition (Sparpotenzial)" }),
          /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold text-white tracking-tighter", children: [
            "~",
            quote.minPrice,
            "€",
            /* @__PURE__ */ jsx("span", { className: "text-lg text-zinc-400 align-top ml-1", children: "*" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(WhatsAppButton, { message: message2 })
      ] });
    }
    const message = `Hallo RG-Detailing, ich habe eine Preisanfrage: ${sizeName}, ${conditionName}, ${packageName}. Schätzung: ${quote.minPrice}-${quote.maxPrice}EUR.`;
    return /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 mb-8 w-full max-w-lg mx-auto relative overflow-hidden shadow-2xl group hover:border-red-500/20 transition-all duration-500", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold tracking-widest uppercase mb-6", children: "Ihre Investition" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-center gap-3 leading-none mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-6xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-2xl", children: [
              quote.minPrice,
              "€"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl md:text-3xl text-zinc-600 font-light", children: [
              "- ",
              quote.maxPrice,
              "€"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-zinc-400 text-xs font-medium tracking-wide", children: "*Alle Preise inkl. MwSt. Endgültiger Preis nach Fahrzeugbesichtigung." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 mb-8 bg-zinc-950/40 p-2 rounded-2xl border border-white/5 shadow-inner", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors", children: [
            /* @__PURE__ */ jsx("span", { className: "text-zinc-400 text-xs uppercase tracking-widest flex items-center gap-3 font-bold", children: "Fahrzeug" }),
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: sizeName })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5 mx-4" }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors", children: [
            /* @__PURE__ */ jsx("span", { className: "text-zinc-400 text-xs uppercase tracking-widest flex items-center gap-3 font-bold", children: "Zustand" }),
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: conditionName })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5 mx-4" }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors", children: [
            /* @__PURE__ */ jsx("span", { className: "text-zinc-400 text-xs uppercase tracking-widest flex items-center gap-3 font-bold", children: "Paket" }),
            /* @__PURE__ */ jsx("span", { className: "text-red-400 font-bold", children: packageName })
          ] })
        ] }),
        pkg?.hasClubAbo && /* @__PURE__ */ jsx("div", { className: "mb-8 bg-gradient-to-br from-yellow-900/20 to-zinc-900 border border-yellow-600/20 p-5 rounded-2xl relative overflow-hidden group/abo", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx("div", { className: "text-yellow-500 font-bold mb-2 flex items-center gap-2 text-xs uppercase tracking-widest", children: "Werterhalt-Garantie" }),
          /* @__PURE__ */ jsxs("p", { className: "text-zinc-300 text-sm leading-relaxed mb-3", children: [
            "Mit diesem Paket qualifizieren Sie sich für unser exklusives ",
            /* @__PURE__ */ jsx("span", { className: "text-white font-bold border-b border-yellow-500/50", children: "Maintenance-Abo" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "text-zinc-400 text-xs space-y-1 mb-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-yellow-500" }),
              " Dauerhafter Neuwagen-Zustand"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-yellow-500" }),
              " Schutz vor Wertverlust"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-yellow-400 font-bold text-lg border-t border-yellow-500/20 pt-2 mt-2", children: "-20% auf alle Nachpflege-Termine." })
        ] }) }),
        /* @__PURE__ */ jsx(WhatsAppButton, { message }),
        /* @__PURE__ */ jsx("div", { className: "text-center text-zinc-600 text-xs", children: "Oder E-Mail unten nutzen" })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-5xl mx-auto my-8 md:my-12", ref: containerRef, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-red-600/20 blur-[100px] rounded-full pointer-events-none opacity-50 mix-blend-screen animate-pulse" }),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-zinc-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 p-3 md:p-12 scroll-mt-32 ring-1 ring-black/5", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-12 md:mb-16 relative px-4 max-w-3xl mx-auto mt-6 md:mt-0", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-5 right-5 md:left-6 md:right-6 -translate-y-1/2 h-1 bg-white/5 -z-10 rounded-full", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-0 left-0 h-full bg-gradient-to-r from-red-800 to-red-500 rounded-full transition-all duration-700 ease-out",
            style: { width: `${(step >= STEPS.RESULT ? 1 : step / 3) * 100}%` },
            children: /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-400 rounded-full blur-[4px] shadow-[0_0_10px_rgba(248,113,113,0.8)]" })
          }
        ) }),
        [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 md:gap-3 z-10", children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-500 border-4
                                    ${step >= i ? "bg-zinc-900 text-white border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] scale-110" : "bg-zinc-900 text-zinc-600 border-zinc-800"}
                                `, children: step > i ? /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" }) : i + 1 }),
          /* @__PURE__ */ jsx("div", { className: `text-[8px] md:text-[10px] uppercase tracking-wider md:tracking-widest font-bold transition-colors duration-300 block
                                    ${step >= i ? "text-white" : "text-zinc-700"}
                                `, children: ["Größe", "Zustand", "Paket", "Ergebnis"][i] })
        ] }, i))
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-h-[400px] transition-all duration-500 ease-in-out", children: [
        step === STEPS.SIZE && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
          /* @__PURE__ */ jsx(StepTitle, { children: "Fahrzeug wählen" }),
          /* @__PURE__ */ jsx(StepSubtitle, { children: "Starten wir mit der Größe Ihres Fahrzeugs." }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6", children: Object.entries(config.sizes).map(([key, size]) => /* @__PURE__ */ jsx(
            Card,
            {
              title: size.name,
              desc: size.isRequestOnly ? "Spezialangebot für Camper & Caravans" : `z.B. ${key === "small" ? "Polo, Corsa" : key === "medium" ? "Golf, 3er, A4" : "X5, Q7, T-Bus"}`,
              onClick: () => handleSelect("size", key),
              active: selections.size === key,
              icon: key === "camper" ? Truck : null
            },
            key
          )) })
        ] }),
        step === STEPS.CAMPER_LENGTH && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
          /* @__PURE__ */ jsx(StepTitle, { children: "Fahrzeuglänge" }),
          /* @__PURE__ */ jsx(StepSubtitle, { children: "Bitte geben Sie die Länge in Metern an (inkl. Deichsel/Aufbau)." }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto bg-black/40 p-6 md:p-10 rounded-3xl border border-white/10 shadow-xl backdrop-blur-md", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-7xl font-bold text-white mb-2 tracking-tighter tabular-nums", children: [
                selections.camperLength,
                "m"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-zinc-400 font-medium", children: "Gesamtlänge" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative mb-12 px-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: "4",
                  max: "8",
                  step: "0.5",
                  value: selections.camperLength,
                  onChange: (e) => setSelections({ ...selections, camperLength: parseFloat(e.target.value) }),
                  className: "w-full h-8 md:h-3 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-red-600 hover:accent-red-500 transition-all touch-none",
                  style: { backgroundImage: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(selections.camperLength - 4) / 4 * 100}%, #27272a ${(selections.camperLength - 4) / 4 * 100}%, #27272a 100%)` }
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-zinc-400 text-xs mt-4 font-bold uppercase tracking-wider", children: [
                /* @__PURE__ */ jsx("span", { children: "4m" }),
                /* @__PURE__ */ jsx("span", { children: "6m" }),
                /* @__PURE__ */ jsx("span", { children: "8m" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleCamperConfirm,
                className: "w-full bg-red-600 hover:bg-red-500 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95",
                children: [
                  "Weiter zur Berechnung ",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxs("button", { onClick: () => setStep(STEPS.SIZE), className: "text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mx-auto text-sm font-medium uppercase tracking-widest group", children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "rotate-180 w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            " Zurück"
          ] }) })
        ] }),
        step === STEPS.CONDITION && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
          /* @__PURE__ */ jsx(StepTitle, { children: "Lackzustand" }),
          /* @__PURE__ */ jsx(StepSubtitle, { children: "Wie würden Sie den aktuellen Zustand beschreiben?" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6", children: Object.entries(config.conditions).map(([key, cond]) => /* @__PURE__ */ jsx(
            Card,
            {
              title: cond.name,
              desc: key === "good" ? "Liebhaber-Fahrzeug. Handwäsche, kaum Defekte." : key === "normal" ? "Alltags-Spuren. Waschstraßen-Kratzer, Grauschleier." : "Härtefall. Tierhaare, Baustellen-Staub, starke Kratzer.",
              onClick: () => handleSelect("condition", key),
              active: selections.condition === key
            },
            key
          )) }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxs("button", { onClick: () => setStep(STEPS.SIZE), className: "text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mx-auto text-sm font-medium uppercase tracking-widest group", children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "rotate-180 w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            " Zurück"
          ] }) })
        ] }),
        step === STEPS.PACKAGE && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
          /* @__PURE__ */ jsx(StepTitle, { children: "Paketwahl" }),
          /* @__PURE__ */ jsx(StepSubtitle, { children: "Wählen Sie Ihre gewünschte Leistungsklasse." }),
          /* @__PURE__ */ jsx("div", { className: "bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-6 flex items-start gap-4 max-w-2xl mx-auto", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-red-400 font-bold text-sm uppercase tracking-wide mb-1", children: "Alles Inklusive Philosophie" }),
            /* @__PURE__ */ jsx("p", { className: "text-zinc-300 text-sm leading-relaxed", children: "Wir verzichten auf komplizierte Baukästen. In allen Paketen sind Lederpflege, Textilreinigung und Fleckenentfernung bereits inklusive. Der Preis deckt alles ab, was Ihr Fahrzeug benötigt." })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6", children: Object.entries(config.packages).map(([key, pkg]) => /* @__PURE__ */ jsx(
            Card,
            {
              title: pkg.name,
              desc: pkg.description,
              price: pkg.basePrice,
              badge: pkg.badge,
              highlight: pkg.highlight,
              onClick: () => handleSelect("package", key),
              active: selections.package === key
            },
            key
          )) }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxs("button", { onClick: () => setStep(STEPS.CONDITION), className: "text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mx-auto text-sm font-medium uppercase tracking-widest group", children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "rotate-180 w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            " Zurück"
          ] }) })
        ] }),
        step === STEPS.RESULT && !submitted && quote && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
          renderResult(),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitQuote, className: "max-w-lg mx-auto bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                name: "botcheck",
                className: "hidden",
                style: { display: "none" },
                checked: botcheck,
                onChange: (e) => setBotcheck(e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("h4", { className: "text-white font-bold mb-6 text-center text-xl", children: "Angebot sichern" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 flex-col", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { htmlFor: "email-input", className: "block text-sm font-medium text-zinc-400 mb-2 pl-1", children: [
                  "Ihre E-Mail Adresse ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "email-input",
                    type: "email",
                    required: true,
                    placeholder: "z.B. max@mustermann.de",
                    className: "w-full bg-zinc-950/50 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:opacity-50 transition-all placeholder:text-zinc-600 text-lg",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    disabled: loading
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: loading,
                  className: "w-full bg-zinc-100 hover:bg-white text-black px-6 py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 whitespace-nowrap border border-transparent hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg text-lg active:scale-95",
                  children: loading ? /* @__PURE__ */ jsx(Spinner, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    "Angebot anfordern ",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold px-3 py-1 rounded-full mb-2 animate-pulse", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-red-500 rounded-full" }),
                "Hohe Nachfrage im ",
                (/* @__PURE__ */ new Date()).toLocaleString("de-DE", { month: "long" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-zinc-400 leading-normal", children: [
                "Ihre Daten werden vertraulich behandelt. ",
                /* @__PURE__ */ jsx("br", {}),
                "Mit dem Absenden stimmen Sie der ",
                /* @__PURE__ */ jsx("a", { href: "/datenschutz", className: "text-zinc-400 underline hover:text-white", children: "Datenschutzerklärung" }),
                " zu."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxs("button", { onClick: () => {
            if (selections.size === "camper") setStep(STEPS.CAMPER_LENGTH);
            else setStep(STEPS.PACKAGE);
          }, className: "text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mx-auto text-sm font-medium uppercase tracking-widest group", children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "rotate-180 w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            " Korrigieren"
          ] }) })
        ] }),
        step === STEPS.RESULT && submitted && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in text-center py-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-green-500/20 blur-xl rounded-full" }),
            /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)] relative z-10", children: /* @__PURE__ */ jsx(Check, { className: "w-12 h-12" }) })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-4xl font-bold text-white mb-6 tracking-tight", children: "Anfrage erfolgreich!" }),
          /* @__PURE__ */ jsx("p", { className: "text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed text-lg", children: "Wir haben Ihre Konfiguration erhalten. Ein Mitarbeiter wird sich in Kürze mit Ihrem persönlichen Angebot bei Ihnen melden." }),
          /* @__PURE__ */ jsxs("div", { className: "bg-zinc-800/50 p-6 rounded-2xl border border-white/10 max-w-lg mx-auto mb-12 text-sm text-zinc-300", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4 font-bold text-white", children: "Schneller zum Termin?" }),
            /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Da E-Mails manchmal im Spam landen können, melden Sie sich gerne direkt per WhatsApp oder Anruf bei uns, falls Sie innerhalb von 24h keine Antwort erhalten." }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://wa.me/491633845081",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-2 text-[#25D366] font-bold hover:underline",
                children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" }) }),
                  "WhatsApp schreiben"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: reset, className: "px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10 font-bold uppercase tracking-wider text-sm hover:border-white/20 active:scale-95", children: "Neue Berechnung" })
        ] })
      ] })
    ] })
  ] });
}

const reviewsData = [
	{
		name: "Ro My",
		date: "vor 4 Wochen",
		stars: 5,
		text: "Mein über 20 Jahre altes Auto wurde über Monate stark beansprucht und überwiegend als reines Nutzfahrzeug genutzt. Die Fahrzeugaufbereitung bei Remo hat das vollständig verändert. Mit außergewöhnlicher Präzision, handwerklichem Geschick und einem sehr hohen Qualitätsanspruch wurde mein Auto innen wie außen aufbereitet. Das Ergebnis ist ein Glanz und eine Wertigkeit, die man einem Fahrzeug dieses Alters kaum zutraut."
	},
	{
		name: "Nick Saggau",
		date: "vor 5 Monaten",
		stars: 5,
		text: "Ich bin absolut begeistert vom Ergebnis der Keramikversiegelung! Meine Alpine sieht nicht nur aus wie frisch aus dem Showroom, sondern fühlt sich auch genauso an. Der Service war professionell, freundlich und termingerecht. Man merkt sofort, dass hier mit Leidenschaft und Know-how gearbeitet wird."
	},
	{
		name: "Holger Hassforth",
		date: "vor 2 Jahren",
		stars: 5,
		text: "Remo hat mein Motorrad absolut perfekt aufbereitet. Super professionell. Tag drauf ging die Adventure zur Inspektion zu KTM. Zitat des Meisters:,, Sieht mit ihren 9 Jahren ja noch aus wie aus dem Laden.\" Danke Remo 👍"
	},
	{
		name: "Sabrina Lange",
		date: "vor einem Jahr",
		stars: 5,
		text: "Ich habe bei Remo eine Keramikversiegelung inklusive Scheiben und Felgen machen lassen. Remo hat mich währenddessen mit regelmäßigen Videos, Bildern und kurzen Zwischenberichten immer auf dem aktuellen Stand gehalten. Ich war begeistert, mit wie viel Liebe zum Detail Remo sich meinem Auto gewidmet hat! Sei es, dass er quasi unter meinem Auto lag, um auch an die hinterste Ecke zu kommen."
	},
	{
		name: "Mila Edrlt",
		date: "vor 2 Jahren",
		stars: 5,
		text: "Ich kann die Dienstleistungen von Remo absolut weiterempfehlen! Wir waren bei ihm, weil unser Leasingwagen in Kürze zurück zum Autohaus geht und er nochmal etwas aufbereitet werden sollte. Und was soll ich sagen? Ich habe das Auto sauberer abgeholt, als damals vom Autohaus bei der Auslieferung 🤩👌🏽 DANKE!"
	},
	{
		name: "Christiane Hinz",
		date: "vor 10 Monaten",
		stars: 5,
		text: "Habe meinem \"hundeversautem\" Kona mal einen Profi gegönnt 😁👍. Top Beratung, top Arbeit... Jederzeit gerne wieder, wenn es mal keinen Hund mehr gibt 😉und länger anhält 🙃"
	},
	{
		name: "David Staub",
		date: "vor einem Jahr",
		stars: 5,
		text: "Remo hält was er verspricht!!! Absolut professionelle Beratung und Bearbeitung. Mein Auto von innen und das Auto meiner Frau innen und außen wirklich toll aufbereitet. Preis und Leistung stehen absolut im Verhältnis. Buchungen für nächstes Jahr sind Sicher."
	},
	{
		name: "Ka Hi",
		date: "vor 3 Jahren",
		stars: 5,
		text: "Ich habe meinen Neuwagen Keramik versiegeln lassen. Mein Auto sah danach besser aus als nach dem Kauf. Sehr saubere Arbeit. Ich kann R. G. Detailing weiterempfehlen. Werde auf jeden Fall wiederkommen."
	},
	{
		name: "Christian Sous",
		date: "vor einem Jahr",
		stars: 5,
		text: "Mein Passat wurde von Remo mit einer One-Step-Politur behandelt und das Ergebnis ist einfach top! Remo hat nicht nur hervorragende Arbeit geleistet, sondern war auch super sympathisch und professionell. Wenn man zwischendurch mal Tipps zur Fahrzeugpflege und die dafür gebrauchten Produkte braucht, konnte man sich ebenfalls jederzeit bei ihm erkundigen."
	},
	{
		name: "Olaf C",
		date: "vor einem Jahr",
		stars: 5,
		text: "Habe mein Motorrad hier zum Verkauf aufarbeiten lassen und bin immernoch begeistert vom Einsatz und Umgang mit mir und meiner Maschine. Weiter so, wir brauchen mehr von so ambitionierten Unternehmern!"
	},
	{
		name: "Stefan Mohrdieck",
		date: "vor 9 Monaten",
		stars: 5,
		text: "Was soll ich sagen , mir fehlen einfach die Worte. Was für eine Fleissarbeit. Hatte bei Remo mein neues Mercedes Cabrio zur Keramikversiegelung. Der Wagen ist überhaupt nicht wieder zu erkennen solch tolle Arbeit wurde abgeliefert und das alles zu einem fairen Preis."
	},
	{
		name: "Saskia Wittke",
		date: "vor 2 Monaten",
		stars: 5,
		text: "Top Service! Mein Auto sieht nach dem Winterpaket fast aus wie neu. Super freundlich, schnell, sehr professionell und absolut empfehlenswert."
	},
	{
		name: "Car Detailing by Daniel Kampmann",
		date: "vor 11 Monaten",
		stars: 5,
		text: "Angenehmer Berufskollege, sehr arrangiert und auf jeden Fall empfehlenswert! Ihr werdet begeistert sein..."
	}
];

const reviews = reviewsData;

const $$Astro = createAstro("https://rg-detailing.de");
const $$Reviews = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Reviews;
  const { limit } = Astro2.props;
  const displayedReviews = limit ? reviews.slice(0, limit) : reviews;
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-zinc-950 border-t border-zinc-900"> <div class="container mx-auto px-4"> <div class="text-center mb-12"> <span class="text-red-500 font-bold tracking-widest text-sm uppercase block mb-4">Echte Ergebnisse</span> <h2 class="text-3xl md:text-5xl font-bold mb-6 text-white">Vertraut von über 100 Kunden</h2> <div class="flex justify-center items-center gap-2 mb-4"> <div class="flex text-yellow-500 gap-1"> ${renderComponent($$result, "Star", Star, { "className": "w-6 h-6 fill-current" })} ${renderComponent($$result, "Star", Star, { "className": "w-6 h-6 fill-current" })} ${renderComponent($$result, "Star", Star, { "className": "w-6 h-6 fill-current" })} ${renderComponent($$result, "Star", Star, { "className": "w-6 h-6 fill-current" })} ${renderComponent($$result, "Star", Star, { "className": "w-6 h-6 fill-current" })} </div> <span class="text-zinc-400 font-medium">5,0 (47 Bewertungen)</span> </div> <p class="text-zinc-400 max-w-2xl mx-auto">Echte Meinungen von Kunden aus Tensfeld, Bad Segeberg und Umgebung.</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> ${displayedReviews.map((review) => renderTemplate`<div class="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg hover:border-zinc-700 transition"> <div class="flex items-center gap-3 mb-4"> <div class="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white font-bold"> ${review.name.charAt(0)} </div> <div> <div class="font-bold text-white text-sm">${review.name}</div> <div class="text-zinc-400 text-xs">${review.date}</div> </div> </div> <div class="flex text-yellow-500 mb-3 gap-0.5"> ${Array.from({ length: review.stars }).map(() => renderTemplate`${renderComponent($$result, "Star", Star, { "className": "w-4 h-4 fill-current" })}`)} </div> <p class="text-zinc-300 text-sm leading-relaxed line-clamp-6">
"${review.text}"
</p> </div>`)} </div> <div class="text-center mt-12"> <a href="https://www.google.com/search?q=RG+Detailing+Tensfeld#lrd=0x47b2299999999999:0x9999999999999999,1,,," target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition"> <span>Alle Bewertungen auf Google lesen</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> </a> </div> </div> </section>`;
}, "/app/src/components/Reviews.astro", void 0);

export { $$Reviews as $, PriceCalculator as P };
