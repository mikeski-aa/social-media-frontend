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

export { deleteFriend };
