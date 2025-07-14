import TypewriterText from '../TypewriterText/TypewriterText';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#090909] flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-[40px] w-full md:w-[95%] h-[85vh] flex items-center justify-center">
        <TypewriterText />
      </div>
    </section>
  );
};

export default Hero; 