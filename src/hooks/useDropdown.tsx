import { useState, useCallback, useRef, useEffect } from "react";
import useClickAway from "./utils/useClickAway";

const useDropdown = (defaultOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const ref = useRef<any>(null);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggling = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  useEffect(() => {
    // console.log(ref.current.focus());
    // if (isOpen) document.body.style.overflow = "hidden";
    // else document.body.removeAttribute("style");
  }, [isOpen]);

  // adding click away func
  useClickAway(ref, close);

  return { containerRef: ref, isOpen, open, close, toggling };
};

export default useDropdown;
