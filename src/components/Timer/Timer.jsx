import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Timer = () => {
  const { t } = useTranslation();
  
  const calculateTimeLeft = () => {
    const targetDate = new Date(Date.UTC(2025, 3, 5, 4, 0)); 
    
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Обновление каждую минуту

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#090909] flex justify-center px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-[1920px]">
        <div className="bg-white rounded-[32px] py-6 md:py-8 lg:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 md:justify-between px-6 sm:px-8 md:px-12 lg:px-16">
            {/* Таймер */}
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs md:text-sm text-black/60 uppercase mt-1.5 md:mt-2">
                  {t('timer.days')}
                </span>
              </div>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mt-[-12px] md:mt-[-16px] lg:mt-[-20px]">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs md:text-sm text-black/60 uppercase mt-1.5 md:mt-2">
                  {t('timer.hours')}
                </span>
              </div>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mt-[-12px] md:mt-[-16px] lg:mt-[-20px]">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs md:text-sm text-black/60 uppercase mt-1.5 md:mt-2">
                  {t('timer.minutes')}
                </span>
              </div>
            </div>

            {/* СКОРО */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black order-first md:order-none mb-2 md:mb-0">
              {t('timer.title')}  
            </div>

            {/* Кнопка */}
            <button 
              className="w-full sm:w-auto bg-black text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 rounded-full hover:bg-black/90 transition-colors"
              onClick={() => {
                const element = document.getElementById('registration');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('timer.participate')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
