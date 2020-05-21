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
      <p>{`Left!`}</p>
    </div>
  );
};

export default LeftPage;
