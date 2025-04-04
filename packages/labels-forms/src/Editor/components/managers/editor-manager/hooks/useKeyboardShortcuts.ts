import { useEffect } from "react";

const useKeyboardShortcuts = (
  callback: (event: KeyboardEvent) => void,
  keys: string[],
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { ctrlKey, metaKey, shiftKey, key } = event;
      const isCtrlOrCmd = ctrlKey || metaKey;
      const targetKey = key.toLowerCase();

      // Normalize the keys array for comparison
      const normalizedKeys = keys.map((k) => k.toLowerCase());

      // Create a set of currently pressed keys
      const pressedKeys = new Set<string>();
      if (isCtrlOrCmd) pressedKeys.add("ctrlorcmd");
      if (shiftKey) pressedKeys.add("shift");
      pressedKeys.add(targetKey);

      // Check if all keys in the normalizedKeys array are matched
      const allKeysMatched = normalizedKeys.every((k) => pressedKeys.has(k));

      // Check if the pressed keys match the length of the shortcut (to avoid extra keys)
      if (allKeysMatched && pressedKeys.size === normalizedKeys.length) {
        event.preventDefault();
        event.stopPropagation();
        callback(event); // Pass the event to the callback
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, keys]);
};

export default useKeyboardShortcuts;
