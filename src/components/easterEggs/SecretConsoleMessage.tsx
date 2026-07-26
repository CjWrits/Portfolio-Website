import { useEffect } from 'react';

/**
 * SecretConsoleMessage Easter Egg
 * 
 * On every page load, prints a beautifully formatted console message after 
 * a short delay (2.5 seconds). Uses colors, separators, badges, and emojis.
 * Appears once per page load and never affects regular site visitors or performance.
 */
const SecretConsoleMessage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(
        '%c 👀 Well well...\n\n' +
        '%c Looks like you found the source. \n\n' +
        '%cIf you\'re learning from it, awesome.\n' +
        'If you\'re copy-pasting it...\n\n' +
        '%c At least leave a ⭐ on GitHub 😄 \n\n' +
        '%c— Chirag Gupta',
        // Header style
        'font-size: 22px; font-weight: 900; color: #8b5cf6; font-family: system-ui, sans-serif; text-shadow: 2px 2px 0px #4c1d95;',
        // Highlight badge style
        'font-size: 14px; font-weight: 700; color: #e0e7ff; background-color: #1e1b4b; padding: 6px 12px; border-radius: 6px; border-left: 4px solid #6366f1; font-family: system-ui, sans-serif;',
        // Body text style
        'font-size: 13px; font-weight: 500; color: #a5b4fc; font-family: system-ui, sans-serif; line-height: 1.6;',
        // GitHub CTA button badge style
        'font-size: 14px; font-weight: 800; color: #ffffff; background: linear-gradient(135deg, #6366f1, #ec4899); padding: 8px 16px; border-radius: 20px; border: 2px solid #ffffff; font-family: system-ui, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.4);',
        // Signature style
        'font-size: 12px; font-style: italic; font-weight: 600; color: #818cf8; font-family: system-ui, sans-serif;'
      );
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default SecretConsoleMessage;
