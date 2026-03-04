import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      title: 'Zion Website',
      desc: 'Community website for Zion',
      tech: 'TypeScript • React',
      repo: 'zion-website',
    },
    {
      title: 'RRC',
      desc: 'TypeScript-based project',
      tech: 'TypeScript',
      repo: 'RRC',
    },
    {
      title: 'Space Station Safety Monitoring',
      desc: 'ML-based object detection system for safety equipment',
      tech: 'Python • YOLOv8 • PyTorch',
      repo: 'Space-Station-Safety-Monitoring',
    },
    {
      title: 'YOLO Object Detector',
      desc: 'Object detection implementation',
      tech: 'Python • YOLO',
      repo: 'yolo-object-detector',
    },
    {
      title: 'Dino Game',
      desc: 'Interactive browser game',
      tech: 'JavaScript',
      repo: 'Dino',
    },
    {
      title: 'Online Compiler',
      desc: 'Web-based code compiler',
      tech: 'HTML • JavaScript',
      repo: 'Online-Compiler',
    },
    {
      title: 'BlogSpace',
      desc: 'Full-stack blog platform with authentication',
      tech: 'HTML • CSS • JavaScript',
      repo: 'blogspace',
    },
    {
      title: 'Quiz App',
      desc: 'Interactive quiz application',
      tech: 'JavaScript',
      repo: 'QuizApp',
    },
    {
      title: 'Tourism SIH 2025',
      desc: 'Smart India Hackathon tourism project',
      tech: 'HTML • JavaScript',
      repo: 'Tourism_SIH_2025',
    },
    {
      title: 'Civic Reporter',
      desc: 'Community issue reporting with real-time mapping',
      tech: 'React • TypeScript • Leaflet',
      repo: 'civic-reporter',
    },
    {
      title: 'Portfolio Website',
      desc: 'Personal portfolio showcase',
      tech: 'HTML • CSS • JavaScript',
      repo: 'Portfolio-Website',
    },
  ];

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center py-32">
      <div className="max-w-6xl mx-auto px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-7xl font-black text-white mb-20"
        >
          PROJECTS & CONTRIBUTIONS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
              className="group border border-gray-800 hover:border-orange-500 p-6 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <a
                  href={`https://github.com/CjWrits/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-400 transition-colors"
                >
                  <FaGithub size={24} />
                </a>
              </div>
              <p className="text-gray-400 text-base mb-4">{project.desc}</p>
              <p className="text-gray-600 text-sm">{project.tech}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
