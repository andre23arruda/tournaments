import { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { Trophy, Target, Users, Zap } from 'lucide-react';

export default function About() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.title = 'Sobre Nós | Pódio Digital';
    window.scrollTo({ top: 0 });
  }, []);

  const features = [
    { icon: Target, title: "Missão", desc: "Transformar a experiência de organização e participação em torneios, tornando o processo mais simples e eficiente." },
    { icon: Users, title: "Visão", desc: "Ser uma plataforma fácil de usar para organização de torneios." },
    { icon: Zap, title: "Valores", desc: "Paixão pelo esporte, transparência e simplicidade." }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex justify-center items-center p-4 rounded-full bg-orange-100 mb-6">
            <Trophy className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Facilitando a gestão de torneios amadores
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Organizar torneios no papel é confuso, lento e tira o foco do que realmente importa: <strong className={darkMode ? 'text-white' : 'text-gray-900'}>o jogo.</strong>
          </p>
        </div>

        <div className={`rounded-2xl shadow-xl overflow-hidden mb-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-8 md:p-12">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>De uma dor na quadra para um projeto validado</h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Tudo começou observando nosso professor de Beach Tennis "quebrando a cabeça".
              </p>
              <p>
                Ele tentava organizar um Rei da Quadra na mão. Para 4 ou 8 pessoas, a matemática até funciona. Mas quando sobe para 12 ou 16 jogadores? O cruzamento de duplas (onde todos jogam com todos) e o cálculo de vitórias e saldo de pontos viram um caos. A chance de erro é enorme e o tempo perdido é grande.
              </p>
              <p>
                Como desenvolvedores, vimos ali uma oportunidade de ajudar e decidimos criar uma solução. Assim nasceu o Pódio Digital.
              </p>
              <p>
                O desenvolvimento foi uma experiência interessante por si só:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 mb-4">
                <li><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Validação real:</strong> Liberamos para o pessoal da arena usar. O feedback deles foi crucial para encontrar erros e ajustar a usabilidade.</li>
                <li><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Inovação:</strong> Tivemos a ideia de gerar um Link/QR Code para que os jogadores acompanhassem os placares em tempo real pelo celular. Isso mudou a experiência de quem joga.</li>
              </ul>
              <p>
                O que era apenas para o "Rei da Quadra" evoluiu para um gestor de Torneios (fase de grupos, mata-mata, finais).
              </p>
              <p>
                Hoje, o projeto que era apenas para facilitar a vida do nosso professor está online e auxiliando outras arenas e atletas.
              </p>
              <p className={`font-semibold mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                É muito gratificante ver a proporção que um projeto toma quando resolve uma dor real.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className={`p-8 rounded-2xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <div className="flex justify-center mb-4">
                <item.icon className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} className="mt-12" />
    </div>
  );
}
