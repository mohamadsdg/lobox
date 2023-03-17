import React from "react";
import { createUseStyles } from "react-jss";
import useDropdown from "../../hooks/useDropdown";
import useKeyPress, { KeyStateEnum } from "../../hooks/utils/useKeyPress";
import ScrollBar from "../scrollbar/ScrollBar";

const useStyles = createUseStyles({
  root: {
    width: "100%",
  },
  label: {
    background: "#ffffff",
    border: "1px solid #ced4da",
    transition: "ease 0.2s",
    borderRadius: "10px",
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
    transform: "translateY(6px)",
    border: "1px solid #ced4da",
    borderRadius: "15px",
    padding: "15px",
    height: "200px",
    "& ul": {
      listStyleType: "none",
      padding: 0,
      margin: 0,
    },
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
  hover: {
    background: "#f2f4ff",
    color: "#627ad4",
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
  list = [],
  defaultOpen,
  defaultLabel,
}): React.ReactElement => {
  const classes = useStyles();
  const { containerRef, isOpen, toggling, close } = useDropdown(defaultOpen);
  const [selectedOption, setSelectedOption] = React.useState<
    string | undefined
  >(defaultLabel);
  const [options, setOptions] = React.useState<Array<string>>(list);

  // keyboard ability
  const reducer = (
    state: { selectedIndex: number },
    action: { type: string; payload?: any }
  ) => {
    switch (action.type) {
      case "arrowUp":
        return {
          selectedIndex:
            state.selectedIndex !== 0
              ? state.selectedIndex - 1
              : options.length - 1,
        };
      case "arrowDown":
        return {
          selectedIndex:
            state.selectedIndex !== options.length - 1
              ? state.selectedIndex + 1
              : 0,
        };
      case "select":
        setSelectedOption(options[action.payload]);
        close();
        return { selectedIndex: action.payload };
      default:
        throw new Error("unhandle type");
    }
  };
  const [state, dispatch] = React.useReducer(reducer, { selectedIndex: -1 });
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const enterPressed = useKeyPress("Enter");
  React.useEffect(() => {
    if (arrowUpPressed == KeyStateEnum.UP) dispatch({ type: "arrowUp" });
  }, [arrowUpPressed]);
  React.useEffect(() => {
    if (arrowDownPressed == KeyStateEnum.DOWN) dispatch({ type: "arrowDown" });
  }, [arrowDownPressed]);
  React.useEffect(() => {
    if (enterPressed == "Enter") {
      dispatch({ type: "select", payload: state.selectedIndex });
    }
  }, [enterPressed]);

  // manual scrolling
  // TODO: I didn't have time to tarce the algoritem (later trace it)
  const handleManual = React.useCallback(
    (ref: any) => {
      if (arrowDownPressed == KeyStateEnum.DOWN && state.selectedIndex > 2) {
        ref.scrollTop += 100;
      } else if (
        arrowUpPressed == KeyStateEnum.UP &&
        state.selectedIndex < options.length - 2
      ) {
        ref.scrollTop -= 100;
      }
    },
    [arrowUpPressed, arrowDownPressed]
  );

  const onSelect = (_value: string, idx: number) => () => {
    dispatch({ type: "select", payload: idx });
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
        <ScrollBar className={classes.list} manualScrolling={handleManual}>
          <ul>
            {!options && <li>empty</li>}
            {options?.map((option, i) => (
              <li
                className={[
                  classes.item,
                  selectedOption == option ? classes.active : "",
                  i === state.selectedIndex ? classes.hover : "",
                ]
                  .join(" ")
                  .trim()}
                onClick={onSelect(option, i)}
                key={option}
              >
                {option}
              </li>
            ))}
          </ul>
        </ScrollBar>
      )}
    </div>
  );
};

DropdownList.defaultProps = {
  list: [
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
    "item6",
    "item7",
    "item8",
    "item9",
  ],
  defaultOpen: false,
  defaultLabel: "--Select Item--",
};

export default DropdownList;
