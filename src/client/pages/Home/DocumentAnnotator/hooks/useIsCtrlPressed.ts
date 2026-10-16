import { useState, useEffect } from 'react';

export { useIsCtrlPressed };

function useIsCtrlPressed(): boolean {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Control' || event.metaKey) {
        setIsCtrlPressed(true);
      }
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
