import "../styles/register.css";

function Register() {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [errorStatus, setErrorStatus] = useState("hide");

  return (
    <>
      <div className="loginBox">
        <div className="usernameDiv">
          <label htmlFor="usernameInput">USERNAME</label>
          <input type="text" name="usernameInput" className="usernameInput" />
        </div>
        <div className="inputName">
          <label htmlFor="emailInput">EMAIL</label>
          <input type="email" name="emailInput" className="emailInput" />
        </div>
        <div className="passwordInput">
          <label htmlFor="passwordInput">PASSWORD</label>
          <input
            type="password"
            name="passwordInput"
            className="passwordInput"
          />
        </div>
        <div className="confirmPasswordInputDiv">
          <label htmlFor="confirmPasswordInput">PASSWORD</label>
          <input
            type="password"
            name="confirmPasswordInput"
            className="confirmPasswordInput"
          />
        </div>
        <div className="buttonBox">
          <button className="loginBtn">LOGIN</button>
        </div>
        <div className={"errorBox " + errorStatus}></div>
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
