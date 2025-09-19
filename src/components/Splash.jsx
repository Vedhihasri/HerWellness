import React, { useEffect } from "react";
import logo from "../assets/logoo.png";
import "./Splash.css";

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
      localStorage.setItem("splashShown", "true");
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div id="splash" className="d-flex justify-content-center align-items-center vh-100">
      <img src={logo} alt="HerWellness Logo" />
    </div>
  );
}





