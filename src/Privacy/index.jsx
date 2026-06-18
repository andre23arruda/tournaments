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
        <h1 className={`text-center text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Política de Privacidade</h1>
        
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
            <p>Nos comprometemos a proteger seus dados de acordo com a Lei Geral de Proteção de Dados. Seus dados não são vendidos, alugados ou compartilhados com terceiros para fins publicitários sem seu consentimento explícito.</p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>4. Cookies</h2>
            <p>Utilizamos cookies para funções essenciais da plataforma (sessão de login, preferências como modo escuro) e também para exibição de anúncios personalizados por meio do <strong>Google AdSense</strong>. Os cookies do Google podem ser utilizados para veicular anúncios com base nas visitas anteriores do usuário a este e a outros sites na internet.</p>
            <p className="mt-2">Você pode desativar o uso de cookies pelo Google acessando as{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 underline hover:text-orange-600 transition-colors"
              >
                Configurações de anúncios do Google
              </a>.
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>5. Anúncios de Terceiros</h2>
            <p>O Pódio Digital utiliza o <strong>Google AdSense</strong>, um serviço de publicidade do Google LLC, para exibir anúncios em nossas páginas. O Google pode usar cookies e tecnologias similares para personalizar os anúncios exibidos com base nos seus interesses e histórico de navegação.</p>
            <p className="mt-2">Não temos controle sobre os anúncios exibidos pelo Google. Para mais informações sobre como o Google usa suas informações, acesse a{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 underline hover:text-orange-600 transition-colors"
              >
                Política de Privacidade do Google
              </a>.
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>6. Direitos do Usuário</h2>
            <p>Você tem o direito de solicitar o acesso, correção ou exclusão dos seus dados pessoais a qualquer momento, entrando em contato através do nosso canal oficial de suporte no WhatsApp.</p>
          </section>

          <p className="text-sm opacity-75 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            Última atualização: 06/2026
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} className="mt-12" />
    </div>
  );
}
