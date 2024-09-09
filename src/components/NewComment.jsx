import "../styles/newcomment.css";

function NewComment(props) {
  return (
    <div className="newCommentContainer">
      <div className="mainNewCommentDiv">
        <div className="userImgDiv">
          <img className="userImgImg" src={props.image}></img>
        </div>
        <div className="inputBox">
          <input
            type="text"
            className="commentInputBox"
            placeholder="Add a comment"
          ></input>
        </div>
      </div>
      <button className="addCommentBtn">Submit</button>
    </div>
  );
}

export default NewComment;
