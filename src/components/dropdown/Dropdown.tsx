import React from "react";
import { createUseStyles } from "react-jss";
import useDropdown from "../../hooks/useDropdown";
const useStyles = createUseStyles({});

type DropdownListType = {
  list?: Array<string>;
  defaultOpen?: boolean;
  defaultLabel?: string;
};

const DropdownList: React.FC<DropdownListType> = ({
  list,
  defaultOpen,
  defaultLabel,
}): React.ReactElement => {
  const { containerRef, isOpen, toggling, close } = useDropdown(defaultOpen);
  const [selectedOption, setSelectedOption] = React.useState<
    string | undefined
  >(defaultLabel);

  const [options, setOptions] = React.useState<Array<string> | undefined>(list);

  const onSelect = (value: string) => () => {
    setSelectedOption(value);
    close();
  };

  return (
    <div ref={containerRef}>
      <button onClick={toggling}>{selectedOption}</button>
      {isOpen && (
        <div>
          <ul>
            {!options && <li>empty</li>}
            {options?.map((option) => (
              <li onClick={onSelect(option)} key={Math.random()}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

DropdownList.defaultProps = {
  list: ["item1", "item2", "item3"],
  defaultOpen: false,
  defaultLabel: "--Select Item--",
};

export default DropdownList;
