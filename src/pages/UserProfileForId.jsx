import { useContext, useState, useEffect } from "react";
import useRedirectValidFail from "../hooks/useRedirectValidFail";
import { AuthContext } from "../App";
import "../styles/profile.css";
import Post from "../components/Post";
import getPostsByUser from "../services/getPostsByUser";
import getCommentsByUser from "../services/getCommentsByUser";
import CommentComponent from "../components/CommentComponent";
import { useParams } from "react-router";
import getSearchUsers from "../services/getSearchUsers";
import getUser from "../services/getUser";
import person from "../assets/person.svg";

function UserProfileForId() {
  const { id } = useParams();
  return (
    <>
      <div className="userprofile">
        <div className="header">XD</div>
        <div>{id}</div>
      </div>
    </>
  );
}

export default UserProfileForId;

// import { useContext, useState, useEffect } from "react";
// import useRedirectValidFail from "../hooks/useRedirectValidFail";
// import { AuthContext } from "../App";
// import "../styles/profile.css";
// import Post from "../components/Post";
// import getPostsByUser from "../services/getPostsByUser";
// import getCommentsByUser from "../services/getCommentsByUser";
// import CommentComponent from "../components/CommentComponent";
// import { useParams } from "react-router";
// import getSearchUsers from "../services/getSearchUsers";
// import getUser from "../services/getUser";
// import person from "../assets/person.svg";

// function UserProfileForId() {
//   const authContext = useContext(AuthContext);
//   const [showPosts, setShowPosts] = useState(true);
//   const [showComments, setShowComments] = useState(false);
//   const [userPosts, setUserPosts] = useState([]);
//   const [userComments, setUserComments] = useState([]);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState();
//   let img;
//   let username;

//   useRedirectValidFail(authContext.err);
//   const { id } = useParams();
//   console.log("params id result goes here");
//   console.log(id);

//   useEffect(() => {
//     const loadUser = async () => {
//       const fetchedUser = await getUser(id);
//       setUser(fetchedUser);
//       img = user.profilePic;
//       username = user.username;
//     };
//     loadUser();
//   }, []);

//   // load posts on component load
//   useEffect(() => {
//     const loadPosts = async () => {
//       const posts = await getPostsByUser(limit, id);
//       setUserPosts(posts);
//       setLoading(false);
//     };
//     loadPosts();
//   }, []);

//   // side effect for loading more posts or comments depending on what is currently active
//   useEffect(() => {
//     const updateContentFeed = async () => {
//       if (showPosts && !showComments) {
//         setLoading(true);
//         const posts = await getPostsByUser(limit, id);
//         setUserPosts(posts);
//         setLoading(false);
//       } else if (!showPosts && showComments) {
//         setLoading(true);
//         const comments = await getCommentsByUser(limit, id);
//         setUserComments(comments);
//         setLoading(false);
//       }
//     };
//     updateContentFeed();
//   }, [limit]);

//   const handlePostsClick = async () => {
//     if (showPosts === true) {
//       return null;
//     }
//     setShowComments(false);
//     setLoading(true);
//     setLimit(10);
//     const posts = await getPostsByUser(limit, id);
//     setUserPosts(posts);
//     setLoading(false);

//     setShowPosts(true);
//   };

//   const handleCommentsClick = async () => {
//     if (showComments === true) {
//       return null;
//     }
//     setShowPosts(false);
//     setLoading(true);
//     setLimit(10);
//     const comments = await getCommentsByUser(limit, id);
//     setUserComments(comments);
//     setLoading(false);

//     setShowComments(true);
//   };

//   const handleShowMore = () => {
//     setLimit(limit + 10);
//   };

//   return (
//     <>
//       <div className="profileCont">
//         <div className="profileStats">
//           <div className="profileHeader">
//             <img src={img} className="profileUserProfileImg"></img>
//             <div className="usernameProfile">{username}</div>
//           </div>
//         </div>
//         <div className="postsCommentsMainDiv">
//           <div className="profileButtons">
//             <button className="postsBtnProf" onClick={handlePostsClick}>
//               Posts
//             </button>
//             <button className="commentsBtnProf" onClick={handleCommentsClick}>
//               Comments
//             </button>
//           </div>
//           {loading ? <div>LOADING ...</div> : null}
//           <div className={"profilePostsContainer " + showPosts}>
//             {userPosts.map((item) => (
//               <Post
//                 text={item.text}
//                 imageUrl={item.imageUrl}
//                 key={item.id}
//                 userName={item.user.username}
//                 userid={item.user.id}
//                 profilePic={item.user.profilePic}
//                 postDate={item.postDate}
//                 postid={item.id}
//                 likeCount={item.likes.length}
//                 likeUsers={item.likes}
//                 commentCount={item._count.comments}
//               ></Post>
//             ))}
//             <button className="loadMoreProfile" onClick={handleShowMore}>
//               Show more
//             </button>
//           </div>
//           <div className={"profileCommentContainer " + showComments}>
//             {userComments.map((comment) => (
//               <CommentComponent comment={comment} key={comment.id} />
//             ))}
//             <button className="loadMoreProfile" onClick={handleShowMore}>
//               Show more
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserProfileForId;
