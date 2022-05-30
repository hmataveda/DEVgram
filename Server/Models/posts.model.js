const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Posts title is required"],
      maxlength: [50, "Post Name can't be more than 20 characters"],
      minlength: [3, "Post Name must be atleast 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Post Description is required!!"],
      maxlength: [300, "Post Description can't be more than 300 characters"],
      minlength: [3, "Post Description must be atleast 3 characters long"],
    },
    image: {
      type: String,
      required: [true, "Post image is required!!"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema); // Post collection in DEVgram db

module.exports = Post;
