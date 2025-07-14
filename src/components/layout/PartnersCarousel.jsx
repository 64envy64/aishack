import { motion } from 'framer-motion';
import Logo1 from '../../assets/aqbobek.svg';
import Logo2 from '../../assets/aqblyceum.svg';
import Logo3 from '../../assets/aqtobehub.png';
import Logo4 from '../../assets/apro.png';

const LOGOS = [Logo1, Logo2, Logo3, Logo4];

const PartnersCarousel = () => {
  return (
    <div className="w-full bg-[#090909] py-0 sm:py-0 md:py-0">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="flex justify-evenly items-center">
          {LOGOS.map((logo, index) => (
            <motion.div
              key={index}
              className="flex justify-center items-center h-20 sm:h-24 md:h-28 lg:h-44 w-full max-w-xs grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full h-full">
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[80%] max-h-[80%] w-auto h-auto object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel; 