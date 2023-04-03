import React from "react";
import { createUseStyles } from "react-jss";
import DropdownList from "./components/dropdown/Dropdown";
import "./App.css";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6rem",
    minHeight: "100%",
  },
  entry: {
    // color: "rgb(205, 205, 205)",
    // width: "100%",
    // height: "100%",
    // fontSize: "15px",
    // borderWidth: "1px",
    // borderStyle: "solid",
    // borderColor: "rgb(57, 57, 57)",
    // borderImage: "initial",
    // padding: "10px 10px 10px 16px",
    // // background: "padding-box rgb(36, 36, 36)",
    // outline: "none",
    // borderRadius: "20px",
    // "&:focus": {
    //   borderColor: "#5384EE",
    // },
  },
});

const App: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <main className={classes.main}>
        {/* <input className={classes.entry} contentEditable={true} /> */}
        <DropdownList />
      </main>
    </div>
  );
};

export default App;
