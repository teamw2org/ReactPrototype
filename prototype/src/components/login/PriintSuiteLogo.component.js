import React from "react";
import priint from "./resources/priint.png";

export default function PriintSuiteLogo() {
  return (
    <div className="logo">
      <a href="https://www.priint.com">
        <img src={priint} alt="priint:suite logo" />
      </a>
    </div>
  );
}
