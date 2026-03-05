import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlinkingAsciiDots from './BlinkingAsciiDots';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = textRef.current?.querySelectorAll('.char');
    if (chars) {
      gsap.fromTo(chars,
        { opacity: 0, y: 50, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03, ease: 'back.out' }
      );
    }

    gsap.to('.float', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  const name = 'CHIRAG    GUPTA';

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <BlinkingAsciiDots backgroundColor="#0a0a0a" textColor="255, 107, 53" density={1.2} animationSpeed={0.5} removeWaveLine={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 z-10">
        <div ref={textRef} className="mb-8 sm:mb-12">
          <div className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 flex flex-wrap justify-center sm:justify-start">
            {name.split('').map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3 sm:space-y-4 mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-orange-500 to-transparent" />
            <p className="text-base sm:text-xl text-gray-400 font-light tracking-widest">FULL-STACK DEVELOPER</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-yellow-500 to-transparent" />
            <p className="text-base sm:text-xl text-gray-400 font-light tracking-widest">AVAILABLE FOR WORK</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex gap-4 sm:gap-6 justify-center sm:justify-start"
        >
          <a
            href="https://github.com/CjWrits"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-14 h-14 border-2 border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FaGithub size={24} className="relative z-10 text-white group-hover:text-black transition-colors" />
          </a>
          <a
            href="https://linkedin.com/in/chirag-gupta-79019232b/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-14 h-14 border-2 border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FaLinkedin size={24} className="relative z-10 text-white group-hover:text-black transition-colors" />
          </a>
          <a
            href="mailto:cjwrits@gmail.com"
            className="group relative w-14 h-14 border-2 border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FaEnvelope size={24} className="relative z-10 text-white group-hover:text-black transition-colors" />
          </a>
          <a
            href="tel:+917878939493"
            className="group relative w-14 h-14 border-2 border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FaPhone size={24} className="relative z-10 text-white group-hover:text-black transition-colors" />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-20 bg-gradient-to-b from-orange-500 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
