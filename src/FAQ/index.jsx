import { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { openWhats } from '../utils';

const FAQS = [
  {
    q: "É realmente fácil de usar?",
    a: "Sim! Criamos um ambiente intuitivo e amigável para que você possa gerenciar seus torneios de forma simples e rápida."
  },
  {
    q: "Qual é a maior dificuldade?",
    a: "O seu desafio é chamar a galera para jogar! O Pódio Digital cuida de todo o resto: classificação, chaveamento e exibição dos resultados."
  },
  {
    q: "O quê é necessário para utilizar a plataforma?",
    a: "Para utilizar a plataforma, você precisa apenas de um dispositivo com acesso à internet (celular ou computador)."
  },
  {
    q: "Como funciona a contratação avulsa?",
    a: "Na contratação avulsa, você paga um pequeno valor por cada participante do seu torneio. É ideal para eventos esporádicos. Ao finalizar, criamos o ambiente do seu torneio e você pode gerenciar tudo até o campeão ser definido."
  },
  {
    q: "O que está incluso na Mensalidade Premium?",
    a: "A mensalidade é focada em arenas e organizadores frequentes. Você tem direito a criar torneios ilimitados (formato tradicional ou Rei/Rainha da Quadra) sem custo adicional por participante."
  },
  {
    q: "Os atletas precisam baixar algum aplicativo?",
    a: "Não! O Pódio Digital funciona 100% no navegador (celular ou computador). Você simplesmente compartilha o link ou QR Code do torneio e todos conseguem acompanhar os jogos, placares e classificação em tempo real."
  },
  {
    q: "O sistema gera a chave mata-mata automaticamente?",
    a: "Sim. Ao encerrar a fase de grupos, o sistema verifica a classificação e monta a chave eliminatória (mata-mata) de forma automática, economizando seu tempo."
  },
  {
    q: "Posso usar para outras modalidades além de Beach Tennis e Vôlei?",
    a: "Sim! Nossa plataforma é flexível e pode ser utilizada para diversas modalidades esportivas."
  }
];

export default function FAQ() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    document.title = 'Perguntas Frequentes | Pódio Digital';
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-center text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Perguntas Frequentes
          </h1>
          <p className="text-lg">Tire suas dúvidas sobre o funcionamento do Pódio Digital</p>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`rounded-xl overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}
            >
              <button
                className={`cursor-pointer w-full px-6 py-4 flex items-center justify-between font-semibold text-left focus:outline-none ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-50'}`}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span>{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-orange-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 py-4 border-t' : 'max-h-0'
                } ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50/50'}`}
              >
                <p className="leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4">Não encontrou o que procurava?</p>
          <button 
            onClick={openWhats}
            className="cursor-pointer px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all shadow-md hover:scale-105"
          >
            Falar com Suporte
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} className="mt-12" />
    </div>
  );
}
