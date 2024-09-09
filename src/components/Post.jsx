import { createContext, useContext, useEffect, useState } from "react";
import "../styles/post.css";
import PostUserProfile from "./PostUserProfile";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import LikeCommentContainer from "./LikeCommentContainer";
import dateConversion from "../utils/dateConversion";
import CommentContainer from "./CommentContainer";
import getComments from "../services/getComment";

export const PostId = createContext();

function Post(props) {
  const [commentShow, setCommentShow] = useState("hide");
  const [loadComments, setLoadComments] = useState(0);
  const [currentPostId, setCurrentPostId] = useState(0);
  const [comments, setComments] = useState([]);
  const date = dateConversion(props.postDate);

  // probably need to add conditional rednering depending on whether post has image, text or both
  // I am unsure of this implementation of conditional redering, not really DRY

  useEffect(() => {
    setCurrentPostId(props.postid);
  }, [props.postid]);

  const handleCommentClick = () => {
    if (commentShow === "hide") {
      setCommentShow("show");
      setLoadComments(loadComments + 1);
    } else {
      setCommentShow("hide");
    }
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

  if (props.text === "") {
    return (
      <>
        <div className="postContainer">
          <div className="userInfoContainer">
            <PostUserProfile
              profilePic={props.profilePic}
              userName={props.userName}
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
          <div className="commentLikeCount">
            <div className="likeCount">{props.likeCount} likes</div>
            <div className="commentCount">{props.commentCount} comments</div>
          </div>
          <hr></hr>
          <LikeCommentContainer
            like={like}
            comment={comment}
            handleCommentClick={handleCommentClick}
          />
          <PostId.Provider
            value={{
              currentPostId,
              setLoadComments,
              loadComments,
              comments,
              setComments,
            }}
          >
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
            />

            <div className="postDate">{date}</div>
          </div>
          <div className="textImageContainer">
            <div className="text">{props.text}</div>
          </div>
          <div className="commentLikeCount">
            <div className="likeCount">{props.likeCount} likes</div>
            <div className="commentCount">{props.commentCount} comments</div>
          </div>
          <hr></hr>
          <LikeCommentContainer
            like={like}
            comment={comment}
            handleCommentClick={handleCommentClick}
          />
          <PostId.Provider
            value={{
              currentPostId,
              setLoadComments,
              loadComments,
              comments,
              setComments,
            }}
          >
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
        <div className="commentLikeCount">
          <div className="likeCount">{props.likeCount} likes</div>
          <div className="commentCount">{props.commentCount} comments</div>
        </div>
        <hr></hr>
        <LikeCommentContainer
          like={like}
          comment={comment}
          handleCommentClick={handleCommentClick}
        />
        <PostId.Provider
          value={{
            currentPostId,
            setLoadComments,
            loadComments,
            comments,
            setComments,
          }}
        >
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
