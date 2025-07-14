import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TypewriterText = () => {
  const { t } = useTranslation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const words = [
    t('typewriter.create'),
    t('typewriter.learn'),
    t('typewriter.win'),
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150;
    const word = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setCurrentText(word.slice(0, currentText.length - 1));
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight">
      <span className="mr-4">{currentText}</span>
      <span className="animate-blink">|</span>
    </div>
  );
};

export default TypewriterText; 