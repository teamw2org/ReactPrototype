import React, { useEffect } from "react";
import PriintSuiteLogo from "./PriintSuiteLogo.component";
import InputForm from "./InputForm.component";
import Footer from "./Footer.component";
import "./style.css";

export default function Login(props) {
  return (
    <div className="mainFlexContainer">
      <div className="left">
        <PriintSuiteLogo />
        <InputForm handler={props.handler} />
        <Footer />
      </div>
      <div className="right"></div>
    </div>
  );
}
