import { LOCAL_URL } from "../utils/url.const";

async function postUser(username, password, confirmPassword, email) {
  const headerinfo = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const url = LOCAL_URL + "user";
  const body = {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
    email: email,
  };

  console.log(body);
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerinfo,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(response);
      const test = await response.json();
      throw new Error(`${test.status}, ${test.message}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default postUser;
