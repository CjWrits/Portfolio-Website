import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactInfo = [
    { icon: <FaEnvelope size={24} />, label: 'Email', value: 'cjwrits@gmail.com', link: 'mailto:cjwrits@gmail.com' },
    { icon: <FaPhone size={24} />, label: 'Phone', value: '+91 78789 39493', link: 'tel:+917878939493' },
    { icon: <FaMapMarkerAlt size={24} />, label: 'Location', value: 'Lucknow, India' },
  ];

  const socials = [
    { icon: <FaGithub size={28} />, link: 'https://github.com/CjWrits', label: 'GitHub' },
    { icon: <FaLinkedin size={28} />, link: 'https://linkedin.com/in/chirag-gupta-79019232b/', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-12 sm:mb-16 lg:mb-20"
        >
          GET IN <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">TOUCH</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
              Let's collaborate on your next project. I'm available for freelance work and full-time opportunities.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">{info.label}</p>
                    {info.link ? (
                      <a href={info.link} className="text-white text-base sm:text-lg hover:text-orange-500 transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white text-base sm:text-lg">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 pt-6 sm:pt-8">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-gray-700 hover:border-orange-500 rounded-full flex items-center justify-center text-white hover:text-orange-500 transition-all hover:scale-110"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-800">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Send a Message</h3>
              <form className="space-y-4 sm:space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-white text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-white text-sm sm:text-base"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none resize-none transition-colors text-white text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg hover:scale-105 transition-transform font-bold text-black text-sm sm:text-base"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
