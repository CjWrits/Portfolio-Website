import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const navLinks = ['About', 'Timeline', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <footer className="relative bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-3xl font-black mb-4">
              <span className="text-orange-500">C</span>
              <span className="text-yellow-500">G</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full-stack developer crafting scalable web applications with modern technologies.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider">QUICK LINKS</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider">CONNECT</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/CjWrits"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/chirag-gupta-79019232b/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:cjwrits@gmail.com"
                className="w-10 h-10 border border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">cjwrits@gmail.com</p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 Chirag Gupta. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            Made with <FaHeart className="text-orange-500" size={14} /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
