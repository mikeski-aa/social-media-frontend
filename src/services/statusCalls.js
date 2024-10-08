import { LOCAL_URL } from "../utils/url.const";

// calls api to get specific posts by user
async function getPostsByUser(limit, id) {
  const url = LOCAL_URL + `status/userpost?limit=${limit}&id=${id}`;
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

// calls api to get all statuses from friends
async function getStatus(postCount) {
  const url = LOCAL_URL + `status?count=${postCount}`;
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

// posts a new status
async function postStatus(text, imageurl) {
  const url = LOCAL_URL + "status";
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = {
    text: text,
    imageUrl: imageurl,
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

// update status, to add like
async function putStatusLikes(postid) {
  const url = LOCAL_URL + `status/likes?postid=${postid}`;
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

// post status pic
async function postImage(image) {
  const url = LOCAL_URL + "statuspic";
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  const myForm = new FormData();
  myForm.append("picture", image);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerinfo,
      body: myForm,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// delete specific status
async function deleteStatus(statusid) {
  const url = LOCAL_URL + `status/delete?statusid=${statusid}`;
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
  getPostsByUser,
  getStatus,
  postStatus,
  putStatusLikes,
  postImage,
  deleteStatus,
};
