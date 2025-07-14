import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import hackathonVideo from '../../assets/bg.mp4';
import { useTranslation } from 'react-i18next';

const HackathonSection = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { t } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const numberScale = useTransform(
    scrollYProgress,
    [0.2, 0.4], 
    [1, 2.5]
  );
  const numberOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4], 
    [1, 1, 1, 0.5, 0] 
  );
  
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.9], [0, 1, 1, 0]);

  // Плавные анимации
  const smoothNumberScale = useSpring(numberScale, { damping: 15, stiffness: 90 });
  const smoothContentOpacity = useSpring(contentOpacity, { damping: 20, stiffness: 100 });
  const smoothVideoOpacity = useSpring(videoOpacity, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[300vh] bg-[#090909]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: smoothVideoOpacity }}
          className="absolute inset-0 z-0"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={hackathonVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <motion.div
            style={{
              scale: smoothNumberScale,
              opacity: numberOpacity,
            }}
            className="text-[20vw] font-bold text-white"
          >
            36
          </motion.div>

          <motion.div
            style={{
              opacity: smoothContentOpacity,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-7xl md:text-8xl font-bold text-white mb-8">
                {t('hackathon.title')}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                {t('hackathon.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HackathonSection; 