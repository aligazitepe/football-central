

import React, { useState } from "react";

import axios from "axios";
import "./profile.css";
function Profile() {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const send = (event) => {
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    console.log(data);
    axios
      .post("http://localhost:5000/upload", data)
      // you are  get file from the bakend  in res.data
      // dispatchEvent()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile">
      <h1>Profile Picture Upload:</h1>
      <form action="#">
        <div className="flex">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(event) => {
              const { value } = event.target;
              setName(value);
            }}
          />
        </div>
        <div className="flex">
          <label htmlFor="file">File</label>

          <input
            type="file"
            id="file"
            accept=".jpg"
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
          />
        </div>
        <button onClick={send}>Send</button>
      </form>
    </div>
  );
}

export default Profile;
