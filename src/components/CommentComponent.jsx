import PostUserProfile from "./PostUserProfile";
import dateConversion from "../utils/dateConversion";
import "../styles/commentcomponent.css";
import like from "../assets/like.svg";

function CommentComponent(props) {
  let tempDate = dateConversion(props.comment.commentDate);

  return (
    <div className="commentComponent">
      <div className="commentTop">
        <PostUserProfile
          profilePic={props.comment.user.profilePic}
          userName={props.comment.user.username}
        />
        <div className="postedCommentOnDate">{tempDate}</div>
      </div>
      <div className="commentText">{props.comment.text}</div>
      <button className="likeCommentButton">
        <img className="likeBtnImg" src={like}></img>
        <div className="btnText">Like</div>
      </button>
      <hr />
    </div>
  );
}

export default CommentComponent;
