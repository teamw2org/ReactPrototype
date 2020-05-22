import React, { useState } from "react";
import "../flatPlanning/FlatPlanning.style.css";
import {
  getVirtualGridElement1,
  getVirtualGridElement2,
  getVirtualGridElement3,
} from "../utils/Utils";
const LeftPage = (props) => {
  const { width, height, title } = props;

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
      {Math.random() < 0.3
        ? getVirtualGridElement1(0)
        : Math.random() < 0.5
        ? getVirtualGridElement2(0)
        : getVirtualGridElement3(0)}
    </div>
  );
};

export default LeftPage;
