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
          <div className="changeProfilePic">Change banner picture</div>
          <div className="changeBannerPic">Change banner picture</div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
