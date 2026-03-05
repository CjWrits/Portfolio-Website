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
          { x: i % 2 === 0 ? -100 : 100, opacity: 0, rotateY: i % 2 === 0 ? -45 : 45 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      }
    });
  }, []);

  const timeline = [
    {
      date: 'JAN 2026 - MAR 2026',
      title: 'CTO',
      company: 'Zion Community',
      desc: 'Led technical initiatives and mentored developers',
    },
    {
      date: 'NOV 2025 - DEC 2025',
      title: 'Senior Application Developer',
      company: 'TradeCord',
      desc: 'Developed full-stack applications using MERN stack',
    },
    {
      date: '2025',
      title: 'IBM Z Day 2025 – Security',
      company: 'IBM',
      desc: 'Certification',
    },
    {
      date: '2024',
      title: 'JavaScript Certification',
      company: 'HackerRank',
      desc: 'Certification',
    },
    {
      date: '2024',
      title: 'Responsive Web Design',
      company: 'freeCodeCamp',
      desc: 'Certification',
    },
    {
      date: '2024',
      title: 'Introduction to Cybersecurity',
      company: 'Cisco',
      desc: 'Certification',
    },
    {
      date: '2024',
      title: 'ISC2 Candidate',
      company: 'ISC2',
      desc: 'Certification',
    },
    {
      date: '2024',
      title: 'Linux Unhatched',
      company: 'Cisco',
      desc: 'Certification',
    },
    {
      date: '2024',
      title: 'C++ Programming',
      company: 'Saylor Academy',
      desc: 'Certification',
    },
    {
      date: '2024',
      title: 'Ethical Hacking Workshop',
      company: 'Workshop',
      desc: 'Certification',
    },
  ];

  return (
    <section id="timeline" ref={ref} className="min-h-screen flex items-center py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-16 sm:mb-24 lg:mb-32"
        >
          TIMELINE
        </motion.h2>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-yellow-500 to-transparent" />
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-yellow-500 to-transparent" />

          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {timeline.map((item, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`flex md:${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className="relative group" style={{ perspective: '1000px' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <div className="relative p-6 border border-gray-800/50 group-hover:border-orange-500 transition-all group-hover:scale-105 bg-black/30">
                      <div className={`absolute top-2 -left-[2.6rem] md:top-4 md:${i % 2 === 0 ? '-right-[3.25rem] md:left-auto' : '-left-[3.25rem]'} w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full border-2 md:border-4 border-black animate-pulse`} />
                      
                      <p className="text-orange-500 text-xs sm:text-sm font-mono mb-2 group-hover:text-yellow-500 transition-colors">{item.date}</p>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform inline-block">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-400 font-semibold mb-2 group-hover:text-orange-400 transition-colors">{item.company}</p>
                      <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
