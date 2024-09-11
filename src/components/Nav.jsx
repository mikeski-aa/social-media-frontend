import { useNavigate } from "react-router";

function Nav() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    return navigate("/");
  };

  const handleProfClick = () => {
    return navigate("/profile");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    return navigate("/login");
  };

  return (
    <div className="navBar">
      <button className="btn1" onClick={handleHomeClick}>
        Home
      </button>
      <button className="btn2">Friends</button>
      <button className="btn3" onClick={handleProfClick}>
        Profile
      </button>
      <button className="btn4" onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
}

export default Nav;
