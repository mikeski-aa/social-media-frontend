import { LOCAL_URL } from "../../utils/url.const";

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

export default checkLoginStatus;
