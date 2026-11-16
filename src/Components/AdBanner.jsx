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
  const [hasError, setHasError] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const pushed = useRef(false);

  useEffect(() => {
    if (import.meta.env.DEV) return;

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
    if (!shouldLoad || pushed.current || import.meta.env.DEV) return;
    pushed.current = true;

    const insEl = adRef.current;
    if (!insEl) return;

    const mutationObserver = new MutationObserver(() => {
      const status = insEl.getAttribute('data-ad-status');
      if (status === 'unfilled') {
        setHasError(true);
      } else if (status === 'filled') {
        setIsFilled(true);
      }
    });

    mutationObserver.observe(insEl, {
      attributes: true,
      attributeFilter: ['data-ad-status'],
    });

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      setHasError(true);
    }

    // Caso o script seja bloqueado (AdBlock) ou a requisição falhe (ex: 400) sem preencher o slot
    const timeout = setTimeout(() => {
      const status = insEl.getAttribute('data-ad-status');
      const hasIframe = insEl.querySelector('iframe');
      if (status !== 'filled' && !hasIframe) {
        setHasError(true);
      }
    }, 4000);

    return () => {
      mutationObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [shouldLoad]);

  const isDev = import.meta.env.DEV;

  if (isDev) {
    return (
      <div
        className={`flex items-center justify-center text-xs text-gray-400 bg-transparent border border-dashed border-gray-300 rounded-lg ${className}`}
        style={{ minHeight: 90, ...style }}
      >
        <span>📢 Espaço reservado para anúncio (AdSense — só aparece em produção)</span>
      </div>
    );
  }

  if (hasError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`ad-banner-container overflow-hidden ${className}`}
      style={isFilled ? undefined : { height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
    >
      {shouldLoad && (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', ...style }}
          data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-1776593052592056'}
          data-ad-slot={slot}
          data-ad-format={format}
          {...(responsive ? { 'data-full-width-responsive': 'true' } : {})}
        />
      )}
    </div>
  );
}
