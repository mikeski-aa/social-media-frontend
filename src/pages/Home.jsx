import { useContext, useState } from "react";
import { AuthContext } from "../App";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import NewPost from "../components/NewPost";

function Home() {
  const [postModal, setPostModal] = useState("hide");
  const authContext = useContext(AuthContext);

  console.log(authContext);
  useRedirectValidFail(authContext.err);

  const handleNewPostBtn = () => {
    setPostModal("show");
  };

  return (
    <>
      <NewPost showhide={postModal} setPostModal={setPostModal} />
      <div className="mainCont">
        <div className="newPost">
          <button onClick={handleNewPostBtn}>What's on your mind? </button>
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
