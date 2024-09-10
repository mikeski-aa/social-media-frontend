import PostUserProfile from "./PostUserProfile";
import dateConversion from "../utils/dateConversion";
import "../styles/commentcomponent.css";
import like from "../assets/like.svg";
import { useContext, useEffect, useState } from "react";
import putCommentLikes from "../services/putCommentLikes";
import { AuthContext } from "../App";

function CommentComponent(props) {
  const authContext = useContext(AuthContext);
  const [likes, setLikeArray] = useState(props.comment.likes);
  const [likedByUser, setLikedByUser] = useState();
  let tempDate = dateConversion(props.comment.commentDate);

  console.log("asdasdasd");
  console.log(props.comment.id);

  const handleCommentLikeClick = async () => {
    const response = await putCommentLikes(props.comment.id);
    console.log(response.likes);
    setLikeArray(response.likes);
  };

  // side effect for updating whether user is liking the post, to occur when likes array changes
  useEffect(() => {
    console.log("side effect running");
    const filteredArray = likes.filter((item) => item === authContext.user.id);
    if (filteredArray.length === 1) {
      setLikedByUser(true);
    } else {
      setLikedByUser(false);
    }
  }, [likes]);

  return (
    <div className="commentComponent">
      <div className="commentBackgroundDiv">
        <div className="commentTop">
          <PostUserProfile
            profilePic={props.comment.user.profilePic}
            userName={props.comment.user.username}
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
