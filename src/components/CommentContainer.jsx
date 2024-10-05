import { useContext, useEffect, useState } from "react";
import "../styles/commentcontainer.css";
import CommentComponent from "./CommentComponent";
import getComments from "../services/getComment";
import NewComment from "./NewComment";
import { PostId } from "./Post";

// rewrite with context API

function CommentContainer(props) {
  const postContext = useContext(PostId);

  return (
    <div className={"commentContainer " + props.status}>
      <NewComment />
      {postContext.comments.length == 0 ? null : <h4>Comments:</h4>}

      {postContext.comments.map((comment) => (
        <CommentComponent comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentContainer;
