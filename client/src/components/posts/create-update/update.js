import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "./form";

function Update() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state);
  const handleSubmit = (post, id) => {
    console.log("post", post);
    axios
      .put(`http://localhost:8000/api/post/${id}`, post, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(" post Edited in client", response.data);
        navigate("/posts");
      })
      .catch((err) => {
        console.log("Error while editing the existing post in  client", err);
      });
  };
  return (
    <div>
      <Form heading="Update New" handlesubmit={handleSubmit} />
    </div>
  );
}

export default Update;
