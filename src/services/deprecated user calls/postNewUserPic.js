import { LOCAL_URL } from "../../utils/url.const";

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

export default postNewUserPic;
