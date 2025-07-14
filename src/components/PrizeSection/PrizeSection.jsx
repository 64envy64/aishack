import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import trophyImage from '../../assets/trophy.png';
import { Tooltip } from 'react-tooltip';
import { Code } from 'lucide-react';

const PrizeSection = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const mainPrizeOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const mainPrizeY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  const secondaryPrizesOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const secondaryPrizesY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  const smoothMainPrizeOpacity = useSpring(mainPrizeOpacity, { damping: 15, stiffness: 90 });
  const smoothMainPrizeY = useSpring(mainPrizeY, { damping: 15, stiffness: 90 });
  const smoothSecondaryPrizesOpacity = useSpring(secondaryPrizesOpacity, { damping: 15, stiffness: 90 });
  const smoothSecondaryPrizesY = useSpring(secondaryPrizesY, { damping: 15, stiffness: 90 });

  return (
    <section id="prizes" ref={containerRef} className="relative w-full bg-[#090909] pt-48 md:pt-56 pb-32 md:pb-16 overflow-hidden">
      <div className="md:sticky md:top-0 md:h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 md:mb-12 lg:mb-16 text-center"
            style={{ opacity: smoothMainPrizeOpacity }}
          >
            {t('prizes.title') || 'Призовой фонд'}
          </motion.h2>
          
          <div className="flex flex-col md:flex-row md:items-stretch gap-8 md:gap-10 lg:gap-12 justify-center">
            <motion.div 
              className="bg-white rounded-3xl p-8 md:p-10 lg:p-12 flex flex-col items-center w-full md:w-[520px] lg:w-[580px] xl:w-[640px] md:h-[560px] lg:h-[600px]"
              style={{
                opacity: smoothMainPrizeOpacity,
                y: smoothMainPrizeY
              }}
            >
              <div className="relative w-full aspect-square max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[280px]">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-yellow-100 rounded-t-full"></div>
                <img 
                  src={trophyImage} 
                  alt={t('prizes.trophyAlt')} 
                  className="absolute w-full h-auto z-10"
                />
              </div>
              
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mt-6">₸200.000</div>
              
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-black text-center uppercase font-medium max-w-[400px] px-4 sm:px-6 mt-6 sm:mt-8 mb-0">
                {t('prizes.mainDescription') || 'ПРИГОТОВЬТЕСЬ К ЗАПУСКУ ПРОЕКТОВ! ЛУЧШАЯ КОМАНДА БУДЕТ НАГРАЖДЕНА ПРИЗАМИ'}
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full md:w-[440px] lg:w-[500px] xl:w-[560px] md:h-[560px] lg:h-[600px] justify-between"
              style={{
                opacity: smoothSecondaryPrizesOpacity,
                y: smoothSecondaryPrizesY
              }}
            >
              <div className="bg-white rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 flex items-center h-[140px] sm:h-[170px] md:h-[175px] lg:h-[185px]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-blue-200 flex items-center justify-center mr-4 sm:mr-6 md:mr-8 lg:mr-10 ml-2">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">2</span>
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black">₸120K</div>
              </div>

              <div className="bg-white rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 flex items-center h-[140px] sm:h-[170px] md:h-[175px] lg:h-[185px]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-amber-500 flex items-center justify-center mr-4 sm:mr-6 md:mr-8 lg:mr-10 ml-2">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">3</span>
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black">₸80K</div>
              </div>

              <div className="bg-white rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 flex items-center h-[140px] sm:h-[170px] md:h-[175px] lg:h-[185px]">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-green-400 flex items-center justify-center mr-4 sm:mr-6 md:mr-8 lg:mr-10 ml-2"
                  data-tooltip-id="sports-tooltip"
                  data-tooltip-content={t('prizes.sportsTooltip')}
                >
                  <Code size={28} strokeWidth={2.5} color="white" className="sm:w-9 sm:h-9 md:w-10 md:h-10" />
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black">₸100K</div>
                <Tooltip id="sports-tooltip" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizeSection; 