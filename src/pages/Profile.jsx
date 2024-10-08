import { useContext, useState, useEffect } from "react";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import { AuthContext } from "../App";
import "../styles/profile.css";
import Post from "../components/Post";
// import getPostsByUser from "../services/getPostsByUser";
import { getPostsByUser } from "../services/statusCalls";
import ProfileHeader from "../components/ProfileHeader";
// import getCommentsByUser from "../services/getCommentsByUser";
import { getCommentsByUser } from "../services/commentCalls";
import CommentComponent from "../components/CommentComponent";
import EditProfileModal from "../components/EditProfileModal";
import { postNewBanner } from "../services/userCalls";
// import postNewBanner from "../services/postNewBanner";
import { useParams } from "react-router";
// import checkLoginStatus from "../services/deprecated_login_calls/checkLoginStatus";
import { checkLoginStatus } from "../services/loginCalls";
import LoadingHamster from "../components/LoadingHamster";

function Profile() {
  const authContext = useContext(AuthContext);
  const [showPosts, setShowPosts] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useRedirectValidFail(authContext.err);
  if (typeof authContext.user === "undefined") {
    return null;
  }
  const { id } = useParams();

  // load posts on component load
  useEffect(() => {
    const loadPosts = async () => {
      const posts = await getPostsByUser(limit);
      setUserPosts(posts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  // side effect for loading more posts or comments depending on what is currently active
  useEffect(() => {
    const updateContentFeed = async () => {
      if (showPosts && !showComments) {
        setLoading(true);
        const posts = await getPostsByUser(limit);
        setUserPosts(posts);
        setLoading(false);
      } else if (!showPosts && showComments) {
        setCommentLoading(true);
        const comments = await getCommentsByUser(limit);
        setUserComments(comments);
        setCommentLoading(false);
      }
    };
    updateContentFeed();
  }, [limit]);

  const handlePostsClick = async () => {
    if (showPosts === true) {
      return null;
    }
    setShowComments(false);
    setLoading(true);
    setLimit(10);
    const posts = await getPostsByUser(limit);
    setUserPosts(posts);
    setLoading(false);
    setShowPosts(true);
  };

  const handleCommentsClick = async () => {
    if (showComments === true) {
      return null;
    }
    setShowPosts(false);
    setLoading(true);
    setLimit(10);
    const comments = await getCommentsByUser(limit);
    setUserComments(comments);
    setLoading(false);

    setShowComments(true);
  };

  const handleShowMore = () => {
    setLimit(limit + 10);
  };

  const handleEditProfileBtn = () => {
    setShowEditModal(true);
  };

  return (
    <>
      <div className="profileCont">
        <EditProfileModal
          visibility={showEditModal}
          setModalVisible={setShowEditModal}
        />
        <div className="profileStats">
          <img className="test" src={authContext.user.backgroundPic}></img>
          <ProfileHeader openProfileModal={handleEditProfileBtn} />
          <div className="editProfileButtonDiv"></div>
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
          {loading ? <LoadingHamster text="content" /> : null}
          {!loading && userPosts.length < 1 && !showComments ? (
            <div>You have no posts</div>
          ) : null}
          <div className={"profilePostsContainer " + showPosts}>
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
                id={item.user.id}
                origin={"profile"}
                setLoading={setLoading}
                setStatus={setUserPosts}
              ></Post>
            ))}

            {userPosts.length > 1 ? (
              <button className="loadMoreProfile" onClick={handleShowMore}>
                Show more
              </button>
            ) : null}

            <div className="emptyDivForSpace">space</div>
          </div>
          <div className={"profileCommentContainer " + showComments}>
            {commentLoading ? <LoadingHamster text="comments" /> : null}
            {!commentLoading && userComments.length < 1 ? (
              <div>You have no comments</div>
            ) : null}
            {userComments.map((comment) => (
              <CommentComponent
                comment={comment}
                key={comment.id}
                origin="profile"
                setLoading={setCommentLoading}
                setUserComments={setUserComments}
              />
            ))}

            {userComments.length > 1 ? (
              <button className="loadMoreProfile" onClick={handleShowMore}>
                Show more
              </button>
            ) : null}

            <div className="emptyDivForSpace">space</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
