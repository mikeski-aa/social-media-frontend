import { LOCAL_URL } from "../utils/url.const";

async function postRequest(requesteeid) {
  const url = LOCAL_URL + "requests";
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = {
    requesteeid: +requesteeid,
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

export default postRequest;
