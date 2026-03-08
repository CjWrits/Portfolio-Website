import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const navLinks = ['About', 'Timeline', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <footer className="bg-[#1a1a3e] border-t-8 border-[#6366f1] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <motion.h3 
              className="text-5xl font-black mb-4 text-white"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              CG
            </motion.h3>
            <p className="text-white/80 text-sm leading-relaxed font-bold">
              Full-stack developer crafting scalable web applications with modern technologies.
            </p>
          </div>

          <div>
            <h4 className="text-[#6366f1] font-black mb-4 tracking-wider text-lg">QUICK LINKS</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white/80 hover:text-[#6366f1] transition-colors text-sm font-bold hover:translate-x-2 inline-block"
                >
                  → {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#6366f1] font-black mb-4 tracking-wider text-lg">CONNECT</h4>
            <div className="flex gap-4 mb-4">
              {[
                { icon: FaGithub, href: 'https://github.com/CjWrits', color: '#6366f1' },
                { icon: FaLinkedin, href: 'https://linkedin.com/in/chirag-gupta-79019232b/', color: '#8b5cf6' },
                { icon: FaEnvelope, href: 'mailto:cjwrits@gmail.com', color: '#ec4899' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.icon !== FaEnvelope ? '_blank' : undefined}
                  rel={item.icon !== FaEnvelope ? 'noopener noreferrer' : undefined}
                  className="w-12 h-12 border-4 border-white/20 flex items-center justify-center hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all"
                  style={{ backgroundColor: item.color }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon size={20} className="text-white" />
                </motion.a>
              ))}
            </div>
            <p className="text-white/80 text-sm font-bold">cjwrits@gmail.com</p>
          </div>
        </div>

        <div className="pt-8 border-t-4 border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-sm font-bold">
            © 2026 Chirag Gupta. All rights reserved.
          </p>
          <p className="text-white/80 text-sm flex items-center gap-2 font-bold">
            Made with <FaHeart className="text-[#ec4899]" size={14} /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
