import { useContext } from "react";
import { AuthContext } from "../App";
import person from "../assets/person.svg";

function ProfileHeader(props) {
  const authContext = useContext(AuthContext);
  let img;

  if (typeof authContext.user === "undefined") {
    return null;
  }

  if (authContext.user.profilePic === "default") {
    img = person;
  } else {
    img = authContext.user.profilePic;
  }
  return (
    <div className="profileHeader">
      <img src={img} className="profileUserProfileImg"></img>
      <div className="usernameProfile">{authContext.user.username}</div>
    </div>
  );
}

export default ProfileHeader;
