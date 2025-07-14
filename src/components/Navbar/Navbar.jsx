import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopLangDropdownOpen, setIsDesktopLangDropdownOpen] = useState(false);
  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false);
  
  const desktopLangDropdownRef = useRef(null);
  const mobileLangDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopLangDropdownRef.current && !desktopLangDropdownRef.current.contains(event.target)) {
        setIsDesktopLangDropdownOpen(false);
      }
      if (mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(event.target)) {
        setIsMobileLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (lang, isMobile = false) => {
    i18n.changeLanguage(lang);
    if (isMobile) {
      setIsMobileLangDropdownOpen(false);
    } else {
      setIsDesktopLangDropdownOpen(false);
    }
  };

  const getCurrentLanguageShort = () => {
    switch(i18n.language) {
      case 'en': return 'ENG';
      case 'ru': return 'РУС';
      case 'kk': return 'ҚАЗ';
      default: return 'ENG';
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center px-4 pt-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="AIS hack" className="h-8" />
          </Link>

          <div className="flex items-center gap-6 px-6 py-2 rounded-full bg-white">
            <Link to="/" className="text-black/70 hover:text-black transition-colors text-sm lg:text-base">
              {t('nav.home')}
            </Link>
            <Link to="/about" className="text-black/70 hover:text-black transition-colors text-sm lg:text-base">
              {t('nav.about')}
            </Link>
            <a href="#prizes" className="text-black/70 hover:text-black transition-colors text-sm lg:text-base">
              {t('prizes.title')}
            </a>
            <a href="#location" className="text-black/70 hover:text-black transition-colors text-sm lg:text-base">
              {t('location.title')}
            </a>
            <a href="#registration" className="text-black/70 hover:text-black transition-colors text-sm lg:text-base">
              {t('registration.title')}
            </a>
            
            <a 
              href="#registration" 
              className="bg-black text-white px-4 lg:px-6 py-2 rounded-full hover:bg-black/90 transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              {t('nav.participate')}
            </a>
            
            {/* Языковой дропдаун для десктопа */}
            <div className="relative" ref={desktopLangDropdownRef}>
              <button
                type="button"
                onClick={() => setIsDesktopLangDropdownOpen(!isDesktopLangDropdownOpen)}
                className="flex items-center gap-1.5 text-black/70 hover:text-black transition-colors text-sm lg:text-base cursor-pointer"
                aria-expanded={isDesktopLangDropdownOpen}
                aria-haspopup="true"
              >
                <span>{getCurrentLanguageShort()}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isDesktopLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Выпадающее меню языков */}
              <div 
                className={`absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 origin-top-right z-50 ${
                  isDesktopLangDropdownOpen 
                    ? 'opacity-100 scale-100 transform translate-y-0' 
                    : 'opacity-0 scale-95 transform -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="py-1 w-36">
                  <button 
                    type="button"
                    onClick={() => changeLanguage('en')} 
                    className={`w-full text-left px-4 py-2 text-sm ${i18n.language === 'en' ? 'bg-gray-100 text-black' : 'text-black/70 hover:bg-gray-50'}`}
                  >
                    English
                  </button>
                  <button 
                    type="button"
                    onClick={() => changeLanguage('ru')} 
                    className={`w-full text-left px-4 py-2 text-sm ${i18n.language === 'ru' ? 'bg-gray-100 text-black' : 'text-black/70 hover:bg-gray-50'}`}
                  >
                    Русский
                  </button>
                  <button 
                    type="button"
                    onClick={() => changeLanguage('kk')} 
                    className={`w-full text-left px-4 py-2 text-sm ${i18n.language === 'kk' ? 'bg-gray-100 text-black' : 'text-black/70 hover:bg-gray-50'}`}
                  >
                    Қазақша
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between mx-4 mt-4">
          <Link to="/" className="flex items-center z-10">
            <img src={logo} alt="AIS hack" className="h-7 sm:h-8" />
          </Link>
          
          <div className="flex items-center gap-4 bg-white rounded-full px-5 py-2.5">
            {/* Языковой дропдаун для мобильных */}
            <div className="relative" ref={mobileLangDropdownRef}>
              <button 
                type="button"
                onClick={() => setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen)} 
                className="flex items-center gap-1 text-base font-medium text-black/70 hover:text-black min-w-[40px] cursor-pointer"
                aria-expanded={isMobileLangDropdownOpen}
                aria-haspopup="true"
              >
                <span>{getCurrentLanguageShort()}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isMobileLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Выпадающее меню языков для мобильных */}
              <div 
                className={`absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 origin-top-right z-50 ${
                  isMobileLangDropdownOpen 
                    ? 'opacity-100 scale-100 transform translate-y-0' 
                    : 'opacity-0 scale-95 transform -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="py-1 w-32">
                  <button 
                    type="button"
                    onClick={() => changeLanguage('en', true)} 
                    className={`w-full text-left px-4 py-2 text-sm ${i18n.language === 'en' ? 'bg-gray-100 text-black' : 'text-black/70 hover:bg-gray-50'}`}
                  >
                    English
                  </button>
                  <button 
                    type="button"
                    onClick={() => changeLanguage('ru', true)} 
                    className={`w-full text-left px-4 py-2 text-sm ${i18n.language === 'ru' ? 'bg-gray-100 text-black' : 'text-black/70 hover:bg-gray-50'}`}
                  >
                    Русский
                  </button>
                  <button 
                    type="button"
                    onClick={() => changeLanguage('kk', true)} 
                    className={`w-full text-left px-4 py-2 text-sm ${i18n.language === 'kk' ? 'bg-gray-100 text-black' : 'text-black/70 hover:bg-gray-50'}`}
                  >
                    Қазақша
                  </button>
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black/70 hover:text-black p-0.5"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-[calc(100%+0.75rem)] left-4 right-4 bg-white rounded-3xl p-6 z-40">
            <div className="flex flex-col space-y-5">
              <Link 
                to="/" 
                className="text-black/70 hover:text-black transition-colors text-sm"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/about" 
                className="text-black/70 hover:text-black transition-colors text-sm"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <a 
                href="#prizes" 
                className="text-black/70 hover:text-black transition-colors text-sm"
                onClick={() => setIsOpen(false)}
              >
                {t('prizes.title')}
              </a>
              <a 
                href="#location" 
                className="text-black/70 hover:text-black transition-colors text-sm"
                onClick={() => setIsOpen(false)}
              >
                {t('location.title')}
              </a>
              <a 
                href="#registration" 
                className="text-black/70 hover:text-black transition-colors text-sm"
                onClick={() => setIsOpen(false)}
              >
                {t('registration.title')}
              </a>
              <a 
                href="#registration" 
                className="w-full bg-black text-white py-2 rounded-full hover:bg-black/90 transition-colors text-sm text-center"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.participate')}
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar; 