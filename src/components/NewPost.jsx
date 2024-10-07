import { useState } from "react";
import "../styles/newpost.css";
import postImage from "../services/postImage";
// import postStatus from "../services/postStatus";
import { postStatus } from "../services/statusCalls";
// import getStatus from "../services/getStatus";
import { getStatus } from "../services/statusCalls";

function NewPost(props) {
  const [textInput, setTextInput] = useState("");
  const [picInput, setPicInput] = useState("");
  const [errorBox, setErrorBox] = useState("hide");
  const [errorText, setErrorText] = useState("");
  // by adding a key to file input, react can be forced to re-render the component when key changes
  // easy way of clearing the value post upload
  const [resetVal, setResetVal] = useState(0);

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

    // need to identify what to upload
    // if no picture, we skip image upload
    // if no text, we skip text upload
    // at the end of the upload, the value of input image needs to be reset
    // also, after an image is uploaded, we should fetch all statuses again and force the posts to reload
    // that way our new post will show up
    // TODO: ADD LOADING WHEN CLICKED
    if (picInput != "") {
      const imageUpload = await postImage(picInput);
      const response = await postStatus(textInput, imageUpload.result.url);
      props.setPostModal("hide");

      // reset modal values
      setResetVal(resetVal + 1);
      setPicInput("");
      setTextInput("");
      // fetch updated db
      const status = await getStatus(10);
      props.setStatus(status);
      return console.log(response);
    } else {
      console.log("no upload pic");
      const response = await postStatus(textInput, "null");
      props.setPostModal("hide");

      // reset modal values
      setResetVal(resetVal + 1);
      setPicInput("");
      setTextInput("");
      // fetch updated db
      const status = await getStatus(10);
      props.setStatus(status);
      return console.log(response);
    }
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
                value={textInput}
                onChange={(e) => handleTextInput(e)}
              ></textarea>
            </div>
            <div className="picInputDiv">
              <label>Picture</label>
              <input
                type="file"
                onChange={(e) => handlePicInput(e)}
                key={resetVal}
              ></input>
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
