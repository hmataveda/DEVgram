import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "./form";

function Create() {
  const navigate = useNavigate();
  const handleSubmit = (post) => {
    axios
      .post("http://localhost:8000/api/posts", post, { withCredentials: true })
      .then((response) => {
        console.log("New post created in client", response.data);
        navigate("/posts");
      })
      .catch((err) => {
        console.log("Error while creating new post in  client", err);
      });
  };
  return (
    <div>
      <Form heading="Create New" handlesubmit={handleSubmit} />
    </div>
  );
}

export default Create;
