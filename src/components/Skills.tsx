import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    skillsRef.current.forEach((skill, i) => {
      if (skill) {
        gsap.fromTo(skill,
          { x: -100, opacity: 0, rotateX: -45 },
          {
            x: 0,
            opacity: 1,
            rotateX: 0,
            scrollTrigger: {
              trigger: skill,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
            },
            delay: i * 0.05,
          }
        );
      }
    });
  }, []);

  const skills = [
    { name: 'React', count: 8 },
    { name: 'TypeScript', count: 6 },
    { name: 'Node.js', count: 7 },
    { name: 'MongoDB', count: 5 },
    { name: 'Express', count: 7 },
    { name: 'Python', count: 4 },
    { name: 'REST APIs', count: 4 },
    { name: 'Git', count: 20 },
    { name: 'PyTorch', count: 4 },
    { name: 'YOLOv8', count: 2 },
    { name: 'Tailwind CSS', count: 6 },
    { name: 'JavaScript', count: 10 },
    { name: 'Authentication', count: 6 },
    { name: 'Deployment', count: 8 },
  ];

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 sm:mb-8">SKILLS</h2>
        </motion.div>

        <div className="space-y-4">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => { skillsRef.current[i] = el; }}
              className="group"
              style={{ perspective: '1000px' }}
            >
              <div className="relative flex items-center gap-8 py-6 border-b border-gray-800 hover:border-orange-500 transition-all hover:scale-105 hover:translate-x-4">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative text-orange-500 font-mono text-sm w-12 group-hover:scale-125 transition-transform">{String(i + 1).padStart(2, '0')}</span>
                <span className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 group-hover:text-white transition-colors flex-1 group-hover:tracking-wider">{skill.name}</span>
                <span className="relative text-sm sm:text-base md:text-lg text-orange-500 font-mono group-hover:scale-110 transition-transform">{skill.count} projects</span>
                <div className="relative w-24 h-px bg-gray-800 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-yellow-500 transition-all group-hover:w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
