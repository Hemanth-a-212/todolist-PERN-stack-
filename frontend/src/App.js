import React, { Fragment } from "react";
import Headers from './components/Header/Header';
import "./App.css";

import Taskform from "./components/Taskform/Taskform"
import Tasklist from "./components/Tasklist/Tasklist";

function App() {
  return (
    <Fragment>
      <Headers/>
      <div className="cont">
        <Taskform />
        <Tasklist />
      </div>
    </Fragment>
  );
}

export default App;
