import React, { useState, useRef, useEffect } from 'react';
import { Gem, FlaskConical, Handshake } from 'lucide-react';

export default function WhyUs() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

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

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const scrollLeft = scrollRef.current.scrollLeft;
                const width = scrollRef.current.offsetWidth;
                const newIndex = Math.round(scrollLeft / width);
                setActiveIndex(newIndex);
            }
        };

        const ref = scrollRef.current;
        if (ref) {
            ref.addEventListener('scroll', handleScroll);
            return () => ref.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollToSlide = (index) => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            scrollRef.current.scrollTo({
                left: width * index,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    return (
        <section className="section-spacing">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Unsere Philosophie</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 text-white">Warum RG Detailing?</h2>
                </div>

                <div
                    ref={scrollRef}
                    role="region"
                    aria-label="Vorteile Karussell"
                    className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-0 md:gap-8 pb-4 md:pb-0 hide-scrollbar px-4 md:px-0 -mx-4 md:mx-0 scroll-pl-4 relative animate-pulse-right"
                >
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                             <div
                                key={index}
                                className="w-full flex-shrink-0 md:w-auto md:flex-shrink snap-center glass-panel p-6 md:p-10 flex flex-col items-center text-center hover:bg-zinc-900/60 transition-colors group first:ml-0 md:first:ml-0 mr-4 md:mr-0 last:mr-4 md:last:mr-0 animate-fade-in-up"
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

                {/* Mobile Pagination Dots */}
                <div
                    className="flex md:hidden justify-center gap-3 mt-6"
                    aria-label="Karussell Navigation"
                >
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSlide(index)}
                            aria-label={`Gehe zu Slide ${index + 1}`}
                            aria-current={index === activeIndex ? 'step' : undefined}
                            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                                index === activeIndex
                                    ? 'bg-red-600 scale-125'
                                    : 'bg-zinc-700 hover:bg-zinc-600'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
