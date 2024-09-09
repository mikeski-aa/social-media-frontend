import { useEffect, useState } from "react";
import "../styles/commentcontainer.css";
import CommentComponent from "./CommentComponent";
import getComments from "../services/getComment";

function CommentContainer(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      console.log("///////////////////////////////");
      console.log(props.postid);
      const response = await getComments(props.postid);

      setComments(response);
      console.log(response);
    };

    fetchComments();
  }, [props.loadComments]);
  return (
    <div className={"commentContainer " + props.status}>
      <h4>Comments:</h4>
      {comments.map((comment) => (
        <CommentComponent comment={comment} />
      ))}
    </div>
  );
}

export default CommentContainer;
