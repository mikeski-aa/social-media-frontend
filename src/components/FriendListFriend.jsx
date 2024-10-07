import "../styles/friendlistfriend.css";
import { FriendsContext } from "../pages/Friends";
import { useContext } from "react";
// import deleteFriend from "../services/deleteFriend";
import { deleteFriend } from "../services/friendsCalls";
import { useNavigate } from "react-router";

//TO DO: FIX ERROR WHEN DELETING
function FriendListFriend(props) {
  const friendsContext = useContext(FriendsContext);
  const navigate = useNavigate();

  const handleFriendRemove = async () => {
    const response = await deleteFriend(props.id);
    return friendsContext.setForceLoadFriends(
      friendsContext.forceloadFriends + 1
    );
  };

  const handlePorifleClick = () => {
    navigate(`/profile/user/${props.id}`);
  };
  return (
    <div className="friendContainer">
      <div className="friendImgNameCont" onClick={handlePorifleClick}>
        <img className="friendImg" src={props.profilePic}></img>
        <div className="friendNameDiv">{props.username}</div>
      </div>

      <button className="deleteFriend" onClick={handleFriendRemove}>
        Unfriend
      </button>
    </div>
  );
}

export default FriendListFriend;
