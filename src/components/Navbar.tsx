import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface NavbarProps {
  onTriggerFlip?: () => void;
  onOpenCommandPalette?: () => void;
  isFlipped?: boolean;
}

const Navbar = ({ onTriggerFlip, onOpenCommandPalette, isFlipped }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showSecretBanner, setShowSecretBanner] = useState(false);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { playHoverSound, playClickSound } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playClickSound();

    // Sound synth pitch escalation
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        // Ascending frequency based on click count (400Hz -> 1000Hz)
        osc.frequency.value = 400 + (logoClickCount % 5) * 150;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // Audio fallback
    }

    const nextCount = logoClickCount + 1;
    setLogoClickCount(nextCount);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (nextCount >= 5) {
      setLogoClickCount(0);
      setShowSecretBanner(true);
      if (onTriggerFlip) onTriggerFlip();

      setTimeout(() => setShowSecretBanner(false), 4000);
    } else {
      clickTimerRef.current = setTimeout(() => {
        setLogoClickCount(0);
      }, 2500);
    }
  };

  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#1a1a3e] shadow-[0_8px_0px_0px_rgba(99,102,241,0.5)]' : 'bg-[#1a1a3e]/80 backdrop-blur-sm'
        } border-b-4 border-[#6366f1]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center">
          {/* Logo with 5-Click Secret */}
          <div className="flex items-center gap-3">
            <motion.a 
              href="#home" 
              onClick={handleLogoClick}
              className="text-2xl sm:text-3xl font-black text-white cursor-pointer relative group inline-block select-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={showSecretBanner ? { rotate: [0, 360], scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a5b4fc] to-[#6366f1]">
                CJ
              </span>
              {logoClickCount > 0 && logoClickCount < 5 && (
                <span className="absolute -top-2 -right-4 bg-[#ec4899] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full animate-bounce">
                  {logoClickCount}/5
                </span>
              )}
            </motion.a>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden md:flex gap-4 lg:gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="relative text-white hover:text-[#6366f1] transition-colors duration-300 text-xs lg:text-sm tracking-widest font-bold px-3 lg:px-4 py-2 border-2 border-white/20 hover:border-[#6366f1] hover:shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  {item.toUpperCase()}
                </motion.a>
              ))}
            </div>

            {/* Ctrl+K Command Palette Trigger Button */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#6366f1]/20 hover:bg-[#6366f1] text-[#a5b4fc] hover:text-white border-2 border-[#6366f1] rounded-xl text-xs font-bold transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(139,92,246,1)]"
                title="Press Ctrl + K to open Command Palette"
              >
                <span>🔍</span>
                <span className="hidden sm:inline font-mono">Ctrl+K</span>
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Secret 5-Click Banner Toast */}
      <AnimatePresence>
        {showSecretBanner && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.8 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] p-1 rounded-2xl shadow-[0_0_40px_rgba(236,72,153,0.7)]"
          >
            <div className="bg-[#0f0f23] px-6 py-3 rounded-[14px] flex items-center gap-3 text-white">
              <span className="text-2xl animate-spin">🙃</span>
              <div>
                <p className="font-black text-sm sm:text-base tracking-wider">
                  {isFlipped ? 'NORMAL MODE RESTORED!' : 'UPSIDE DOWN MODE UNLOCKED!'}
                </p>
                <p className="text-xs text-[#a5b4fc] font-medium">
                  {isFlipped ? 'Website flipped right side up 🔄' : '5-Click Combo Executed! Website Flipped 180° 🙃'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
