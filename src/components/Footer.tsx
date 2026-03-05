import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const navLinks = ['About', 'Timeline', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <footer className="relative bg-black border-t border-gray-800 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-6 sm:mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">
              <span className="text-orange-500">C</span>
              <span className="text-yellow-500">G</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Full-stack developer crafting scalable web applications with modern technologies.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 tracking-wider text-sm sm:text-base">QUICK LINKS</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-orange-500 transition-colors text-xs sm:text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 tracking-wider text-sm sm:text-base">CONNECT</h4>
            <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
              <a
                href="https://github.com/CjWrits"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all"
              >
                <FaGithub size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/chirag-gupta-79019232b/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all"
              >
                <FaLinkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="mailto:cjwrits@gmail.com"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all"
              >
                <FaEnvelope size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">cjwrits@gmail.com</p>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
            &copy; 2026 Chirag Gupta. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-2">
            Made with <FaHeart className="text-orange-500" size={12} /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
