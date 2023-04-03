import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import useDropdown from "../../hooks/useDropdown";
import useKeyPress, { KeyStateEnum } from "../../hooks/utils/useKeyPress";
// import ScrollBar from "../scrollbar/ScrollBar";
import CustomScroll from "../scrollbar/Custom";

const useStyles = createUseStyles({
  root: {
    width: "100%",
    position: "relative",
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
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    minHeight: "200px",
    // height: 200,
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
    "&:focus": {
      outline: "none",
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
  const [scrollTop, setScrollTop] = React.useState<number>(0);

  // keyboard ability
  const liRefs = React.useRef<Array<HTMLLIElement | null>>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");

  const onSelectedIndex = (
    type: "arrowDown" | "arrowUp" | "select",
    optionIdx = selectedIndex
  ) => {
    let newIndex;
    switch (type) {
      case "arrowUp":
        newIndex = selectedIndex !== 0 ? selectedIndex - 1 : options.length - 1;
        scrollToLi(newIndex);
        setSelectedIndex(newIndex);
        break;
      case "arrowDown":
        newIndex = selectedIndex !== options.length - 1 ? selectedIndex + 1 : 0;
        scrollToLi(newIndex);
        setSelectedIndex(newIndex);
        break;
      case "select":
        setSelectedOption(options[optionIdx]);
        close();
        setSelectedIndex(optionIdx);
        break;
      default:
        throw new Error("unhandle type");
    }
  };

  React.useEffect(() => {
    if (arrowUpPressed == KeyStateEnum.UP) onSelectedIndex("arrowUp");
  }, [arrowUpPressed]);
  React.useEffect(() => {
    if (arrowDownPressed == KeyStateEnum.DOWN) onSelectedIndex("arrowDown");
  }, [arrowDownPressed]);

  function scrollToLi(i: number) {
    const li = liRefs.current[i];
    const cr = containerRef.current;
    if (!cr || !li) return;
    li.focus();
    const liOffsetTop = li.offsetTop - cr.offsetTop;
    setScrollTop(liOffsetTop);
  }

  const onSelect = (_value: string, idx: number) => () => {
    onSelectedIndex("select", idx);
  };

  const handleKeyEnter = (
    event: React.KeyboardEvent<HTMLLIElement>,
    idx: number
  ) => {
    if (event.key === "Enter") {
      onSelectedIndex("select", idx);
    }
  };

  return (
    <div ref={containerRef} className={classes.root}>
      <div
        onClick={toggling}
        className={clsx(classes.label, { [classes.focus]: isOpen })}
        aria-expanded={isOpen}
      >
        {selectedOption}
      </div>
      {isOpen && (
        <CustomScroll
          className={classes.list}
          heightRelativeToParent="calc(100% - 20px)"
          keepAtBottom={true}
          scrollTo={scrollTop}
        >
          <ul>
            {!options && <li>empty</li>}
            {options?.map((option, i) => (
              <li
                className={clsx(
                  classes.item,
                  selectedOption == option && classes.active,
                  i === selectedIndex && classes.hover
                )}
                onClick={onSelect(option, i)}
                key={option}
                ref={(el) => (liRefs.current[i] = el)}
                role="option"
                aria-selected={i === selectedIndex}
                tabIndex={0}
                onKeyDown={(e) => handleKeyEnter(e, i)}
              >
                {option}
              </li>
            ))}
          </ul>
        </CustomScroll>
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
