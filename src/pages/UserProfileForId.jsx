import { useContext, useState, useEffect } from "react";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import { AuthContext } from "../App";
import "../styles/profile.css";
import Post from "../components/Post";
// import getPostsByUser from "../services/getPostsByUser";
import { getPostsByUser } from "../services/statusCalls";
// import getCommentsByUser from "../services/getCommentsByUser";
import { getCommentsByUser } from "../services/commentCalls";
import CommentComponent from "../components/CommentComponent";
import { useNavigate, useParams } from "react-router";
import { getSearchUsers } from "../services/userCalls";
// import getSearchUsers from "../services/getSearchUsers";
// import getUser from "../services/getUser";
import { getUser } from "../services/userCalls";

function UserProfileForId() {
  const authContext = useContext(AuthContext);
  const [showPosts, setShowPosts] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loadingCont, setLoadingCont] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useRedirectValidFail(authContext.err);
  const { id } = useParams();
  const regex = /[A-Za-z]+/i;

  // if ID contains letters, return to your profile
  if (regex.test(id)) {
    navigate("/profile");
  }

  // if ID === your id, redirect to your profile
  // not the most elegant solution
  if (id == authContext.user.id) {
    navigate("/profile");
  }

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const fetchedUser = await getUser(id);
      // TEMPORARY ERROR MESSAGE: USER NOT FOUND OR NTO FRIENDS

      if (!fetchedUser) {
        console.log("user not found");
        return setLoadError(true);
      }

      setUser(fetchedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  // load posts on component load
  useEffect(() => {
    const loadPosts = async () => {
      const posts = await getPostsByUser(limit, id);
      setUserPosts(posts);
      setLoadingCont(false);
    };
    loadPosts();
  }, []);

  // side effect for loading more posts or comments depending on what is currently active
  useEffect(() => {
    const updateContentFeed = async () => {
      if (showPosts && !showComments) {
        setLoadingCont(true);
        const posts = await getPostsByUser(limit, id);
        setUserPosts(posts);
        setLoadingCont(false);
      } else if (!showPosts && showComments) {
        setLoadingCont(true);
        const comments = await getCommentsByUser(limit, id);
        setUserComments(comments);
        setLoadingCont(false);
      }
    };
    updateContentFeed();
  }, [limit]);

  const handlePostsClick = async () => {
    if (showPosts === true) {
      return null;
    }
    setShowComments(false);
    setLoadingCont(true);
    setLimit(10);
    const posts = await getPostsByUser(limit, id);
    setUserPosts(posts);
    setLoadingCont(false);

    setShowPosts(true);
  };

  const handleCommentsClick = async () => {
    if (showComments === true) {
      return null;
    }
    setShowPosts(false);
    setLoadingCont(true);
    setLimit(10);
    const comments = await getCommentsByUser(limit, id);
    setUserComments(comments);
    setLoadingCont(false);

    setShowComments(true);
  };

  const handleShowMore = () => {
    setLimit(limit + 10);
  };
  // conditional rendering of error
  if (loadError) {
    return <div>User profile not found</div>;
  }

  // conditional rendering of loading component

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="profileCont">
        <div className="profileStats">
          <img className="test" src={user.backgroundPic}></img>
          <div className="profileHeader">
            <img src={user.profilePic} className="profileUserProfileImg"></img>
            <div className="usernameProfile">{user.username}</div>
          </div>
        </div>
        <div className="postsCommentsMainDiv">
          <div className="profileButtons">
            <button
              className={`postsBtnProf ${showPosts}`}
              onClick={handlePostsClick}
            >
              Posts
            </button>
            <button
              className={`commentsBtnProf ${showComments}`}
              onClick={handleCommentsClick}
            >
              Comments
            </button>
          </div>
          {loadingCont ? <div>LOADING ...</div> : null}
          <div className={"profilePostsContainer " + showPosts}>
            {userPosts.length === 0 ? <div>User has no posts</div> : null}
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
            {userPosts.length > 1 ? (
              <button className="loadMoreProfile" onClick={handleShowMore}>
                Show more
              </button>
            ) : null}
          </div>
          <div className={"profileCommentContainer " + showComments}>
            {userComments.length === 0 ? <div>User has no comments</div> : null}
            {userComments.map((comment) => (
              <CommentComponent comment={comment} key={comment.id} />
            ))}
            {userComments.length > 1 ? (
              <button className="loadMoreProfile" onClick={handleShowMore}>
                Show more
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileForId;
