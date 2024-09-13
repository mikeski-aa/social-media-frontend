import { createContext, useContext, useEffect, useState } from "react";
import "../styles/post.css";
import PostUserProfile from "./PostUserProfile";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import LikeCommentContainer from "./LikeCommentContainer";
import dateConversion from "../utils/dateConversion";
import CommentContainer from "./CommentContainer";
import getComments from "../services/getComment";
import { AuthContext } from "../App";
import putStatusLikes from "../services/putStatusLikes";

export const PostId = createContext();

function Post(props) {
  const [commentShow, setCommentShow] = useState("hide");
  const [loadComments, setLoadComments] = useState(0);
  const [currentPostId, setCurrentPostId] = useState(0);
  const [commentCount, setCommentCount] = useState(props.commentCount);
  const [comments, setComments] = useState([]);
  const [likes, setLikeArray] = useState(props.likeUsers);
  const [likedByUser, setLikedByUser] = useState();
  const date = dateConversion(props.postDate);
  const authContext = useContext(AuthContext);

  // probably need to add conditional rednering depending on whether post has image, text or both
  // I am unsure of this implementation of conditional redering, not really DRY

  // set post ID
  useEffect(() => {
    setCurrentPostId(props.postid);
  }, [props.postid]);

  // set like array on post loading
  useEffect(() => {
    let filtered = likes.filter((item) => item === authContext.user.id);
    console.log(`Filtered likes: ${filtered}`);
    console.log(filtered.length);

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
    console.log("like clicked");

    const response = await putStatusLikes(currentPostId);
    console.log(response.likes);
    setLikeArray(response.likes);
  };

  // checking fetching comments only on click
  useEffect(() => {
    const fetchComments = async () => {
      console.log("FETCHING COMMENTS ONLY ON CLICK");
      const response = await getComments(currentPostId);

      setComments(response);
    };

    fetchComments();
  }, [loadComments]);

  // side effect for updating whether user is liking the post, to occur when likes array changes
  useEffect(() => {
    console.log("side effect running");
    const filteredArray = likes.filter((item) => item === authContext.user.id);
    if (filteredArray.length === 1) {
      setLikedByUser(true);
    } else {
      setLikedByUser(false);
    }
  }, [likes]);

  if (props.text === "") {
    return (
      <>
        <div className="postContainer">
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
            <div className="commentCount">{commentCount} comments</div>
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
            }}
          >
            <LikeCommentContainer
              like={like}
              comment={comment}
              handleCommentClick={handleCommentClick}
              handleLikeClick={handleLikeClick}
            />
            <CommentContainer
              status={commentShow}
              loadComments={loadComments}
            />
          </PostId.Provider>
        </div>
      </>
    );
  } else if (props.imageUrl === "null") {
    return (
      <>
        <div className="postContainer">
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
            <div className="commentCount">{commentCount} comments</div>
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
            }}
          >
            <LikeCommentContainer
              like={like}
              comment={comment}
              handleCommentClick={handleCommentClick}
              handleLikeClick={handleLikeClick}
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

  return (
    <>
      <div className="postContainer">
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
          <div className="commentCount">{commentCount} comments</div>
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
          }}
        >
          <LikeCommentContainer
            like={like}
            comment={comment}
            handleCommentClick={handleCommentClick}
            handleLikeClick={handleLikeClick}
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
