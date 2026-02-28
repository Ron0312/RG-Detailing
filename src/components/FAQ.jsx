import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

const FAQ = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex !== index) {
        trackEvent('faq_toggle', { question: items[index].question });
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${
             openIndex === index ? 'border-red-500/30 bg-zinc-900/60' : 'border-white/5 hover:border-red-500/20'
          }`}
        >
          <button
            id={`faq-button-${index}`}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset focus-visible:outline-none"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-content-${index}`}
          >
            <span className="text-lg md:text-xl font-bold text-white pr-8">{item.question}</span>
            <ChevronDown
              className={`w-6 h-6 text-red-500 shrink-0 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            id={`faq-content-${index}`}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
               <div dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
