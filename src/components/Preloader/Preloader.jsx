import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  
  // Массив мотивационных цитат от IT-гигантов
  const quotes = {
    ru: [
      "«Инновации отличают лидера от догоняющего» — Стив Джобс",
      "«Код — это поэзия» — WordPress",
      "«Сделайте что-то, что изменит мир» — Ларри Пейдж",
      "«Простота — это предельная сложность» — Леонардо да Винчи",
      "«Технологии должны улучшать жизнь, а не усложнять её» — Сатья Наделла"
    ],
    en: [
      "\"Innovation distinguishes between a leader and a follower\" — Steve Jobs",
      "\"Code is poetry\" — WordPress",
      "\"Make something that will change the world\" — Larry Page",
      "\"Simplicity is the ultimate sophistication\" — Leonardo da Vinci",
      "\"Technology should improve life, not complicate it\" — Satya Nadella"
    ]
  };
  
  const randomQuote = quotes[i18n.language === 'ru' ? 'ru' : 'en'][Math.floor(Math.random() * quotes[i18n.language === 'ru' ? 'ru' : 'en'].length)];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [loading]);
  
  if (!loading) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090909] transition-opacity duration-500 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-white border-opacity-20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin-smooth"></div>
      </div>
      
      <p className="text-white text-center max-w-md px-6 text-lg font-light italic">
        {randomQuote}
      </p>
    </div>
  );
};

export default Preloader; 