import { LOCAL_URL } from "../utils/url.const";

// calls to check if user is still logged in - whether token exists and is valid
async function checkLoginStatus() {
  const url = LOCAL_URL + "login";
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  console.log(headerinfo);
  try {
    const response = await fetch(url, { method: "GET", headers: headerinfo });

    if (!response.ok) {
      throw new Error("Error validating token");
    }

    const json = await response.json();

    console.log("json log");
    console.log(json.id);

    const userInfo = {
      validated: true,
      username: json.username,
      id: json.id,
      email: json.email,
      profilePic: json.profilePic,
      backgroundPic: json.backgroundPic,
    };
    return userInfo;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// user log in call
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

export { checkLoginStatus, postUserLogin };