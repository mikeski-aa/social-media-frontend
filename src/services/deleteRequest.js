import { LOCAL_URL } from "../utils/url.const";

async function deleteRequest(reqid) {
  const url = LOCAL_URL + `requests?reqid=${reqid}`;
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

export default deleteRequest;
