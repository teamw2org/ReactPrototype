import React, { useRef, useEffect } from "react";
import TreeGrid from "../customTreeGrid/CustomTreeGrid.component";
import "./FlatPlanning.style.css";
import Splitter from "m-react-splitters";
import "m-react-splitters/lib/splitters.css";
import DragAndDrop from "../utils/DragAndDrop";
import BoxTarget from "./BoxTarget";
import TemplateGrid from "../template/TemplateGrid";
import Button from "@material-ui/core/Button";

export default function FlatPlanning() {
  const splitterEl = useRef(null);

  const toggle = () => {
    const primaryPane = document.querySelector(".vertical.primary");
    if (primaryPane) {
      primaryPane.style.width !== "calc(100% - 10px)"
        ? (primaryPane.style.width = "calc(100% - 10px)")
        : (primaryPane.style.width = "70%");
      window.dispatchEvent(new Event("resize"));
    }
  };

  return (
    <DragAndDrop>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "transparent",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Splitter
          position="vertical"
          primaryPaneMinWidth={0}
          primaryPaneMaxWidth={"calc(100% - 10px)"}
          primaryPaneWidth="70%"
          dispatchResize={true}
          postPoned={false}
          ref={splitterEl}
        >
          <>
            <Button
              style={{ marginLeft: "8px", marginBottom: "8px" }}
              variant="contained"
              onClick={toggle}
            >
              Assign content
            </Button>
            <BoxTarget />
          </>
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
              <TemplateGrid key="2" />
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
                    toggle();
                  })
              )}
            </Splitter>
          </div>
        </Splitter>
      </div>
    </DragAndDrop>
  );
}
