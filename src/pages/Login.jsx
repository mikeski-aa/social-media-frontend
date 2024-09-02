import { useState } from "react";
import "../styles/login.css";

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorStatus, setErrorStatus] = useState("hide");

  return (
    <>
      <div className="loginBox">
        <div className="inputName">
          <label htmlFor="emailInput">EMAIL</label>
          <input type="email" name="emialInput" className="emailInput" />
        </div>
        <div className="passwordInput">
          <label htmlFor="passwordInput">PASSWORD</label>
          <input
            type="password"
            name="passwordInput"
            className="passwordInput"
          />
        </div>
        <div className="buttonBox">
          <button className="loginBtn">LOGIN</button>
        </div>
        <div className="buttonBox">
          <button className="guestBtn">GUEST LOGIN</button>
        </div>
        <div className={"errorBox " + errorStatus}></div>
        <hr />
        <div className="registerLink">
          <div className="textRegister">
            Don't have an account? <a href="/register">CLICK HERE</a> to
            regsiter!
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
