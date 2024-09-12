import "../styles/searchuserprofile.css";
import person from "../assets/person.svg";
import { useContext, useEffect, useState } from "react";
import deleteFriend from "../services/deleteFriend";
import { FriendsContext } from "../pages/Friends";
import putFriendAdd from "../services/putFriendsAdd";

function FriendRequestProfile(props) {
  const friendsContext = useContext(FriendsContext);
  let img;

  if (props.profilePic === "default") {
    img = person;
  } else {
    img = props.profilePic;
  }

  const handleAcceptClick = async () => {
    const response = await putFriendAdd(props.id);
    return friendsContext.setForceLoadFriends(
      friendsContext.forceloadFriends + 1
    );
  };
  const handleDeclineClick = async () => {};

  return (
    <div className="searchUserProfile">
      <div className="friendImgNameCont">
        <img className="friendImg" src={img}></img>
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
