import { useState } from "react";
import "../styles/post.css";
import PostUserProfile from "./PostUserProfile";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import LikeCommentContainer from "./LikeCommentContainer";
import dateConversion from "../utils/dateConversion";

function Post(props) {
  const [commentShow, setCommentShow] = useState("hide");

  const date = dateConversion(props.postDate);

  // probably need to add conditional rednering depending on whether post has image, text or both
  // I am unsure of this implementation of conditional redering, not really DRY

  if (props.text === "") {
    return (
      <>
        <div className="postContainer">
          <div className="userInfoContainer">
            <PostUserProfile
              profilePic={props.profilePic}
              userName={props.userName}
            />
            <div className="postDate">{date}</div>
          </div>
          <div className="textImageContainer">
            <img
              src={props.imageUrl}
              alt="user image"
              className="userImage"
            ></img>
          </div>
          <hr></hr>
          <LikeCommentContainer like={like} comment={comment} />
          <div className={"commentContainer " + commentShow}>
            Comments go here
          </div>
        </div>
      </>
    );
  } else if (props.imageUrl === "null") {
    return (
      <>
        <div className="postContainer">
          <div className="userInfoContainer">
            <PostUserProfile
              profilePic={props.profilePic}
              userName={props.userName}
            />

            <div className="postDate">{date}</div>
          </div>
          <div className="textImageContainer">
            <div className="text">{props.text}</div>
          </div>
          <hr></hr>
          <LikeCommentContainer like={like} comment={comment} />
          <div className={"commentContainer " + commentShow}>
            Comments go here
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="postContainer">
        <div className="userInfoContainer">
          <PostUserProfile
            profilePic={props.profilePic}
            userName={props.userName}
          />
          <div className="postDate">{date}</div>
        </div>
        <div className="textImageContainer">
          <div className="text">{props.text}</div>
          <img
            src={props.imageUrl}
            alt="user image"
            className="userImage"
          ></img>
        </div>
        <hr></hr>
        <LikeCommentContainer like={like} comment={comment} />
        <div className={"commentContainer " + commentShow}>
          Comments go here
        </div>
      </div>
    </>
  );
}

export default Post;
