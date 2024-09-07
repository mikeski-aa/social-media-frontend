import person from "../assets/person.svg";
import "../styles/postuserprofile.css";

function PostUserProfile(props) {
  let img;

  if (props.profilePic === "default") {
    img = person;
  } else {
    img = props.profilePic;
  }

  return (
    <div className="profileDiv">
      <img className="profPicImg" src={img}></img>
      <div className="profName">{props.userName}</div>
    </div>
  );
}

export default PostUserProfile;
