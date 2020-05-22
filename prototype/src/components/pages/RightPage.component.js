import React from "react";

const RightPage = (props) => {
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
        {`Right`}
      </p>
    </div>
  );
};

export default RightPage;
