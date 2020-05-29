import React, { useState } from "react";
import iconEye from "./resources/iconEye.svg";
import iconEyeHidden from "./resources/iconEyeHidden.svg";
import settingsIcon from "./resources/settings.svg";
import AdvancedOptions from "./AdvancedOptions.component";

export default function InputForm(props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAdvancedSectionVisible, setIsAdvancedSectionVisible] = useState(
    false
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleAdvancedSectionVisibility = () => {
    setIsAdvancedSectionVisible(!isAdvancedSectionVisible);
  };

  return (
    <div className="inputFields">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Please enter your username"
        autoFocus
      />
      <label htmlFor="password">Password</label>
      <img
        onClick={togglePasswordVisibility}
        id="iconEye"
        src={isPasswordVisible ? iconEyeHidden : iconEye}
        alt=""
      />
      <input
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Please enter your password"
      />
      <button id="loginButton" onClick={props.handler}>
        Login
      </button>
      <button
        id="advancedButton"
        title="Advanced"
        onClick={toggleAdvancedSectionVisibility}
      >
        <img src={settingsIcon} alt="" />
      </button>
      <div id="advancedSection">
        {isAdvancedSectionVisible ? <AdvancedOptions /> : null}
      </div>
    </div>
  );
}
