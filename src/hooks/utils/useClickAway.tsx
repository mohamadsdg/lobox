import { useEffect } from "react";

type RefObject<T> = {
  readonly current: T | null;
};

const useClickAway = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClickAway: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickAway]);
};

export default useClickAway;
