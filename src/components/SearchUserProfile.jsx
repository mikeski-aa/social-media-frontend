import "../styles/searchuserprofile.css";
import person from "../assets/person.svg";

function SearchUserProfile(props) {
  let img;

  if (props.profilePic === "default") {
    img = person;
  } else {
    img = props.profilePic;
  }

  const handleAddFriend = async () => {};

  return (
    <div className="searchUserProfile">
      <div className="friendImgNameCont">
        <img className="friendImg" src={img}></img>
        <div className="friendNameDiv">{props.username}</div>
      </div>

      <button className="addFriend" onClick={handleAddFriend}>
        Add friend
      </button>
    </div>
  );
}

export default SearchUserProfile;
