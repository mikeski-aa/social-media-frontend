import { LOCAL_URL } from "../utils/url.const";

async function getUser(id) {
  const url = LOCAL_URL + `user?id=${id}`;
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
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getUser;
