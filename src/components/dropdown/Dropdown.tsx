import React from "react";
import { createUseStyles } from "react-jss";
import useDropdown from "../../hooks/useDropdown";

const useStyles = createUseStyles({
  root: {
    width: "100%",
  },
  label: {
    background: "#ffffff",
    border: "1px solid #ced4da",
    transition: "ease 0.2s",
    borderRadius: "6px",
    padding: "0.75rem 0.75rem",
    cursor: "pointer",
    position: "relative",
    "&:after": {
      content: '" "',
      width: "6px",
      height: "6px",
      display: "inline-block",
      borderColor: "#858a90 #858a90 transparent transparent",
      borderStyle: "solid",
      borderWidth: "2px",
      transform: "rotate(-45deg)",
      transformOrigin: "50% 50%",
      position: "absolute",
      right: "20px",
      top: "20px",
    },
  },
  focus: {
    boxShadow: "0 0 0 0.2rem #C7D2FE",
    borderColor: "#8b9adb",
    "&:after": {
      borderColor: "transparent transparent #858a90 #858a90 ",
      top: "18px",
    },
  },
  list: {
    backgroundColor: "#fff",
    transform: "translateY(5px)",
    borderRadius: "6px",
    padding: "15px",
    "& ul": {
      listStyleType: "none",
      padding: 0,
      margin: 0,
    },
    maxHeight: "60px",
    overflowY: "scroll",
  },
  item: {
    padding: "10px",
    margin: "3px 0",
    borderRadius: "6px",
    transition: "ease 0.2s",
    cursor: "pointer",
    "&:hover": {
      background: "#f2f4ff",
      color: "#627ad4",
    },
  },
  active: {
    background: "#f2f4ff",
    color: "#627ad4",
    position: "relative",
    "&:after": {
      content: '"✔"',
      position: "absolute",
      right: "15px",
    },
  },
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
  const { containerRef, isOpen, toggling, close } = useDropdown(defaultOpen);
  const classes = useStyles({ theme: { isOpen } });

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
      <div
        onClick={toggling}
        className={[classes.label, isOpen ? classes.focus : ""]
          .join(" ")
          .trim()}
      >
        {selectedOption}
      </div>
      {isOpen && (
        <div className={classes.list}>
          <ul>
            {!options && <li>empty</li>}
            {options?.map((option) => (
              <li
                className={[
                  classes.item,
                  selectedOption == option && classes.active,
                ]
                  .join(" ")
                  .trim()}
                onClick={onSelect(option)}
                key={option}
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
