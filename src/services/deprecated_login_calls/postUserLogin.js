import { LOCAL_URL } from "../../utils/url.const";

async function postUserLogin(email, password) {
  const url = LOCAL_URL + "/login";
  const headerinfo = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerinfo,
      body: JSON.stringify(body),
    });

    const json = await response.json();

    // save token in localstorage here
    localStorage.setItem("token", json.token);

    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default postUserLogin;
