import React from 'react';
import { Gem, FlaskConical, Handshake } from 'lucide-react';

export default function WhyUs() {
    const items = [
        {
            icon: Gem,
            title: "Zertifizierte Keramikversiegelung",
            description: "Als Labocosmetica Certified Detailer garantieren wir höchste Standards bei Lackschutz und Standzeit."
        },
        {
            icon: FlaskConical,
            title: "High-End Pflegeprodukte",
            description: "Wir nutzen exklusive Chemie (z.B. Labocosmetica, Gtechniq) für maximalen Glanz, den man in Schleswig-Holstein selten findet."
        },
        {
            icon: Handshake,
            title: "Leidenschaft & Präzision",
            description: "Wir behandeln jedes Fahrzeug, als wäre es unser eigenes. Kompromisslose Qualität für Enthusiasten."
        }
    ];

    return (
        <section className="section-spacing content-auto">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Unsere Philosophie</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 text-white">Warum RG Detailing?</h2>
                </div>

                {/* Stack on mobile (3 items don't need a carousel), 3-col on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="glass-panel p-6 md:p-10 flex flex-col items-center text-center hover:bg-zinc-900/60 transition-colors group animate-fade-in-up"
                                style={{ animationDelay: `${(index + 1) * 100}ms` }}
                            >
                                <div className="w-20 h-20 bg-zinc-950 rounded-full flex items-center justify-center mb-6 md:mb-8 border border-white/10 group-hover:border-red-500/50 shadow-lg">
                                    <Icon size={32} className="text-red-500" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
