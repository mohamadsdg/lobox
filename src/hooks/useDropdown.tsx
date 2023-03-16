import { useState, useCallback, useRef } from "react";
import useClickAway from "./utils/useClickAway";

const useDropdown = (defaultOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const ref = useRef(null);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggling = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  // adding click away func
  useClickAway(ref, close);

  return { containerRef: ref, isOpen, open, close, toggling };
};

export default useDropdown;
