import "../styles/searchuserprofile.css";
import { useContext, useEffect, useState } from "react";
// import deleteFriend from "../services/deleteFriend";
import { deleteFriend } from "../services/friendsCalls";
import { FriendsContext } from "../pages/Friends";
// import putFriendAdd from "../services/deprecated_friends_calls/putFriendsAdd";
import { putFriendAdd } from "../services/friendsCalls";
import deleteRequest from "../services/deleteRequest";
import { useNavigate } from "react-router";

function FriendRequestProfile(props) {
  const friendsContext = useContext(FriendsContext);
  const navigate = useNavigate();
  const handleAcceptClick = async () => {
    const response = await putFriendAdd(props.id);
    return friendsContext.setForceLoadFriends(
      friendsContext.forceloadFriends + 1
    );
  };
  const handleDeclineClick = async () => {
    console.log(props.reqid);
    const response = await deleteRequest(props.reqid);
    console.log(response);
    return friendsContext.setForceLoadFriends(
      friendsContext.forceloadFriends + 1
    );
  };

  const handlePorifleClick = () => {
    navigate(`/profile/user/${props.id}`);
  };

  return (
    <div className="searchUserProfile">
      <div className="friendImgNameCont" onClick={handlePorifleClick}>
        <img className="friendImg" src={props.profilePic}></img>
        <div className="friendNameDiv">{props.username}</div>
      </div>

      <div className="requestFriendContainer">
        <button className={"btnAcceptFriend"} onClick={handleAcceptClick}>
          Accept
        </button>
        <button className={"btnDeclineFriend"} onClick={handleDeclineClick}>
          Decline
        </button>
      </div>
    </div>
  );
}

export default FriendRequestProfile;
