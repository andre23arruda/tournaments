import { useState, useEffect, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Sun, Moon, Lock, Menu, X } from 'lucide-react';
import { openWhats } from '../utils';

const NavLink = memo(({ to, children, mobile, darkMode, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: to } });
    } else {
      const element = document.getElementById(to);
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    if (mobile && setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <span
      onClick={handleClick}
      className={`font-semibold cursor-pointer transition-colors ${
        mobile
          ? `block px-3 py-2 text-base ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-orange-600'}`
          : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-orange-600'}`
      }`}
    >
      {children}
    </span>
  );
});
NavLink.displayName = 'NavLink';

export default function Header({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', String(newTheme));
  };

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToLogin = () => navigate('/login');


  const isHome = location.pathname === '/';
  
  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    (scrolled || !isHome)
      ? (darkMode ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-md')
      : (darkMode ? 'bg-transparent' : 'bg-transparent')
  }`;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={scrollToTop}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
            >
              <Trophy className={`h-8 w-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pódio
                <span className={`ml-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Digital
                </span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="features" darkMode={darkMode}>
                Funcionalidades
              </NavLink>
              <NavLink to="examples" darkMode={darkMode}>
                Torneios
              </NavLink>
              <NavLink to="pricing" darkMode={darkMode}>
                Planos
              </NavLink>

              <button
                onClick={toggleTheme}
                className={`cursor-pointer p-2 rounded-full transition-colors ${
                  darkMode
                    ? 'hover:bg-gray-800 text-yellow-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                onClick={goToLogin}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
                }`}
              >
                <Lock size={18} />
                <span>Entrar</span>
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
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}
                aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={darkMode ? 'text-white' : 'text-gray-900'}
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 w-full h-screen z-30 p-4 flex flex-col ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex flex-col space-y-2">
              <NavLink mobile to="features" darkMode={darkMode} setIsMobileMenuOpen={setIsMobileMenuOpen}>Funcionalidades</NavLink>
              <NavLink mobile to="examples" darkMode={darkMode} setIsMobileMenuOpen={setIsMobileMenuOpen}>Torneios</NavLink>
              <NavLink mobile to="pricing" darkMode={darkMode} setIsMobileMenuOpen={setIsMobileMenuOpen}>Planos</NavLink>

              <div>
                <button
                  onClick={openWhats}
                  className="mt-8 w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-lg cursor-pointer"
                >
                  Contato
                </button>

                <button
                  onClick={goToLogin}
                  className="mt-4 flex bg-orange-600 hover:bg-orange-700 text-white items-center justify-center gap-2 w-full py-4 mb-2 rounded-lg font-bold border-2 cursor-pointer"
                >
                  <Lock size={20} />
                  Entrar
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from going under the fixed navbar on non-home pages */}
      {!isHome && <div className="h-20" />}
    </>
  );
}
