import "../styles/friendlistfriend.css";
import { FriendsContext } from "../pages/Friends";
import { useContext } from "react";
import deleteFriend from "../services/deleteFriend";

//TO DO: FIX ERROR WHEN DELETING
function FriendListFriend(props) {
  const friendsContext = useContext(FriendsContext);

  const handleFriendRemove = async () => {
    const response = await deleteFriend(props.id);
    return friendsContext.setForceLoadFriends(
      friendsContext.forceloadFriends + 1
    );
  };

  return (
    <div className="friendContainer">
      <div className="friendImgNameCont">
        <img className="friendImg" src={props.profilePic}></img>
        <div className="friendNameDiv">{props.username}</div>
      </div>

      <button className="deleteFriend" onClick={handleFriendRemove}>
        Remove friend
      </button>
    </div>
  );
}

export default FriendListFriend;
