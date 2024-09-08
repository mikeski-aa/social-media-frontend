import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import getStatus from "../services/getStatus";
import "../styles/home.css";

function Home() {
  const [postModal, setPostModal] = useState("hide");
  const [status, setStatus] = useState([]);
  const [fetchCount, setFetchCount] = useState(10);
  const authContext = useContext(AuthContext);

  useRedirectValidFail(authContext.err);

  // this useeffect will load when
  useEffect(() => {
    const fetchStatus = async () => {
      console.log("I loaded when the page was refreshed again!");
      // need to first get an array of posts
      // afterwards we want to fetch maximum of 10 posts ordered
      const response = await getStatus(fetchCount);
      setStatus(response);
    };

    fetchStatus();
  }, []);

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
          <div className="allPostContainer">
            {status.map((item) => (
              <Post
                text={item.text}
                imageUrl={item.imageUrl}
                key={item.id}
                userName={item.user.username}
                userid={item.user.id}
                profilePic={item.user.profilePic}
                postDate={item.postDate}
              ></Post>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
