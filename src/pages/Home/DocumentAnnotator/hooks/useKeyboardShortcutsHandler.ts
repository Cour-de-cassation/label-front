import { useEffect } from 'react';

export { useKeyboardShortcutsHandler };

type shortcutType = { key: string; ctrlKey?: boolean; action: () => void };

function useKeyboardShortcutsHandler(shortcuts: shortcutType[]): void {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      shortcuts.forEach((shortcut) => {
        const doesShortcutMatch = shortcut.key === event.key && !!shortcut.ctrlKey === event.ctrlKey;
        if (doesShortcutMatch) {
          shortcut.action();
        }
      });
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcuts]);
}
