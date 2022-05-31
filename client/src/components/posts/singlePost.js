import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  useOutletContext,
  useNavigate,
} from "react-router-dom";

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [post, setPost] = useState(
    state || { title: "", image: "", createdBy: "", description: "" }
  );

  const user = useOutletContext();
  console.log("user from context", user);

  let canUpdatePosts = false;
  if (user.userName == post.createdBy.userName) {
    canUpdatePosts = true;
  }

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

  useEffect(() => {
    if (!state) {
      axios
        .get(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          setPost(response.data);
        })
        .catch((err) => {
          console.log("Error while fetching the single post", err);
        });
    }
  }, []);
  return (
    <div className="row justify-content-center posts ">
      <div className="col-4 m-4 post pb-3">
        <div className="pt-3 px-3 d-flex justify-content-between">
          <span
            className="title"
            onClick={() => navigate(`/post/${post._id}`, { state: post })}
          >
            {post.title}
          </span>
          {canUpdatePosts && (
            <span className="icons">
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
          <img src={post.image} alt="post image" className="w-100 " />
        </div>
        <div
          className="author pb-2 px-3"
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
}

export default SinglePost;
