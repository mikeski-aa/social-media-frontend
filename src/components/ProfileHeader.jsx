import { useContext, useState } from "react";
import { AuthContext } from "../App";
import editIcon from "../assets/editIcon.svg";
import postNewUserPic from "../services/postNewUserPic";
import gifloading from "../assets/gifloading.gif";
import checkLoginStatus from "../services/checkLoginStatus";

function ProfileHeader(props) {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  if (typeof authContext.user === "undefined") {
    return null;
  }

  const handleFile = async (e) => {
    if (typeof e.target.files[0] === "undefined") {
      return null;
    }
    alert("avatar upload");
    setLoading(true);
    console.log(e.target.files[0]);
    const response = await postNewUserPic(e.target.files[0]);
    const updateProfile = await checkLoginStatus();
    authContext.setUser(updateProfile);
    setLoading(false);
    console.log(response);
  };

  return (
    <div className="profileHeader">
      <div className="profileImageDiv">
        {loading ? (
          <img src={gifloading} className="loadingGifImg"></img>
        ) : (
          <img
            src={authContext.user.profilePic}
            className="profileUserProfileImg"
          ></img>
        )}

        <div className="picChangeDiv">
          {/* <input
            type="file"
            id="bannerfile"
            className="picfileinput"
            onChange={(e) => handleFile(e)}
          ></input>
          <label htmlFor="bannerfile" className="label-file-banner">
            <img src={editIcon} className="editIcon" />
          </label> */}
        </div>
      </div>
      <div className="profileHeaderNameEditContainer">
        <div className="usernameProfile">{authContext.user.username}</div>
        <button className="editProfileBtn" onClick={props.openProfleModel}>
          Edit profile
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
