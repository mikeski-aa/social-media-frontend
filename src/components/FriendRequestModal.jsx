import "../styles/searchusermodal.css";
import FriendRequestProfile from "./FriendRequestProfile";

function FriendRequestModal(props) {
  const handleCloseModal = () => {
    props.setReqVisibility(false);
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
              username={user.requester.username}
              profilePic={user.requester.profilePic}
              key={user.requester.id}
              id={user.requester.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendRequestModal;
