import { useNavigate, Link } from 'react-router-dom';
import { Trophy, Instagram, Facebook } from 'lucide-react';

export default function Footer({ darkMode, className = '' }) {
  const navigate = useNavigate();

  return (
    <footer className={`py-12 ${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } border-t ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="flex justify-center items-center gap-2 mb-1 cursor-pointer" onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/');
            }}>
              <Trophy className={`h-8 w-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pódio
                <span className={`ml-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Digital
                </span>
              </span>
            </div>
            <p className={`text-center md:text-left mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Torneios de um jeito fácil e totalmente digital!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 flex-1 justify-center">
            <div className="flex flex-col gap-3 text-center md:text-left">
              <Link to="/sobre" className={`hover:text-orange-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sobre nós</Link>
              <Link to="/ajuda" className={`hover:text-orange-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ajuda</Link>
            </div>
            <div className="flex flex-col gap-3 text-center md:text-left">
              <Link to="/termos" className={`hover:text-orange-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Termos de uso</Link>
              <Link to="/privacidade" className={`hover:text-orange-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Privacidade</Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 flex-1">
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/podiodigital.oficial"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-transform hover:scale-110 ${
                  darkMode ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-600'
                }`}
                aria-label="Siga-nos no Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>

              <a
                href="https://www.facebook.com/people/P%C3%B3dio-Digital/61583940248196/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-transform hover:scale-110 ${
                  darkMode ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-600'
                }`}
                aria-label="Curta nossa página no Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
            <p className="text-sm opacity-60 text-center md:text-right">
              &copy; {new Date().getFullYear()} Pódio Digital. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
