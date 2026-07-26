import { motion } from 'framer-motion';
import { FaHome, FaCompass, FaGhost } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface NotFoundProps {
  onReturnHome?: () => void;
}

/**
 * Custom 404 Not Found Page Component
 * 
 * Replaces default 404 page with a humorous, elegant custom page 
 * aligned with the portfolio's visual identity.
 * 
 * Includes:
 * - Humorous message:
 *   "Looks like you found a page that doesn't exist.
 *    Unlike this portfolio, which someone apparently copied. 😄"
 * - Playful neo-brutalist button to return to the homepage.
 * - Interactive sound effects and smooth entrance animations.
 */
const NotFound = ({ onReturnHome }: NotFoundProps) => {
  const { playHoverSound, playClickSound } = useSoundEffects();

  const handleHomeClick = () => {
    playClickSound();
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Animated Floating Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 border-2 border-[#6366f1] rounded-lg"
            style={{
              left: `${(i * 23) % 100}%`,
              top: `${(i * 37) % 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full text-center z-10 space-y-8 p-8 sm:p-12 bg-[#1a1a3e]/90 border-4 border-[#6366f1] shadow-[12px_12px_0px_0px_rgba(139,92,246,1)] rounded-2xl backdrop-blur-md">
        {/* 404 Animated Header */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center items-center gap-4"
        >
          <span className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">
            4
          </span>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl sm:text-8xl text-[#ec4899]"
          >
            <FaGhost />
          </motion.div>
          <span className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1]">
            4
          </span>
        </motion.div>

        {/* Humorous Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8b5cf6]/20 border border-[#8b5cf6] rounded-full text-sm font-bold text-[#a5b4fc]">
            <FaCompass className="animate-spin" />
            <span>DEV EASTER EGG #3: LOST IN SPACE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide leading-tight">
            Looks like you found a page that doesn't exist.
          </h1>

          <p className="text-lg sm:text-xl text-[#a5b4fc] font-medium italic">
            Unlike this portfolio, which someone apparently copied. 😄
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <motion.button
            onClick={handleHomeClick}
            onMouseEnter={playHoverSound}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#6366f1] text-white font-black text-lg sm:text-xl border-4 border-white shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] hover:shadow-[10px_10px_0px_0px_rgba(236,72,153,1)] transition-all cursor-pointer"
          >
            <FaHome size={22} />
            <span>RETURN TO HOMEPAGE</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
