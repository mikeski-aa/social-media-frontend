import { useContext, useEffect, useState } from "react";
import "../styles/commentcontainer.css";
import CommentComponent from "./CommentComponent";
import getComments from "../services/getComment";
import NewComment from "./NewComment";
import { PostId } from "./Post";

// rewrite with context API

function CommentContainer(props) {
  const postContext = useContext(PostId);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      console.log("///////////////////////////////");
      console.log(postContext.currentPostId);
      const response = await getComments(postContext.currentPostId);

      setComments(response);
      console.log(response);
    };

    fetchComments();
  }, [props.loadComments]);
  return (
    <div className={"commentContainer " + props.status}>
      <NewComment />
      <h4>Comments:</h4>
      {comments.map((comment) => (
        <CommentComponent comment={comment} />
      ))}
    </div>
  );
}

export default CommentContainer;
