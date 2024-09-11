import "../styles/searchuserprofile.css";
import person from "../assets/person.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import postRequest from "../services/postRequest";

function SearchUserProfile(props) {
  const authContext = useContext(AuthContext);
  const [alreadyFriends, setAlreadyFriends] = useState();
  const [btnText, setBtnText] = useState();
  let img;

  if (props.profilePic === "default") {
    img = person;
  } else {
    img = props.profilePic;
  }

  useEffect(() => {
    // side effect to change name and function of buttons in case friend request has been sent out
    for (let x = 0; x < props.reqIn.length; x++) {
      if (props.reqIn[x].requesterId === authContext.user.id) {
        setAlreadyFriends("pending");
        return setBtnText("Pending...");
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

  const handleAddFriend = async () => {
    if (alreadyFriends === true) {
      return null;
    }

    const response = await postRequest(props.id);
    console.log(response);
  };

  return (
    <div className="searchUserProfile">
      <div className="friendImgNameCont">
        <img className="friendImg" src={img}></img>
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
