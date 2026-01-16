import React, { useState } from 'react';
import { calculatePrice } from '../lib/pricing';
import config from '../lib/pricingConfig.json';

const STEPS = {
    SIZE: 0,
    CONDITION: 1,
    PACKAGE: 2,
    RESULT: 3
};

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

    const handleSelect = (key, value) => {
        const newSelections = { ...selections, [key]: value };
        setSelections(newSelections);

        if (key === 'size') setStep(STEPS.CONDITION);
        if (key === 'condition') setStep(STEPS.PACKAGE);
        if (key === 'package') {
            // Need to ensure previous steps are set (if user jumps back, though currently linear)
            const result = calculatePrice(value, newSelections.size, newSelections.condition);
            setQuote(result);
            setStep(STEPS.RESULT);
        }
    };

    const submitQuote = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/submit-quote', {
                method: 'POST',
                body: JSON.stringify({ ...selections, quote, email }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) setSubmitted(true);
            else alert("Fehler beim Senden. Bitte versuchen Sie es später.");
        } catch (err) {
            console.error(err);
            alert("Ein Fehler ist aufgetreten.");
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
            className={`p-6 rounded-xl border-2 transition-all w-full text-left
                ${active ? 'border-blue-500 bg-blue-900/20 ring-2 ring-blue-500/50' : 'border-slate-700 bg-slate-800 hover:border-slate-500 hover:bg-slate-750'}
            `}
        >
            <div className="font-bold text-lg text-white mb-1">{title}</div>
            {desc && <div className="text-slate-400 text-sm">{desc}</div>}
        </button>
    );

    return (
        <div className="w-full max-w-3xl mx-auto bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 p-6 md:p-12">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -z-10 -translate-y-1/2"></div>
                {[0, 1, 2, 3].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500
                        ${step >= i ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}
                    `}>
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Steps */}
            <div className="min-h-[300px]">
                {step === STEPS.SIZE && (
                    <div className="animate-fade-in">
                        <StepTitle>Fahrzeuggröße wählen</StepTitle>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Card
                                title="Kleinwagen"
                                desc="z.B. Fiat 500, Smart, Mini"
                                onClick={() => handleSelect('size', 'small')}
                            />
                            <Card
                                title="Mittelklasse / Kombi"
                                desc="z.B. Golf, Passat, 3er BMW"
                                onClick={() => handleSelect('size', 'medium')}
                            />
                            <Card
                                title="SUV / Oberklasse"
                                desc="z.B. X5, Q7, S-Klasse, Bus"
                                onClick={() => handleSelect('size', 'large')}
                            />
                        </div>
                    </div>
                )}

                {step === STEPS.CONDITION && (
                    <div className="animate-fade-in">
                        <StepTitle>Lackzustand bewerten</StepTitle>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Card
                                title="Neuwertig"
                                desc="Keine Kratzer, hoher Glanz"
                                onClick={() => handleSelect('condition', 'new')}
                            />
                            <Card
                                title="Gebraucht"
                                desc="Waschanlagenkratzer (Swirls)"
                                onClick={() => handleSelect('condition', 'used')}
                            />
                            <Card
                                title="Verwittert / Matt"
                                desc="Sichtbare Kratzer, kein Glanz"
                                onClick={() => handleSelect('condition', 'bad')}
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <button onClick={() => setStep(STEPS.SIZE)} className="text-slate-400 hover:text-white underline text-sm">Zurück</button>
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
                                    desc={`Basispreis ab ${pkg.basePrice}€`}
                                    onClick={() => handleSelect('package', key)}
                                />
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <button onClick={() => setStep(STEPS.CONDITION)} className="text-slate-400 hover:text-white underline text-sm">Zurück</button>
                        </div>
                    </div>
                )}

                {step === STEPS.RESULT && !submitted && quote && (
                    <div className="animate-fade-in text-center">
                        <StepTitle>Ihre Preisschätzung</StepTitle>
                        <div className="bg-gradient-to-br from-blue-900 to-slate-800 p-8 rounded-2xl border border-blue-500/30 mb-8 inline-block w-full max-w-md">
                            <div className="text-slate-300 text-sm mb-2 uppercase tracking-wide">Geschätzter Kostenrahmen</div>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {quote.minPrice}€ - {quote.maxPrice}€
                            </div>
                            <div className="text-slate-400 text-xs">*Endgültiger Preis nach Besichtigung</div>
                        </div>

                        <form onSubmit={submitQuote} className="max-w-md mx-auto">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    required
                                    placeholder="Ihre E-Mail für das Angebot"
                                    className="flex-grow bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50 whitespace-nowrap"
                                >
                                    {loading ? 'Sende...' : 'Anfragen'}
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 text-center">
                            <button onClick={() => setStep(STEPS.PACKAGE)} className="text-slate-400 hover:text-white underline text-sm">Zurück</button>
                        </div>
                    </div>
                )}

                {step === STEPS.RESULT && submitted && (
                    <div className="animate-fade-in text-center py-12">
                        <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Anfrage versendet!</h3>
                        <p className="text-slate-400 mb-8">Wir haben Ihnen eine Bestätigung an {email} gesendet und melden uns in Kürze.</p>
                        <button onClick={reset} className="text-blue-400 hover:text-blue-300 underline">Neue Berechnung starten</button>
                    </div>
                )}
            </div>
        </div>
    );
}
