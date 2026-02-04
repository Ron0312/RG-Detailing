import { jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';

function ScrollReveal({ children, animation = "fade-up", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0 translate-y-8";
    return "opacity-100 translate-y-0";
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: `w-full transition-all duration-1000 ease-out ${getAnimationClass()}`,
      style: { transitionDelay: `${delay}ms` },
      children
    }
  );
}

const hpcImage = new Proxy({"src":"/_astro/labocosmetica-hpc-pro.DxECh0en.jpg","width":1082,"height":1109,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/labocosmetica-hpc-pro.jpg";
							}

							return target[name];
						}
					});

export { ScrollReveal as S, hpcImage as h };
