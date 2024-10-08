import "../styles/registerlogin.css";
import { useState } from "react";
// import postUser from "../services/postUser";
import { postUser } from "../services/userCalls";
import { Link, useNavigate } from "react-router-dom";
import headerImage from "../assets/headerimage.png";
import CreatingUserModal from "../components/CreatingUserModal";

function Register() {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [errorStatus, setErrorStatus] = useState("hide");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);
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
      setLoading(false);
      return setErrorText("Passwords need to match!");
    } else if (response.message === "Input validation failed") {
      console.log("Validation failed");
      setErrorStatus("show");
      setLoading(false);
      return setErrorText(
        "Error creating user, make sure credentials are unique and valid"
      );
    }

    // error from prisma -> usually means that username or password exists already
    if (typeof response.error != "undefined") {
      if (response.error.code === "P2002") {
        setErrorStatus("show");
        setLoading(false);
        return setErrorText(
          "Error creating user, make sure credentials are unique and valid"
        );
      }
    }
    setLoading(false);
    return navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="formBoxContainer">
        {loading ? <CreatingUserModal /> : null}
        <div className="leftLoginBanner">
          <img src={headerImage} className="headerImageLogin"></img>
          <div className="headerTextLogin">
            Connect with friends and the world around you on Odinbook.
          </div>
        </div>
        <div className="formBox">
          <div className="boxHeader"></div>
          <form className="inputForm">
            <div className="usernameDiv">
              <label htmlFor="usernameInput"></label>
              <input
                type="text"
                name="usernameInput"
                className="usernameInput"
                maxLength={15}
                minLength={1}
                placeholder="Username"
                onChange={(e) => hanldeUsernameInput(e)}
              />
            </div>
            <div className="inputName">
              <label htmlFor="emailInput"></label>
              <input
                type="email"
                name="emailInput"
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
            <div className="confirmPasswordInputDiv">
              <label htmlFor="confirmPasswordInput"></label>
              <input
                type="password"
                name="confirmPasswordInput"
                className="confirmPasswordInput"
                placeholder="Confirm password"
                onChange={(e) => handleConfirmPasswordInput(e)}
              />
            </div>
            <div className="buttonBox">
              <button className="loginBtn" onClick={(e) => handleRegister(e)}>
                Register
              </button>
            </div>
            <div className={"errorBox " + errorStatus}>{errorText}</div>
          </form>
          <hr />
          <div className="registerLink">
            <button className="registerRedirectBtn" onClick={handleLoginClick}>
              I already have an account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
