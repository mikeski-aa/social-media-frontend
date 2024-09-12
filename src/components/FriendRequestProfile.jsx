import "../styles/searchuserprofile.css";
import person from "../assets/person.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";

function FriendRequestProfile(props) {
  const authContext = useContext(AuthContext);
  let img;

  if (props.profilePic === "default") {
    img = person;
  } else {
    img = props.profilePic;
  }

  const handleAcceptClick = async () => {};
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
