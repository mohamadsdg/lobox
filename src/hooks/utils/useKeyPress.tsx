import { useEffect, useState } from "react";

export enum KeyStateEnum {
  UP = "up",
  DOWN = "down",
}
/**
 *
 * @param targetKey Pick<KeyboardEvent, "key">
 * @example "ArrowUp" | "ArrowDown" | "Enter" or any key
 * @returns has been selected key
 */
const useKeyPress = (targetKey: "ArrowUp" | "ArrowDown" | string) => {
  const [keyPressed, setKeyPressed] = useState<KeyStateEnum | string>("");
  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(KeyStateEnum.DOWN);
      }
    };
    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(KeyStateEnum.UP);
      }
    };
    const pressHandler = ({ key }: KeyboardEvent) => {
      if (key !== "ArrowUp" && key != "ArrowDown") {
        setKeyPressed(key);
      }
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    window.addEventListener("keypress", pressHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      window.removeEventListener("keypress", pressHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

export default useKeyPress;
