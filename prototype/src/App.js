import React, { useState } from "react";
import "./App.css";
import MainLayout from "./mainLayout/MainLayout";
import Login from "./components/login/Login.component";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return <MainLayout />;

  // if (isLoggedIn) {
  //   return <MainLayout />;
  // } else {
  //   return <Login handler={loginHandler} />;
  // }
}

export default App;
