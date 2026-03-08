import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { playHoverSound, playClickSound } = useSoundEffects();

  const projects = [
    { title: 'Zion Website', desc: 'Community website for Zion', tech: 'TypeScript • React', repo: 'zion-website', color: '#6366f1' },
    { title: 'RRC', desc: 'TypeScript-based project', tech: 'TypeScript', repo: 'RRC', color: '#8b5cf6' },
    { title: 'Space Station Safety Monitoring', desc: 'ML-based object detection system for safety equipment', tech: 'Python • YOLOv8 • PyTorch', repo: 'Space-Station-Safety-Monitoring', color: '#ec4899' },
    { title: 'YOLO Object Detector', desc: 'Object detection implementation', tech: 'Python • YOLO', repo: 'yolo-object-detector', color: '#f59e0b' },
    { title: 'Dino Game', desc: 'Interactive browser game', tech: 'JavaScript', repo: 'Dino', color: '#10b981' },
    { title: 'Online Compiler', desc: 'Web-based code compiler', tech: 'HTML • JavaScript', repo: 'Online-Compiler', color: '#06b6d4' },
    { title: 'BlogSpace', desc: 'Full-stack blog platform with authentication', tech: 'HTML • CSS • JavaScript', repo: 'blogspace', color: '#6366f1' },
    { title: 'Quiz App', desc: 'Interactive quiz application', tech: 'JavaScript', repo: 'QuizApp', color: '#8b5cf6' },
    { title: 'Tourism SIH 2025', desc: 'Smart India Hackathon tourism project', tech: 'HTML • JavaScript', repo: 'Tourism_SIH_2025', color: '#ec4899' },
    { title: 'Civic Reporter', desc: 'Community issue reporting with real-time mapping', tech: 'React • TypeScript • Leaflet', repo: 'civic-reporter', color: '#f59e0b' },
  ];

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center py-32 bg-[#1a1a3e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-5xl sm:text-7xl font-black text-white mb-20"
          style={{ textShadow: '6px 6px 0px #6366f1' }}
        >
          PROJECTS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              onMouseEnter={playHoverSound}
              whileHover={{ scale: 1.06, y: -8, rotate: Math.random() > 0.5 ? 2 : -2 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
              className="group p-6 border-4 border-white/20 shadow-[8px_8px_0px_0px_rgba(99,102,241,0.3)] hover:shadow-[16px_16px_0px_0px_rgba(99,102,241,0.5)] transition-all duration-500"
              style={{ backgroundColor: project.color }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black text-white group-hover:scale-105 inline-block transition-transform">{project.title}</h3>
                <motion.a
                  href={`https://github.com/CjWrits/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="w-12 h-12 border-4 border-white bg-white/10 flex items-center justify-center hover:bg-white transition-colors group/icon"
                  whileHover={{ rotate: 360, scale: 1.25 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <FaGithub size={24} className="text-white group-hover/icon:text-[#0f0f23]" />
                </motion.a>
              </div>
              <p className="text-base text-white/90 mb-4 font-bold">{project.desc}</p>
              <div className="inline-block px-4 py-2 bg-white/10 border-2 border-white/30">
                <p className="text-sm text-white font-bold">{project.tech}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
