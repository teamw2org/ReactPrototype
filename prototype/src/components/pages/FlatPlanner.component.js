import React from "react";
import "./FlatPlanner.style.css";
import MuuriComponent from "./Muuri.component";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="mainContent">
        <MuuriComponent />
      </div>
    );
  }
}
