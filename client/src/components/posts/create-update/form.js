import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Form(props) {
  const { heading, handlesubmit } = props;
  const { state: oldPost } = useLocation();
  const [post, setPost] = useState(
    oldPost || {
      title: "",
      description: "",
      image: "",
    }
  );

  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (oldPost) {
      handlesubmit(post, oldPost._id || null);
    } else {
      handlesubmit(post);
    }
  };
  return (
    <div className="row justify-content-center mt-5 pt-3 text-center">
      <div className="col-6  editForm bg-light">
        <h2 className="m-3">{heading} Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={post.title}
              name="title"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Add Image URL:</label>
            <input
              type="text"
              value={post.image}
              name="image"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={post.description}
              name="description"
              onChange={handleInputChange}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Form;
