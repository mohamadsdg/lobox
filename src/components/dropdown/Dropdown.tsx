import React from "react";
import { createUseStyles } from "react-jss";
import useClickAway from "../../hooks/utils/useClickAway";
const useStyles = createUseStyles({});

const Items: Array<string> = ["item1", "item2", "item3"];

const DropdownList: React.FC = (): React.ReactElement => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    "--Select Item--"
  );

  useClickAway(dropdownRef, () => setIsOpen(false));

  const toggling = () => setIsOpen(!isOpen);

  const onSelect = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      <button onClick={toggling}>{selectedOption}</button>
      {isOpen && (
        <div>
          <ul>
            {Items.map((item) => (
              <li onClick={onSelect(item)} key={Math.random()}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownList;
