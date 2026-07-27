import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaChevronDown } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSoundEffects } from '../hooks/useSoundEffects';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { playHoverSound, playClickSound } = useSoundEffects();

  useEffect(() => {
    const chars = textRef.current?.querySelectorAll('.char');
    if (chars) {
      gsap.fromTo(chars,
        { opacity: 0, y: 100, rotateX: -90, scale: 0.5 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.5, stagger: 0.04, ease: 'elastic.out(1, 0.6)' }
      );
    }
  }, []);

  const name = 'CHIRAG    GUPTA';

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0f23] pt-20">
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-4 border-[#6366f1]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() * 45,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 z-10 pb-16 sm:pb-0">
        <div ref={textRef} className="mb-6 sm:mb-8 md:mb-12">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-4 flex flex-wrap justify-center sm:justify-start">
            {name.split('').map((char, i) => (
              <span
                key={i}
                className="char inline-block text-white hover:text-[#6366f1] transition-colors cursor-default"
                style={{
                  textShadow: '6px 6px 0px #8b5cf6',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 50 }}
          className="space-y-3 sm:space-y-4 mb-8 sm:mb-12"
        >
          <motion.div 
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#6366f1] border-2 sm:border-4 border-white/20 shadow-[6px_6px_0px_0px_rgba(139,92,246,1)] sm:shadow-[8px_8px_0px_0px_rgba(139,92,246,1)]"
            whileHover={{ scale: 1.08, rotate: -2, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <p className="text-base sm:text-xl lg:text-2xl text-white font-black tracking-widest">FULL-STACK DEVELOPER</p>
          </motion.div>
          <motion.div 
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#8b5cf6] border-2 sm:border-4 border-white/20 shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] sm:shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] ml-0 sm:ml-8"
            whileHover={{ scale: 1.08, rotate: 2, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <p className="text-base sm:text-xl lg:text-2xl text-white font-black tracking-widest">AVAILABLE FOR WORK</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 200 }}
          className="flex gap-3 sm:gap-4 md:gap-6 justify-center sm:justify-start flex-wrap"
        >
          {[
            { icon: FaGithub, href: 'https://github.com/CjWrits', color: '#6366f1' },
            { icon: FaLinkedin, href: 'https://linkedin.com/in/chirag-gupta-79019232b/', color: '#8b5cf6' },
            { icon: FaEnvelope, href: 'mailto:cjwrits@gmail.com', color: '#ec4899' },
            { icon: FaPhone, href: 'tel:+917878939493', color: '#f59e0b' },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.icon !== FaEnvelope && item.icon !== FaPhone ? '_blank' : undefined}
              rel={item.icon !== FaEnvelope && item.icon !== FaPhone ? 'noopener noreferrer' : undefined}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 sm:border-4 border-white/20 flex items-center justify-center transition-all"
              style={{ backgroundColor: item.color }}
              whileHover={{ 
                rotate: 360, 
                scale: 1.15,
                y: -8,
                boxShadow: '8px 8px 0px 0px rgba(255,255,255,0.3)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <item.icon size={20} className="text-white sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Sleek Modern Interactive Scroll Indicator */}
      <motion.a 
        href="#about"
        onClick={playClickSound}
        onMouseEnter={playHoverSound}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-20 select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-[10px] font-black tracking-widest text-[#a5b4fc] group-hover:text-[#ec4899] transition-colors uppercase">
          SCROLL
        </span>
        <div className="w-6 h-10 border-2 border-[#6366f1] group-hover:border-[#ec4899] rounded-full p-1 flex justify-center transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)] bg-[#1a1a3e]/50 backdrop-blur-xs">
          <motion.div
            className="w-1.5 h-3 bg-gradient-to-b from-[#6366f1] to-[#ec4899] rounded-full"
            animate={{
              y: [0, 14, 0],
              opacity: [1, 0.4, 1]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#6366f1] group-hover:text-[#ec4899] transition-colors"
        >
          <FaChevronDown size={12} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
