import { useNavigate, useParams } from "react-router";
import home from "../assets/home.svg";
import friends from "../assets/friends.svg";
import logout from "../assets/logoutt.svg";
import "../styles/nav.css";
import { AuthContext } from "../App";
import { useContext, useEffect, useState } from "react";
import useRedirectValidFail from "../hooks/useRedirectValidFail";

function Nav() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeFriends, setActiveFriends] = useState(false);
  const [activeHome, setActiveHome] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);

  useRedirectValidFail(authContext.err);
  if (typeof authContext.user === "undefined") {
    return null;
  }

  if (window.location.pathanme === "/friends") {
    console.log("xd");
  } else if (window.location.pathanme === "") {
    console.log("dd");
  }

  useEffect(() => {
    console.log("///////////////////////////////");
    console.log("///////////////////////////////");
    console.log("///////////////////////////////");
    console.log("///////////////////////////////");
    console.log("///////////////////////////////");
    console.log("changed pathname");

    if (window.location.pathname === "/friends") {
      setActiveFriends(true);
      setActiveHome(false);
      setActiveProfile(false);
    } else if (window.location.pathname === "/") {
      setActiveFriends(false);
      setActiveHome(true);
      setActiveProfile(false);
    } else if (window.location.pathname === "/profile") {
      setActiveFriends(false);
      setActiveHome(false);
      setActiveProfile(true);
    }
  }, [window.location.pathname]);

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
      <button className={"btn1 " + activeHome} onClick={handleHomeClick}>
        <img src={home} className="navIcon"></img>
      </button>
      <button className={"btn2 " + activeFriends} onClick={handleFriendsClick}>
        <img src={friends} className="navIcon"></img>
      </button>
      <button className={"btn3 " + activeProfile} onClick={handleProfClick}>
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
