import PostUserProfile from "./PostUserProfile";
import dateConversion from "../utils/dateConversion";
import "../styles/commentcomponent.css";
import like from "../assets/like.svg";
import { useContext, useEffect, useState } from "react";
// import putCommentLikes from "../services/deprecated_comment_calls/putCommentLikes";
import { putCommentLikes } from "../services/commentCalls";
import { AuthContext } from "../App";
import binIcon from "../assets/bin.svg";
import { deleteComment } from "../services/commentCalls";

function CommentComponent(props) {
  const authContext = useContext(AuthContext);
  const [likes, setLikeArray] = useState(props.comment.likes);
  const [likedByUser, setLikedByUser] = useState();

  const tempDate = dateConversion(props.comment.commentDate);

  const handleCommentLikeClick = async () => {
    const response = await putCommentLikes(props.comment.id);
    setLikeArray(response.likes);
  };

  // side effect for updating whether user is liking the post, to occur when likes array changes
  useEffect(() => {
    const filteredArray = likes.filter((item) => item === authContext.user.id);
    if (filteredArray.length === 1) {
      setLikedByUser(true);
    } else {
      setLikedByUser(false);
    }
  }, [likes]);

  // handle clicking delete comment
  const handleDeleteComment = async () => {
    alert(`delete clicked + ${props.comment.id}`);
    const response = await deleteComment(props.comment.id);
    console.log(response);
    // need to add reload of posts to update without refresh
  };

  return (
    <div className="commentComponent">
      {props.comment.userId === authContext.user.id ? (
        <button className="deletePostBtnOwner">
          <img
            src={binIcon}
            className="deletePostIcon"
            onClick={handleDeleteComment}
          ></img>
        </button>
      ) : null}
      <div className="commentBackgroundDiv">
        <div className="commentTop">
          <PostUserProfile
            profilePic={props.comment.user.profilePic}
            userName={props.comment.user.username}
            id={props.comment.user.id}
          />
          <div className="postedCommentOnDate">{tempDate}</div>
        </div>
        <div className="commentText">{props.comment.text}</div>
        <div className="likesContainerWithButton">
          <div className="commentLikes">{likes.length} likes</div>
          <button
            className={"likeCommentButton " + likedByUser}
            onClick={handleCommentLikeClick}
          >
            <img className="likeBtnImg" src={like}></img>
            <div className="btnText">Like</div>
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default CommentComponent;
