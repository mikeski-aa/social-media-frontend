import { LOCAL_URL } from "../../utils/url.const";

async function getSearchUsers(username) {
  const url = LOCAL_URL + `user/all?username=${username}`;
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  try {
    const response = await fetch(url, { headers: headerinfo, method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    console.log("search result");
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

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

async function postNewBanner(image) {
  const url = LOCAL_URL + "user/banner";
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  const myForm = new FormData();
  myForm.append("picture", image);

  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerinfo,
      body: myForm,
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

async function postNewUserPic(image) {
  const url = LOCAL_URL + "user/avatar";
  const headerinfo = {
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  const myForm = new FormData();
  myForm.append("picture", image);

  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerinfo,
      body: myForm,
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

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { getSearchUsers, getUser, postNewBanner, postUser, postNewUserPic };
