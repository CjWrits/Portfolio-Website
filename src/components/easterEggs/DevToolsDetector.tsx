import { useEffect, useRef } from 'react';

/**
 * DevToolsDetector Easter Egg
 * 
 * Detects when browser DevTools are opened using commonly accepted, non-intrusive techniques.
 * 
 * When DevTools are first detected during the session:
 * - Displays a friendly, styled console greeting to fellow developers.
 * - Shows message ONLY ONCE per session (sessionStorage).
 * - Never blocks DevTools, debugger, or performance.
 * - Never shows popups or alerts.
 */
const DevToolsDetector = () => {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Check if greeting has already been delivered this session
    try {
      if (sessionStorage.getItem('devtools_easter_egg_seen')) {
        hasTriggeredRef.current = true;
        return;
      }
    } catch {
      // Ignore storage errors in restricted iframe/browser environments
    }

    const triggerGreeting = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      try {
        sessionStorage.setItem('devtools_easter_egg_seen', 'true');
      } catch {
        // Fail silently
      }

      console.log(
        '%c 💻 Welcome, fellow developer. \n\n' +
        '%cIf you\'re here to learn, enjoy!\n' +
        'If you\'re here to Ctrl+C Ctrl+V...\n\n' +
        '%c At least change the colors 😂 ',
        // Header
        'font-size: 20px; font-weight: 900; color: #ec4899; font-family: system-ui, sans-serif; text-shadow: 2px 2px 0px #831843;',
        // Body
        'font-size: 13px; font-weight: 600; color: #e0e7ff; background: #1e1b4b; padding: 8px 12px; border-radius: 6px; font-family: system-ui, sans-serif; line-height: 1.6; border-left: 4px solid #ec4899;',
        // Punchline badge
        'font-size: 14px; font-weight: 800; color: #0f0f23; background: #f59e0b; padding: 6px 14px; border-radius: 20px; border: 2px solid #ffffff; font-family: system-ui, sans-serif; display: inline-block; margin-top: 4px;'
      );
    };

    // 1. Non-intrusive dimension delta check (detects docked DevTools opening)
    const checkDimensions = () => {
      const widthDelta = window.outerWidth - window.innerWidth > 160;
      const heightDelta = window.outerHeight - window.innerHeight > 160;
      if (widthDelta || heightDelta) {
        triggerGreeting();
      }
    };

    // 2. Non-intrusive getter check (detects DevTools console tab inspection)
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: () => {
        triggerGreeting();
        return '';
      },
    });

    window.addEventListener('resize', checkDimensions);
    checkDimensions();
    
    // Log element getter - triggers only when DevTools console inspects element
    console.log('%c', element);

    return () => {
      window.removeEventListener('resize', checkDimensions);
    };
  }, []);

  return null;
};

export default DevToolsDetector;
