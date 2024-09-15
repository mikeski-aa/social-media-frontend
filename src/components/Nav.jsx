import { useNavigate } from "react-router";
import home from "../assets/home.svg";
import friends from "../assets/friends.svg";
import logout from "../assets/logoutt.svg";
import "../styles/nav.css";
import { AuthContext } from "../App";
import { useContext } from "react";

function Nav() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    return navigate("/");
  };

  const handleProfClick = () => {
    return navigate("/profile");
  };

  const handleFriendsClick = () => {
    return navigate("/friends");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    return navigate("/login");
  };

  return (
    <div className="navBar">
      <button className="btn1" onClick={handleHomeClick}>
        <img src={home} className="navIcon"></img>
      </button>
      <button className="btn2" onClick={handleFriendsClick}>
        <img src={friends} className="navIcon"></img>
      </button>
      <button className="btn3" onClick={handleProfClick}>
        <img src={authContext.user.profilePic} className="profileNav"></img>
        Profile
      </button>
      <button className="btn4" onClick={handleLogoutClick}>
        <img src={logout} className="navIcon"></img>
      </button>
    </div>
  );
}

export default Nav;
