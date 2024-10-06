import "../styles/newcomment.css";
import { useContext, useState } from "react";
import postNewComment from "../services/postNewComment";
import { PostId } from "./Post";
import { AuthContext } from "../App";


function NewComment(props) {
  const postContext = useContext(PostId);
  const authContext = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");

  const handleCommentText = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmitNewComment = async () => {
    // stops from posting blank comments
    if (commentText === "") {
      return null;
    }
    console.log(postContext);
    const response = await postNewComment(
      commentText,
      postContext.currentPostId
    );
    postContext.setLoadComments(postContext.loadComments + 1);
    setCommentText("");
    // UPDATING KEY TO FORCE REFRESH OF COMPONENET!
    postContext.setCommentCount(postContext.commentCount + 1);

    return;
  };

  return (
    <div className="newCommentContainer">
      <div className="mainNewCommentDiv">
        <div className="userImgDiv">
          <img className="userImgImg" src={authContext.user.profilePic}></img>
        </div>
        <div className="inputBox">
          <textarea
            className="commentInputBox"
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => handleCommentText(e)}
          ></textarea>
        </div>
      </div>
      <button className="addCommentBtn" onClick={handleSubmitNewComment}>
        Submit
      </button>
    </div>
  );
}

export default NewComment;
