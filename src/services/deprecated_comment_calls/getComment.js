import { LOCAL_URL } from "../utils/url.const";

async function getComments(postid) {
  const url = LOCAL_URL + `comments?postid=${postid}`;
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  try {
    console.log(url);
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

export default getComments;
