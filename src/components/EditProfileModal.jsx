import { useContext, useState } from "react";
import "../styles/editprofilemodal.css";
import { AuthContext } from "../App";
import { postNewUserPic } from "../services/refactor/userCalls";
// import postNewUserPic from "../services/postNewUserPic";
import checkLoginStatus from "../services/checkLoginStatus";
import gifloading from "../assets/gifloading.gif";
import { postNewBanner } from "../services/refactor/userCalls";
// import postNewBanner from "../services/postNewBanner";

function EditProfileModal(props) {
  const authContext = useContext(AuthContext);
  const [fileName, setFileName] = useState("Choose a file");
  const [loading, setLoading] = useState(false);
  const [bannerUpload, setBannerUpload] = useState(false);

  const handleCloseModal = () => {
    props.setModalVisible(false);
  };

  const handleProfilePicUpload = async (e) => {
    if (typeof e.target.files[0] === "undefined") {
      return null;
    }
    setLoading(true);
    console.log(e.target.files[0]);
    const response = await postNewUserPic(e.target.files[0]);
    const updateProfile = await checkLoginStatus();
    authContext.setUser(updateProfile);
    setLoading(false);
    console.log(response);
  };

  const handleBannerUpload = async (e) => {
    if (typeof e.target.files[0] === "undefined") {
      return null;
    }
    setBannerUpload(true);

    const response = await postNewBanner(e.target.files[0]);
    const updateProfile = await checkLoginStatus();
    authContext.setUser(updateProfile);
    setBannerUpload(false);
    console.log(response);
  };

  return (
    <div className={"modal " + props.visibility}>
      {bannerUpload ? (
        <div className="loadingFakeModal">
          <div className="innerFakeModal">
            {" "}
            Uploading new banner. This may take some time...{" "}
            <img src={gifloading} className="loadingGifImg"></img>
          </div>
        </div>
      ) : null}
      <div className="editProfileContainer">
        <button className="closeSearchModalBtn" onClick={handleCloseModal}>
          Close
        </button>
        <div className="editOptions">
          <div className="profilePic">
            {loading ? (
              <img src={gifloading} className="loadingGifImg"></img>
            ) : (
              <img
                src={authContext.user.profilePic}
                className="editProfilePic"
              ></img>
            )}

            <div className="userName">{authContext.user.username}</div>
          </div>
          <div className="editProfileButtonsContainer">
            <div className="changeProfilePic">
              <input
                type="file"
                id="bannerfile"
                className="picfileinput"
                onChange={(e) => handleProfilePicUpload(e)}
              ></input>
              <label htmlFor="bannerfile" className="label-file-banner">
                Upload new profile picture
              </label>
            </div>
            <div className="picChangeDivBanner">
              <input
                type="file"
                id="file"
                className="picfileinput"
                onChange={(e) => handleBannerUpload(e)}
              ></input>
              <label htmlFor="file" className="label-banner">
                Change banner
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
