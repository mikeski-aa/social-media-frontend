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
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);

  useRedirectValidFail(authContext.err);

  // this useeffect will load when
  useEffect(() => {
    const fetchStatus = async () => {
      console.log("I loaded when the page was refreshed again!");
      // need to first get an array of posts
      // afterwards we want to fetch maximum of 10 posts ordered
      setLoading(true);
      const response = await getStatus(fetchCount);
      setLoading(false);
      setStatus(response);
    };

    fetchStatus();
  }, [fetchCount]);

  const handleNewPostBtn = () => {
    setPostModal("show");
  };

  const handleLoadMoreClick = () => {
    setFetchCount(fetchCount + 10);
  };

  return (
    <>
      <NewPost
        showhide={postModal}
        setPostModal={setPostModal}
        setStatus={setStatus}
      />
      <div className="mainCont">
        <div className="newPost">
          <button onClick={handleNewPostBtn}>What's on your mind? </button>
        </div>
        <div className="mainFeed">
          <h3>Your feed</h3>
          <div className="allPostContainer">
            {loading ? <div>LOADING ...</div> : null}
            {status.map((item) => (
              <Post
                text={item.text}
                imageUrl={item.imageUrl}
                key={item.id}
                userName={item.user.username}
                userid={item.user.id}
                profilePic={item.user.profilePic}
                postDate={item.postDate}
                postid={item.id}
                likeCount={item.likes.length}
                likeUsers={item.likes}
                commentCount={item._count.comments}
              ></Post>
            ))}
            <button
              className="locadMoreContentBtn"
              onClick={handleLoadMoreClick}
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
