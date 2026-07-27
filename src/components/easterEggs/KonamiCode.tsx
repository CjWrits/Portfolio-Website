import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KonamiCodeProps {
  onUnlock: () => void;
}

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * KonamiCode Easter Egg
 * 
 * Listens for the famous ↑ ↑ ↓ ↓ ← → ← → B A keyboard sequence.
 * Unlocks Retro Arcade Mode & triggers confetti explosion on completion!
 */
const KonamiCode = ({ onUnlock }: KonamiCodeProps) => {
  const sequenceRef = useRef<string[]>([]);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      sequenceRef.current = [...sequenceRef.current, key].slice(-KONAMI_SEQUENCE.length);

      const isMatch = sequenceRef.current.every((val, index) => {
        const expected = KONAMI_SEQUENCE[index];
        return expected.length === 1 ? val === expected : val === expected;
      });

      if (isMatch) {
        sequenceRef.current = [];
        triggerUnlock();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerUnlock = () => {
    setShowBanner(true);
    onUnlock();

    // Play arcade victory sound
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.2);
        });
      }
    } catch {
      // Audio fallback
    }

    setTimeout(() => {
      setShowBanner(false);
    }, 4500);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] bg-gradient-to-r from-[#6366f1] via-[#ec4899] to-[#f59e0b] p-1 rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.6)]"
        >
          <div className="bg-[#0f0f23] px-6 py-4 rounded-[14px] flex items-center gap-4">
            <span className="text-3xl">🎮</span>
            <div>
              <h4 className="text-white font-black text-lg tracking-wider">KONAMI CODE UNLOCKED!</h4>
              <p className="text-[#a5b4fc] font-medium text-xs">You unlocked Retro Arcade Mode! 30 Extra Lives Granted. ⭐️</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiCode;
