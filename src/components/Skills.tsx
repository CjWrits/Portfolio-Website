import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSoundEffects } from '../hooks/useSoundEffects';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { playHoverSound } = useSoundEffects();

  useEffect(() => {
    skillsRef.current.forEach((skill, i) => {
      if (skill) {
        gsap.fromTo(skill,
          { x: -150, opacity: 0, rotateY: -90 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scrollTrigger: {
              trigger: skill,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            },
            delay: i * 0.03,
            ease: 'back.out(1.7)',
          }
        );
      }
    });
  }, []);

  const skills = [
    { name: 'React', count: 8, color: '#6366f1' },
    { name: 'TypeScript', count: 6, color: '#8b5cf6' },
    { name: 'Node.js', count: 7, color: '#ec4899' },
    { name: 'MongoDB', count: 5, color: '#f59e0b' },
    { name: 'Express', count: 7, color: '#10b981' },
    { name: 'Python', count: 4, color: '#06b6d4' },
    { name: 'REST APIs', count: 4, color: '#6366f1' },
    { name: 'Git', count: 20, color: '#8b5cf6' },
    { name: 'PyTorch', count: 4, color: '#ec4899' },
    { name: 'YOLOv8', count: 2, color: '#f59e0b' },
    { name: 'Tailwind CSS', count: 6, color: '#10b981' },
    { name: 'JavaScript', count: 10, color: '#06b6d4' },
    { name: 'Authentication', count: 6, color: '#6366f1' },
    { name: 'Deployment', count: 8, color: '#8b5cf6' },
  ];

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center py-16 sm:py-24 md:py-32 bg-[#0f0f23]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4" style={{ textShadow: '6px 6px 0px #6366f1' }}>
            SKILLS
          </h2>
          <div className="w-32 h-2 bg-[#6366f1]" />
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              ref={(el) => { skillsRef.current[i] = el; }}
              onMouseEnter={playHoverSound}
              className="group p-4 sm:p-6 border-2 sm:border-4 border-white/20 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] sm:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.3)] hover:shadow-[10px_10px_0px_0px_rgba(99,102,241,0.5)] sm:hover:shadow-[12px_12px_0px_0px_rgba(99,102,241,0.5)] hover:-translate-x-2 hover:-translate-y-2 transition-all cursor-pointer"
              style={{ backgroundColor: skill.color, perspective: '1000px' }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="text-white font-black text-lg sm:text-xl md:text-2xl w-8 sm:w-12">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:scale-110 transition-transform inline-block">{skill.name}</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-sm sm:text-base md:text-lg text-white font-bold">{skill.count} projects</span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 sm:border-4 border-white bg-white/10 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                    <span className="text-xl sm:text-2xl font-black text-white">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
