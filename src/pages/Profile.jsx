import { useContext } from "react";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import { AuthContext } from "../App";

function Profile() {
  const authContext = useContext(AuthContext);

  useRedirectValidFail(authContext.err);
  return (
    <>
      <div className="profileCont">
        <h1>Profile page</h1>
      </div>
    </>
  );
}

export default Profile;
