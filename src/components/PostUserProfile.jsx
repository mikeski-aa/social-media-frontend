import { useNavigate } from "react-router";
import "../styles/postuserprofile.css";

function PostUserProfile(props) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/user/${props.id}`);
  };
  return (
    <button className="profileDiv" onClick={handleProfileClick}>
      <img className="profPicImg" src={props.profilePic}></img>
      <div className="profName">{props.userName}</div>
    </button>
  );
}

export default PostUserProfile;
