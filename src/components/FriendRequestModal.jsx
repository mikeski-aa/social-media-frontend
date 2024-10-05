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
        {props.result.length > 0 ? (
          <h4>Incoming Friend requests:</h4>
        ) : (
          <h4>No new friend requests found</h4>
        )}

        <div className="resultUsers">
          {props.result.map((request) => (
            <FriendRequestProfile
              username={request.requester.username}
              profilePic={request.requester.profilePic}
              key={request.requester.id}
              id={request.requester.id}
              reqid={request.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendRequestModal;
