import { LOCAL_URL } from "../utils/url.const";

async function postNewPost(text, image) {
  const url = LOCAL_URL + "status";
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = {
    text: text,
    image: image,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerinfo,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default postNewPost;
