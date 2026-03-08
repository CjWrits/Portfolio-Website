import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    statsRef.current.forEach((stat, i) => {
      if (stat) {
        gsap.fromTo(stat,
          { x: 100, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 2,
            },
            delay: i * 0.1,
            ease: 'power3.out',
          }
        );
      }
    });
  }, []);

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-24 h-24 border-4 border-[#6366f1]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4" style={{ textShadow: '6px 6px 0px #6366f1' }}>
            ABOUT
          </h2>
          <div className="w-32 h-2 bg-[#6366f1]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, type: 'spring' }}
            className="space-y-8"
          >
            <div className="p-4 sm:p-6 bg-[#6366f1] border-2 sm:border-4 border-white/20 shadow-[8px_8px_0px_0px_rgba(139,92,246,0.5)] sm:shadow-[12px_12px_0px_0px_rgba(139,92,246,0.5)]">
              <p className="text-base sm:text-lg text-white leading-relaxed font-bold">
                Specialized in building scalable web applications with the <span className="text-[#fbbf24] font-black">MERN stack</span>. From concept to deployment, I handle the complete development lifecycle.
              </p>
            </div>
            
            <motion.div 
              className="p-4 sm:p-6 bg-[#8b5cf6] border-2 sm:border-4 border-white/20 shadow-[8px_8px_0px_0px_rgba(236,72,153,0.5)] sm:shadow-[12px_12px_0px_0px_rgba(236,72,153,0.5)]"
              whileHover={{ scale: 1.05, rotate: -1 }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white animate-pulse" />
                <p className="text-base sm:text-lg text-white font-black">Currently available for new opportunities</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            {[
              { label: 'EXPERIENCE', value: '2+ Years', bg: '#ec4899' },
              { label: 'PROJECTS', value: '20+', bg: '#f59e0b' },
              { label: 'TECHNOLOGIES', value: '15+', bg: '#10b981' },
            ].map((item, i) => (
              <motion.div
                key={i}
                ref={(el) => { statsRef.current[i] = el; }}
                className="p-4 sm:p-6 border-2 sm:border-4 border-white/20 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] sm:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.3)] sm:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-500 cursor-pointer"
                style={{ backgroundColor: item.bg }}
                whileHover={{ scale: 1.06, y: -6, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-black tracking-widest text-white">{item.label}</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{item.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
