import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const AccordionItem = ({ title, description, isOpen, onClick }) => {
  const contentRef = useRef(null);

  return (
    <div className="border-b border-white/10">
      <button
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-white font-medium">{title}</h3>
        <ChevronDown 
          className={`w-5 h-5 text-white/70 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      <div 
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ 
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
          opacity: isOpen ? 1 : 0 
        }}
      >
        <p className="pb-4 text-white/70">{description}</p>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState(null);
  
  const toggleAccordion = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#090909]">
      <Navbar />
      
      <div className="pt-24 md:pt-28 lg:pt-32"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="bg-white rounded-3xl py-16 md:py-20 lg:py-24 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight">
                {t('about.title')}
              </h1>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="mb-16"
        >
          {/* Описание */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p className="text-white/80 text-lg md:text-xl">
              {t('about.description')}
            </p>
          </div>
          
          {/* Видео секция */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
              {t('about.videoTitle')}
            </h2>
            
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-black/20 backdrop-blur">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/pSG0bwYuVT4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          {/* Что взять с собой - аккордеон */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
              {t('about.whatToBring')}
            </h2>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <AccordionItem 
                title={t('about.items.item1.title')}
                description={t('about.items.item1.description')}
                isOpen={openItem === 0}
                onClick={() => toggleAccordion(0)}
              />
              <AccordionItem 
                title={t('about.items.item2.title')}
                description={t('about.items.item2.description')}
                isOpen={openItem === 1}
                onClick={() => toggleAccordion(1)}
              />
              <AccordionItem 
                title={t('about.items.item3.title')}
                description={t('about.items.item3.description')}
                isOpen={openItem === 2}
                onClick={() => toggleAccordion(2)}
              />
              <AccordionItem 
                title={t('about.items.item4.title')}
                description={t('about.items.item4.description')}
                isOpen={openItem === 3}
                onClick={() => toggleAccordion(3)}
              />
              <AccordionItem 
                title={t('about.items.item5.title')}
                description={t('about.items.item5.description')}
                isOpen={openItem === 4}
                onClick={() => toggleAccordion(4)}
              />
              <AccordionItem 
                title={t('about.items.item6.title')}
                description={t('about.items.item6.description')}
                isOpen={openItem === 5}
                onClick={() => toggleAccordion(5)}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage; 