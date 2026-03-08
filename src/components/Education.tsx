import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(card,
          { y: 100, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 2,
            },
            delay: i * 0.05,
            ease: 'power3.out',
          }
        );
      }
    });
  }, []);

  const education = {
    degree: 'Bachelor of Technology',
    field: 'Information Technology',
    university: 'Dr. A.P.J. Abdul Kalam Technical University',
    period: '2024 - 2028',
  };

  const certifications = [
    { name: 'JavaScript Certification', org: 'HackerRank', year: '2024', color: '#6366f1' },
    { name: 'Responsive Web Design', org: 'freeCodeCamp', year: '2024', color: '#8b5cf6' },
    { name: 'Introduction to Cybersecurity', org: 'Cisco', year: '2024', color: '#ec4899' },
    { name: 'ISC2 Candidate', org: 'ISC2', year: '2024', color: '#f59e0b' },
    { name: 'IBM Z Day 2025 – Security', org: 'IBM', year: '2025', color: '#10b981' },
    { name: 'Linux Unhatched', org: 'Cisco', year: '2024', color: '#06b6d4' },
    { name: 'C++ Programming', org: 'Saylor Academy', year: '2024', color: '#6366f1' },
    { name: 'Ethical Hacking Workshop', org: 'Workshop', year: '2024', color: '#8b5cf6' },
  ];

  return (
    <section id="education" ref={ref} className="min-h-screen flex items-center py-16 sm:py-24 md:py-32 bg-[#0f0f23]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-12 sm:mb-16 md:mb-20"
          style={{ textShadow: '6px 6px 0px #6366f1' }}
        >
          EDUCATION
        </motion.h2>

        <motion.div
          ref={(el) => { cardsRef.current[0] = el; }}
          className="mb-12 sm:mb-16 p-4 sm:p-6 md:p-8 bg-[#6366f1] border-2 sm:border-4 border-white/20 shadow-[8px_8px_0px_0px_rgba(139,92,246,0.5)] sm:shadow-[12px_12px_0px_0px_rgba(139,92,246,0.5)]"
          whileHover={{ scale: 1.04, rotate: -1, y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="border-l-4 sm:border-l-8 border-white pl-4 sm:pl-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">{education.degree}</h3>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-bold mb-3 sm:mb-4">{education.field}</p>
            <p className="text-base sm:text-lg md:text-xl text-white/80 font-bold mb-2">{education.university}</p>
            <p className="text-sm sm:text-base md:text-lg text-white font-black">{education.period}</p>
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, type: 'spring' }}
          className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 sm:mb-12"
        >
          CERTIFICATIONS
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              ref={(el) => { cardsRef.current[i + 1] = el; }}
              className="p-4 sm:p-6 border-2 sm:border-4 border-white/20 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] sm:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.3)] hover:shadow-[10px_10px_0px_0px_rgba(99,102,241,0.5)] sm:hover:shadow-[12px_12px_0px_0px_rgba(99,102,241,0.5)] transition-all duration-500 cursor-pointer"
              style={{ backgroundColor: cert.color }}
              whileHover={{ scale: 1.08, rotate: Math.random() > 0.5 ? 3 : -3, y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="text-white font-black text-xs sm:text-sm mb-3 sm:mb-4 tracking-wider">{cert.year}</div>
              <h4 className="text-base sm:text-lg font-black text-white mb-2 sm:mb-3">{cert.name}</h4>
              <p className="text-sm sm:text-base text-white/90 font-bold">{cert.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
