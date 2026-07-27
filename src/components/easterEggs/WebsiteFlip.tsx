import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WebsiteFlipProps {
  isFlipped: boolean;
  onToggleFlip: () => void;
}

/**
 * WebsiteFlip Easter Egg
 * 
 * Flips the entire portfolio website upside down (180 deg) when triggered!
 * Forces 100% content visibility so no cards or section details stay hidden during upside-down scroll.
 */
const WebsiteFlip = ({ isFlipped }: WebsiteFlipProps) => {
  useEffect(() => {
    const root = document.documentElement;
    if (isFlipped) {
      root.classList.add('website-flipped');
      try {
        ScrollTrigger.refresh();
      } catch {
        // Safe fallback
      }
    } else {
      root.classList.remove('website-flipped');
      try {
        ScrollTrigger.refresh();
      } catch {
        // Safe fallback
      }
    }

    return () => {
      root.classList.remove('website-flipped');
    };
  }, [isFlipped]);

  return (
    <AnimatePresence>
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10000] bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] p-1 rounded-2xl shadow-[0_0_40px_rgba(236,72,153,0.8)] pointer-events-auto"
        >
          <div className="bg-[#0f0f23] px-6 py-3 rounded-[14px] flex items-center gap-3 text-white">
            <span className="text-2xl animate-spin">🙃</span>
            <div>
              <p className="font-black text-sm sm:text-base tracking-wider">UPSIDE DOWN MODE ACTIVATED!</p>
              <p className="text-xs text-[#a5b4fc] font-medium">Click the logo 5 times to flip back to normal 🔄</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebsiteFlip;
