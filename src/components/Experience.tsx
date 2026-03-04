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
          { x: i % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
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
    <section id="timeline" ref={ref} className="min-h-screen flex items-center py-32">
      <div className="max-w-6xl mx-auto px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-7xl font-black text-white mb-32"
        >
          TIMELINE
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-yellow-500 to-transparent" />

          <div className="space-y-24">
            {timeline.map((item, i) => (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <div className="relative">
                    <div className={`absolute top-4 ${i % 2 === 0 ? '-right-[3.25rem]' : '-left-[3.25rem]'} w-4 h-4 bg-orange-500 rounded-full border-4 border-black`} />
                    
                    <p className="text-orange-500 text-sm font-mono mb-2">{item.date}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 font-semibold mb-2">{item.company}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
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
