import { useEffect, useRef, useState } from 'react';

export default function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
}) {
  const adRef = useRef(null);
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const pushed = useRef(false);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || pushed.current) return;
    pushed.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
    }
  }, [shouldLoad]);

  const isDev = import.meta.env.DEV;

  if (isDev) {
    return (
      <div
        className={`flex items-center justify-center text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg ${className}`}
        style={{ minHeight: 90, ...style }}
      >
        <span>📢 Espaço reservado para anúncio (AdSense — só aparece em produção)</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`ad-banner-container overflow-hidden ${className}`}>
      {shouldLoad && (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', ...style }}
          data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          {...(responsive ? { 'data-full-width-responsive': 'true' } : {})}
        />
      )}
    </div>
  );
}
