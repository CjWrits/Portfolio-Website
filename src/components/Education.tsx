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
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.fromTo(card,
          { rotateY: 90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.05, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3 });
        });
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
    { name: 'JavaScript Certification', org: 'HackerRank', year: '2024' },
    { name: 'Responsive Web Design', org: 'freeCodeCamp', year: '2024' },
    { name: 'Introduction to Cybersecurity', org: 'Cisco', year: '2024' },
    { name: 'ISC2 Candidate', org: 'ISC2', year: '2024' },
    { name: 'IBM Z Day 2025 – Security', org: 'IBM', year: '2025' },
    { name: 'Linux Unhatched', org: 'Cisco', year: '2024' },
    { name: 'C++ Programming', org: 'Saylor Academy', year: '2024' },
    { name: 'Ethical Hacking Workshop', org: 'Workshop', year: '2024' },
  ];

  return (
    <section id="education" ref={ref} className="min-h-screen flex items-center py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-12 sm:mb-16 lg:mb-20"
        >
          EDUCATION
        </motion.h2>

        <div
          ref={(el) => { cardsRef.current[0] = el; }}
          className="mb-12 sm:mb-16 p-6 sm:p-8 md:p-12 relative"
          style={{ perspective: '1000px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 blur-xl" />
          <div className="relative border-l-4 border-orange-500 pl-4 sm:pl-6 md:pl-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{education.degree}</h3>
            <p className="text-lg sm:text-xl md:text-2xl text-orange-500 mb-3 sm:mb-4">{education.field}</p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-2">{education.university}</p>
            <p className="text-sm sm:text-base text-gray-500 font-mono">{education.period}</p>
          </div>
        </div>

        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12"
        >
          CERTIFICATIONS
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i + 1] = el; }}
              className="relative group"
              style={{ perspective: '1000px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 sm:p-8 border border-gray-800 group-hover:border-orange-500 transition-all">
                <div className="text-orange-500 font-mono text-xs sm:text-sm mb-3 sm:mb-4">{cert.year}</div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">{cert.name}</h4>
                <p className="text-sm sm:text-base text-gray-400">{cert.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
