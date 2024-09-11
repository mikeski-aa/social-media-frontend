import "../styles/searchuserprofile.css";
import person from "../assets/person.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";

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
    if (props.friendOf.length === 0) {
      setBtnText("Add friend");
    }

    for (let x = 0; x < props.friendOf.length; x++) {
      if (props.friendOf[x].id === authContext.user.id) {
        console.log("////////////////////");
        console.log("user is friend");
        setAlreadyFriends(true);
        setBtnText("Friends");
      } else {
      }
    }
  }, []);
  const handleAddFriend = async () => {
    if (alreadyFriends === true) {
      return null;
    }
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
