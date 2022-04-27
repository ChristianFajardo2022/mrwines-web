import React from "react";
import "../styles/welcome.css";
import { Link as LinkRouter } from "react-router-dom";

function Welcome() {
  return (
    <div className="div-container">
      <div className="div-1">
        <p className="custom-name">Mr.Wines</p>
        <p>Welcome to the taste</p>
        <div className="div-2">
          <p>Please <LinkRouter className="custom-linkRouter" to="signIn">sign in</LinkRouter></p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;