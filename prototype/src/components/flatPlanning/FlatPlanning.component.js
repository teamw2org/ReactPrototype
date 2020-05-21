import React, { useCallback, useEffect } from "react";
import TreeGrid from "../Task.component";
import "./FlatPlanning.style.css";
import Splitter from "m-react-splitters";
import "m-react-splitters/lib/splitters.css";
import TableHead from "@material-ui/core/TableHead";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import BoxTarget from "./BoxTarget";

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
      <DndProvider backend={Backend}>
        <BoxTarget />
      </DndProvider>
      <div style={{ width: "30%", height: "100%" }}>
        <div style={{ width: "100%", height: "100%", padding: "3px 3px" }}>
          <Splitter
            position="horizontal"
            primaryPaneMinHeight={0}
            primaryPaneMaxHeight={"100%"}
            primaryPaneHeight="50%"
            dispatchResize={true}
            postPoned={true}
          >
            <TreeGrid key="1" />
            <TreeGrid key="2" />
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
    </div>
  );
}
