import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const LocationSection = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);

  const smoothTitleOpacity = useSpring(titleOpacity, { damping: 20 });
  const smoothContentOpacity = useSpring(contentOpacity, { damping: 20 });
  const smoothContentY = useSpring(contentY, { damping: 20 });

  return (
    <section id="location" ref={containerRef} className="w-full bg-[#090909] py-16 md:py-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 md:mb-12 text-center"
          style={{ opacity: smoothTitleOpacity }}
        >
          {t('location.title') || 'Как нас найти'}
        </motion.h2>

        <motion.div 
          className="flex flex-col lg:flex-row gap-8 md:gap-10"
          style={{
            opacity: smoothContentOpacity,
            y: smoothContentY
          }}
        >
          <div className="w-full lg:w-3/5 h-[300px] md:h-[380px] lg:h-[450px] rounded-3xl overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.3025292808!2d57.12853837677729!3d50.27322725891867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDE2JzIzLjYiTiA1N8KwMDcnNTIuMCJF!5e0!3m2!1sru!2skz!4v1708977600000!5m2!1sru!2skz" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта местоположения"
            ></iframe>
          </div>

          <div className="w-full lg:w-2/5 bg-white rounded-3xl p-6 md:p-7 lg:p-8 h-auto lg:h-[450px] flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-5 md:mb-6">
              {t('location.contactInfo') || 'Контактная информация'}
            </h3>

            <div className="space-y-4 md:space-y-5">
              <div className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" color="#1E40AF" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-black mb-1">
                    {t('location.address') || 'Адрес'}
                  </h4>
                  <p className="text-sm md:text-base text-gray-700">
                    {t('location.addressValue') || 'Aqbobek International School, Актобе, Казахстан'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" color="#047857" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-black mb-1">
                    {t('location.phone') || 'Телефон'}
                  </h4>
                  <p className="text-sm md:text-base text-gray-700">
                    {t('location.phoneValue') || '+7 (777) 123-45-67'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" color="#B45309" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-black mb-1">
                    {t('location.email') || 'Email'}
                  </h4>
                  <p className="text-sm md:text-base text-gray-700">
                    {t('location.emailValue') || 'info@aqbobek.edu.kz'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <Clock className="w-5 h-5 md:w-6 md:h-6" color="#6D28D9" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-black mb-1">
                    {t('location.hours') || 'Часы работы'}
                  </h4>
                  <p className="text-sm md:text-base text-gray-700">
                    {t('location.hoursValue') || 'Пн-Пт: 9:00 - 18:00'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection; 