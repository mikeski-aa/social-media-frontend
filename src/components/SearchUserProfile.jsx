import "../styles/searchuserprofile.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import postRequest from "../services/postRequest";
import putFriendsAdd from "../services/putFriendsAdd";
import { FriendsContext } from "../pages/Friends";

// TO DO: HANDLE DISPLAY OF YOUR NAME

function SearchUserProfile(props) {
  const authContext = useContext(AuthContext);
  const friendsContext = useContext(FriendsContext);
  const [alreadyFriends, setAlreadyFriends] = useState();
  const [btnText, setBtnText] = useState();
  let img;

  useEffect(() => {
    // side effect to change name and function of buttons in case friend request has been sent out
    for (let x = 0; x < props.reqIn.length; x++) {
      if (props.reqIn[x].requesterId === authContext.user.id) {
        setAlreadyFriends("pending");
        return setBtnText("Pending...");
      }
    }

    for (let x = 0; x < props.reqOut.length; x++) {
      if (props.reqOut[x].requesteeId === authContext.user.id) {
        setAlreadyFriends("incoming");
        return setBtnText("Request incoming");
      }
    }

    // go through friends array and change button to make sure you cant send requests to friends you already have
    if (props.friendOf.length === 0) {
      return setBtnText("Add friend");
    }

    for (let x = 0; x < props.friendOf.length; x++) {
      if (props.friendOf[x].id === authContext.user.id) {
        setAlreadyFriends(true);
        return setBtnText("Friends");
      } else {
        return setBtnText("Add friend");
      }
    }
  }, []);

  // very messy logic
  const handleAddFriend = async () => {
    if (alreadyFriends === true || alreadyFriends === "pending") {
      return null;
    }

    if (alreadyFriends === "incoming") {
      const acceptRequest = await putFriendsAdd(props.id);
      setAlreadyFriends(true);
      setBtnText("Friend added");
      console.log(acceptRequest);
      return friendsContext.setForceLoadFriends(
        friendsContext.forceloadFriends + 1
      );
    }

    const response = await postRequest(props.id);
    console.log(response);
    setAlreadyFriends("pending");
    setBtnText("Pending...");
    return friendsContext.setForceLoadFriends(
      friendsContext.forceloadFriends + 1
    );
  };

  return (
    <div className="searchUserProfile">
      <div className="friendImgNameCont">
        <img className="friendImg" src={props.profilePic}></img>
        <div className="friendNameDiv">{props.username}</div>
      </div>

      <button
        className={"addFriend " + alreadyFriends}
        onClick={handleAddFriend}
      >
        {btnText}
      </button>
    </div>
  );
}

export default SearchUserProfile;
