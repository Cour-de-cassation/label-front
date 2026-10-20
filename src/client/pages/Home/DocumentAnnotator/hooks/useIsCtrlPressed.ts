import { useState, useEffect } from 'react';

export { useIsCtrlPressed };

const BROWSER_SHORTCUT_KEYS = new Set(['f', 'p', 's', 'g', 'r', 'w']);

function useIsCtrlPressed(): boolean {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCtrlOrMetaPressed = event.ctrlKey || event.metaKey;
      const isBrowserShortcut = isCtrlOrMetaPressed && BROWSER_SHORTCUT_KEYS.has(event.key.toLowerCase());
      setIsCtrlPressed(isCtrlOrMetaPressed && !isBrowserShortcut);
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === 'Control' || event.key === 'Meta') {
        setIsCtrlPressed(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return isCtrlPressed;
}
