import { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';

export default function Privacy() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.title = 'Política de Privacidade | Pódio Digital';
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Política de Privacidade</h1>
        
        <div className={`space-y-6 p-8 rounded-2xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>1. Coleta de Dados</h2>
            <p>O Pódio Digital coleta informações pessoais fornecidas por você no momento do cadastro e na contratação de planos, como nome, telefone e dados do torneio. Também coletamos dados de uso para melhorar a experiência na plataforma.</p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>2. Uso das Informações</h2>
            <p>As informações coletadas são utilizadas exclusivamente para prestação dos nossos serviços, suporte ao cliente, comunicação sobre atualizações e melhorias contínuas na plataforma.</p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>3. Proteção de Dados (LGPD)</h2>
            <p>Nos comprometemos a proteger seus dados de acordo com a Lei Geral de Proteção de Dados. Seus dados não são vendidos, alugados ou compartilhados com terceiros para fins publicitários sem seu consentimento.</p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>4. Cookies</h2>
            <p>Utilizamos cookies apenas para funções essenciais da plataforma, como manter sua sessão ativa (login) e salvar suas preferências (ex: modo escuro).</p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>5. Direitos do Usuário</h2>
            <p>Você tem o direito de solicitar o acesso, correção ou exclusão dos seus dados pessoais a qualquer momento, entrando em contato através do nosso canal oficial de suporte no WhatsApp.</p>
          </section>

          <p className="text-sm opacity-75 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} className="mt-12" />
    </div>
  );
}
