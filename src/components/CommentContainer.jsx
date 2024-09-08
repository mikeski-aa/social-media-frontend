import "../styles/commentcontainer.css";

function CommentContainer(props) {
  return (
    <div className={"commentContainer " + props.status}>
      <div>Map comments here</div>
      <div>Map comments here</div>
      <div>Map comments here</div>
      <div>Map comments here</div>
      <div>Map comments here</div>
      <div>Map comments here</div>
    </div>
  );
}

export default CommentContainer;
