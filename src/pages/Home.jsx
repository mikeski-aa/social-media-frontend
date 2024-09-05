import { useContext } from "react";
import { AuthContext } from "../App";
import useRedirectValidFail from "../hooks/useRedirectValidFail";

function Home() {
  const authContext = useContext(AuthContext);

  console.log(authContext);
  useRedirectValidFail(authContext.err);

  return (
    <>
      <div className="mainCont">
        <h1>Homepage</h1>
      </div>
    </>
  );
}

export default Home;
