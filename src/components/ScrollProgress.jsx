import React, { useEffect, useState, useRef } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const ticking = useRef(false);

  const scrollHeight = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const el = document.documentElement;
        const scrollTop = el.scrollTop || document.body.scrollTop;
        const scrollHeight = el.scrollHeight || document.body.scrollHeight;
        const height = (scrollTop / (scrollHeight - el.clientHeight)) * 100;
        setWidth(height);
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 z-[1000] bg-zinc-800 w-full">
      <div
        className="h-full bg-red-600 transition-all duration-100 ease-out"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
