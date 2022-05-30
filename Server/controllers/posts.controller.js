const Post = require("../Models/posts.model");
const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

module.exports = {
  createPost: (req, res) => {
    // const user = jwt.verify(req.cookies.userToken, SECRET);
    Post.create({ ...req.body, createdBy: req.user._id })
      .then((newPost) => {
        res.status(200).json(newPost);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong in Creating the new Post [Create]", // CREATE
          error: err,
        });
      });
  },

  findAllPost: (req, res) => {
    Post.find({})
      .populate("createdBy", "userName email")
      .collation({ locale: "en" })
      .sort({ type: 1 })
      .then((Allposts) => {
        console.log("through authenticate", req.user);
        res.status(200).json(Allposts);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong in Finding all Posts [Read]", // READ ALL
          error: err,
        });
      });
  },

  findOnePostbyID: (req, res) => {
    Post.findById(req.params.id)
      .populate("createdBy", "userName email")
      .then((Allposts) => {
        res.json(Allposts);
      })
      .catch((err) => {
        res.json({
          message: "Something went wrong in Finding ONE Post [Read One]", //READ ONE
          error: err,
        });
      });
  },

  updatePostbyID: (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong in updating Post by ID [Update]", //UPDATE
          error: err,
        });
      });
  },

  deletePost: (req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then((deletedPost) => {
        res.json(deletedPost);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong in Deleting  a Post [Detete]", //DELETE
          error: err,
        });
      });
  },
  getPostsbyAuthor: (req, res) => {
    User.findOne({ userName: req.params.userName })
      .then((authorDetails) => {
        Post.find({ createdBy: authorDetails._id })
          .populate("createdBy", "userName")
          .then((allPostFromAuther) => {
            res.status(201).json(allPostFromAuther);
          });
      })
      .catch((err) => {
        console.log("Error while fetchimh the posts by authername", err);
      });
  },
};
