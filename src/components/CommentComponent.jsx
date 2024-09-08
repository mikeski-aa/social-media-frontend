import PostUserProfile from "./PostUserProfile";
import dateConversion from "../utils/dateConversion";

function CommentComponent(props) {
  let tempDate = dateConversion(props.comment.commentDate);

  return (
    <div className="commentComponent">
      <PostUserProfile
        profilePic={props.comment.user.profilePic}
        userName={props.comment.user.username}
      />
      <div className="postedCommentOnDate">{tempDate}</div>
      <div className="commentText">{props.comment.text}</div>
    </div>
  );
}

export default CommentComponent;
