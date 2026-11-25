import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Calendar, CalendarCheck, CheckCircle, ChevronRight, Clock, GraduationCap,
  Heart, Instagram, Link2, MapPin, Medal, Share2, Target, Trophy, Users, X,
} from 'lucide-react';
import AdBanner from '../Components/AdBanner';
import AnimatedCounter from '../Components/AnimatedCounter';
import Footer from '../Components/MainFooter';
import Header from '../Components/MainHeader';
import Carousel from '../Components/Carousel';
import WhatsButton from '../Components/WhatsButton';
import { GUIDES_ARTICLES } from '../Guides/articles';
import { useTheme } from '../ThemeContext';
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
    className={`rounded-xl overflow-hidden shadow-lg transition-all hover:scale-105 h-full flex flex-col ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}
  >
    <Link to={example.link} className="flex flex-col h-full">
      <div className={`p-6 ${
        darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-orange-600 to-yellow-500'
      } text-white`}>
        <h3 className="text-xl font-bold mb-1">{example.title}</h3>
        <p className="text-orange-100">{example.subtitle}</p>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
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
      className={`w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] flex flex-col cursor-pointer ${
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
  const { darkMode } = useTheme();
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
      <Header />

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
      <div id="funcionalidades" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Funcionalidades Principais
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Tudo que você precisa para organizar torneios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} feature={feature} darkMode={darkMode} />
            ))}
          </div>
        </div>
      
        <AdBanner slot="4419106208" format="horizontal" className="max-w-7xl mx-auto mt-16 px-4" />
      </div>

      {/* Classes Scheduling Section */}
      <div id="aulas" className={`py-16 md:py-20 overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <GraduationCap className="h-4 w-4 flex-shrink-0" />
                Para Professores e Arenas
              </div>

              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Agendamento de Aulas e Gestão de Alunos
              </h2>

              <p className={`text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Esqueça as planilhas confusas e anotações no caderno. Cadastre seus alunos, organize turmas e tenha acesso rápido ao calendário completo de aulas da sua arena na palma da mão.
              </p>

              <ul className="space-y-3 sm:space-y-4 mb-8">
                {[
                  'Cadastro simples de alunos com histórico e contato rápido',
                  'Calendário intuitivo com visão diária e semanal das aulas',
                  'Organização de turmas, horários fixos e aulas avulsas',
                  'Acesso rápido pelo celular direto da quadra',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={openWhats}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
              >
                Quero gerenciar minhas aulas
              </button>
            </div>

            {/* Visual Mockup: Calendar & Students */}
            <div className={`min-w-0 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 text-blue-500 flex-shrink-0">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`font-bold text-base sm:text-lg truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Agenda de Aulas
                    </h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Quinta-feira • Quadras 1 e 2
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                  18 alunos ativos
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    time: '08:00 - 09:00',
                    title: 'Turma Iniciante - Beach Tennis',
                    students: 'Ana, Carla, Marcos, Lucas',
                    status: 'Confirmada',
                    color: 'border-l-4 border-blue-500',
                  },
                  {
                    time: '18:00 - 19:00',
                    title: 'Aula Particular - Futevôlei',
                    students: 'Pedro Henrique & Gabriel',
                    status: 'Confirmada',
                    color: 'border-l-4 border-orange-500',
                  },
                  {
                    time: '19:00 - 20:00',
                    title: 'Turma Intermediário Misto',
                    students: 'Juliana, Rafael, Bruna, Diego',
                    status: 'Confirmada',
                    color: 'border-l-4 border-green-500',
                  },
                ].map((lesson, i) => (
                  <div
                    key={i}
                    className={`p-3.5 sm:p-4 rounded-xl ${lesson.color} ${
                      darkMode ? 'bg-gray-700/60' : 'bg-gray-50'
                    } flex flex-col sm:flex-row sm:items-center justify-between gap-2`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs font-semibold text-orange-500 mb-1">
                        <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                        {lesson.time}
                      </div>
                      <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {lesson.title}
                      </p>
                      <p className={`text-xs flex items-center gap-1 mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Users className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{lesson.students}</span>
                      </p>
                    </div>
                    <span className="self-start sm:self-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                      {lesson.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Court Reservation Section */}
      <div id="quadras" className={`py-16 md:py-20 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Visual Mockup: Court Booking Link */}
            <div className={`order-2 lg:order-1 min-w-0 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border ${
              darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              {/* Simulated shareable link bar */}
              <div className={`flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 rounded-xl mb-5 sm:mb-6 border ${
                darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'
              }`}>
                <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0 flex-1">
                  <Link2 className="h-4 w-4 text-teal-500 flex-shrink-0" />
                  <span className="truncate font-mono">podiodigital.app.br/arena/sua-arena</span>
                </div>
                <span className="px-2 sm:px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-500/10 text-teal-500 flex items-center gap-1 flex-shrink-0">
                  <Share2 className="h-3 w-3" />
                  <span className="hidden xs:inline sm:inline">Link Público</span>
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="min-w-0">
                  <h3 className={`font-bold text-base sm:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Escolha a Quadra e Horário
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Disponibilidade atualizada em tempo real
                  </p>
                </div>
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
              </div>

              {/* Courts pills */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
                <div className="p-2.5 sm:p-3 rounded-xl bg-orange-600 text-white text-center font-semibold text-xs sm:text-sm shadow">
                  Quadra 01 • Coberta
                </div>
                <div className={`p-2.5 sm:p-3 rounded-xl text-center font-semibold text-xs sm:text-sm border ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'
                }`}>
                  Quadra 02 • Areia
                </div>
              </div>

              {/* Time slots grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {[
                  { time: '17:00', available: true },
                  { time: '18:00', available: false },
                  { time: '19:00', available: false },
                  { time: '20:00', available: true },
                  { time: '21:00', available: true },
                  { time: '22:00', available: true },
                ].map((slotItem, i) => (
                  <div
                    key={i}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                      slotItem.available
                        ? darkMode
                          ? 'bg-teal-500/10 border-teal-500/40 text-teal-300'
                          : 'bg-teal-50 border-teal-200 text-teal-900'
                        : darkMode
                          ? 'bg-gray-800 border-gray-700 text-gray-500 opacity-60'
                          : 'bg-gray-100 border-gray-200 text-gray-400'
                    }`}
                  >
                    <div className="font-bold text-sm">{slotItem.time}</div>
                    <div className="text-xs mt-0.5 font-medium">
                      {slotItem.available ? 'Disponível' : 'Reservado'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 min-w-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 bg-teal-500/10 text-teal-500 border border-teal-500/20">
                <CalendarCheck className="h-4 w-4 flex-shrink-0" />
                Reserva Online 24h
              </div>

              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Link Exclusivo para Reserva de Quadras
              </h2>

              <p className={`text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Dê mais praticidade aos atletas da sua arena. Libere um link personalizado para que os próprios jogadores consultem os horários livres e façam a reserva de quadras em poucos cliques.
              </p>

              <ul className="space-y-3 sm:space-y-4 mb-8">
                {[
                  'Link exclusivo da sua arena para colocar na bio do Instagram e WhatsApp',
                  'Visualização clara das quadras e horários disponíveis em tempo real',
                  'Reduza o tempo gasto respondendo mensagens sobre horários livres',
                  'Controle total sobre os agendamentos e bloqueios de horários',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={openWhats}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
              >
                Ativar reservas na minha arena
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div id="exemplos" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Exemplos de Torneios
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Veja como ficam os placares e resultados na prática
            </p>
          </div>

          <Carousel
            items={EXAMPLES}
            renderItem={(example) => (
              <ExampleCard example={example} darkMode={darkMode} />
            )}
            responsive={{ mobile: 1, tablet: 2, desktop: 3 }}
            darkMode={darkMode}
          />
        </div>

        <AdBanner slot="3004775462" format="horizontal" className="max-w-7xl mx-auto mt-16 px-4" />
      </div>


      {/* Pricing Section */}
      <div id="planos" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
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

        <AdBanner slot="1245630370" format="horizontal" className="max-w-7xl mx-auto mt-16 px-4" />
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

          <Carousel
            items={INSTAGRAM_CARDS}
            renderItem={(card) => (
              <InstagramCard card={card} darkMode={darkMode} />
            )}
            responsive={{ mobile: 1, tablet: 2, desktop: 3 }}
            darkMode={darkMode}
          />

          <div className="text-center mt-12">
            <a
              href="https://www.instagram.com/podiodigital.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              <Instagram className="h-5 w-5" />
              Seguir @podiodigital.oficial
            </a>
          </div>
        </div>

        <AdBanner slot="1467177569" format="horizontal" className="max-w-7xl mx-auto mt-16 px-4" />
      </div>

      {/* Guides & Content Section */}
      <div id="guias" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-orange-500/10 text-orange-500 border border-orange-500/20">
              <BookOpen className="h-4 w-4" />
              Conteúdo para Organizadores e Arenas
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Guias e Dicas de Organização
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Aprenda como estruturar campeonatos de Beach Tennis, Futevôlei e Vôlei, montar chaves equilibradas e otimizar a rotina da sua arena
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUIDES_ARTICLES.slice(0, 4).map((article) => (
              <Link
                key={article.slug}
                to={`/guias/${article.slug}`}
                className={`p-6 rounded-2xl shadow-lg transition-all hover:scale-[1.02] flex flex-col justify-between border ${
                  darkMode ? 'bg-gray-700/80 border-gray-600 hover:bg-gray-700' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-xl'
                }`}
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 mb-3">
                    {article.category}
                  </span>
                  <h3 className={`text-lg font-bold mb-3 leading-snug ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {article.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600 text-xs">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {article.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-orange-500">
                    Ler guia
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/guias"
              className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 border-2 ${
                darkMode
                  ? 'border-orange-500 text-orange-400 hover:bg-orange-500/10'
                  : 'border-orange-600 text-orange-600 hover:bg-orange-50'
              }`}
            >
              Ver todos os {GUIDES_ARTICLES.length} guias completos
              <ChevronRight className="h-5 w-5" />
            </Link>
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
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter target={300} suffix="+" />
              </div>
              <div className="opacity-90">Torneios Criados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter target={1000} suffix="+" />
              </div>
              <div className="opacity-90">Participantes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter target={4000} suffix="+" />
              </div>
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

      <WhatsButton />

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