import { useContext } from "react";
import { AuthContext } from "../App";
import editIcon from "../assets/editIcon.svg";
import postNewUserPic from "../services/postNewUserPic";

function ProfileHeader(props) {
  const authContext = useContext(AuthContext);

  if (typeof authContext.user === "undefined") {
    return null;
  }

  const handleFile = async (e) => {
    console.log(e.target.files[0]);
    const response = await postNewUserPic(e.target.files[0]);
    console.log(response);
  };

  return (
    <div className="profileHeader">
      <div className="profileImageDiv">
        <img
          src={authContext.user.profilePic}
          className="profileUserProfileImg"
        ></img>
        <div className="picChangeDiv">
          <input
            type="file"
            id="file"
            className="picfileinput"
            onChange={(e) => handleFile(e)}
          ></input>
          <label htmlFor="file" className="label-file">
            <img src={editIcon} className="editIcon" />
          </label>
        </div>
      </div>

      <div className="usernameProfile">{authContext.user.username}</div>
    </div>
  );
}

export default ProfileHeader;
