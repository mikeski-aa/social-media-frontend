import "../styles/register.css";
import { useState } from "react";
import postUser from "../services/postUser";

function Register() {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [errorStatus, setErrorStatus] = useState("hide");
  const [errorMessage, setErrorMessage] = useState("");

  // input handlers
  const hanldeUsernameInput = (e) => {
    setUsernameInput(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleConfirmPasswordInput = (e) => {
    setConfirmPasswordInput(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await postUser(
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      emailInput
    );

    // password mismatch message or general validation error
    if (response.message === "Password mismatch") {
      console.log("Mismatch");
      setErrorStatus("show");
      setErrorMessage("Password mismatch");
    } else if (response.message === "Input validation failed") {
      console.log("Validation failed");
      setErrorStatus("show");
      setErrorMessage("Validation failed");
    }

    // error from prisma -> usually means that username or password exists already
    if (typeof response.error != "undefined") {
      if (response.error.code === "P2002") {
        setErrorStatus("show");
        setErrorMessage(
          "Error creating user, make sure credentials are unique and valid"
        );
      }
    }
  };

  return (
    <>
      <div className="loginBox">
        <div className="usernameDiv">
          <label htmlFor="usernameInput">USERNAME</label>
          <input
            type="text"
            name="usernameInput"
            className="usernameInput"
            onChange={(e) => hanldeUsernameInput(e)}
          />
        </div>
        <div className="inputName">
          <label htmlFor="emailInput">EMAIL</label>
          <input
            type="email"
            name="emailInput"
            className="emailInput"
            onChange={(e) => handleEmailInput(e)}
          />
        </div>
        <div className="passwordInput">
          <label htmlFor="passwordInput">PASSWORD</label>
          <input
            type="password"
            name="passwordInput"
            className="passwordInput"
            onChange={(e) => handlePasswordInput(e)}
          />
        </div>
        <div className="confirmPasswordInputDiv">
          <label htmlFor="confirmPasswordInput">PASSWORD</label>
          <input
            type="password"
            name="confirmPasswordInput"
            className="confirmPasswordInput"
            onChange={(e) => handleConfirmPasswordInput(e)}
          />
        </div>
        <div className="buttonBox">
          <button className="loginBtn" onClick={(e) => handleRegister(e)}>
            Register
          </button>
        </div>
        <div className={"errorBox " + errorStatus}>{errorMessage}</div>
        <hr />
        <div className="registerLink">
          <div className="textRegister">
            Already have an account? <a href="/login">CLICK HERE</a> to login!
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
