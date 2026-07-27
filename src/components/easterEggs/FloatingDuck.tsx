import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FloatingDuck Easter Egg
 * 
 * A cute pixel-style duck that occasionally waddles across the bottom of the screen.
 * Clicking the duck displays a funny message bubble and plays a synth quack sound!
 */
const FloatingDuck = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [quackMessage, setQuackMessage] = useState<string | null>(null);

  const quackQuotes = [
    "Quack! Keep coding, you're doing great! 🦆",
    "Rubber duck debugging at your service! 🛠️",
    "Fun fact: No bugs were harmed in the making of this site. 🐛",
    "Quack! You found me! 🌟",
    "Need help debugging? Talk to me! 💬"
  ];

  useEffect(() => {
    // Show duck after 45 seconds initial delay, then every 90 seconds
    const initialTimer = setTimeout(() => {
      spawnDuck();
    }, 45000);

    const interval = setInterval(() => {
      spawnDuck();
    }, 90000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const spawnDuck = () => {
    setDirection(Math.random() > 0.5 ? 'right' : 'left');
    setIsVisible(true);
    // Auto hide after walking animation finishes (15s)
    setTimeout(() => {
      setIsVisible(false);
      setQuackMessage(null);
    }, 15000);
  };

  const playQuackSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // AudioContext restriction fallback
    }
  };

  const handleDuckClick = () => {
    playQuackSound();
    const randomQuote = quackQuotes[Math.floor(Math.random() * quackQuotes.length)];
    setQuackMessage(randomQuote);

    setTimeout(() => {
      setQuackMessage(null);
    }, 4000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 pointer-events-none z-50 overflow-hidden h-20">
      <motion.div
        initial={{ x: direction === 'right' ? '-10vw' : '110vw' }}
        animate={{ x: direction === 'right' ? '110vw' : '-10vw' }}
        transition={{ duration: 14, ease: 'linear' }}
        className="pointer-events-auto cursor-pointer relative inline-block group"
        onClick={handleDuckClick}
      >
        {/* Tooltip Quote Bubble */}
        <AnimatePresence>
          {quackMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1e1b4b] text-[#a5b4fc] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#6366f1] shadow-lg"
            >
              {quackMessage}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1e1b4b]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Duck Icon Container */}
        <div className={`text-3xl select-none transition-transform duration-300 group-hover:scale-125 ${direction === 'left' ? 'scale-x-[-1]' : ''}`}>
          🦆
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingDuck;
