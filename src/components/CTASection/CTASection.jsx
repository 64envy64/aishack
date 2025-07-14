import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

const CTASection = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-[#090909] w-full pt-6 pb-16 md:pt-8 md:pb-24 lg:pt-10">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="w-full">
          <a 
            href="#registration" 
            className="block w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="bg-white rounded-3xl p-8 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center justify-between w-full relative overflow-hidden"
            >
              <div className="md:max-w-[70%] mb-8 md:mb-0">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-2 md:mb-0">
                  {t('cta.title') || 'ДОКАЖИ, ЧТО ТЫ ЛУЧШИЙ'}
                </h2>
              </div>
              
              <div className="relative">
                <motion.div 
                  className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-black flex items-center justify-center"
                  animate={{
                    x: isHovered ? -10 : 0,
                    y: isHovered ? -10 : 0,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <ArrowUpRight size={40} strokeWidth={2.5} color="white" />
                </motion.div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTASection; 