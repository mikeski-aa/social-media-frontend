import { useContext, useState, useEffect } from "react";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import { AuthContext } from "../App";
import "../styles/profile.css";
import person from "../assets/person.svg";

function Profile() {
  const [showPosts, setShowPosts] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const authContext = useContext(AuthContext);
  let img;

  useRedirectValidFail(authContext.err);
  console.log(authContext.user);

  if (authContext.user.profilePic === "default") {
    img = person;
  } else {
    img = authContext.user.profilePic;
  }

  return (
    <>
      <div className="profileCont">
        <div className="profileStats">
          <div className="profileHeader">
            <img src={img} className="profileUserProfileImg"></img>
            <div className="usernameProfile">{authContext.user.username}</div>
          </div>
        </div>
        <div className="postsCommentsMainDiv">
          <div className="profileButtons">
            <button className="postsBtnProf">Posts</button>
            <button className="commentsBtnProf">Comments</button>
          </div>
          <div className={"profilePostsContainer " + showPosts}></div>
        </div>
      </div>
    </>
  );
}

export default Profile;
