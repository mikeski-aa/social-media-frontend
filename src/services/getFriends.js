import { LOCAL_URL } from "../utils/url.const";

async function getFriends() {
  const url = LOCAL_URL + `friends`;
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  try {
    const response = await fetch(url, { headers: headerinfo });

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

export default getFriends;
