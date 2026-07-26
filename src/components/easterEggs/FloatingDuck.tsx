import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FloatingDuck Easter Egg
 * 
 * Creates a tiny pixel-art/animated SVG duck that quietly walks across 
 * the bottom of the screen after the user has been on the site for ~60 seconds.
 * 
 * Requirements met:
 * - Very small and unobtrusive.
 * - Smooth walking/waddling animation.
 * - Appears only once per browsing session (persisted via sessionStorage).
 * - Doesn't block clicks or interact with page elements (pointer-events: none).
 * - Automatically disappears after walking off-screen.
 * - Respects prefers-reduced-motion: disables animation for users who prefer reduced motion.
 */
const FloatingDuck = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Respect prefers-reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 2. Only show once per browsing session
    try {
      const hasSeenDuck = sessionStorage.getItem('duck_easter_egg_seen');
      if (hasSeenDuck) return;
    } catch {
      // Ignore storage errors in restricted contexts
    }

    // 3. Trigger after 60 seconds (60,000ms)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('duck_easter_egg_seen', 'true');
    } catch {
      // Fail silently
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        aria-hidden="true"
        role="presentation"
        className="fixed bottom-3 z-[9999] pointer-events-none select-none flex items-center gap-1.5 bg-[#1a1a3e]/90 border-2 border-[#6366f1] px-2.5 py-1 rounded-full shadow-[4px_4px_0px_0px_rgba(99,102,241,0.5)] backdrop-blur-sm"
        initial={{ x: '-120px', y: 0 }}
        animate={{
          x: ['-120px', 'calc(100vw + 120px)'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        {/* Animated Duck SVG with gentle leg and body waddle */}
        <motion.div
          animate={{
            rotate: [0, -8, 8, -8, 0],
            y: [0, -3, 0, -3, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-7 h-7 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          <svg viewBox="0 0 32 32" className="w-full h-full">
            {/* Duck Body */}
            <path d="M8 18 C8 12, 14 10, 20 10 C24 10, 28 12, 28 16 C28 22, 22 26, 14 26 C9 26, 8 22, 8 18 Z" fill="#FACC15" />
            {/* Wing */}
            <path d="M12 18 C12 16, 16 15, 19 17 C17 21, 14 22, 12 18 Z" fill="#EAB308" />
            {/* Head */}
            <circle cx="21" cy="11" r="6" fill="#FACC15" />
            {/* Beak */}
            <path d="M25 11 L31 12 L26 14 Z" fill="#F97316" />
            {/* Eye */}
            <circle cx="22" cy="10" r="1.2" fill="#0F0F23" />
            {/* Feet */}
            <path d="M14 26 L12 30 M18 26 L17 30" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
        
        <span className="font-mono text-[10px] text-[#a5b4fc] tracking-wider font-bold">
          quack! 🦆
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingDuck;
