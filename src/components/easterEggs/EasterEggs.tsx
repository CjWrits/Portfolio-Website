import { useState, useEffect } from 'react';
import DevToolsDetector from './DevToolsDetector';
import FloatingDuck from './FloatingDuck';
import SecretConsoleMessage from './SecretConsoleMessage';
import MatrixRain from './MatrixRain';
import KonamiCode from './KonamiCode';
import CommandPalette from './CommandPalette';
import WebsiteFlip from './WebsiteFlip';

interface EasterEggsProps {
  isCommandPaletteOpen?: boolean;
  onCloseCommandPalette?: () => void;
  onOpenCommandPalette?: () => void;
  isFlipped?: boolean;
  onToggleFlip?: () => void;
}

/**
 * EasterEggs Master Container Component
 * 
 * Aggregates developer easter eggs into a single clean module:
 * 1. DevTools Console CLI (help(), hire(), matrix(), flip(), stats(), coffee())
 * 2. Floating Duck walking across bottom of screen with synth quack & quotes
 * 3. Matrix Rain full-screen digital canvas overlay
 * 4. 180° Website Flip mode (triggered by 5-click logo secret or console flip())
 * 5. Konami Code sequence listener (↑ ↑ ↓ ↓ ← → ← → B A)
 * 6. Ctrl+K / Cmd+K Command Palette Spotlight menu
 */
const EasterEggs = ({
  isCommandPaletteOpen: externalPaletteOpen,
  onCloseCommandPalette: externalPaletteClose,
  onOpenCommandPalette: externalPaletteOpenFn,
  isFlipped: externalFlipped,
  onToggleFlip: externalToggleFlip,
}: EasterEggsProps) => {
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [internalPaletteOpen, setInternalPaletteOpen] = useState(false);
  const [internalFlipped, setInternalFlipped] = useState(false);

  const isPaletteOpen = externalPaletteOpen !== undefined ? externalPaletteOpen : internalPaletteOpen;
  const isFlipped = externalFlipped !== undefined ? externalFlipped : internalFlipped;

  const handleClosePalette = () => {
    if (externalPaletteClose) externalPaletteClose();
    setInternalPaletteOpen(false);
  };

  const handleOpenPalette = () => {
    if (externalPaletteOpenFn) externalPaletteOpenFn();
    setInternalPaletteOpen(true);
  };

  const triggerFlip = () => {
    if (externalToggleFlip) {
      externalToggleFlip();
    } else {
      setInternalFlipped((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Listen for Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isPaletteOpen) {
          handleClosePalette();
        } else {
          handleOpenPalette();
        }
      }
      if (e.key === 'Escape') {
        setIsMatrixActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaletteOpen]);

  const triggerMatrix = () => {
    setIsMatrixActive((prev) => !prev);
  };

  return (
    <>
      <SecretConsoleMessage />
      <DevToolsDetector
        onTriggerMatrix={triggerMatrix}
        onTriggerFlip={triggerFlip}
      />
      <FloatingDuck />
      <KonamiCode onUnlock={triggerFlip} />
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={handleClosePalette}
        onTriggerMatrix={triggerMatrix}
        onTriggerFlip={triggerFlip}
      />
      <MatrixRain isActive={isMatrixActive} onClose={() => setIsMatrixActive(false)} />
      <WebsiteFlip isFlipped={isFlipped} onToggleFlip={triggerFlip} />
    </>
  );
};

export default EasterEggs;
