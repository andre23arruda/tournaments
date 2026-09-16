import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setCount(target);
      return;
    }

    let animationFrameId;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic: desacelera suavemente ao se aproximar do número final
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            setCount(current);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          animationFrameId = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}
