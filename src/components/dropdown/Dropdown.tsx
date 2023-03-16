import React from "react";
import { createUseStyles } from "react-jss";
import useDropdown from "../../hooks/useDropdown";

const useStyles = createUseStyles({
  root: {},
  label: {
    background: "#ffffff",
    border: "1px solid #ced4da",
    transition: "ease 0.2s",
    borderRadius: "6px",
    padding: "0.75rem 0.75rem",
    "&:focus": {
      boxShadow: "0 0 0 0.2rem #C7D2FE",
      borderColor: "#6366F1",
    },
  },
  list: {},
  item: {},
});

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
  const classes = useStyles();

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
    <div ref={containerRef} className={classes.root}>
      <div onClick={toggling} className={classes.label}>
        {selectedOption}
      </div>
      {isOpen && (
        <div className={classes.list}>
          <ul>
            {!options && <li>empty</li>}
            {options?.map((option) => (
              <li
                className={classes.item}
                onClick={onSelect(option)}
                key={Math.random()}
              >
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
