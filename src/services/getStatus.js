import { LOCAL_URL } from "../utils/url.const";

// TODO: FETCH SPECIFIC STATUS BY ID OF USER!
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
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getStatus;
