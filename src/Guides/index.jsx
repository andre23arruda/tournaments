import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import Footer from '../Components/MainFooter';
import Header from '../Components/MainHeader';
import { useTheme } from '../ThemeContext';
import { GUIDES_ARTICLES } from './articles';
import { openWhats } from '../utils';

export default function Guides() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const activeArticle = slug
    ? GUIDES_ARTICLES.find((article) => article.slug === slug)
    : null;

  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} | Pódio Digital`;
    } else {
      document.title = 'Guias e Dicas para Torneios e Arenas | Pódio Digital';
    }
    window.scrollTo({ top: 0 });
  }, [activeArticle]);

  if (slug && !activeArticle) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Artigo não encontrado
          </h1>
          <p className="mb-8">O guia que você procura não existe ou foi movido.</p>
          <button
            onClick={() => navigate('/guias')}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl cursor-pointer"
          >
            Ver todos os guias
          </button>
        </main>
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
      <Header />

      {activeArticle ? (
        <main className="max-w-4xl mx-auto px-4 py-12">
          <Link
            to="/guias"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para todos os guias
          </Link>

          <article className={`p-8 md:p-12 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold mb-4">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                {activeArticle.category}
              </span>
              <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Clock className="h-3.5 w-3.5" />
                {activeArticle.readTime}
              </span>
              <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="h-3.5 w-3.5" />
                {activeArticle.date}
              </span>
            </div>

            <h1 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeArticle.title}
            </h1>

            <p className={`text-lg mb-8 pb-8 border-b leading-relaxed ${
              darkMode ? 'text-gray-300 border-gray-700' : 'text-gray-600 border-gray-200'
            }`}>
              {activeArticle.excerpt}
            </p>

            <div className="space-y-8">
              {activeArticle.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-base md:text-lg leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-3 pt-2">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                          <span className="text-base leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* CTA inside article */}
            <div className={`mt-12 p-6 md:p-8 rounded-2xl border ${
              darkMode ? 'bg-gray-900/70 border-gray-700' : 'bg-orange-50 border-orange-200'
            }`}>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quer automatizar seus torneios e a gestão da sua arena?
              </h3>
              <p className="mb-6">
                Com o Pódio Digital você gera chaves, calcula classificações de grupos, organiza Rei/Rainha da Quadra, agenda aulas e disponibiliza link de reserva de quadras em segundos.
              </p>
              <button
                onClick={openWhats}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all hover:scale-105 cursor-pointer"
              >
                Falar com a equipe no WhatsApp
              </button>
            </div>
          </article>

          {/* Related articles */}
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Leia também outros guias
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {GUIDES_ARTICLES.filter((a) => a.slug !== activeArticle.slug)
                .slice(0, 4)
                .map((item) => (
                  <Link
                    key={item.slug}
                    to={`/guias/${item.slug}`}
                    className={`p-6 rounded-xl shadow transition-all hover:scale-[1.01] flex flex-col justify-between ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-orange-500">
                        {item.category}
                      </span>
                      <h3 className={`text-lg font-bold mt-1 mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h3>
                      <p className="text-sm line-clamp-2">{item.excerpt}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 mt-4">
                      Ler artigo completo
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </main>
      ) : (
        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-orange-500/10 text-orange-500 border border-orange-500/20">
              <BookOpen className="h-4 w-4" />
              Central de Conhecimento Esportivo
            </div>
            <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Guias de Organização de Torneios e Gestão de Arenas
            </h1>
            <p className="text-lg leading-relaxed">
              Artigos práticos, regulamentos, dicas de chaveamento e estratégias para professores e organizadores de Beach Tennis, Futevôlei e Vôlei de Praia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {GUIDES_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                to={`/guias/${article.slug}`}
                className={`p-8 rounded-2xl shadow-md transition-all hover:scale-[1.01] hover:shadow-xl flex flex-col justify-between border ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-3">
                    <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 opacity-75">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className={`text-xl md:text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {article.title}
                  </h2>

                  <p className="text-sm md:text-base leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs opacity-70">{article.date}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-orange-500">
                    Ler guia completo
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      )}

      <Footer darkMode={darkMode} className="mt-12" />
    </div>
  );
}
