import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';

// Кастом иконка TikTok
const TikTokIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.6 5.82C16.4 5.24 16.4 4.5 16.4 4H13.2V16.94C13.2 18.44 12.12 19.7 10.5 19.7C9.72 19.7 9.06 19.34 8.58 18.86C8.1 18.26 7.8 17.52 8.04 16.76C8.28 15.64 9.42 14.84 10.68 14.96C11.04 15.08 11.4 15.2 11.64 15.44V12.14C11.4 12.02 11.04 12.02 10.8 12.02C8.1 12.02 6 14.24 6 16.94C6 18.8 6.96 20.36 8.46 21.16C9.3 21.64 10.2 21.88 11.16 21.88C14.1 21.88 16.5 19.46 16.5 16.5V9.94C17.52 10.66 18.72 11.14 20.04 11.14V7.94C18.84 8.06 17.58 7.1 16.6 5.82Z"
      fill="white"
    />
  </svg>
);

// Кастом иконка Instagram
const InstagramIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"
      fill="white"
    />
    <path
      d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
      fill="white"
    />
  </svg>
);

// Кастом иконка Telegram
const TelegramIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.2603 2.75061C21.5338 2.11256 20.4703 1.9362 19.3992 2.32434L2.63404 8.55379C1.37746 9.01344 0.861343 9.7356 0.877575 10.6467C0.889977 11.3591 1.37746 12.0813 2.75765 12.5081L5.78251 13.5247L7.91261 19.2984C8.12841 19.9036 8.81112 20.259 9.4448 19.9365C9.60673 19.8534 9.75617 19.7414 9.87978 19.6065L12.1332 17.126L15.9396 20.0529C16.2421 20.2902 16.6069 20.4146 16.9841 20.4146C17.318 20.4146 17.6395 20.3191 17.924 20.1343C18.4847 19.7477 18.8 19.0817 18.8 18.3469V4.08196C18.8 3.57047 18.6134 3.07142 18.2487 2.71062C18.2487 2.72306 18.2487 2.72306 18.2487 2.72306C18.2487 2.72306 18.2487 2.72306 18.2487 2.71062C18.2487 2.71062 18.2487 2.71062 18.2487 2.69818C18.2611 2.72306 18.2611 2.73552 18.2734 2.74794L22.26 2.75061H22.2603ZM9.43233 17.4631L8.21389 14.3658L14.2867 9.11222L7.85003 13.4354C7.77499 13.3522 7.68749 13.2812 7.58753 13.2225L4.10259 11.9882L20.8678 5.75881L9.43201 17.4631H9.43233Z"
      fill="white"
    />
  </svg>
);

const SocialIcon = ({ customIcon, label, href }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors group"
      aria-label={label}
    >
      <div className="opacity-70 group-hover:opacity-100 transition-opacity">
        {React.cloneElement(customIcon)}
      </div>
    </a>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#090909] pt-12 pb-8 overflow-hidden">
      <div 
        className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white/20 to-transparent opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Hackathon Logo" className="h-8" />
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} {t('footer.copyright')}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Made by <a href="https://www.instagram.com/alpuw" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Alpamys</a> &lt;3
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t('nav.home')}
            </a>
            <a href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t('nav.about')}
            </a>
            <a href="#prizes" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t('prizes.title')}
            </a>
            <a href="#location" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t('location.title')}
            </a>
            <a href="#registration" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t('registration.title')}
            </a>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <SocialIcon 
              label="Instagram" 
              href="https://www.instagram.com/ais_hack/" 
              customIcon={<InstagramIcon />}
            />
            <SocialIcon 
              label="TikTok" 
              href="https://www.tiktok.com/@ais_hackathon" 
              customIcon={<TikTokIcon />}
            />
            <SocialIcon 
              label="Telegram" 
              href="https://t.me/@aqbobekhackofficial" 
              customIcon={<TelegramIcon />}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 