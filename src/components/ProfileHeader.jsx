import { useContext } from "react";
import { AuthContext } from "../App";

function ProfileHeader(props) {
  const authContext = useContext(AuthContext);

  if (typeof authContext.user === "undefined") {
    return null;
  }

  return (
    <div className="profileHeader">
      <img
        src={authContext.user.profilePic}
        className="profileUserProfileImg"
      ></img>
      <div className="usernameProfile">{authContext.user.username}</div>
    </div>
  );
}

export default ProfileHeader;
