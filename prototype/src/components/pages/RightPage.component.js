import React from "react";
import {
  getVirtualGridElement1,
  getVirtualGridElement2,
  getVirtualGridElement3,
} from "../utils/Utils";

const RightPage = (props) => {
  const { width, height, title } = props;
  return (
    <div
      style={{
        userSelect: "none",
        fontFamily: "sans-serif",
        borderLeft: "1px solid black",
        width: width,
        height: height,
      }}
    >
      <div
        style={{
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          width: "20px",
          height: "20px",
          backgroundColor: "black",
          position: "absolute",
          right: "0",
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
        ? getVirtualGridElement1(210)
        : Math.random() < 0.5
        ? getVirtualGridElement2(210)
        : getVirtualGridElement3(210)}
    </div>
  );
};

export default RightPage;
