import { useState, useEffect, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Moon, RefreshCw, Share2, Sun, Trophy, X } from 'lucide-react';
import { useTheme } from '../../ThemeContext';


const NavLink = memo(({ to, children, mobile, setIsMobileMenuOpen }) => {
  const { darkMode } = useTheme();
  const scroll = (to) => {
    const element = document.getElementById(to);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    scroll(to);
    window.history.replaceState(null, null, `#${to}`);

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


export default function TournamentHeader({ loadData, links = [] }) {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 20;
      setScrolled((prev) => (prev !== shouldScroll ? shouldScroll : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // toggleTheme is consumed directly from useTheme context

  const handleShare = async () => {
    const currentUrl = window.location.href;
    window.open(`https://wa.me/?text=Acompanhe *${document.title}* via Pódio Digital: ${currentUrl}`, '_blank');
  };

  const handleReload = () => {
    if (loadData) {
      loadData();
    } else {
      window.location.reload();
    }
  };

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isHome = location.pathname === '/';
  
  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    (scrolled || !isHome || isMobileMenuOpen)
      ? (darkMode ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-md')
      : (darkMode ? 'bg-transparent' : 'bg-transparent')
  }`;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="max-w-8xl container mx-auto px-4 sm:px-6 lg:px-8">
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
              {links.map((link, index) => (
                <NavLink key={index} to={link.to}>
                  {link.label}
                </NavLink>
              ))}

              <button
                onClick={handleShare}
                className={`cursor-pointer p-2 rounded-full transition-colors ${
                  darkMode
                    ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-orange-600'
                }`}
                aria-label="Compartilhar link"
                title='Compartilhar'
              >
                <Share2 className="h-5 w-5" />
              </button>

              <button
                onClick={handleReload}
                className={`cursor-pointer p-2 rounded-full transition-colors ${
                  darkMode
                    ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-orange-600'
                }`}
                aria-label="Recarregar dados"
                title='Recarregar'
              >
                <RefreshCw className="h-5 w-5" />
              </button>

              <button
                onClick={toggleTheme}
                className={`cursor-pointer p-2 rounded-full transition-colors ${
                  darkMode
                    ? 'hover:bg-gray-800 text-yellow-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
                title={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={handleShare}
                className={`p-2 rounded-full ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                aria-label="Compartilhar link"
                title='Compartilhar'
              >
                <Share2 className="h-5 w-5" />
              </button>

              <button
                onClick={handleReload}
                className={`p-2 rounded-full ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                aria-label="Recarregar dados"
                title='Recarregar'
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}
                aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
                title={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={darkMode ? 'text-white' : 'text-gray-900'}
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                title={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 w-full z-30 p-4 flex flex-col ${
            darkMode ? 'bg-orange-700/90' : 'bg-orange-600/90'
          }`}>
            <div className="flex flex-col space-y-2">
              {links.map((link, index) => (
                <NavLink 
                  mobile 
                  key={index} 
                  to={link.to} 
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from going under the fixed navbar on non-home pages */}
      {!isHome && <div className="h-20" />}
    </>
  );
}
