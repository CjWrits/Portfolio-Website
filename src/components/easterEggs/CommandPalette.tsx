import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHome, FaUser, FaLaptopCode, FaEnvelope, FaBriefcase, FaGraduationCap, FaTools, FaTerminal, FaMagic, FaCoffee } from 'react-icons/fa';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerMatrix: () => void;
  onTriggerFlip: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Easter Eggs' | 'Quick Actions';
  icon: any;
  action: () => void;
}

/**
 * CommandPalette Easter Egg
 * 
 * Raycast/Spotlight-style developer command menu triggered via Ctrl+K or Cmd+K.
 * Prevents background Lenis scroll bleed-through with data-lenis-prevent and body overflow locking.
 */
const CommandPalette = ({ isOpen, onClose, onTriggerMatrix, onTriggerFlip }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: 'nav-home', title: 'Go to Home', category: 'Navigation', icon: FaHome, action: () => scrollTo('home') },
    { id: 'nav-about', title: 'Go to About Section', category: 'Navigation', icon: FaUser, action: () => scrollTo('about') },
    { id: 'nav-skills', title: 'Go to Skills', category: 'Navigation', icon: FaTools, action: () => scrollTo('skills') },
    { id: 'nav-projects', title: 'Go to Projects', category: 'Navigation', icon: FaLaptopCode, action: () => scrollTo('projects') },
    { id: 'nav-experience', title: 'Go to Experience', category: 'Navigation', icon: FaBriefcase, action: () => scrollTo('experience') },
    { id: 'nav-education', title: 'Go to Education', category: 'Navigation', icon: FaGraduationCap, action: () => scrollTo('education') },
    { id: 'nav-contact', title: 'Go to Contact', category: 'Navigation', icon: FaEnvelope, action: () => scrollTo('contact') },

    // Easter Eggs
    { id: 'egg-matrix', title: 'Toggle Matrix Rain Mode', category: 'Easter Eggs', icon: FaTerminal, action: () => { onTriggerMatrix(); onClose(); } },
    { id: 'egg-flip', title: 'Flip Website Upside Down (180°)', category: 'Easter Eggs', icon: FaMagic, action: () => { onTriggerFlip(); onClose(); } },
    { id: 'egg-coffee', title: 'Brew Virtual Coffee in Console', category: 'Easter Eggs', icon: FaCoffee, action: () => { (window as any).coffee?.(); onClose(); } },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Lock body scroll and prevent Lenis smooth-scroll propagation when palette is open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keep active keyboard-selected item in view within the container
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[10000] flex items-start justify-center pt-16 sm:pt-28 px-4 bg-[#0f0f23]/80 backdrop-blur-md"
        >
          {/* Backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-xl bg-[#1a1a3e] border-2 sm:border-4 border-[#6366f1] rounded-2xl shadow-[0_0_50px_rgba(99,102,241,0.5)] overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 sm:py-4 border-b-2 border-white/10 bg-[#0f0f23]/60">
              <FaSearch className="text-[#6366f1] text-lg sm:text-xl mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or section name... (Press ESC to close)"
                className="w-full bg-transparent text-white placeholder-[#a5b4fc]/60 text-sm sm:text-base font-medium focus:outline-none"
              />
              <span className="hidden sm:inline-block text-xs font-bold text-[#a5b4fc] bg-[#6366f1]/20 px-2 py-1 rounded border border-[#6366f1]/40">
                ESC
              </span>
            </div>

            {/* Results List - Isolated scroll from Lenis */}
            <div
              ref={listRef}
              data-lenis-prevent="true"
              className="max-h-72 sm:max-h-96 overflow-y-auto p-2 space-y-1 overscroll-contain"
            >
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-[#a5b4fc]">
                  <p className="font-bold">No matching commands found 🔍</p>
                  <p className="text-xs mt-1 text-white/50">Try typing "matrix", "flip", "coffee", or "home"</p>
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      ref={(el) => { itemRefs.current[idx] = el; }}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#6366f1] text-white shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]'
                          : 'text-[#a5b4fc] hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`text-lg ${isSelected ? 'text-white' : 'text-[#ec4899]'}`} />
                        <span className="font-bold text-sm sm:text-base">{cmd.title}</span>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#0f0f23] text-[#818cf8]'
                        }`}
                      >
                        {cmd.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Tip */}
            <div className="px-4 py-2.5 bg-[#0f0f23] border-t border-white/10 flex justify-between items-center text-[11px] text-[#a5b4fc]">
              <span>Use <kbd className="px-1 bg-white/10 rounded">↑</kbd> <kbd className="px-1 bg-white/10 rounded">↓</kbd> to navigate</span>
              <span><kbd className="px-1 bg-white/10 rounded">↵</kbd> to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
