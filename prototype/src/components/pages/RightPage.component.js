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
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          fontSize: 18,
        }}
      >
        {`Right!`}
      </p>
    </div>
  );
};

export default RightPage;
