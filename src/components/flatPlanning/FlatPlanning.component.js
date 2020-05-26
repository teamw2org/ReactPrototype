import React, { useCallback, useEffect } from "react";
import TreeGrid from "../Task.component";
import "./FlatPlanning.style.css";
import Splitter from "m-react-splitters";
import "m-react-splitters/lib/splitters.css";
import DragAndDrop from "../utils/DragAndDrop";
import BoxTarget from "./BoxTarget";

export default function FlatPlanning() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Splitter
        position="vertical"
        primaryPaneMinWidth={0}
        primaryPaneMaxWidth={"100%"}
        primaryPaneWidth="70%"
        dispatchResize={true}
        postPoned={false}
      >
        <DragAndDrop>
          <BoxTarget />
        </DragAndDrop>
        <div style={{ width: "100%", height: "100%", padding: "3px 3px" }}>
          <Splitter
            position="horizontal"
            primaryPaneMinHeight={0}
            primaryPaneMaxHeight={"100%"}
            primaryPaneHeight="50%"
            dispatchResize={true}
            postPoned={false}
          >
            <TreeGrid key="1" />
            <TreeGrid key="2" />
            {useEffect(() =>
              document
                .querySelector(".handle-bar.horizontal")
                .addEventListener("dblclick", () => {
                  const primaryPane = document.querySelector(
                    ".horizontal.primary"
                  );
                  primaryPane.style.height !== "calc(100% - 10px)"
                    ? (primaryPane.style.height = "calc(100% - 10px)")
                    : (primaryPane.style.height = "50%");
                })
            )}
            {useEffect(() =>
              document
                .querySelector(".handle-bar.vertical")
                .addEventListener("dblclick", () => {
                  const primaryPane = document.querySelector(
                    ".vertical.primary"
                  );
                  primaryPane.style.width !== "calc(100% - 10px)"
                    ? (primaryPane.style.width = "calc(100% - 10px)")
                    : (primaryPane.style.width = "70%");
                })
            )}
          </Splitter>
        </div>
      </Splitter>
    </div>
  );
}
