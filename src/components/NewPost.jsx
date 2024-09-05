import "../styles/newpost.css";

function NewPost(props) {
  return (
    <div className={"modal " + props.showhide}>
      <div className="newPostModalContainer">
        <div className="closeModal">X</div>
        <form className="newPost">
          <div className="textInputDiv">
            <label>What's on your mind</label>
            <textarea
              className="textbox"
              placeholder="Your post goes here"
            ></textarea>
          </div>
          <div className="picInputDiv">
            <label>Picture</label>
            <input type="file"></input>
          </div>
          <button>Post</button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
