import { useState } from "react";
import "../styles/newpost.css";

function NewPost(props) {
  const [textInput, setTextInput] = useState("");
  const [picInput, setPicInput] = useState("");
  const [errorBox, setErrorBox] = useState("hide");
  const [errorText, setErrorText] = useState("");

  // click / input handlers
  const closeHandler = () => {
    props.setPostModal("hide");
    console.log("click");
  };

  const handleTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const handlePicInput = (e) => {
    console.log(e.target.files[0]);
    setPicInput(e.target.files[0]);
  };

  const handlePostPost = async (e) => {
    e.preventDefault();

    if (textInput === "" && picInput === "") {
      setErrorBox("show");
      setErrorText("Your new post needs to have text or a picture!");
      return;
    }
    setErrorBox("hide");
    setErrorText("");
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
                onChange={(e) => handleTextInput(e)}
              ></textarea>
            </div>
            <div className="picInputDiv">
              <label>Picture</label>
              <input type="file" onChange={(e) => handlePicInput(e)}></input>
            </div>
            <div className={"errorBox " + errorBox}>{errorText}</div>
            <button className="postNewPost" onClick={(e) => handlePostPost(e)}>
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPost;
