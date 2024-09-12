import { useContext, useState, useEffect } from "react";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import { AuthContext } from "../App";
import "../styles/profile.css";
import person from "../assets/person.svg";
import Post from "../components/Post";
import getPostsByUser from "../services/getPostsByUser";

function Profile() {
  const [showPosts, setShowPosts] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  let img;

  // load posts on component load
  useEffect(() => {
    const loadPosts = async () => {
      const posts = await getPostsByUser(limit);
      setUserPosts(posts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  useRedirectValidFail(authContext.err);
  console.log(authContext.user);

  if (authContext.user.profilePic === "default") {
    img = person;
  } else {
    img = authContext.user.profilePic;
  }

  return (
    <>
      <div className="profileCont">
        <div className="profileStats">
          <div className="profileHeader">
            <img src={img} className="profileUserProfileImg"></img>
            <div className="usernameProfile">{authContext.user.username}</div>
          </div>
        </div>
        <div className="postsCommentsMainDiv">
          <div className="profileButtons">
            <button className="postsBtnProf">Posts</button>
            <button className="commentsBtnProf">Comments</button>
          </div>
          <div className={"profilePostsContainer " + showPosts}>
            {loading ? <div>LOADING ...</div> : null}
            {userPosts.map((item) => (
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
