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
          <button onClick={handleNewPostBtn} className="buttonNewPost">
            <div className="textareadiv">
              What's on your mind {authContext.user.username}?
            </div>
          </button>
        </div>

        <div className="experimenting">
          <form className="newPostExp">
            <div className="textInputDiv">
              <img
                src={authContext.user.profilePic}
                className="userPicInput"
              ></img>
              <textarea
                className="textboxAreaHome"
                placeholder={`What's on your mind ${authContext.user.username}`}
              ></textarea>
            </div>
            <hr></hr>
            <div className="picInputDiv">
              <label className="inputLabelPicture" htmlFor="idfile">
                Add a picture
              </label>
              <input type="file" id="idfile"></input>
            </div>
            <div className={"errorBox "}></div>
            <button className="postNewPost">Post</button>
          </form>
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
