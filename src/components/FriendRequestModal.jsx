import "../styles/searchusermodal.css";
import FriendRequestProfile from "./FriendRequestProfile";

function FriendRequestModal(props) {
  const handleCloseModal = () => {
    props.setModalVisible(false);
  };
  return (
    <div className={"modal " + props.visibility}>
      <div className="searchModal">
        <button className="closeSearchModalBtn" onClick={handleCloseModal}>
          Close
        </button>
        <h4>Search results:</h4>
        <div className="resultUsers">
          {props.result.map((user) => (
            <FriendRequestProfile
              username={user.username}
              profilePic={user.profilePic}
              key={user.id}
              id={user.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendRequestModal;
