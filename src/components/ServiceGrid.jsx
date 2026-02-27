import React, { useState, useRef, useEffect, useMemo, memo } from 'react';
import { ShieldCheck, Sparkles, Caravan, RefreshCw, Droplets, Hammer, Star, ArrowRight, Calculator } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
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

// OPTIMIZATION: Memoized ServiceCard to prevent unnecessary re-renders when activeIndex changes during scroll.
const ServiceCard = memo(({ service, index, IconComponent }) => {
    return (
        <div
            data-index={index}
            className="w-full flex-shrink-0 md:w-auto md:flex-shrink snap-center group glass-card p-6 md:p-10 relative overflow-hidden flex flex-col animate-fade-in-up first:ml-0 md:first:ml-0 mr-4 md:mr-0 last:mr-4 md:last:mr-0"
        >
                <a
                href={service.link}
                className="absolute inset-0 z-10"
                aria-label={`Mehr erfahren zu ${service.title}`}
                onClick={() => trackEvent('service_click', { service: service.title })}
                ></a>
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
});

export default function ServiceGrid({ services }) {
    const [activeCategory, setActiveCategory] = useState("Lack & Keramik");
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    // Get unique categories, ensuring 'Lack & Keramik' is first if present
    const categories = ["Lack & Keramik", "Spezial & Reparatur", "Innen & Sonstiges"];

    // MEMOIZATION OPTIMIZATION:
    // Prevent re-filtering on every render. Only re-filter when services or category changes.
    const filteredServices = useMemo(() => services.filter(service =>
        activeCategory === "Alle" ? true : service.category === activeCategory
    ), [services, activeCategory]);

    // SCROLL OPTIMIZATION:
    // Replaced high-frequency scroll event listener with IntersectionObserver.
    // This avoids layout thrashing (reading scrollLeft/offsetWidth) and reduces main thread work.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Update active index if card is >60% visible
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: scrollRef.current,
                threshold: 0.6 // Card must be 60% visible to be considered active
            }
        );

        const container = scrollRef.current;
        if (container) {
            // Observe all service cards
            const cards = container.querySelectorAll('[data-index]');
            cards.forEach((card) => observer.observe(card));
        }

        return () => observer.disconnect();
    }, [filteredServices]); // Re-attach when list changes

    // Reset index on category change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
        setActiveIndex(0);
    }, [activeCategory]);

    const scrollToSlide = (index) => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            scrollRef.current.scrollTo({
                left: width * index,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div>
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        aria-pressed={activeCategory === category}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all border focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
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
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-8 min-h-[400px] pb-4 md:pb-0 hide-scrollbar px-4 md:px-0 -mx-4 md:mx-0 scroll-pl-4 relative animate-pulse-right"
            >
                {filteredServices.map((service, index) => {
                    const IconComponent = iconMap[service.icon] || Sparkles;
                    return (
                        <ServiceCard
                            key={service.title}
                            service={service}
                            index={index}
                            IconComponent={IconComponent}
                        />
                    );
                })}
            </div>

            {/* Mobile Pagination Dots */}
            <div className="flex md:hidden justify-center gap-2 mt-4">
                {filteredServices.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        aria-label={`Gehe zu Slide ${index + 1}`}
                        aria-current={index === activeIndex ? 'step' : undefined}
                        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
                            index === activeIndex ? 'bg-red-600 scale-125' : 'bg-zinc-700 hover:bg-zinc-600'
                        }`}
                    ></button>
                ))}
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
                            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/40 hover:scale-105 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
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
