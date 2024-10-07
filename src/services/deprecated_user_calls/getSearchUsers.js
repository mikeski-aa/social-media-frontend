import { LOCAL_URL } from "../../utils/url.const";

async function getSearchUsers(username) {
  const url = LOCAL_URL + `user/all?username=${username}`;
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  try {
    const response = await fetch(url, { headers: headerinfo, method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    console.log("search result");
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getSearchUsers;
