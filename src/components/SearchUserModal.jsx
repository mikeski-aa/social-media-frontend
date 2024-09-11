import "../styles/searchusermodal.css";
import SearchUserProfile from "./SearchUserProfile";

function SearchUserModal(props) {
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
            <SearchUserProfile
              username={user.username}
              profilePic={user.profilePic}
              key={user.id}
              friendOf={user.friendOf}
              reqIn={user.reqIn}
              reqOut={user.reqOut}
              id={user.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchUserModal;
