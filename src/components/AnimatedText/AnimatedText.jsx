import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AnimatedText = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);

  const words = {
    ru: [
      'ДИЗАЙНИТЬ',
      'ПРОЕКТИРОВАТЬ',
      'РЕШАТЬ',
      'СОЗДАВАТЬ',
      'РАЗРАБАТЫВАТЬ',
      'ТЕСТИРОВАТЬ',
      'УЛУЧШАТЬ',
      'ВНЕДРЯТЬ',
    ],
    en: [
      'DESIGN',
      'PROTOTYPE',
      'SOLVE',
      'CREATE',
      'DEVELOP',
      'TEST',
      'IMPROVE',
      'IMPLEMENT',
    ],
    kk: [
      'ДИЗАЙНДАУ',
      'ЖОБАЛАУ',
      'ШЕШУ',
      'ЖАСАУ',
      'ӘЗІРЛЕУ',
      'ТЕСТІЛЕУ',
      'ЖЕТІЛДІРУ',
      'ЕНГІЗУ',
    ]
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const currentLanguage = words[i18n.language] ? i18n.language : 'en';
  const currentWords = words[currentLanguage];
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [0.2, 1, 0.2]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0.2, 1, 0.2]);
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0.2, 1, 0.2]);
  const opacity4 = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0.2, 1, 0.2]);
  const opacity5 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0.2, 1, 0.2]);
  const opacity6 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0.2, 1, 0.2]);
  const opacity7 = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0.2, 1, 0.2]);
  const opacity8 = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0.2, 1, 0.2]);

  const opacityTransforms = [
    opacity1, opacity2, opacity3, opacity4, opacity5,
    opacity6, opacity7, opacity8
  ];

  const colors = [
    'rgb(255, 50, 100)',   // Красный
    'rgb(255, 100, 50)',   // Оранжевый
    'rgb(255, 200, 50)',   // Желтый
    'rgb(100, 200, 50)',   // Зеленый
    'rgb(50, 150, 100)',   // Бирюзовый
    'rgb(50, 100, 150)',   // Голубой
    'rgb(100, 50, 200)',   // Синий
    'rgb(150, 50, 150)',   // Фиолетовый
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[300vh] bg-[#090909] w-full"
    >
      <div className="sticky top-[20vh] h-[60vh] flex items-center justify-center">
        <div className="max-w-[1920px] w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col items-start gap-8 md:gap-12">
            <motion.div 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            >
              {t('youcan.title')}
            </motion.div>
            
            <div className="flex flex-col items-start gap-8 md:gap-10">
              {currentWords.map((word, index) => (
                <motion.div
                  key={index}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                  style={{
                    color: colors[index],
                    opacity: opacityTransforms[index]
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedText;