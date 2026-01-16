import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { quoteStore } from '../store/quoteStore';

export default function PriceCalculator() {
    const $quote = useStore(quoteStore);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const updateStore = (key, value) => {
        quoteStore.setKey(key, value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/submit-quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify($quote)
            });
            const data = await response.json();
            setResult(data);
            setStep(4);
        } catch (e) {
            console.error(e);
            alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
        } finally {
            setLoading(false);
        }
    };

    const StepIndicator = () => (
        <div className="flex justify-center mb-8">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-3 h-3 rounded-full mx-1 ${step >= i ? 'bg-blue-500' : 'bg-slate-600'}`} />
            ))}
        </div>
    );

    return (
        <div className="w-full">
            <StepIndicator />

            {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-semibold text-center text-white">Größe des Fahrzeugs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => { updateStore('size', 'small'); setStep(2); }}
                            className={`p-6 rounded-lg border-2 transition-all ${$quote.size === 'small' ? 'border-blue-500 bg-slate-700' : 'border-slate-600 hover:border-slate-500'}`}
                        >
                            <div className="text-4xl mb-2">🚗</div>
                            <div className="font-bold text-white">Kleinwagen</div>
                            <div className="text-sm text-slate-400">z.B. Fiat 500, VW Polo</div>
                        </button>
                        <button
                            onClick={() => { updateStore('size', 'medium'); setStep(2); }}
                            className={`p-6 rounded-lg border-2 transition-all ${$quote.size === 'medium' ? 'border-blue-500 bg-slate-700' : 'border-slate-600 hover:border-slate-500'}`}
                        >
                            <div className="text-4xl mb-2">🚙</div>
                            <div className="font-bold text-white">Mittelklasse / Kombi</div>
                            <div className="text-sm text-slate-400">z.B. VW Passat, C-Klasse</div>
                        </button>
                        <button
                            onClick={() => { updateStore('size', 'large'); setStep(2); }}
                            className={`p-6 rounded-lg border-2 transition-all ${$quote.size === 'large' ? 'border-blue-500 bg-slate-700' : 'border-slate-600 hover:border-slate-500'}`}
                        >
                            <div className="text-4xl mb-2">🚐</div>
                            <div className="font-bold text-white">SUV / Oberklasse</div>
                            <div className="text-sm text-slate-400">z.B. BMW X5, S-Klasse</div>
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-semibold text-center text-white">Zustand des Lacks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => { updateStore('condition', 'new'); setStep(3); }}
                            className="p-6 rounded-lg border-2 border-slate-600 hover:border-blue-500 text-left"
                        >
                            <div className="font-bold text-white mb-2">Neuwertig</div>
                            <div className="text-sm text-slate-400">Keine sichtbaren Kratzer, hoher Glanz.</div>
                        </button>
                        <button
                            onClick={() => { updateStore('condition', 'good'); setStep(3); }}
                            className="p-6 rounded-lg border-2 border-slate-600 hover:border-blue-500 text-left"
                        >
                            <div className="font-bold text-white mb-2">Leichte Gebrauchsspuren</div>
                            <div className="text-sm text-slate-400">Waschanlagen-Swirls, leichter Grauschleier.</div>
                        </button>
                        <button
                            onClick={() => { updateStore('condition', 'bad'); setStep(3); }}
                            className="p-6 rounded-lg border-2 border-slate-600 hover:border-blue-500 text-left"
                        >
                            <div className="font-bold text-white mb-2">Sichtbare Defekte</div>
                            <div className="text-sm text-slate-400">Tiefe Kratzer, matter Lack, Hologramme.</div>
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white underline">Zurück</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-semibold text-center text-white">Ihr Ziel</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => updateStore('service', 'sale')}
                            className={`p-6 rounded-lg border-2 transition-all ${$quote.service === 'sale' ? 'border-blue-500 bg-slate-700' : 'border-slate-600'}`}
                        >
                            <div className="font-bold text-white mb-2">Verkaufsaufbereitung</div>
                            <div className="text-sm text-slate-400">Fokus auf Sauberkeit und frischen Eindruck für den Verkauf.</div>
                        </button>
                        <button
                            onClick={() => updateStore('service', 'shine')}
                            className={`p-6 rounded-lg border-2 transition-all ${$quote.service === 'shine' ? 'border-blue-500 bg-slate-700' : 'border-slate-600'}`}
                        >
                            <div className="font-bold text-white mb-2">Glanz & Schutz</div>
                            <div className="text-sm text-slate-400">Hochglanzpolitur und Versiegelung für langanhaltenden Schutz.</div>
                        </button>
                        <button
                            onClick={() => updateStore('service', 'defect')}
                            className={`p-6 rounded-lg border-2 transition-all ${$quote.service === 'defect' ? 'border-blue-500 bg-slate-700' : 'border-slate-600'}`}
                        >
                            <div className="font-bold text-white mb-2">Defektkorrektur (High-End)</div>
                            <div className="text-sm text-slate-400">Mehrstufiges Polieren zur Entfernung von bis zu 95% der Lackdefekte.</div>
                        </button>
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={() => setStep(2)} className="px-6 py-2 text-slate-400 hover:text-white">Zurück</button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Berechne...' : 'Preis berechnen'}
                        </button>
                    </div>
                </div>
            )}

            {step === 4 && result && (
                <div className="text-center animate-fade-in bg-slate-700/50 p-8 rounded-xl border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-white mb-2">Ihr unverbindliches Angebot</h3>
                    <p className="text-slate-300 mb-6">Basierend auf Ihren Angaben schätzen wir die Investition auf:</p>

                    <div className="text-4xl font-extrabold text-blue-400 mb-2">
                        {result.minPrice}€ - {result.maxPrice}€
                    </div>
                    <p className="text-sm text-slate-500 mb-8">*Endgültiger Preis nach Besichtigung</p>

                    <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-green-500/20 transition-all">
                        Termin anfragen
                    </button>

                    <div className="mt-6">
                        <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white text-sm">Neu berechnen</button>
                    </div>
                </div>
            )}
        </div>
    );
}
