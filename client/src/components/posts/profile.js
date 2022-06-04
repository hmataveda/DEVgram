import axios from "axios";
import React, { useEffect, useState } from "react";

import { useParams, useOutletContext, useNavigate } from "react-router-dom";

function Author() {
  const { name: authorName } = useParams();
  console.log("name", authorName);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const user = useOutletContext();
  console.log("user from context", user);

  let canUpdatePosts = false;
  if (user.userName == authorName) {
    canUpdatePosts = true;
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/postsbyauthor/${authorName}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Got all the posts of the One Author", response.data);
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(
          "Error while getting all the posts of the One Author in client",
          err
        );
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
      .then((response) => {
        console.log("Post deleted successfully", response.data);
        navigate("/posts");
      })
      .catch((err) => {
        console.log("Error while deleting the post", err);
      });
  };

  const post = posts.map((post) => {
    return (
      <div className="col-4" key={post._id}>
        <div className=" mx-2 mt-4 post pb-3 ">
          <div className="pt-3 px-4 d-flex justify-content-between">
            <span
              className="title "
              onClick={() => navigate(`/post/${post._id}`, { state: post })}
            >
              {post.title}
            </span>
            {canUpdatePosts && (
              <span className="icons ">
                <i
                  className="bi bi-trash-fill me-2"
                  onClick={() => handleDelete(post._id)}
                ></i>

                <i
                  className="bi bi-pencil-square"
                  onClick={() =>
                    navigate(`/post/update/${post._id}`, { state: post })
                  }
                ></i>
              </span>
            )}
          </div>
          <div className="img w-100 p-3">
            <img
              src={post.image}
              alt="post image"
              className="w-100 "
              height="200"
            />
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="row justify-content-center text-center mt-4 mb-3">
        <div className="col-6  ">
          <h1>{authorName}'s Profile</h1>
          {/* <p>Number of posts: 12345</p> */}
        </div>
      </div>
      <div className="row justify-content-center posts mx-5 ">{post}</div>
    </>
  );
}

export default Author;
