import { useParams } from "react-router";

function UserProfileForId() {
  const { id } = useParams();
  return (
    <div className="userProfileContainer">
      <h1>User profile goes here {id}</h1>
    </div>
  );
}

export default UserProfileForId;
