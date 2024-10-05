import { useContext } from "react";
import "../styles/likecommentcontainer.css";
import { PostId } from "./Post";

function LikeCommentContainer(props) {
  const postContext = useContext(PostId);

  return (
    <div className="likeCommentContainer">
      <button
        className={"likeButton " + postContext.likedByUser}
        onClick={props.handleLikeClick}
      >
        <img className="buttonImgPost" src={props.like} />
        <div className="buttonText">Like</div>
      </button>
      <button
        className={`commentButton ${props.status}`}
        onClick={props.handleCommentClick}
      >
        <img className="buttonImgPost" src={props.comment} />
        <div className="buttonText">Comment</div>
      </button>
    </div>
  );
}

export default LikeCommentContainer;
