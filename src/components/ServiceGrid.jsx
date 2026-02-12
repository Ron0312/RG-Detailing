import { useState } from 'react';
import { ShieldCheck, Sparkles, Caravan, RefreshCw, Droplets, Hammer, Star, ArrowRight, Calculator } from 'lucide-react';
import GlossaryLinker from './GlossaryLinker';

const iconMap = {
    'shield': ShieldCheck,
    'sparkles': Sparkles,
    'bus': Caravan,
    'file-check': RefreshCw,
    'droplet': Droplets,
    'hammer': Hammer,
    'star': Star
};

export default function ServiceGrid({ services }) {
    const [activeCategory, setActiveCategory] = useState("Lack & Keramik");

    // Get unique categories, ensuring 'Lack & Keramik' is first if present
    const categories = ["Lack & Keramik", "Spezial & Reparatur", "Innen & Sonstiges"];

    const filteredServices = services.filter(service =>
        activeCategory === "Alle" ? true : service.category === activeCategory
    );

    return (
        <div>
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all border ${
                            activeCategory === category
                                ? 'bg-red-700 border-red-700 text-white shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)] scale-105'
                                : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Service Grid */}
            <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px] pb-4 md:pb-0 hide-scrollbar">
                {filteredServices.map((service) => {
                    const IconComponent = iconMap[service.icon] || Sparkles;
                    return (
                        <div key={service.title} className="min-w-[85vw] md:min-w-0 snap-center shrink-0 group glass-card p-6 md:p-10 relative overflow-hidden block h-full flex flex-col animate-fade-in-up">
                             <a href={service.link} className="absolute inset-0 z-10" aria-label={`Mehr erfahren zu ${service.title}`}></a>
                             <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-600/10 to-transparent rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-150 group-hover:from-red-600/20 pointer-events-none"></div>

                             <div className="relative z-20 flex-grow pointer-events-none">
                                <div className="w-16 h-16 bg-zinc-900/50 rounded-2xl border border-white/10 flex items-center justify-center text-white mb-8 group-hover:border-red-500/50 transition-colors shadow-lg group-hover:text-red-500 group-hover:scale-110 duration-500">
                                    <IconComponent size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">{service.title}</h3>
                                <div className="text-zinc-400 leading-relaxed mb-6">
                                    <GlossaryLinker text={service.shortDescription} />
                                </div>
                             </div>

                             <div className="relative z-20 mt-auto pt-6 border-t border-white/5 pointer-events-none">
                                <div className="flex items-center text-sm font-bold text-zinc-300 group-hover:text-white">
                                    Mehr erfahren <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                             </div>
                        </div>
                    );
                })}
            </div>

            {/* Price Calculator Teaser */}
            <div className="mt-16 md:mt-24">
                <div className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-900/20 to-black p-8 md:p-12 text-center group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent opacity-50"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 text-red-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Calculator size={24} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Nicht das richtige Paket gefunden?</h3>
                        <p className="text-zinc-400 mb-8 text-lg">
                            Kein Problem. Nutzen Sie unseren intelligenten Preisrechner für ein individuelles Angebot in 2 Minuten.
                        </p>
                        <a
                            href="#rechner"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/40 hover:scale-105"
                        >
                            <Calculator size={20} />
                            Preis jetzt berechnen
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
