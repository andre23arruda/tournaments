import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, Crown, 
  FileBadge, Lock, Medal,  Menu, Moon, 
  MessageCircle, Sun, Trophy, X,
  
} from 'lucide-react';
import { PRICING, MOBILE_BREAKPOINT, SCROLL_THRESHOLD } from '../Main/constants';
import { openWhats } from '../utils';

function buildWhatsAppMessage(planName, userName) {
  const text = `Olá, tudo bem? Gostaria de contratar o plano *${planName}* do Pódio Digital.\n\nMeu nome é *${userName}*.`;
  return encodeURIComponent(text);
}

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planIndex = parseInt(searchParams.get('plano') ?? '0', 10);
  const plan = PRICING[planIndex] ?? PRICING[0];

  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const goToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('darkMode', newValue.toString());
      return newValue;
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

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

  const navbarClasses = useMemo(() => {
    const baseClasses = 'fixed w-full top-0 z-40 transition-all duration-300';

    if (scrolled) {
      return `${baseClasses} ${
        darkMode
          ? 'bg-gray-900/90 shadow-lg backdrop-blur-md border-b border-gray-800'
          : 'bg-white/90 shadow-lg backdrop-blur-md border-b border-gray-200'
      }`;
    }

    return `${baseClasses} ${
      darkMode
        ? 'bg-transparent border-gray-800'
        : 'bg-transparent border-gray-200'
    }`;
  }, [scrolled, darkMode]);

  const mainContainerClasses = useMemo(() => {
    return `min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-orange-50 via-white to-purple-50 text-gray-900'
    }`;
  }, [darkMode]);

  const NavLink = useCallback(({ to, children, mobile }) => (
    <button
      onClick={() => {
        setIsMobileMenuOpen(false);
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(to);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }}
      className={`font-medium transition-colors hover:text-orange-500 ${
        mobile
          ? 'block w-full text-left py-4 text-lg border-b border-gray-100 dark:border-gray-800'
          : ''
      } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
    >
      {children}
    </button>
  ), [navigate, darkMode]);

  const PlanIcon = plan.icon;

  return (
    <div className={mainContainerClasses}>
      {/* NAVBAR */}
      <nav className={navbarClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate('/');
                }
              }}
            >
              <Trophy className={`h-8 w-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pódio
                <span className={`ml-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Digital
                </span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="features">
                <span className="cursor-pointer">Funcionalidades</span>
              </NavLink>
              <NavLink to="examples">
                <span className="cursor-pointer">Torneios</span>
              </NavLink>
              <NavLink to="pricing">
                <span className="cursor-pointer">Planos</span>
              </NavLink>

              <button
                onClick={toggleTheme}
                className={`cursor-pointer p-2 rounded-full transition-colors ${
                  darkMode
                    ? 'hover:bg-gray-800 text-yellow-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                onClick={goToLogin}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
                }`}
              >
                <Lock size={18} />
                <span>Entrar</span>
              </button>

              <button
                onClick={openWhats}
                className="cursor-pointer px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-md"
              >
                Contato
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}
                aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={darkMode ? 'text-white' : 'text-gray-900'}
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 w-full h-screen z-30 p-4 flex flex-col ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex flex-col space-y-2">
              <NavLink mobile to="features">Funcionalidades</NavLink>
              <NavLink mobile to="examples">Torneios</NavLink>
              <NavLink mobile to="pricing">Planos</NavLink>

              <div>
                <button
                  onClick={openWhats}
                  className="mt-8 w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-lg"
                >
                  Contato
                </button>

                <button
                  onClick={goToLogin}
                  className="mt-4 flex bg-orange-600 hover:bg-orange-700 text-white items-center justify-center gap-2 w-full py-4 mb-2 rounded-lg font-bold border-2"
                >
                  <Lock size={20} />
                  Entrar
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-28">
        <div className="mb-6">
          <button
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            className={`inline-flex items-center cursor-pointer gap-2 font-medium transition-colors hover:text-orange-500 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </button>
        </div>

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
    </div>
  );
}
