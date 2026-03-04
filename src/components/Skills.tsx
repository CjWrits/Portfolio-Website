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
    skillsRef.current.forEach((skill) => {
      if (skill) {
        gsap.fromTo(skill,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: skill,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
            },
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
      <div className="max-w-6xl mx-auto px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <h2 className="text-7xl font-black text-white mb-8">SKILLS</h2>
        </motion.div>

        <div className="space-y-4">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => (skillsRef.current[i] = el)}
              className="group"
            >
              <div className="flex items-center gap-8 py-6 border-b border-gray-800 hover:border-orange-500 transition-all">
                <span className="text-orange-500 font-mono text-sm w-12">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-4xl font-bold text-gray-300 group-hover:text-white transition-colors flex-1">{skill.name}</span>
                <span className="text-orange-500 font-mono text-lg">{skill.count} projects</span>
                <div className="w-24 h-px bg-gray-800 group-hover:bg-orange-500/20 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
