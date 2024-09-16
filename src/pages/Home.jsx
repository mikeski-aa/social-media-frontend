import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../App";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import getStatus from "../services/getStatus";
import "../styles/home.css";
import useAutosizeInputTextArea from "../hooks/useAutosizeInputTextArea";
import NewPostDivBoxHome from "../components/NewPostDivBoxHome";
import pictureicon from "../assets/pictureicon.svg";

function Home() {
  const [postModal, setPostModal] = useState("hide");
  const [status, setStatus] = useState([]);
  const [fetchCount, setFetchCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [inputAreaValue, setInputAreaValue] = useState("");

  const authContext = useContext(AuthContext);

  useRedirectValidFail(authContext.err);

  if (typeof authContext.user === "undefined") {
    return null;
  }

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

  const handleInputChange = (e) => {
    setInputAreaValue(e.target.value);
  };

  return (
    <>
      <div className="mainCont">
        <NewPostDivBoxHome
          setPostModal={setPostModal}
          setStatus={setStatus}
        ></NewPostDivBoxHome>
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
                id={item.user.id}
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
