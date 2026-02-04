import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: items.map((item, index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: `glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${openIndex === index ? "border-red-500/30 bg-zinc-900/60" : "border-white/5 hover:border-red-500/20"}`,
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none",
            onClick: () => toggleFAQ(index),
            "aria-expanded": openIndex === index,
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg md:text-xl font-bold text-white pr-8", children: item.question }),
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  className: `w-6 h-6 text-red-500 shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`,
            children: /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 text-zinc-400 leading-relaxed", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: item.answer } }) })
          }
        )
      ]
    },
    index
  )) });
};

export { FAQ as F };
