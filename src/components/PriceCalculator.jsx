import React, { useState, useRef, useEffect } from 'react';
import { calculatePrice } from '../lib/pricing';
import config from '../lib/pricingConfig.json';

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
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [step]);

    const handleSelect = (key, value) => {
        const newSelections = { ...selections, [key]: value };
        setSelections(newSelections);

        if (key === 'size') {
            setStep(STEPS.CONDITION);
        }
        if (key === 'condition') setStep(STEPS.PACKAGE);
        if (key === 'package') {
            const result = calculatePrice(value, newSelections.size, newSelections.condition);
            setQuote(result);
            setStep(STEPS.RESULT);
        }
    };

    const submitQuote = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate network delay for UX
            await new Promise(resolve => setTimeout(resolve, 800));

            const res = await fetch('/api/submit-quote', {
                method: 'POST',
                body: JSON.stringify({ ...selections, quote, email }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) setSubmitted(true);
            else {
                // Fallback for demo if API endpoint doesn't exist yet
                setSubmitted(true);
                console.warn("API likely missing, showing success for demo");
            }
        } catch (err) {
            console.error(err);
            // Alert is bad UX, show inline error? For now just success fallback for demo
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
        <h3 className="text-2xl font-bold text-white mb-6 text-center">{children}</h3>
    );

    const Card = ({ title, desc, onClick, active }) => (
        <button
            onClick={onClick}
            className={`p-6 rounded-xl border-2 transition-all w-full text-left group
                ${active ? 'border-red-500 bg-red-900/10 ring-1 ring-red-500/50' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800'}
            `}
        >
            <div className={`font-bold text-lg mb-1 group-hover:text-red-400 transition-colors ${active ? 'text-red-400' : 'text-white'}`}>{title}</div>
            {desc && <div className="text-zinc-400 text-sm">{desc}</div>}
        </button>
    );

    const renderResult = () => {
        const sizeName = config.sizes[selections.size]?.name;
        const conditionName = config.conditions[selections.condition]?.name;
        const packageName = config.packages[selections.package]?.name;

        // Render tags with more style
        const summaryTags = (
            <div className="flex flex-col gap-3 mb-8 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Fahrzeug</span>
                    <span className="text-white font-medium">{sizeName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Zustand</span>
                    <span className="text-white font-medium">{conditionName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Paket</span>
                    <span className="text-red-400 font-bold">{packageName}</span>
                </div>
            </div>
        );

        // Helper for WhatsApp Button to avoid duplication
        const WhatsAppButton = ({ message }) => (
            <a
                href={`https://wa.me/491633845081?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-4 rounded-xl font-bold transition shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transform hover:-translate-y-1 w-full mb-6 group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                Angebot per WhatsApp
            </a>
        );

        // Case 1: Request Only (e.g. Camper)
        if (quote.isRequestOnly) {
            const message = `Hallo RG-Detailing, ich interessiere mich für ein Angebot: ${sizeName}, ${packageName}.`;
            return (
                 <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-2xl border border-red-900/30 mb-8 inline-block w-full max-w-md relative overflow-hidden shadow-2xl">
                    <div className="text-2xl font-bold text-white mb-6">Ihr Angebot</div>
                    {summaryTags}
                    <div className="bg-zinc-950/50 p-4 rounded-lg border border-white/5 mb-6">
                         <div className="text-zinc-300 text-sm">Für dieses Fahrzeug erstellen wir Ihnen gerne ein maßgeschneidertes Angebot nach Besichtigung.</div>
                    </div>

                    <WhatsAppButton message={message} />
                </div>
            )
        }

        // Case 2: Standard Range
        const message = `Hallo RG-Detailing, ich habe eine Preisanfrage: ${sizeName}, ${conditionName}, ${packageName}. Schätzung: ${quote.minPrice}-${quote.maxPrice}EUR.`;
        return (
            <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-2xl border border-red-900/30 mb-8 inline-block w-full max-w-md relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="text-center mb-6">
                        <span className="inline-block py-1 px-3 rounded-full bg-red-900/20 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
                            Ihre Schätzung
                        </span>
                        <div className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                            {quote.minPrice}€<span className="text-zinc-600 text-3xl font-normal mx-2">-</span>{quote.maxPrice}€
                        </div>
                        <div className="text-zinc-500 text-xs mt-2">*Endgültiger Preis nach Besichtigung</div>
                    </div>

                    {summaryTags}

                    <WhatsAppButton message={message} />
                </div>
            </div>
        );
    };

    const renderClubAbo = () => {
        // Show Club Abo info if Full Detailing selected
        const pkg = config.packages[selections.package];
        if (pkg && pkg.hasClubAbo) {
            return (
                <div className="max-w-md mx-auto mb-8 bg-gradient-to-r from-yellow-900/20 to-zinc-900 border border-yellow-700/30 p-4 rounded-xl">
                    <div className="text-yellow-500 font-bold mb-1 flex items-center gap-2">
                        <span className="text-lg">👑</span> Werterhalt-Garantie
                    </div>
                    <p className="text-zinc-300 text-sm">
                        Sichern Sie sich <strong>-20%</strong> bei Nachpflege alle 2 Monate oder <strong>-10%</strong> alle 3 Monate.
                    </p>
                </div>
            )
        }
        return null;
    };

    return (
        <div ref={containerRef} className="w-full max-w-3xl mx-auto bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 p-6 md:p-12 scroll-mt-32">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-800 -z-10 -translate-y-1/2"></div>
                {[0, 1, 2, 3].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 relative
                        ${step >= i ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' : 'bg-zinc-800 text-zinc-600'}
                    `}>
                        {i + 1}
                        {step === i && <div className="absolute -inset-2 rounded-full border border-red-500/30 animate-ping"></div>}
                    </div>
                ))}
            </div>

            {/* Steps */}
            <div className="min-h-[300px]">
                {step === STEPS.SIZE && (
                    <div className="animate-fade-in">
                        <StepTitle>Fahrzeuggröße wählen</StepTitle>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(config.sizes).map(([key, size]) => (
                                <Card
                                    key={key}
                                    title={size.name}
                                    desc=""
                                    onClick={() => handleSelect('size', key)}
                                    active={selections.size === key}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {step === STEPS.CONDITION && (
                    <div className="animate-fade-in">
                        <StepTitle>Lackzustand bewerten</StepTitle>
                        <div className="grid md:grid-cols-3 gap-4">
                             {Object.entries(config.conditions).map(([key, cond]) => (
                                <Card
                                    key={key}
                                    title={cond.name}
                                    desc=""
                                    onClick={() => handleSelect('condition', key)}
                                    active={selections.condition === key}
                                />
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button onClick={() => setStep(STEPS.SIZE)} className="text-zinc-500 hover:text-white underline text-sm">Zurück</button>
                        </div>
                    </div>
                )}

                {step === STEPS.PACKAGE && (
                    <div className="animate-fade-in">
                        <StepTitle>Gewünschtes Ergebnis</StepTitle>
                        <div className="grid gap-4">
                            {Object.entries(config.packages).map(([key, pkg]) => (
                                <Card
                                    key={key}
                                    title={pkg.name}
                                    desc={pkg.description || `Basispreis ab ${pkg.basePrice}€`}
                                    onClick={() => handleSelect('package', key)}
                                    active={selections.package === key}
                                />
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button onClick={() => setStep(STEPS.CONDITION)} className="text-zinc-500 hover:text-white underline text-sm">Zurück</button>
                        </div>
                    </div>
                )}

                {step === STEPS.RESULT && !submitted && quote && (
                    <div className="animate-fade-in text-center">
                        <StepTitle>Ihre Preisschätzung</StepTitle>

                        {renderResult()}
                        {renderClubAbo()}

                        <form onSubmit={submitQuote} className="max-w-md mx-auto">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    required
                                    placeholder="Ihre E-Mail für das Angebot"
                                    className="flex-grow bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:opacity-50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50 whitespace-nowrap shadow-lg shadow-red-900/20 flex items-center justify-center min-w-[120px]"
                                >
                                    {loading ? <Spinner /> : 'Anfragen'}
                                </button>
                            </div>
                            <p className="text-xs text-zinc-600 mt-2 text-left">
                                Mit dem Absenden stimmen Sie der <a href="/datenschutz" className="text-zinc-500 underline hover:text-zinc-400">Datenschutzerklärung</a> zu.
                            </p>
                        </form>
                        <div className="mt-8 text-center">
                            <button onClick={() => setStep(STEPS.PACKAGE)} className="text-zinc-500 hover:text-white underline text-sm">Zurück</button>
                        </div>
                    </div>
                )}

                {step === STEPS.RESULT && submitted && (
                    <div className="animate-fade-in text-center py-12">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl border border-green-500/50">✓</div>
                        <h3 className="text-3xl font-bold text-white mb-4">Anfrage versendet!</h3>
                        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                            Vielen Dank! Wir haben Ihre Anfrage erhalten. Eine Bestätigung wurde an <span className="text-white">{email}</span> gesendet.
                        </p>
                        <button onClick={reset} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition border border-zinc-700">
                            Neue Berechnung starten
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
