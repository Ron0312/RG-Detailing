import React, { useState, useRef, useEffect } from 'react';
import { calculatePrice } from '../lib/pricing';
import config from '../lib/pricingConfig.json';
import { Check, Star, Shield, Truck, Sparkles, ArrowRight, Info } from 'lucide-react';

const STEPS = {
    SIZE: 0,
    CONDITION: 1,
    PACKAGE: 2,
    RESULT: 3
};

const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default function PriceCalculator() {
    const [step, setStep] = useState(STEPS.SIZE);
    const [selections, setSelections] = useState({
        size: null,
        condition: null,
        package: null
    });
    const [quote, setQuote] = useState(null);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const containerRef = useRef(null);

    // Auto-scroll to top of calculator when step changes
    useEffect(() => {
        if (containerRef.current && step !== STEPS.SIZE) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [step]);

    const handleSelect = (key, value) => {
        let newSelections = { ...selections, [key]: value };

        if (key === 'size') {
            if (value === 'camper') {
                // Camper Special Flow
                // We set dummy values for condition/package to satisfy the calculator logic,
                // but the UI will handle the specific Camper display.
                newSelections = { ...newSelections, condition: 'good', package: 'all_in_one' };
                const result = calculatePrice('all_in_one', 'camper', 'good');
                setQuote(result);
                setSelections(newSelections);
                setStep(STEPS.RESULT);
                return;
            }
            setStep(STEPS.CONDITION);
        } else if (key === 'condition') {
            setStep(STEPS.PACKAGE);
        } else if (key === 'package') {
            const result = calculatePrice(value, newSelections.size, newSelections.condition);
            setQuote(result);
            setStep(STEPS.RESULT);
        }

        setSelections(newSelections);
    };

    const submitQuote = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800)); // Sim delay
            // In a real app, this would hit an API endpoint
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setSubmitted(true);
        }
        setLoading(false);
    };

    const reset = () => {
        setStep(STEPS.SIZE);
        setSelections({ size: null, condition: null, package: null });
        setQuote(null);
        setSubmitted(false);
        setEmail('');
    };

    const StepTitle = ({ children }) => (
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">{children}</h3>
    );

    const StepSubtitle = ({ children }) => (
        <p className="text-zinc-400 text-center mb-8 max-w-lg mx-auto">{children}</p>
    );

    const Card = ({ title, desc, price, badge, highlight, onClick, active, icon: Icon }) => (
        <button
            onClick={onClick}
            className={`relative p-6 rounded-xl border-2 transition-all w-full text-left group overflow-hidden flex flex-col h-full
                ${active
                    ? 'border-red-500 bg-red-900/10 ring-1 ring-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.2)]'
                    : highlight
                        ? 'border-yellow-600/50 bg-gradient-to-br from-zinc-900 to-yellow-900/10 hover:border-yellow-500 hover:bg-zinc-800'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800'
                }
            `}
        >
            {badge && (
                <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl shadow-lg
                    ${highlight ? 'bg-yellow-500 text-black' : 'bg-red-600 text-white'}
                `}>
                    {badge}
                </div>
            )}

            <div className="flex items-start justify-between mb-3">
                <div className={`font-bold text-lg group-hover:text-red-400 transition-colors ${active ? 'text-red-400' : 'text-white'}`}>
                    {title}
                </div>
                {Icon && <Icon className={`w-5 h-5 ${active ? 'text-red-500' : 'text-zinc-600 group-hover:text-red-400'}`} />}
            </div>

            <div className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow">{desc}</div>

            {price && (
                <div className={`mt-auto pt-4 border-t ${active ? 'border-red-500/30' : 'border-white/5'} flex justify-between items-center`}>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Ab</span>
                    <span className={`font-bold text-lg ${highlight ? 'text-yellow-500' : 'text-red-500'}`}>{price}€</span>
                </div>
            )}
        </button>
    );

    const renderResult = () => {
        const sizeName = config.sizes[selections.size]?.name;
        const conditionName = config.conditions[selections.condition]?.name;
        const pkg = config.packages[selections.package];
        const packageName = pkg?.name;

        // Helper for WhatsApp Button
        const WhatsAppButton = ({ message }) => (
            <a
                href={`https://wa.me/491633845081?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-4 rounded-xl font-bold transition shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transform hover:-translate-y-1 w-full mb-6 group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 group-hover:scale-110 transition-transform"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                Beratung & Termin
            </a>
        );

        // --- CASE 1: CAMPER / WOHNMOBIL ---
        if (quote.isRequestOnly) {
            const message = `Hallo RG-Detailing, ich interessiere mich für eine Wohnmobil-Aufbereitung. Bitte um Rückruf für ein individuelles Angebot.`;
            return (
                 <div className="bg-zinc-900/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-red-900/30 mb-8 w-full max-w-lg mx-auto relative overflow-hidden shadow-2xl">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Wohnmobil Spezial</div>

                    <div className="space-y-4 mb-8">
                        <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
                            <Shield className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-white">GFK & Gelcoat Schutz</h4>
                                <p className="text-zinc-400 text-sm">Spezialbehandlung gegen Auskreiden und UV-Schäden. Werterhalt für Ihr Fahrzeug.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
                            <Sparkles className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-white">Dampftec Hygiene</h4>
                                <p className="text-zinc-400 text-sm">Chemiefreie Tiefenreinigung der Polster. Tötet Sporen und verhindert Schimmel.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
                            <Info className="w-6 h-6 text-zinc-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-white">Preisstruktur</h4>
                                <p className="text-zinc-400 text-sm">
                                    <span className="block">• Wäsche: ab 15-20€ pro lfd. Meter</span>
                                    <span className="block">• Keramik/Politur: Individuell nach Besichtigung</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <WhatsAppButton message={message} />
                    <div className="text-center text-zinc-500 text-sm">Oder E-Mail unten nutzen</div>
                </div>
            )
        }

        // --- CASE 2: LEASING ---
        if (selections.package === 'leasing') {
             const message = `Hallo RG-Detailing, ich brauche Hilfe bei der Leasing-Rückgabe (${sizeName}). Bitte um Termin zur Vorab-Inspektion.`;
             return (
                <div className="bg-zinc-900/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-red-900/30 mb-8 w-full max-w-lg mx-auto relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Shield className="w-32 h-32 text-red-500" />
                    </div>

                    <div className="text-center mb-8 relative z-10">
                         <span className="inline-block py-1 px-3 rounded-full bg-red-900/30 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-4">
                            Investition statt Strafe
                        </span>
                        <div className="text-3xl font-bold text-white mb-2">Leasing Rettung</div>
                        <p className="text-zinc-400">Vermeiden Sie teure Nachzahlungen bei der Rückgabe.</p>
                    </div>

                    <div className="bg-gradient-to-r from-red-900/20 to-zinc-900 border border-red-500/20 p-5 rounded-xl mb-8 flex items-center gap-4 relative z-10">
                        <div className="text-3xl">💡</div>
                        <div>
                            <div className="font-bold text-white">Wussten Sie schon?</div>
                            <div className="text-sm text-zinc-300">
                                Ein Kratzer im Protokoll kostet oft 300-600€. Wir entfernen ihn für einen Bruchteil.
                                <br/><span className="text-red-400 font-bold">Sparpotenzial: bis zu 70%</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <div className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Geschätzte Investition</div>
                        <div className="text-4xl font-bold text-white">~400€*</div>
                        <div className="text-xs text-zinc-600 mt-1">*Variabel je nach Schadenbild. Verbindlicher Preis nach Check.</div>
                    </div>

                    <WhatsAppButton message={message} />
                </div>
             );
        }

        // --- CASE 3: STANDARD (Wash, All-in-One, Full) ---
        const message = `Hallo RG-Detailing, ich habe eine Preisanfrage: ${sizeName}, ${conditionName}, ${packageName}. Schätzung: ${quote.minPrice}-${quote.maxPrice}EUR.`;

        return (
            <div className="bg-zinc-900/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-red-900/30 mb-8 w-full max-w-lg mx-auto relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 to-transparent pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <span className="inline-block py-1 px-3 rounded-full bg-red-900/20 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-4">
                            Ihre Investition
                        </span>
                        <div className="flex items-end justify-center gap-2 leading-none mb-2">
                             <div className="text-5xl md:text-6xl font-bold text-white tracking-tight">{quote.minPrice}€</div>
                             <div className="text-xl md:text-2xl text-zinc-500 mb-2 font-medium">- {quote.maxPrice}€</div>
                        </div>
                        <div className="text-zinc-500 text-xs">*Endgültiger Preis nach Fahrzeugbesichtigung</div>
                    </div>

                    <div className="flex flex-col gap-3 mb-8 bg-zinc-950/50 p-5 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <span className="text-zinc-500 text-xs uppercase tracking-wider flex items-center gap-2"><Truck className="w-3 h-3"/> Fahrzeug</span>
                            <span className="text-white font-medium">{sizeName}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <span className="text-zinc-500 text-xs uppercase tracking-wider flex items-center gap-2"><Sparkles className="w-3 h-3"/> Zustand</span>
                            <span className="text-white font-medium">{conditionName}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                            <span className="text-zinc-500 text-xs uppercase tracking-wider flex items-center gap-2"><Star className="w-3 h-3"/> Paket</span>
                            <span className="text-red-400 font-bold">{packageName}</span>
                        </div>
                    </div>

                    {pkg?.hasClubAbo && (
                         <div className="mb-8 bg-gradient-to-r from-yellow-900/20 to-zinc-900 border border-yellow-700/30 p-4 rounded-xl relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 text-yellow-500/10 rotate-12">
                                <Star className="w-24 h-24" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-yellow-500 font-bold mb-1 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    <Star className="w-4 h-4 fill-yellow-500" /> Werterhalt-Garantie
                                </div>
                                <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
                                    Mit diesem Paket qualifizieren Sie sich für das <span className="text-white font-bold">exklusive Maintenance-Abo</span>:
                                    Sichern Sie sich <span className="text-yellow-400 font-bold">-20%</span> auf die regelmäßige Pflege.
                                </p>
                            </div>
                        </div>
                    )}

                    <WhatsAppButton message={message} />
                    <div className="text-center text-zinc-500 text-sm">Oder E-Mail unten nutzen</div>
                </div>
            </div>
        );
    };

    return (
        <div ref={containerRef} className="w-full max-w-4xl mx-auto bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 p-4 md:p-8 scroll-mt-32">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 relative px-4 md:px-12">
                <div className="absolute top-1/2 left-4 right-4 md:left-12 md:right-12 h-1 bg-zinc-800 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                     <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>
                {[0, 1, 2, 3].map(i => (
                    <div key={i} className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-500 relative z-10
                        ${step >= i ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-110' : 'bg-zinc-800 text-zinc-600 border border-zinc-700'}
                    `}>
                        {i + 1}
                        {step === i && <div className="absolute -inset-2 rounded-full border border-red-500/30 animate-ping"></div>}
                    </div>
                ))}
            </div>

            {/* Steps */}
            <div className="min-h-[400px]">
                {step === STEPS.SIZE && (
                    <div className="animate-fade-in">
                        <StepTitle>Fahrzeuggröße wählen</StepTitle>
                        <StepSubtitle>Wählen Sie die passende Kategorie für Ihr Fahrzeug.</StepSubtitle>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(config.sizes).map(([key, size]) => (
                                <Card
                                    key={key}
                                    title={size.name}
                                    desc={size.isRequestOnly ? "Spezialangebot für Camper & Caravans" : `z.B. ${key === 'small' ? 'Polo, Corsa' : key === 'medium' ? 'Golf, 3er, A4' : 'X5, Q7, T-Bus'}`}
                                    onClick={() => handleSelect('size', key)}
                                    active={selections.size === key}
                                    icon={key === 'camper' ? Truck : null}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {step === STEPS.CONDITION && (
                    <div className="animate-fade-in">
                        <StepTitle>Lackzustand bewerten</StepTitle>
                        <StepSubtitle>Ehrliche Einschätzung hilft uns bei der Kalkulation.</StepSubtitle>
                        <div className="grid md:grid-cols-3 gap-4">
                             {Object.entries(config.conditions).map(([key, cond]) => (
                                <Card
                                    key={key}
                                    title={cond.name}
                                    desc={key === 'good' ? 'Wenig Kratzer, regelmäßige Pflege' : key === 'normal' ? 'Typische Waschstraßen-Spuren' : 'Tiefe Kratzer, starke Verschmutzung'}
                                    onClick={() => handleSelect('condition', key)}
                                    active={selections.condition === key}
                                />
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button onClick={() => setStep(STEPS.SIZE)} className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                                <ArrowRight className="rotate-180 w-4 h-4" /> Zurück
                            </button>
                        </div>
                    </div>
                )}

                {step === STEPS.PACKAGE && (
                    <div className="animate-fade-in">
                        <StepTitle>Gewünschtes Ergebnis</StepTitle>
                        <StepSubtitle>Vom hygienischen Innenraum bis zur High-End Keramik.</StepSubtitle>
                        <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(config.packages).map(([key, pkg]) => (
                                <Card
                                    key={key}
                                    title={pkg.name}
                                    desc={pkg.description}
                                    price={pkg.basePrice}
                                    badge={pkg.badge}
                                    highlight={pkg.highlight}
                                    onClick={() => handleSelect('package', key)}
                                    active={selections.package === key}
                                    icon={pkg.hasClubAbo ? Star : pkg.name.includes('Leasing') ? Shield : Sparkles}
                                />
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button onClick={() => setStep(STEPS.CONDITION)} className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                                <ArrowRight className="rotate-180 w-4 h-4" /> Zurück
                            </button>
                        </div>
                    </div>
                )}

                {step === STEPS.RESULT && !submitted && quote && (
                    <div className="animate-fade-in">
                        {renderResult()}

                        <form onSubmit={submitQuote} className="max-w-md mx-auto bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                             <h4 className="text-white font-bold mb-4 text-center">Angebot per E-Mail erhalten</h4>
                            <div className="flex gap-2 flex-col sm:flex-row">
                                <input
                                    type="email"
                                    required
                                    placeholder="Ihre E-Mail Adresse"
                                    className="flex-grow bg-zinc-950 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:opacity-50 transition-all placeholder:text-zinc-600"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50 whitespace-nowrap border border-zinc-700 hover:border-zinc-600 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Spinner /> : <>Absenden <ArrowRight className="w-4 h-4" /></>}
                                </button>
                            </div>
                            <p className="text-[10px] text-zinc-600 mt-3 text-center">
                                Ihre Daten werden vertraulich behandelt. Mit dem Absenden stimmen Sie der <a href="/datenschutz" className="text-zinc-500 underline hover:text-zinc-400">Datenschutzerklärung</a> zu.
                            </p>
                        </form>
                        <div className="mt-8 text-center">
                            <button onClick={() => {
                                // If camper, go back to size. Else go back to package
                                if (selections.size === 'camper') setStep(STEPS.SIZE);
                                else setStep(STEPS.PACKAGE);
                            }} className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                                <ArrowRight className="rotate-180 w-4 h-4" /> Zurück zur Auswahl
                            </button>
                        </div>
                    </div>
                )}

                {step === STEPS.RESULT && submitted && (
                    <div className="animate-fade-in text-center py-12">
                        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                            <Check className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Anfrage versendet!</h3>
                        <p className="text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
                            Vielen Dank für Ihr Vertrauen. Wir haben Ihre Daten erhalten und melden uns in Kürze bei Ihnen (meist innerhalb von 24h).
                        </p>
                        <button onClick={reset} className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition border border-zinc-700 font-medium">
                            Neue Berechnung starten
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
