import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((item, i) => {
      if (item) {
        gsap.fromTo(item,
          { x: i % 2 === 0 ? -150 : 150, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 2,
            },
            ease: 'power3.out',
          }
        );
      }
    });
  }, []);

  const timeline = [
    { date: 'JAN 2026 - MAR 2026', title: 'CTO', company: 'Zion Community', desc: 'Led technical initiatives and mentored developers', color: '#6366f1' },
    { date: 'NOV 2025 - DEC 2025', title: 'Senior Application Developer', company: 'TradeCord', desc: 'Developed full-stack applications using MERN stack', color: '#8b5cf6' },
    { date: '2025', title: 'IBM Z Day 2025 – Security', company: 'IBM', desc: 'Certification', color: '#ec4899' },
    { date: '2024', title: 'JavaScript Certification', company: 'HackerRank', desc: 'Certification', color: '#f59e0b' },
    { date: '2024', title: 'Responsive Web Design', company: 'freeCodeCamp', desc: 'Certification', color: '#10b981' },
    { date: '2024', title: 'Introduction to Cybersecurity', company: 'Cisco', desc: 'Certification', color: '#06b6d4' },
    { date: '2024', title: 'ISC2 Candidate', company: 'ISC2', desc: 'Certification', color: '#6366f1' },
    { date: '2024', title: 'Linux Unhatched', company: 'Cisco', desc: 'Certification', color: '#8b5cf6' },
    { date: '2024', title: 'C++ Programming', company: 'Saylor Academy', desc: 'Certification', color: '#ec4899' },
    { date: '2024', title: 'Ethical Hacking Workshop', company: 'Workshop', desc: 'Certification', color: '#f59e0b' },
  ];

  return (
    <section id="timeline" ref={ref} className="min-h-screen flex items-center py-32 bg-[#1a1a3e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-7xl font-black text-white mb-32"
          style={{ textShadow: '6px 6px 0px #6366f1' }}
        >
          TIMELINE
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6366f1] via-[#8b5cf6] to-[#ec4899] hidden md:block" />

          <div className="space-y-16">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                <motion.div 
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}
                  whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? -2 : 2, y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="relative p-6 border-4 border-white/20 shadow-[8px_8px_0px_0px_rgba(99,102,241,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(99,102,241,0.5)] transition-all" style={{ backgroundColor: item.color }}>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${i % 2 === 0 ? 'md:-right-[2.65rem]' : 'md:-left-[2.65rem]'} w-6 h-6 bg-white border-4 border-[#0f0f23] hidden md:block rounded-full`} />
                    
                    <p className="text-white/80 text-sm font-black mb-2 tracking-wider">{item.date}</p>
                    <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                    <p className="text-white/90 font-bold mb-2">{item.company}</p>
                    <p className="text-white/70 text-sm font-bold">{item.desc}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
