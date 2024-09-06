import { useState } from "react";
import "../styles/newpost.css";

function NewPost(props) {
  const [textInput, setTextInput] = useState("");
  const [picInput, setPicInput] = useState("");

  // click / input handlers
  const closeHandler = () => {
    props.setPostModal("hide");
    console.log("click");
  };
  return (
    <>
      <div className={"modal " + props.showhide}>
        <div className={"newPostModalContainer " + props.showhide}>
          <div className="closeModal">
            <button onClick={closeHandler}>X</button>
          </div>
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
    </>
  );
}

export default NewPost;
