import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
require("./components.css");

function AllPosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts", { withCredentials: true })
      .then((response) => {
        setPosts(response.data);
        console.log("Getting all posts form database", response.data);
      })
      .catch((err) => {
        console.log("Error while Getting all posts from database", err);
      });
  }, []);

  const post = posts.map((post) => {
    return (
      <div className="row justify-content-center posts" key={post._id}>
        <div className="col-5  m-4 post pb-3">
          <div
            className="title pt-3 px-2"
            onClick={() => navigate(`/post/${post._id}`, { state: post })}
          >
            {" "}
            {post.title}
          </div>
          <div className="img w-100 p-3">
            <img src={post.image} alt="post image" className="w-100 " />
          </div>
          <div
            className="author pb-3 px-3"
            onClick={() => {
              navigate(`/author/${post.createdBy.userName}`);
            }}
          >
            <span className="face">
              {post.createdBy.userName[0].toUpperCase()}
            </span>
            {post.createdBy.userName}
          </div>
          <div className="description pb-3 px-3">{post.description}</div>
        </div>
      </div>
    );
  });
  return <div>{post}</div>;
}

export default AllPosts;
