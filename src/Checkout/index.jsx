import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import { CheckCircle, FileBadge, MessageCircle } from 'lucide-react';
import { PRICING, MOBILE_BREAKPOINT, SCROLL_THRESHOLD } from '../Main/constants';

function buildWhatsAppMessage(planName, userName) {
  const text = `Olá, tudo bem? Gostaria de contratar o plano *${planName}* do Pódio Digital.\n\nMeu nome é *${userName}*.`;
  return encodeURIComponent(text);
}

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const planIndex = parseInt(searchParams.get('plano') ?? '0', 10);
  const plan = PRICING[planIndex] ?? PRICING[0];

  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    document.title = `Contratar ${plan.name} | Pódio Digital`;
    window.scrollTo({ top: 0 });

    checkMobile();
    handleScroll();

    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [plan.name]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitted(true);
    const msg = buildWhatsAppMessage(plan.name, name.trim());
    const phone = '5512982399873';
    setTimeout(() => {
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    }, 600);
  }, [name, plan.name]);

  const mainContainerClasses = useMemo(() => {
    return `min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-orange-50 via-white to-purple-50 text-gray-900'
    }`;
  }, [darkMode]);

  const PlanIcon = plan.icon;

  return (
    <div className={mainContainerClasses}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-28">
        <div className="text-center mb-10">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Finalize sua contratação
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Você está a um passo de organizar torneios incríveis!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Plan Summary Card */}
          <div className={`rounded-2xl shadow-2xl p-8 ${
            plan.highlight
              ? 'bg-orange-600 text-white'
              : darkMode
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
          }`}>
            {plan.highlight && (
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-yellow-400 text-gray-900">
                  Mais Popular
                </span>
              </div>
            )}

            <div className="flex justify-center mb-4">
              <PlanIcon className={`h-14 w-14 ${plan.highlight ? 'text-yellow-400' : plan.color}`} />
            </div>

            <h2 className={`text-2xl font-bold text-center mb-1 ${
              plan.highlight || darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {plan.name}
            </h2>
            <p className={`text-center mb-6 ${plan.highlight || darkMode ? 'text-orange-100' : 'text-gray-500'}`}>
              {plan.sub}
            </p>

            <div className="text-center mb-8">
              <span className={`text-5xl font-extrabold ${plan.highlight || darkMode ? 'text-white' : 'text-gray-900'}`}>
                {plan.price}
              </span>
              <span className={`text-lg ml-1 ${plan.highlight || darkMode ? 'text-orange-100' : 'text-gray-500'}`}>
                {plan.per}
              </span>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    plan.highlight ? 'text-yellow-400' : 'text-green-500'
                  }`} />
                  <span className={plan.highlight ? 'text-white' : darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form Card */}
          <div className={`rounded-2xl shadow-2xl p-8 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {!submitted ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-orange-100">
                    <FileBadge className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Último passo
                    </h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Preencha para continuar
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                    >
                      Seu nome
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      autoFocus
                      placeholder="Ex: João Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-base transition-all outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>

                  <div className={`rounded-xl p-4 flex gap-3 ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                    <MessageCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Ao clicar em <strong>Continuar no WhatsApp</strong>, você será redirecionado para uma conversa com nossa equipe para finalizar a contratação do plano <strong>{plan.name}</strong>.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={!name.trim()}
                    className="cursor-pointer w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <MessageCircle className="h-6 w-6" />
                    Continuar no WhatsApp
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quase lá!
                </h2>
                <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Estamos te redirecionando para o WhatsApp. Se não abrir automaticamente,{' '}
                  <button
                    onClick={() => {
                      const msg = buildWhatsAppMessage(plan.name, name.trim());
                      window.open(`https://wa.me/5512982399873?text=${msg}`, '_blank');
                    }}
                    className="cursor-pointer text-green-500 underline font-semibold hover:text-green-600"
                  >
                    clique aqui
                  </button>.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer darkMode={darkMode} className="mt-12" />
    </div>
  );
}
