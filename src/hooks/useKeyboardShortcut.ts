'use client';

import { useEffect } from 'react';

/**
 * Listen for a keyboard shortcut (e.g. Ctrl+K / ⌘K) and fire a callback.
 */
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: { ctrlKey?: boolean; metaKey?: boolean } = {}
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const modMatch =
        (options.ctrlKey && e.ctrlKey) || (options.metaKey && e.metaKey);

      if (e.key.toLowerCase() === key.toLowerCase() && modMatch) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, callback, options.ctrlKey, options.metaKey]);
}
