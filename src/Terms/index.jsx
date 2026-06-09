import { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';

export default function Terms() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.title = 'Termos de Uso | Pódio Digital';
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className={`text-center text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Termos de Uso</h1>
        
        <div className={`space-y-6 p-8 rounded-2xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>1. Aceitação dos Termos</h2>
            <p>Ao acessar e usar o Pódio Digital, você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve usar nossa plataforma.</p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>2. Descrição do Serviço</h2>
            <p>O Pódio Digital é uma plataforma SaaS (Software as a Service) desenvolvida para facilitar a gestão e organização de torneios esportivos amadores, oferecendo ferramentas para criação de chaves, rankings e acompanhamento de resultados.</p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>3. Cadastro e Segurança</h2>
            <p>Para utilizar algumas funcionalidades, pode ser necessário criar uma conta. Você é responsável por manter a confidencialidade das suas credenciais e por todas as atividades que ocorrem sob sua conta.</p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>4. Planos e Pagamentos</h2>
            <p>Oferecemos diferentes opções de planos (avulsos e assinaturas). Os valores e as funcionalidades de cada plano estão descritos na nossa página principal. O Pódio Digital reserva-se o direito de alterar os preços mediante aviso prévio.</p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>5. Uso Adequado</h2>
            <p>Você concorda em usar a plataforma apenas para fins legais e de maneira que não infrinja os direitos de terceiros, nem restrinja ou iniba o uso da plataforma por qualquer outra pessoa.</p>
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
