import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { playHoverSound, playClickSound } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#1a1a3e] shadow-[0_8px_0px_0px_rgba(99,102,241,0.5)]' : 'bg-[#1a1a3e]/80 backdrop-blur-sm'
      } border-b-4 border-[#6366f1]`}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <motion.a 
          href="#home" 
          className="text-3xl font-black text-white hover:scale-110 transition-transform"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          CJ
        </motion.a>
        
        <div className="hidden md:flex gap-6">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="relative text-white hover:text-[#6366f1] transition-colors duration-300 text-sm tracking-widest font-bold px-4 py-2 border-2 border-white/20 hover:border-[#6366f1] hover:shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] transition-all duration-300"
              whileHover={{ y: -4, scale: 1.05 }}
            >
              {item.toUpperCase()}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
