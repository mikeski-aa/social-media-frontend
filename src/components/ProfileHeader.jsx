import { useContext } from "react";
import { AuthContext } from "../App";

function ProfileHeader(props) {
  const authContext = useContext(AuthContext);

  if (typeof authContext.user === "undefined") {
    return null;
  }

  const handleFile = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <div className="profileHeader">
      <div className="profileImageDiv">
        <div className="picChangeDiv">
          <input
            type="file"
            id="file"
            className="picfileinput"
            onChange={(e) => handleFile(e)}
          ></input>
          <label htmlFor="file" className="label-file">
            Change pic
          </label>
        </div>
        <img
          src={authContext.user.profilePic}
          className="profileUserProfileImg"
        ></img>
      </div>

      <div className="usernameProfile">{authContext.user.username}</div>
    </div>
  );
}

export default ProfileHeader;
