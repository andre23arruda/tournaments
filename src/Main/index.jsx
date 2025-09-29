import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Calendar, CheckCircle, Clock, Medal, Target, Trophy, Users } from 'lucide-react';
import { openWhats } from '../utils';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = 'Pódio Digital | Torneios e Jogos de um jeito fácil e totalmente digital!';
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // const toggleTheme = () => {
  //   const newDarkMode = !darkMode;
  //   setDarkMode(newDarkMode);
  //   localStorage.setItem('darkMode', newDarkMode);
  // };

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-orange-50 via-white to-purple-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
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
                title="Entre em contato"
                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg cursor-pointer bg-orange-600 hover:bg-orange-700 text-white">
                Entre em contato
              </button>

              <Link to="https://youtu.be/N6G-DkHiEZ4">
                <button className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 cursor-pointer ${darkMode
                  ? 'border-2 border-gray-600 hover:bg-gray-800 text-gray-300'
                  : 'border-2 border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}>
                  Ver demonstração
                </button>
              </Link>
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

      {/* Features Section */}
      <div className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
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
                className={`p-6 rounded-xl transition-all hover:scale-105 shadow-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-xl'
                  }`}
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

      {/* Examples Section */}
      <div className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
                  <div className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-orange-500 to-gray-400'} text-white`}>
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

      {/* CTA Section */}
      <div className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-orange-600 to-gray-400'} text-white`}>
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
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="opacity-90">Jogadores</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="opacity-90">Jogos Registrados</div>
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
    </div>
  );
}