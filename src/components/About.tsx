import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const lineRef = useRef(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef(null);

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }

    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <div className="flex items-center gap-8 mb-8">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white">ABOUT</h2>
            <div ref={lineRef} className="flex-1 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-transparent origin-left" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div ref={textRef} className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-medium">
              Specialized in building scalable web applications with the <span className="text-orange-500 font-bold">MERN stack</span>. From concept to deployment, I handle the complete development lifecycle.
            </p>
            
            <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/30">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse flex-shrink-0" />
              <p className="text-sm sm:text-base md:text-lg text-white font-bold">Currently available for new opportunities</p>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[
              { label: 'EXPERIENCE', value: '2+ Years' },
              { label: 'PROJECTS', value: '20+ Completed' },
              { label: 'TECHNOLOGIES', value: '15+ Mastered' },
            ].map((item, i) => (
              <div
                key={i}
              ref={(el) => { statsRef.current[i] = el; }}
                className="relative group transition-all duration-300"
              >
                <div className="relative flex justify-between items-center border-b-2 border-gray-800 group-hover:border-orange-500 pb-4 sm:pb-6 transition-all">
                  <span className="text-gray-400 text-xs sm:text-sm md:text-base tracking-widest font-bold">{item.label}</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
