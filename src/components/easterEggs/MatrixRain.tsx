import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatrixRainProps {
  isActive: boolean;
  onClose: () => void;
}

const MatrixRain = ({ isActive, onClose }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01101001010101010101010010101010101010101010101001010101010101001010101010101010101010100101010101010100101010';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 15, 35, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10b981';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-auto bg-[#0f0f23]/90 backdrop-blur-xs flex flex-col items-center justify-start pt-8"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          
          <div className="relative z-10 bg-[#1a1a3e]/90 border border-[#10b981] px-6 py-3 rounded-full text-[#10b981] font-mono text-sm font-bold flex items-center gap-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <span className="animate-pulse">🟢 MATRIX MODE ACTIVATED</span>
            <button
              onClick={onClose}
              className="bg-[#10b981] text-[#0f0f23] px-3 py-1 rounded-full text-xs font-black hover:bg-[#34d399] transition-colors cursor-pointer"
            >
              EXIT (ESC)
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatrixRain;
