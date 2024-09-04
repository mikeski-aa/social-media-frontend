import { LOCAL_URL } from "../utils/url.const";

async function postUser(props) {
  const header = { "Content-Type": "application/json" };
  const url = LOCAL_URL + "user";
  const body = {
    username: props.username,
    password: props.password,
    confirmPassword: props.confirmPassword,
    email: props.email,
  };
  console.log(LOCAL_URL);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
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

export default postUser;
