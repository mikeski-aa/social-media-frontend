function LikeCommentContainer(props) {
  return (
    <div className="likeCommentContainer">
      <button className="commentButton">
        <img className="buttonImgPost" src={props.like} />
        <div className="buttonText">Like</div>
      </button>
      <button className="commentButton">
        <img className="buttonImgPost" src={props.comment} />
        <div className="buttonText">Comment</div>
      </button>
    </div>
  );
}

export default LikeCommentContainer;
