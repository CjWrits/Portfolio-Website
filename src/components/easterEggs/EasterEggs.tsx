import SecretConsoleMessage from './SecretConsoleMessage';
import FloatingDuck from './FloatingDuck';
import DevToolsDetector from './DevToolsDetector';

/**
 * EasterEggs Container Component
 * 
 * Aggregates all unobtrusive developer easter eggs into a single, clean module:
 * 1. Secret Console Message on page load
 * 2. Tiny Floating Duck walking across screen after 60s
 * 3. DevTools opening detection console greeting
 * 
 * Modular and easy to maintain without cluttering the main App tree.
 */
const EasterEggs = () => {
  return (
    <>
      <SecretConsoleMessage />
      <FloatingDuck />
      <DevToolsDetector />
    </>
  );
};

export default EasterEggs;
