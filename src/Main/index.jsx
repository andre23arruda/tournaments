import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import {
  CheckCircle,
  Clock,
  Heart,
  Instagram,
  Medal,
  Target,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import {
  EXAMPLES,
  FEATURES,
  INSTAGRAM_CARDS,
  MOBILE_BREAKPOINT,
  PRICING,
  VIDEO_ID_DEMO,
  VIDEO_ID_SHORTS,
} from './constants'
import { openWhats } from '../utils';
import AdBanner from '../Components/AdBanner';

const FeatureCard = memo(({ feature, darkMode }) => (
  <div
    className={`p-6 rounded-xl transition-all hover:scale-105 shadow-lg ${
      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-xl'
    }`}
  >
    <div className="flex justify-center mb-4">
      <feature.icon className={`h-12 w-12 ${feature.color}`} />
    </div>
    <h3 className={`text-xl font-semibold mb-3 text-center ${
      darkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {feature.title}
    </h3>
    <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {feature.description}
    </p>
  </div>
));
FeatureCard.displayName = 'FeatureCard';

const ExampleCard = memo(({ example, darkMode }) => (
  <div
    className={`rounded-xl overflow-hidden shadow-lg transition-all hover:scale-105 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}
  >
    <Link to={example.link}>
      <div className={`p-6 ${
        darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-orange-600 to-yellow-500'
      } text-white`}>
        <h3 className="text-xl font-bold mb-1">{example.title}</h3>
        <p className="text-orange-100">{example.subtitle}</p>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {example.participants}
          </div>
          <div className="text-right flex-1">
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {example.games} jogos
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
            example.status === 'Finalizado'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {example.status === 'Finalizado' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Clock className="h-4 w-4" />
            )}
            {example.status}
          </span>
        </div>
      </div>
    </Link>
  </div>
));
ExampleCard.displayName = 'ExampleCard';

const PricingCard = memo(({ plan, index, darkMode }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`p-8 rounded-xl shadow-2xl transition-all duration-300 flex flex-col ${
        plan.highlight
          ? 'bg-orange-600 text-white transform scale-105 ring-4 ring-orange-500/50'
          : darkMode
            ? 'bg-gray-700 text-white'
            : 'bg-white text-gray-900 hover:shadow-xl'
      }`}
    >
      {plan.highlight && (
        <div className="text-center mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-yellow-400 text-gray-900">
            Mais Popular
          </span>
        </div>
      )}

      <div className="flex justify-center mb-4">
        <plan.icon className={`h-12 w-12 ${plan.highlight ? 'text-yellow-400' : plan.color}`} />
      </div>

      <h3 className={`text-2xl font-bold text-center mb-2 ${
        (plan.highlight || darkMode) ? 'text-white' : 'text-gray-900'
      }`}>
        {plan.name}
      </h3>

      <p className={`text-center mb-6 ${
        (plan.highlight || darkMode) ? 'text-orange-100' : 'text-gray-600'
      }`}>
        {plan.sub}
      </p>

      <div className="text-center mb-8">
        <span className={`text-5xl font-extrabold ${
          (plan.highlight || darkMode) ? 'text-white' : 'text-gray-900'
        }`}>
          {plan.price}
        </span>
        <span className={`text-xl font-medium ml-1 ${
          (plan.highlight || darkMode) ? 'text-orange-100' : 'text-gray-500'
        }`}>
          {plan.per}
        </span>
      </div>

      <ul className="space-y-3 mb-10 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <CheckCircle className={`h-5 w-5 mr-3 flex-shrink-0 ${
              plan.highlight ? 'text-yellow-400' : 'text-green-500'
            }`} />
            <span className={`${
              plan.highlight
                ? 'text-white'
                : (darkMode ? 'text-gray-300' : 'text-gray-600')
            }`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate(`/contratar?plano=${index}`)}
        className={`w-full py-3 rounded-xl font-bold text-base transition-all hover:scale-105 shadow-md cursor-pointer ${
          plan.highlight
            ? 'bg-white text-orange-600 hover:bg-orange-50'
            : darkMode
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
        }`}
      >
        {plan.buttonText}
      </button>
    </div>
  );
});
PricingCard.displayName = 'PricingCard';

const InstagramCard = memo(({ card, darkMode }) => {
  return (
    <div
      className={`w-full md:w-[328px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] flex flex-col cursor-pointer ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
      onClick={() => window.open(card.post, '_blank')}
    >
      {/* Header */}
      <div className="p-3 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700">
        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 flex items-center justify-center p-[2px]">
          <div className="h-full w-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            <img src="/insta/ig-logo.jpg" alt="Instagram" className="h-full w-full object-cover rounded-full" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-normal leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            podiodigital.oficial
          </span>
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={card.url}
          alt="Instagram post"
          className="w-full h-full object-cover transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Caption / Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className={`text-sm leading-relaxed whitespace-pre-line mb-1 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {card.text.trim()}
        </p>
        
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-[#9191913d]">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span>{card.likes}</span>
        </div>
      </div>
    </div>
  );
});
InstagramCard.displayName = 'InstagramCard';

export default function LandingPage() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const handleWatchDemo = useCallback(() => {
    if (isMobileDevice) {
      window.open(`https://www.youtube.com/shorts/${VIDEO_ID_SHORTS}`, '_blank');
    } else {
      setShowVideoModal(true);
    }
  }, [isMobileDevice]);

  const closeVideoModal = useCallback(() => {
    setShowVideoModal(false);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < MOBILE_BREAKPOINT);
    };

    document.title = 'Pódio Digital | Torneios de um jeito fácil e totalmente digital!';

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = (showVideoModal) ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showVideoModal]);

  const mainContainerClasses = useMemo(() => {
    return `min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-orange-50 via-white to-purple-50 text-gray-900'
    }`;
  }, [darkMode]);


  return (
    <div className={mainContainerClasses}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <div className="pt-20 min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-bounce-slow">
              <Trophy className={`h-24 w-24 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Pódio
              <span className={`ml-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                Digital
              </span>
            </h1>

            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Torneios de um jeito fácil e totalmente digital!
              <br />
              Acompanhe os jogos na palma da sua mão.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openWhats}
                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
              >
                Entre em contato
              </button>

              <button
                onClick={handleWatchDemo}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 cursor-pointer ${
                  darkMode
                    ? 'border-2 border-gray-600 hover:bg-gray-800 text-gray-300'
                    : 'border-2 border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                Ver demonstração
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className={`absolute top-20 left-10 opacity-20 pointer-events-none ${
          darkMode ? 'text-orange-400' : 'text-orange-200'
        }`}>
          <Medal className="h-24 w-24" />
        </div>

        <div className={`absolute bottom-20 right-10 opacity-20 pointer-events-none ${
          darkMode ? 'text-orange-400' : 'text-orange-200'
        }`}>
          <Target className="h-32 w-32" />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Funcionalidades Principais
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Tudo que você precisa para organizar torneios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} feature={feature} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div id="examples" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Exemplos de Torneios
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Veja como ficam os placares e resultados na prática
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXAMPLES.map((example, index) => (
              <ExampleCard key={index} example={example} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </div>

      <AdBanner slot="4419106208" format="horizontal" className="m-6 px-4" />

      {/* Pricing Section */}
      <div id="pricing" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Planos e Preços
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Escolha o plano que melhor se encaixa nas suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {PRICING.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </div>

      <div id="social" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Acompanhe no Instagram
            </h2>

            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Fique por dentro das novidades e dos últimos torneios
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {INSTAGRAM_CARDS.map((card, index) => (
              <InstagramCard key={index} card={card} darkMode={darkMode} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.instagram.com/podiodigital.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              <Instagram className="h-5 w-5" />
              Seguir @podiodigital.oficial
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-20 ${
        darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-orange-600 to-gray-400'
      } text-white`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para organizar seu próximo torneio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Vamos lá, crie seu torneio e comece a jogar!
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="opacity-90">Torneios Criados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">300+</div>
              <div className="opacity-90">Participantes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="opacity-90">Jogos Realizados</div>
            </div>
          </div>
          <button
            onClick={openWhats}
            className="px-10 py-4 bg-white text-orange-600 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Entre em contato
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Video Modal */}
      {showVideoModal && !isMobileDevice && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 z-[60] bg-orange-600 hover:bg-orange-700 text-white rounded-full p-3 shadow-2xl transition-all hover:scale-110 cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative w-full overflow-hidden rounded-3xl shadow-2xl bg-black border border-white/10 max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID_DEMO}?autoplay=1&controls=1&rel=0&modestbranding=1`}
              title="Demonstração Pódio Digital"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}