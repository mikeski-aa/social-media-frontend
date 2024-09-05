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
        <div className="newPost">
          What's on your mind? <button>Post btn</button>
        </div>
        <div className="mainFeed">
          <h3>Your feed</h3>
          <div className="feedBox">feed will go here</div>
        </div>
      </div>
    </>
  );
}

export default Home;
