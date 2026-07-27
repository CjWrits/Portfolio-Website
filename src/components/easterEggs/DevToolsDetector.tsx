import { useEffect, useRef } from 'react';

interface DevToolsDetectorProps {
  onTriggerMatrix: () => void;
  onTriggerFlip: () => void;
}

/**
 * DevToolsDetector & Interactive Console CLI Easter Egg
 * 
 * Provides a clean, sleek, modern developer terminal right inside browser DevTools.
 * Always available in console via help(), hire(), matrix(), flip(), stats(), coffee().
 */
const DevToolsDetector = ({ onTriggerMatrix, onTriggerFlip }: DevToolsDetectorProps) => {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Register global interactive functions on window for fellow devs!
    (window as any).help = () => {
      console.clear();
      console.log(
        '%c ⚡ DEV TOOLS INTERACTIVE COMMANDS ⚡ ',
        'background: #6366f1; color: #ffffff; font-weight: bold; font-size: 14px; padding: 4px 10px; border-radius: 4px;'
      );
      console.log('');
      console.log('%c 1. matrix()    %c- Toggle full-screen Matrix Digital Rain', 'color: #10b981; font-weight: bold;', 'color: #a5b4fc;');
      console.log('%c 2. flip()      %c- Flip the entire website upside down 180°', 'color: #ec4899; font-weight: bold;', 'color: #a5b4fc;');
      console.log('%c 3. hire()      %c- View quick developer profile & email', 'color: #f59e0b; font-weight: bold;', 'color: #a5b4fc;');
      console.log('%c 4. stats()     %c- Print tech stack & performance metrics', 'color: #3b82f6; font-weight: bold;', 'color: #a5b4fc;');
      console.log('%c 5. coffee()    %c- Brew a fresh cup of virtual coffee', 'color: #8b5cf6; font-weight: bold;', 'color: #a5b4fc;');
      console.log('');
      return '🚀 Type any command above (e.g. matrix() or flip()) and press Enter!';
    };

    (window as any).matrix = () => {
      onTriggerMatrix();
      return '🟢 Matrix Rain toggled!';
    };

    (window as any).flip = () => {
      onTriggerFlip();
      return '🙃 Website Flip toggled!';
    };

    (window as any).hire = () => {
      console.log('');
      console.log(
        '%c 💼 CHIRAG GUPTA — FULL STACK DEVELOPER ',
        'background: linear-gradient(135deg, #6366f1, #ec4899); color: #ffffff; font-weight: 900; font-size: 15px; padding: 6px 12px; border-radius: 6px;'
      );
      console.log('');
      console.log('%c Location: %c India', 'color: #818cf8; font-weight: bold;', 'color: #ffffff;');
      console.log('%c Focus:    %c High Performance Web Apps, React & Modern UI', 'color: #818cf8; font-weight: bold;', 'color: #ffffff;');
      console.log('%c GitHub:   %c https://github.com/CjWrits', 'color: #818cf8; font-weight: bold;', 'color: #38bdf8;');
      console.log('%c Status:   %c Open to exciting opportunities!', 'color: #818cf8; font-weight: bold;', 'color: #34d399; font-weight: bold;');
      console.log('');
      return '✨ Reach out directly via the contact form on site!';
    };

    (window as any).stats = () => {
      console.log('%c 📊 TECH STACK & SYSTEM SPECS ', 'background: #1e1b4b; color: #818cf8; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
      console.table([
        { Component: 'Frontend Framework', Technology: 'React 19 + TypeScript', Engine: 'Vite 7' },
        { Component: 'Styling Engine', Technology: 'UnoCSS / Tailwind Utilities', FX: 'Glassmorphism' },
        { Component: 'Animations', Technology: 'Framer Motion + GSAP', SmoothScroll: 'Lenis' },
        { Component: 'Audio Engine', Technology: 'Web Audio API (Synthesizer)', Audio: 'Native' }
      ]);
      return '📈 Stack loaded clean.';
    };

    (window as any).coffee = () => {
      console.log(
        '%c   (  )   (   )  )',
        'color: #f59e0b; font-weight: bold;'
      );
      console.log(
        '%c    ) (   )  (  (',
        'color: #f59e0b; font-weight: bold;'
      );
      console.log(
        '%c  .------------.',
        'color: #818cf8; font-weight: bold;'
      );
      console.log(
        '%c C|===========|  %c"Code is like coffee — best when smooth."',
        'color: #818cf8; font-weight: bold;',
        'color: #e0e7ff; font-style: italic;'
      );
      console.log(
        '%c  |           |',
        'color: #818cf8; font-weight: bold;'
      );
      console.log(
        '%c  `-----------\'',
        'color: #818cf8; font-weight: bold;'
      );
      return '☕ Fresh coffee served!';
    };

    const printConsoleGreeting = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      // Print clean, non-overlapping styled console banner
      console.log('');
      console.log(
        '%c 💻 WELCOME DEVELOPER %c Type %chelp()%c for secret commands ',
        'background: #6366f1; color: #ffffff; font-size: 13px; font-weight: 900; padding: 4px 10px; border-top-left-radius: 6px; border-bottom-left-radius: 6px;',
        'background: #1e1b4b; color: #e0e7ff; font-size: 13px; font-weight: 600; padding: 4px 8px;',
        'background: #ec4899; color: #ffffff; font-size: 13px; font-weight: 800; padding: 2px 6px; border-radius: 4px;',
        'background: #1e1b4b; color: #e0e7ff; font-size: 13px; font-weight: 600; padding: 4px 8px; border-top-right-radius: 6px; border-bottom-right-radius: 6px;'
      );
      console.log('');
      console.log('%c If you\'re inspecting the source to learn — enjoy! 🚀', 'color: #a5b4fc; font-size: 12px; font-weight: 600;');
      console.log('%c If you\'re copy-pasting code — at least leave a star! ⭐', 'color: #f59e0b; font-size: 12px; font-weight: 600;');
      console.log('');
    };

    // Check resize or DevTools dimension delta
    const checkDimensions = () => {
      const widthDelta = window.outerWidth - window.innerWidth > 160;
      const heightDelta = window.outerHeight - window.innerHeight > 160;
      if (widthDelta || heightDelta) {
        printConsoleGreeting();
      }
    };

    window.addEventListener('resize', checkDimensions);
    checkDimensions();

    // Always print console greeting on load after short delay
    const initialTimer = setTimeout(printConsoleGreeting, 1200);

    return () => {
      window.removeEventListener('resize', checkDimensions);
      clearTimeout(initialTimer);
    };
  }, [onTriggerMatrix, onTriggerFlip]);

  return null;
};

export default DevToolsDetector;
