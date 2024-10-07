import { useContext, useEffect, useState } from "react";
import "../styles/commentcontainer.css";
import CommentComponent from "./CommentComponent";
// import getComments from "../services/getComment";
import { getComments } from "../services/commentCalls";
import NewComment from "./NewComment";
import { PostId } from "./Post";

// rewrite with context API

function CommentContainer(props) {
  const postContext = useContext(PostId);

  return (
    <div className={"commentContainer " + props.status}>
      <NewComment />
      {postContext.loadingComments === true ? (
        <div className="loadingCommentsDiv">Loading comments...</div>
      ) : null}
      {postContext.comments.length != 0 ? <h4>Comments:</h4> : null}

      {postContext.comments.map((comment) => (
        <CommentComponent comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentContainer;
