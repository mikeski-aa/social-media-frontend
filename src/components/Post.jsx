import { useState } from "react";
import "../styles/post.css";

function Post(props) {
  const [commentShow, setCommentShow] = useState("hide");

  // probably need to add conditional rednering depending on whether post has image, text or both
  // I am unsure of this implementation of conditional redering, not really DRY

  if (props.text === "") {
    return (
      <>
        <div className="postContainer">
          <div className="userInfoContainer">
            <div className="postOwner">{props.userName}</div>
          </div>
          <div className="textImageContainer">
            <img src={props.imageUrl} alt="user image"></img>
          </div>
          <div className="likeCommentContainer">
            <button>Like</button>
            <button>Comment</button>
          </div>
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
            <div className="postOwner">{props.userName}</div>
          </div>
          <div className="textImageContainer">
            <div className="text">{props.text}</div>
          </div>
          <div className="likeCommentContainer">
            <button>Like</button>
            <button>Comment</button>
          </div>
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
          <div className="postOwner">{props.userName}</div>
        </div>
        <div className="textImageContainer">
          <div className="text">{props.text}</div>
          <img src={props.imageUrl} alt="user image"></img>
        </div>
        <div className="likeCommentContainer">
          <button>Like</button>
          <button>Comment</button>
        </div>
        <div className={"commentContainer " + commentShow}>
          Comments go here
        </div>
      </div>
    </>
  );
}

export default Post;
