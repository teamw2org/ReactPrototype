import React, { useEffect, useState } from "react";
import "../flatPlanning/FlatPlanning.style.css";
import {
  getVirtualGridElement1,
  getVirtualGridElement2,
  getVirtualGridElement3,
} from "../utils/Utils";
import DragAndDrop from "../utils/DragAndDrop";
import { Column } from "./VirtualGridElement.component";
import ItemTypes from "../customTreeGrid/ItemTypes";
import { useDrop } from "react-dnd";
const LeftPage = (props) => {
  const { width, height, title, checkState } = props;

  useEffect(() => {
    if (checkState) {
      console.log("dupa1");
    }
  }, [checkState]);

  const getItems = () => {
    return getVirtualGridElement3(0);
  };
  const [items, setStateItems] = React.useState([getItems()]);

  return (
    <div
      style={{
        userSelect: "none",
        fontFamily: "sans-serif",

        width: width,
        height: height,
      }}
    >
      <div
        style={{
          clipPath: "polygon(0 0, 0 100%, 100% 0)",
          width: "20px",
          height: "20px",
          backgroundColor: "black",
          position: "absolute",
          left: "0",
        }}
      ></div>
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          fontSize: 18,
        }}
      >
        {title}
      </p>
      {items}
    </div>
  );
};

export default LeftPage;
