import { createContext, useContext, useEffect, useState } from "react";
import "../styles/post.css";
import PostUserProfile from "./PostUserProfile";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import LikeCommentContainer from "./LikeCommentContainer";
import dateConversion from "../utils/dateConversion";
import CommentContainer from "./CommentContainer";
// import getComments from "../services/getComment";
import { getComments } from "../services/commentCalls";
import { AuthContext } from "../App";
// import putStatusLikes from "../services/deprecated_status_calls/putStatusLikes";
import { putStatusLikes } from "../services/statusCalls";
import binIcon from "../assets/bin.svg";
import { deleteStatus } from "../services/statusCalls";
import { getStatus } from "../services/statusCalls";
import { getPostsByUser } from "../services/statusCalls";

export const PostId = createContext();

function Post(props) {
  const [commentShow, setCommentShow] = useState("hide");
  const [loadComments, setLoadComments] = useState(0);
  const [currentPostId, setCurrentPostId] = useState(0);
  const [commentCount, setCommentCount] = useState(props.commentCount);
  const [comments, setComments] = useState([]);
  const [likes, setLikeArray] = useState(props.likeUsers);
  const [likedByUser, setLikedByUser] = useState();
  const [loadingComments, setLoadingComments] = useState(false);
  const date = dateConversion(props.postDate);
  const authContext = useContext(AuthContext);
  const commentOrigin = props.origin;

  // probably need to add conditional rednering depending on whether post has image, text or both
  // I am unsure of this implementation of conditional redering, not really DRY

  // set post ID
  useEffect(() => {
    setCurrentPostId(props.postid);
  }, [props.postid]);

  // set like array on post loading
  useEffect(() => {
    let filtered = likes.filter((item) => item === authContext.user.id);

    if (filtered.length === 0) {
      setLikedByUser(false);
    } else {
      setLikedByUser(true);
    }
  }, []);

  const handleCommentClick = () => {
    if (commentShow === "hide") {
      setCommentShow("show");
      setLoadComments(loadComments + 1);
    } else {
      setCommentShow("hide");
    }
  };

  // call service to like / unlike
  const handleLikeClick = async () => {
    const response = await putStatusLikes(currentPostId);

    setLikeArray(response.likes);
  };

  // checking fetching comments only on click
  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);

      const response = await getComments(currentPostId);

      setComments(response);
      setLoadingComments(false);
    };

    fetchComments();
  }, [loadComments]);

  // side effect for updating whether user is liking the post, to occur when likes array changes
  useEffect(() => {
    const filteredArray = likes.filter((item) => item === authContext.user.id);
    if (filteredArray.length === 1) {
      setLikedByUser(true);
    } else {
      setLikedByUser(false);
    }
  }, [likes]);

  // show comments when clicking comment counter
  const handleClickComment = () => {
    if (commentShow === "hide") {
      setCommentShow("show");
      setLoadComments(loadComments + 1);
    } else {
      setCommentShow("hide");
    }
  };

  // handle clicking delete post
  const handleDeletePostClick = async () => {
    if (confirm("Do you want to delete your post?") === true) {
      props.setLoading(true);
      const response = await deleteStatus(currentPostId);

      // depending on origin, use appropriate fetch of new comments to update feed
      if (props.origin === "home") {
        // need to add reload of comments to update without refresh
        const fetchNewPosts = await getStatus(10);
        props.setStatus(fetchNewPosts);
      } else if (props.origin === "profile") {
        const fetchNewPosts = await getPostsByUser(10);
        props.setStatus(fetchNewPosts);
      }

      props.setLoading(false);
    } else {
      return null;
    }
  };

  // no text only pic
  if (props.text === "") {
    return (
      <>
        <div className="postContainer">
          {props.userid === authContext.user.id ? (
            <button className="deletePostBtnOwner">
              <img
                src={binIcon}
                className="deletePostIcon"
                onClick={handleDeletePostClick}
              ></img>
            </button>
          ) : null}
          <div className="userInfoContainer">
            <PostUserProfile
              profilePic={props.profilePic}
              userName={props.userName}
              id={props.id}
            />
            <div className="postDate">{date}</div>
          </div>

          <div className="textImageContainer">
            <img
              src={props.imageUrl}
              alt="user image"
              className="userImage"
            ></img>
          </div>
          <div className="commentLikeCount" key={commentCount}>
            <div className="likeCount">{likes.length} likes</div>
            <div className="commentCount" onClick={handleClickComment}>
              {commentCount} comments
            </div>
          </div>
          <hr></hr>

          <PostId.Provider
            value={{
              currentPostId,
              setLoadComments,
              loadComments,
              comments,
              setComments,
              commentCount,
              setCommentCount,
              likedByUser,
              commentOrigin,
              loadingComments,
            }}
          >
            <LikeCommentContainer
              like={like}
              comment={comment}
              handleCommentClick={handleCommentClick}
              handleLikeClick={handleLikeClick}
              status={commentShow}
            />
            <CommentContainer
              status={commentShow}
              loadComments={loadComments}
            />
          </PostId.Provider>
        </div>
      </>
    );
    // no image only text
  } else if (props.imageUrl === "null") {
    return (
      <>
        <div className="postContainer">
          {props.userid === authContext.user.id ? (
            <button className="deletePostBtnOwner">
              <img
                src={binIcon}
                className="deletePostIcon"
                onClick={handleDeletePostClick}
              ></img>
            </button>
          ) : null}
          <div className="userInfoContainer">
            <PostUserProfile
              profilePic={props.profilePic}
              userName={props.userName}
              id={props.id}
            />

            <div className="postDate">{date}</div>
          </div>

          <div className="textImageContainer">
            <div className="text">{props.text}</div>
          </div>
          <div className="commentLikeCount" key={commentCount}>
            <div className="likeCount">{likes.length} likes</div>
            <div className="commentCount" onClick={handleClickComment}>
              {commentCount} comments
            </div>
          </div>
          <hr></hr>

          <PostId.Provider
            value={{
              currentPostId,
              setLoadComments,
              loadComments,
              comments,
              setComments,
              commentCount,
              setCommentCount,
              likedByUser,
              commentOrigin,
              loadingComments,
            }}
          >
            <LikeCommentContainer
              like={like}
              comment={comment}
              handleCommentClick={handleCommentClick}
              handleLikeClick={handleLikeClick}
              status={commentShow}
            />
            <CommentContainer
              status={commentShow}
              loadComments={loadComments}
            />
          </PostId.Provider>
        </div>
      </>
    );
  }

  // image and text
  return (
    <>
      <div className="postContainer">
        {props.userid === authContext.user.id ? (
          <button className="deletePostBtnOwner">
            <img
              src={binIcon}
              className="deletePostIcon"
              onClick={handleDeletePostClick}
            ></img>
          </button>
        ) : null}
        <div className="userInfoContainer">
          <PostUserProfile
            profilePic={props.profilePic}
            userName={props.userName}
            id={props.id}
          />
          <div className="postDate">{date}</div>
        </div>

        <div className="textImageContainer">
          <div className="text">{props.text}</div>
          <img
            src={props.imageUrl}
            alt="user image"
            className="userImage"
          ></img>
        </div>
        <div className="commentLikeCount" key={commentCount}>
          <div className="likeCount">{likes.length} likes</div>
          <div className="commentCount" onClick={handleClickComment}>
            {commentCount} comments
          </div>
        </div>
        <hr></hr>
        <PostId.Provider
          value={{
            currentPostId,
            setLoadComments,
            loadComments,
            comments,
            setComments,
            commentCount,
            setCommentCount,
            likedByUser,
            commentOrigin,
            loadingComments,
          }}
        >
          <LikeCommentContainer
            like={like}
            comment={comment}
            handleCommentClick={handleCommentClick}
            handleLikeClick={handleLikeClick}
            status={commentShow}
          />
          <CommentContainer
            status={commentShow}
            loadComments={loadComments}
            postid={props.postid}
          />
        </PostId.Provider>
      </div>
    </>
  );
}

export default Post;
