import "../styles/friendlistfriend.css";
import person from "../assets/person.svg";

function FriendListFriend(props) {
  let img;

  if (props.profilePic === "default") {
    img = person;
  } else {
    img = props.profilePic;
  }

  const handleFriendRemove = async () => {};

  return (
    <div className="friendContainer">
      <div className="friendImgNameCont">
        <img className="friendImg" src={img}></img>
        <div className="friendNameDiv">{props.username}</div>
      </div>

      <button className="deleteFriend" onClick={handleFriendRemove}>
        Remove friend
      </button>
    </div>
  );
}

export default FriendListFriend;
