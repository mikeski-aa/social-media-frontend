import { useContext, useRef, useState } from "react";
import "../styles/newpost.css";
import postImage from "../services/postImage";
import postStatus from "../services/postStatus";
import getStatus from "../services/getStatus";
import { AuthContext } from "../App";
import useAutosizeInputTextArea from "../hooks/useAutosizeInputTextArea";

function NewPostDivBoxHome(props) {
  const [textInput, setTextInput] = useState("");
  const [picInput, setPicInput] = useState("");
  const [errorBox, setErrorBox] = useState("hide");
  const [errorText, setErrorText] = useState("");
  const textAreaRef = useRef(null);
  const authContext = useContext(AuthContext);

  // by adding a key to file input, react can be forced to re-render the component when key changes
  // easy way of clearing the value post upload
  const [resetVal, setResetVal] = useState(0);

  // click / input handlers

  const handleInputChange = (e) => {
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
  useAutosizeInputTextArea(textAreaRef, inputAreaValue);
  return (
    <>
      <div className="experimenting">
        <form className="newPostExp">
          <div className="textInputDiv">
            <img
              src={authContext.user.profilePic}
              className="userPicInput"
            ></img>
            <textarea
              ref={textAreaRef}
              className="textboxAreaHome"
              placeholder={`What's on your mind ${authContext.user.username}`}
              onChange={(e) => handleInputChange(e)}
              rows={1}
              value={inputAreaValue}
            ></textarea>
          </div>
          <hr></hr>
          <div className="picInputDiv">
            <label className="inputLabelPicture" htmlFor="idfile">
              Add a picture
            </label>
            <input
              type="file"
              id="idfile"
              onChange={(e) => handlePicInput(e)}
              key={resetVal}
            ></input>
          </div>
          <div className={"errorBox "}></div>
          <div className={"errorBox " + errorBox}>{errorText}</div>
          <button className="postNewPost">Post</button>
        </form>
      </div>
    </>
  );
}

export default NewPostDivBoxHome;