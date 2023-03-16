import React from "react";
import logo from "./logo.svg";
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
    minHeight: "100vh",
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

function App() {
  const classes = useStyles();

  return (
    <div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <main className={classes.main}>
        {/* <input className={classes.entry} contentEditable={true} /> */}
        <DropdownList />
      </main>
      {/* <button className={classes.myButton}>
        <span className={classes.myLabel}>
          <span>Submit</span>
        </span>
      </button> */}
    </div>
  );
}

export default App;
