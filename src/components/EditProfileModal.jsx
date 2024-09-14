import { useContext, useState } from "react";
import "../styles/editprofilemodal.css";
import { AuthContext } from "../App";

function EditProfileModal(props) {
  const authContext = useContext(AuthContext);
  const [fileName, setFileName] = useState("Choose a file");

  const handleCloseModal = () => {
    props.setModalVisible(false);
  };

  const handleFileChange = () => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  return (
    <div className={"modal " + props.visibility}>
      <div className="editProfileContainer">
        <button className="closeSearchModalBtn" onClick={handleCloseModal}>
          Close
        </button>
        <div className="editOptions">
          <div className="profilePic">
            <img
              className="editProfilePic"
              src={authContext.user.profilePic}
            ></img>

            <div className="userName">{authContext.user.username}</div>
          </div>
          <div className="changeProfilePic"></div>
          <div className="changeBannerPic">
            <div className="currentBanner"></div>
            <input type="file" />
            <button className="picture">Upload new banner</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
