import { useNavigate } from "react-router";
import person from "../assets/person.svg";
import "../styles/postuserprofile.css";

function PostUserProfile(props) {
  const navigate = useNavigate();
  let img;

  if (props.profilePic === "default") {
    img = person;
  } else {
    img = props.profilePic;
  }
  const handleProfileClick = () => {
    navigate(`/profile/user/${props.id}`);
  };
  return (
    <button className="profileDiv" onClick={handleProfileClick}>
      <img className="profPicImg" src={img}></img>
      <div className="profName">{props.userName}</div>
    </button>
  );
}

export default PostUserProfile;
