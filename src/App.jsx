import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import PartnersCarousel from './components/layout/PartnersCarousel';
import Timer from './components/Timer/Timer';
import HackathonSection from './components/HackathonSection/HackathonSection';
import AnimatedText from './components/AnimatedText/AnimatedText';
import PrizeSection from './components/PrizeSection/PrizeSection';
import LocationSection from './components/LocationSection/LocationSection';
import CTASection from './components/CTASection/CTASection';
import RegistrationSection from './components/RegistrationSection/RegistrationSection';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import AboutPage from './pages/AboutPage';
import './i18n/i18n';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Navbar />
      <Hero />
      <PartnersCarousel />
      <Timer />
      <HackathonSection />
      <AnimatedText />
      
      <div className="relative bg-[#090909] w-full">
        <PrizeSection />
      </div>
      
      <div className="space-y-12 md:space-y-16 lg:space-y-20">
        <LocationSection />
        <CTASection />
      </div>
      <RegistrationSection />
      <Footer />
    </>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const [contentLoaded, setContentLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 2500); 
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`min-h-screen bg-[#090909] ${contentLoaded ? 'fade-in' : 'opacity-0'}`}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Preloader />
      <AnimatedRoutes />
    </Router>
  );
}

export default App; 