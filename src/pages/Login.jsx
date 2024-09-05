import { useState } from "react";
import "../styles/login.css";
import postUserLogin from "../services/postUserLogin";
import { useNavigate } from "react-router";

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorStatus, setErrorStatus] = useState("hide");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  // input handlers
  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const response = await postUserLogin(emailInput, passwordInput);

    console.log(localStorage.getItem("token"));
    console.log(response);
    // if error message display error box
    // otherwise, redirect to homepage after logging in!
    if (response.message) {
      setErrorStatus("show");
      setErrorText("Please make sure your email and password is correct");
    } else {
      setErrorStatus("hide");
      setErrorText("");
      return navigate("/");
    }
  };

  return (
    <>
      <div className="loginBox">
        <div className="inputName">
          <label htmlFor="emailInput">EMAIL</label>
          <input
            type="email"
            name="emialInput"
            className="emailInput"
            onChange={(e) => handleEmailInput(e)}
          />
        </div>
        <div className="passwordInputDiv">
          <label htmlFor="passwordInput">PASSWORD</label>
          <input
            type="password"
            name="passwordInput"
            className="passwordInput"
            onChange={(e) => handlePasswordInput(e)}
          />
        </div>
        <div className="buttonBox">
          <button className="loginBtn" onClick={(e) => handleLoginClick(e)}>
            LOGIN
          </button>
        </div>
        <div className="buttonBox">
          <button className="guestBtn">GUEST LOGIN</button>
        </div>
        <div className={"errorBox " + errorStatus}>{errorText}</div>
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
