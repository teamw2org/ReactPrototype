import React from "react";

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
    </div>
  );
};

export default RightPage;
