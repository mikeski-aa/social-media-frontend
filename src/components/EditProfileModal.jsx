import "../styles/editprofilemodal.css";

function EditProfileModal(props) {
  const handleCloseModal = () => {
    props.setModalVisible(false);
  };
  return (
    <div className={"modal " + props.visibility}>
      <div className="editProfileContainer">
        <button className="closeSearchModalBtn" onClick={handleCloseModal}>
          Close
        </button>
        <div className="editOptions">
          <div className="changeName">Change username</div>
          <div className="changeProfilePic">
            <div className="currentPicture"></div>
            <input type="file" />
            <button className="picture">Upload new profile picture</button>
          </div>
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
