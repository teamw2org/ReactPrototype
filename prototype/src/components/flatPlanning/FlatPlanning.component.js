import React, { useEffect } from "react";
import TreeGrid from "../TreeGrid.component";
import "./FlatPlanning.style.css";
import Splitter from "m-react-splitters";
import "m-react-splitters/lib/splitters.css";

export default function FlatPlanning() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        overflow: "auto",
      }}
    >
      <div id="content"></div>
      <div style={{ width: "30%", height: "100%" }}>
        <Splitter
          position="horizontal"
          primaryPaneMinHeight={0}
          primaryPaneMaxHeight={"100%"}
          primaryPaneHeight="50%"
          dispatchResize={true}
          postPoned={true}
        >
          <TreeGrid sizeInPercentage="calc(100% - 37px)" key="1" />
          <TreeGrid sizeInPercentage="calc(100% - 37px)" key="2" />
          {useEffect(() =>
            document
              .querySelector(".handle-bar")
              .addEventListener("dblclick", () => {
                const primaryPane = document.querySelector(".primary");
                primaryPane.style.height !== "calc(100% - 10px)"
                  ? (primaryPane.style.height = "calc(100% - 10px)")
                  : (primaryPane.style.height = "50%");
              })
          )}
        </Splitter>
      </div>
    </div>
  );
}
