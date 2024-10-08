import { LOCAL_URL } from "../utils/url.const";

// get comments for a specific post
async function getComments(postid) {
  const url = LOCAL_URL + `comments?postid=${postid}`;
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headerinfo,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// get comments by a specific user (used in user profiles)
async function getCommentsByUser(limit, id) {
  const url = LOCAL_URL + `comments/userpost?limit=${limit}&id=${id}`;
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headerinfo,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// post a new comment
async function postNewComment(text, postid) {
  const url = LOCAL_URL + "comments";
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = {
    text: text,
    postid: postid,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerinfo,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// update likes on a comment
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

// delete specific comment
async function deleteComment(commentid) {
  const url = LOCAL_URL + `comments/delete?commentid=${commentid}`;
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headerinfo,
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export {
  getComments,
  getCommentsByUser,
  postNewComment,
  putCommentLikes,
  deleteComment,
};
