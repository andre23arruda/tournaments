import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../Components/MainFooter';
import Header from '../Components/MainHeader';
import { useTheme } from '../ThemeContext';
import { openWhats } from '../utils';

const FAQS = [
  {
    q: "É realmente fácil de usar?",
    a: "Sim! Criamos um ambiente intuitivo e amigável para que qualquer professor, gestor de arena ou organizador possa gerenciar torneios, aulas e quadras de forma simples e rápida, direto pelo celular ou computador."
  },
  {
    q: "Qual é a maior vantagem de usar o Pódio Digital?",
    a: "O seu único trabalho será chamar a galera para jogar! O Pódio Digital automatiza toda a parte trabalhosa: sorteio de grupos, cruzamento de duplas no Rei/Rainha da Quadra, cálculo de saldo de pontos, critérios de desempate, montagem da chave mata-mata e divulgação em tempo real."
  },
  {
    q: "O que é necessário para utilizar a plataforma?",
    a: "Para utilizar a plataforma, você precisa apenas de um navegador com acesso à internet (no celular, tablet ou computador). Não é exigida instalação de nenhum programa pesado."
  },
  {
    q: "Como funciona a contratação avulsa?",
    a: "Na contratação avulsa, você paga um pequeno valor por cada participante do seu torneio (R$ 1,00 por participante no formato Torneio tradicional ou R$ 2,00 no formato Rei/Rainha da Quadra). É ideal para eventos esporádicos sem mensalidade fixa."
  },
  {
    q: "O que está incluso na Mensalidade Premium?",
    a: "A Mensalidade Premium (R$ 80,00/mês) é voltada para arenas, clubes e professores que realizam eventos com frequência. Ela libera torneios ilimitados, eventos Rei/Rainha da Quadra ilimitados e ferramentas completas de gestão sem custo adicional por atleta inscrito."
  },
  {
    q: "Os atletas precisam baixar algum aplicativo para acompanhar os jogos?",
    a: "Não! O Pódio Digital funciona 100% na web. Você compartilha o link exclusivo ou o QR Code do torneio nos grupos de WhatsApp ou nas mesas da arena, e todos os atletas e torcedores acompanham placares, grupos e chaveamento ao vivo."
  },
  {
    q: "O sistema gera a chave mata-mata automaticamente?",
    a: "Sim. Assim que todos os jogos da fase de grupos são finalizados, o sistema aplica automaticamente os critérios de classificação (vitórias, saldo de games/pontos e pontos pró) e monta os confrontos das oitavas, quartas, semifinais e final."
  },
  {
    q: "Como funciona o formato Rei/Rainha da Quadra (Super 8)?",
    a: "No formato Rei/Rainha da Quadra, a inscrição é individual. O sistema gera automaticamente todas as rodadas para que cada atleta jogue ao lado de todos os outros participantes do grupo, somando vitórias e saldo de pontos individualmente até definir o campeão."
  },
  {
    q: "Como funciona o Agendamento de Aulas e Cadastro de Alunos?",
    a: "Os professores e gestores da arena podem cadastrar seus alunos, organizar turmas por nível ou modalidade e visualizar facilmente o calendário diário e semanal de aulas, evitando conflitos de horários nas quadras."
  },
  {
    q: "Como funciona o link para Reserva de Quadras?",
    a: "Sua arena recebe um link público exclusivo para compartilhar na bio do Instagram e no WhatsApp. Através dele, os jogadores consultam os horários disponíveis em tempo real e reservam a quadra desejada com praticidade."
  },
  {
    q: "Posso usar para outras modalidades além de Beach Tennis, Futevôlei e Vôlei?",
    a: "Sim! Nossa plataforma é flexível e atende perfeitamente campeonatos de Beach Tennis, Futevôlei, Vôlei de Praia, Padel, Tênis, Pickleball e outras modalidades disputadas em duplas, equipes ou individualmente."
  },
  {
    q: "Como são resolvidos os empates na fase de grupos?",
    a: "O sistema calcula tudo instantaneamente seguindo os critérios oficiais configurados no torneio: número de vitórias, saldo de pontos/games, pontos pró e confronto direto, eliminando erros de soma manual."
  }
];

export default function FAQ() {
  const { darkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    document.title = 'Perguntas Frequentes | Pódio Digital';
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
      <Header />

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
