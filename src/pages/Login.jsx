import { useContext, useState } from "react";
import "../styles/registerlogin.css";
import postUserLogin from "../services/postUserLogin";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorStatus, setErrorStatus] = useState("hide");
  const [errorText, setErrorText] = useState("");
  const authContext = useContext(AuthContext);
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
    console.log("RESPONSE HERE");
    console.log(localStorage.getItem("token"));
    console.log(response);
    // if error message display error box
    // otherwise, redirect to homepage after logging in!
    if (response.message) {
      setErrorStatus("show");
      return setErrorText(
        `Please make sure your email and password is correct`
      );
    } else {
      setErrorStatus("hide");
      setErrorText("");
    }
    console.log("successfuly logged in, navigating away");
    authContext.setErr(false);
    await authContext.setUser(response.user);
    return navigate("/");
  };

  // redirect to register page
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="formBoxContainer">
        <div className="formBox">
          <div className="boxHeader">OdinBook</div>
          <form className="inputForm">
            <div className="inputName">
              <label htmlFor="emailInput"></label>
              <input
                type="email"
                name="emialInput"
                className="emailInput"
                placeholder="Email"
                onChange={(e) => handleEmailInput(e)}
              />
            </div>
            <div className="passwordInputDivBox">
              <label htmlFor="passwordInput"></label>
              <input
                type="password"
                name="passwordInput"
                className="passwordInput"
                placeholder="Password"
                onChange={(e) => handlePasswordInput(e)}
              />
            </div>
            <div className="buttonBox">
              <button className="loginBtn" onClick={(e) => handleLoginClick(e)}>
                Login
              </button>
            </div>
            <div className="buttonBox">
              <button className="guestBtn">Guest login</button>
            </div>
            <div className={"errorBox " + errorStatus}>{errorText}</div>
          </form>

          <hr />
          <div className="registerLink">
            <button
              className="registerRedirectBtn"
              onClick={handleRegisterClick}
            >
              Create new account
            </button>
            {/* <div className="textRegister">
              Don't have an account? <Link to="/register">CLICK HERE </Link>
              to regsiter!
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
