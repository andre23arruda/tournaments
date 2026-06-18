import { useEffect, useRef } from 'react';

/**
 * AdBanner - Componente reutilizável para anúncios do Google AdSense.
 *
 * Props:
 *  - slot: string (obrigatório) - ID do bloco de anúncio (ex: "1234567890")
 *  - format: string - "auto" | "rectangle" | "vertical" | "horizontal" (padrão: "auto")
 *  - responsive: boolean - se true, usa full-width responsive (padrão: true)
 *  - className: string - classes CSS extras para o container
 *  - style: object - estilos extras para a tag <ins>
 *
 * Uso:
 *  <AdBanner slot="1234567890" format="horizontal" />
 */
export default function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
}) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Evita chamar push() mais de uma vez no mesmo elemento (StrictMode safe)
    if (pushed.current) return;
    pushed.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense ainda não carregou (ex: desenvolvimento local)
    }
  }, []);

  // Em desenvolvimento, mostra um placeholder visual
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
    <div className={`ad-banner-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(responsive ? { 'data-full-width-responsive': 'true' } : {})}
      />
    </div>
  );
}
