import { LOCAL_URL } from "../utils/url.const";

// call api to delete a friend
async function deleteFriend(userid) {
  const url = LOCAL_URL + `friends/delete?friendid=${userid}`;
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

// get all friends
async function getFriends() {
  const url = LOCAL_URL + `friends`;
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  try {
    const response = await fetch(url, { headers: headerinfo, method: "GET" });

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

// add a new friend call
async function putFriendAdd(userid) {
  const url = LOCAL_URL + `friends/accept?requesterid=${userid}`;
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

export { deleteFriend, getFriends, putFriendAdd };
