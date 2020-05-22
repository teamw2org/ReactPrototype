import React from "react";
import "../flatPlanning/FlatPlanning.style.css";
const LeftPage = (props) => {
  const { width, height } = props;

  return (
    <div
      style={{
        userSelect: "none",
        border: "1px solid black",
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
      >{`Left`}</p>
    </div>
  );
};

export default LeftPage;
