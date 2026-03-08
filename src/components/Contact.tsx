import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useSoundEffects } from '../hooks/useSoundEffects';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { playSuccessSound } = useSoundEffects();

  const contactInfo = [
    { icon: <FaEnvelope size={24} />, label: 'Email', value: 'cjwrits@gmail.com', link: 'mailto:cjwrits@gmail.com', color: '#6366f1' },
    { icon: <FaPhone size={24} />, label: 'Phone', value: '+91 78789 39493', link: 'tel:+917878939493', color: '#8b5cf6' },
    { icon: <FaMapMarkerAlt size={24} />, label: 'Location', value: 'Lucknow, India', color: '#ec4899' },
  ];

  const socials = [
    { icon: <FaGithub size={28} />, link: 'https://github.com/CjWrits', label: 'GitHub', color: '#f59e0b' },
    { icon: <FaLinkedin size={28} />, link: 'https://linkedin.com/in/chirag-gupta-79019232b/', label: 'LinkedIn', color: '#10b981' },
  ];

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center py-32 bg-[#0f0f23]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-6xl sm:text-8xl font-black text-white mb-20"
          style={{ textShadow: '6px 6px 0px #6366f1' }}
        >
          GET IN TOUCH
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="space-y-8"
          >
            <div className="p-6 bg-[#6366f1] border-4 border-white/20 shadow-[12px_12px_0px_0px_rgba(139,92,246,0.5)]">
              <p className="text-lg text-white leading-relaxed font-bold">
                Let's collaborate on your next project. I'm available for freelance work and full-time opportunities.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.04, y: -6, x: -2 }}
                  className="flex items-center gap-4 p-4 border-4 border-white/20 shadow-[8px_8px_0px_0px_rgba(99,102,241,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(99,102,241,0.5)] transition-all duration-500"
                  style={{ backgroundColor: info.color }}
                >
                  <div className="w-14 h-14 bg-white/10 border-4 border-white flex items-center justify-center text-white">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{info.label}</p>
                    {info.link ? (
                      <a href={info.link} className="text-white text-lg font-black hover:underline">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white text-lg font-black">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 pt-8">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  whileHover={{ rotate: 360, scale: 1.2, y: -8 }}
                  transition={{ delay: 0.7 + i * 0.1, type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-16 h-16 border-4 border-white/20 flex items-center justify-center transition-all duration-500"
                  style={{ backgroundColor: social.color }}
                >
                  <div className="text-white">{social.icon}</div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="p-8 bg-[#8b5cf6] border-4 border-white/20 shadow-[12px_12px_0px_0px_rgba(236,72,153,0.5)]"
          >
            <h3 className="text-3xl font-black text-white mb-6">Send a Message</h3>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/10 border-4 border-white/20 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all text-white font-bold placeholder:text-white/50"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-white/10 border-4 border-white/20 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all text-white font-bold placeholder:text-white/50"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 bg-white/10 border-4 border-white/20 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] resize-none transition-all text-white font-bold placeholder:text-white/50"
              />
              <motion.button
                type="submit"
                onClick={(e) => { e.preventDefault(); playSuccessSound(); }}
                className="w-full px-8 py-4 bg-white border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.5)] transition-all duration-500 font-black text-[#0f0f23] text-lg"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
