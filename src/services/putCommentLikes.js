import { LOCAL_URL } from "../utils/url.const";

async function putCommentLikes(commentid) {
  const url = LOCAL_URL + `comments/likes?commentid=${commentid}`;
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headerinfo,
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default putCommentLikes;
