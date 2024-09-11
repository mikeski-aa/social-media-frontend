import "../styles/searchusermodal.css";
import SearchUserProfile from "./SearchUserProfile";

function SearchUserModal(props) {
  const handleCloseModal = () => {
    props.setModalVisible(false);
  };
  return (
    <div className={"modal " + props.visibility}>
      <div className="searchModal">
        <h4>Search results:</h4>
        {props.result.map((user) => (
          <SearchUserProfile
            username={user.username}
            profilePic={user.profilePic}
            key={user.id}
            id={user.id}
          />
        ))}
      </div>
      <button onClick={handleCloseModal}>Close</button>
    </div>
  );
}

export default SearchUserModal;
