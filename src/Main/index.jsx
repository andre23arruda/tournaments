import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, Calendar, CheckCircle, Clock, Medal, Target,
  Trophy, Users, X, Crown, Menu, Sun, Moon
} from 'lucide-react';import { openWhats } from '../utils';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = 'Pódio Digital | Torneios de um jeito fácil e totalmente digital!';
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    // Detectar scroll para mudar estilo da navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showVideoModal || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showVideoModal, isMobileMenuOpen]);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode)
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Trophy,
      title: 'Gestão de Torneios',
      description: 'Crie e gerencie torneios de forma simples e eficiente',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      title: 'Rankings Dinâmicos',
      description: 'Acompanhe classificações do jogadores',
      color: 'text-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Estatísticas Detalhadas',
      description: 'Visualize vitórias, derrotas, pontos e saldo de cada participante',
      color: 'text-green-500'
    },
    {
      icon: Calendar,
      title: 'Histórico Completo',
      description: 'Mantenha registro de todos os torneios e resultados',
      color: 'text-purple-500'
    }
  ];

  const examples = [
    {
      title: 'OPEN FEMININO 2025',
      subtitle: '15/11/2025',
      status: 'Finalizado',
      participants: '8 duplas',
      games: 15,
      link: '/torneio-v2/open-feminino-2025_bbEmdkwj'
    },
    {
      title: 'Mista Sorteada CBS',
      subtitle: '14/11/2025',
      status: 'Finalizado',
      participants: '14 duplas',
      games: 26,
      link: '/torneio-v2/mista-sorteada-cbs_pa7b24Ew'
    },
    {
      title: 'Torneio Interno Masculino PNA - Etapa Chiquinho',
      subtitle: '24/10/2025',
      status: 'Finalizado',
      participants: '5 duplas',
      games: 11,
      link: '/torneio-v2/torneio-interno-masculino-pna_ujDgztsJ'
    },
    {
      title: '1º OPEN MASCULINO ARENA BEACH SPORTS',
      subtitle: '13/09/2025',
      status: 'Finalizado',
      participants: '8 duplas',
      games: 15,
      link: '/torneio/1o-open-masculino-arena-beach-sports_cFB5efcx'
    },
    {
      title: '1° TORNEIO DE FUTEVÔLEI - PRIME BEACH - Misto',
      subtitle: '13/09/2025',
      status: 'Finalizado',
      participants: '13 duplas',
      games: 23,
      link: '/torneio/1-torneio-de-futevolei-prime-beach-misto_QL5CBq3y'
    },
    {
      title: '1° TORNEIO DE FUTEVÔLEI - PRIME BEACH - Masculino',
      subtitle: '13/09/2025',
      status: 'Finalizado',
      participants: '13 duplas',
      games: 23,
      link: '/torneio/1-torneio-de-futevolei-prime-beach-masculino_u8rN6D6Z'
    },
    {
      title: 'SUPER SEXTA ARENA BEACH SPORTS',
      subtitle: '12/09/2025',
      status: 'Finalizado',
      participants: '7 duplas',
      games: 12,
      link: '/torneio/super-sexta-arena-beach-sports_DjovRQBr'
    },
    {
      title: 'TORNEIO RELÂMPAGO ARENA BEACH SPORTS',
      subtitle: '06/09/2025',
      status: 'Finalizado',
      participants: '8 duplas',
      games: 15,
      link: '/torneio/torneio-relampago-arena-beach-sports_zQhCZXFP'
    },
    {
      title: 'REI DA QUADRA OPEN',
      subtitle: '26/07/2025',
      status: 'Finalizado',
      participants: '12 jogadores',
      games: 33,
      link: '/rei-rainha/rei-da-quadra-open_aVikY52a'
    },
  ];

  const pricing = [
    {
      name: 'Torneio Avulso',
      sub: 'Sem compromisso',
      price: 'R$ 1,00',
      per: 'por participante',
      icon: Trophy,
      color: 'text-blue-500',
      features: [
        'Organização de 1 torneio',
        'Cálculo automático de pontuações',
        'Classificações de grupos automáticas',
        'Mata-mata gerado automaticamente',
        'Link para participantes acompanharem os jogos',
      ],
      highlight: false,
      buttonText: 'Contratar Avulso',
    },
    {
      name: 'Mensalidade Premium',
      sub: 'Perfeito para quem joga muito',
      price: 'R$ 80,00',
      per: 'por mês',
      icon: Crown
      ,
      color: 'text-orange-500',
      features: [
        'Torneios ilimitados',
        'Rei/Rainha ilimitados',
        'Jogos gerados automaticamente',
        'Cálculo automático de pontuações',
        'Classificação automática',
        'Mata-mata gerado automaticamente',
        'Link para participantes acompanharem os jogos',
      ],
      highlight: true,
      buttonText: 'Assinar Mensalidade',
    },
    {
      name: 'Rei/Rainha Avulso',
      sub: 'Fácil e Rápido',
      price: 'R$ 2,00',
      per: 'por participante',
      icon: Medal,
      color: 'text-green-500',
      features: [
        'Organização de 1 evento Rei/Rainha',
        'Jogos gerados automaticamente',
        'Cálculo automático de pontuações',
        'Classificação automática',
        'Link para participantes acompanharem os jogos',
      ],
      highlight: false,
      buttonText: 'Contratar Avulso',
    },
  ];

  const NavLink = ({ to, children, mobile }) => (
    <button
      onClick={() => scrollToSection(to)}
      className={`font-medium transition-colors hover:text-orange-500 ${
        mobile
          ? 'block w-full text-left py-4 text-lg border-b border-gray-100 dark:border-gray-800'
          : ''
      } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
    >
      {children}
    </button>
  );

  return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-orange-50 via-white to-purple-50 text-gray-900'}`}>

        {/* --- NAVBAR --- */}
        <nav className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          scrolled
            ? (darkMode ? 'bg-gray-900/90 shadow-lg backdrop-blur-md border-b border-gray-800' : 'bg-white/90 shadow-lg backdrop-blur-md border-b border-gray-200')
            : (darkMode ? 'bg-transparent border-gray-800' : 'bg-transparent border-gray-200')
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">

              {/* Logo */}
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <Trophy className={`h-8 w-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Pódio<span className={darkMode ? 'text-orange-400' : 'text-orange-600'}>Digital</span>
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <NavLink to="features"><span className="cursor-pointer">Funcionalidades</span></NavLink>
                <NavLink to="examples"><span className="cursor-pointer">Torneios</span></NavLink>
                <NavLink to="pricing"><span className="cursor-pointer">Planos</span></NavLink>

                <button onClick={toggleTheme} className={`cursor-pointer p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
                <button onClick={toggleTheme} className={`p-2 rounded-full ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={darkMode ? 'text-white' : 'text-gray-900'}>
                  {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className={`md:hidden absolute top-20 left-0 w-full h-screen z-30 p-4 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex flex-col space-y-2">
                <NavLink mobile to="features">Funcionalidades</NavLink>
                <NavLink mobile to="examples">Torneios</NavLink>
                <NavLink mobile to="pricing">Planos</NavLink>
                <button
                  onClick={openWhats}
                  className="mt-8 w-full py-4 bg-orange-600 text-white rounded-lg font-bold text-lg"
                >
                  Contato
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section - Adicionado pt-20 para compensar a navbar fixa */}
        <div className="pt-20 min-h-screen flex flex-col justify-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center">
              <div className="flex justify-center mb-8 animate-bounce-slow">
                <Trophy className={`h-24 w-24 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>

              <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pódio
                <span className={`ml-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Digital
                </span>
              </h1>

              <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Torneios de um jeito fácil e totalmente digital!
                <br />
                Acompanhe os jogos na palma da sua mão.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openWhats}
                  className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg cursor-pointer bg-orange-600 hover:bg-orange-700 text-white">
                  Entre em contato
                </button>

                <button
                  onClick={() => setShowVideoModal(true)}
                  className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 cursor-pointer ${darkMode
                    ? 'border-2 border-gray-600 hover:bg-gray-800 text-gray-300'
                    : 'border-2 border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}>
                  Ver demonstração
                </button>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className={`absolute top-20 left-10 opacity-20 ${darkMode ? 'text-orange-400' : 'text-orange-200'}`}>
            <Medal className="h-24 w-24" />
          </div>

          <div className={`absolute bottom-20 right-10 opacity-20 ${darkMode ? 'text-orange-400' : 'text-orange-200'}`}>
            <Target className="h-32 w-32" />
          </div>
        </div>

        {/* Features Section - Adicionado ID para scroll */}
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
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all hover:scale-105 shadow-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-xl'}`}
                >
                  <div className="flex justify-center mb-4">
                    <feature.icon className={`h-12 w-12 ${feature.color}`} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Examples Section - Adicionado ID para scroll */}
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
              {examples.map((example, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden shadow-lg transition-all hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <Link to={example.link}>
                    <div className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-orange-600 to-yellow-500'} text-white`}>
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
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${example.status === 'Finalizado'
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
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section - Adicionado ID para scroll */}
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
              {pricing.map((plan, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-xl shadow-2xl transition-all duration-300 ${plan.highlight
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

                  <h3 className={`text-2xl font-bold text-center mb-2 ${(plan.highlight || darkMode) ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>

                  <p className={`text-center mb-6 ${(plan.highlight || darkMode) ? 'text-orange-100' : 'text-gray-600'}`}>
                    {plan.sub}
                  </p>

                  <div className="text-center mb-8">
                    <span className={`text-5xl font-extrabold ${(plan.highlight || darkMode) ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xl font-medium ml-1 ${(plan.highlight || darkMode) ? 'text-orange-100' : 'text-gray-500'}`}>
                      {plan.per}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-10">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className={`h-5 w-5 mr-3 flex-shrink-0 ${plan.highlight ? 'text-yellow-400' : 'text-green-500'}`} />
                        <span className={`${plan.highlight ? 'text-white' : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* <div className="text-center">
                     <button className={`w-full py-3 rounded-lg font-bold transition-colors ${
                        plan.highlight
                        ? 'bg-white text-orange-600 hover:bg-gray-100'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                     }`}>
                        {plan.buttonText}
                     </button>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-orange-600 to-gray-400'} text-white`}>
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
        <footer className={`py-12 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Trophy className={`h-8 w-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pódio
                <span className={`ml-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Digital
                </span>
              </span>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Torneios de um jeito fácil e totalmente digital!
            </p>
          </div>
        </footer>

        {showVideoModal && (
          <div
            className="fixed inset-0 bg-[#00000069] z-50 flex flex-col items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="z-10 bg-orange-400 bg-opacity-50 hover:bg-orange-600 text-white rounded-full p-2 transition-all mb-4 hover:cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div
              className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/N6G-DkHiEZ4?autoplay=1&controls=0&disablekb=1"
                  title="Demonstração Pódio Digital"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
  );
}