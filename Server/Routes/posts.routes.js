const PostControllers = module.require("../controllers/posts.controller");
const authenticate = require("../Config/jwt.config");

const PostRoutes = (app) => {
  app.post("/api/posts", authenticate, PostControllers.createPost); // Create route
  app.get("/api/posts", authenticate, PostControllers.findAllPost); // GetAll Route
  app.get("/api/post/:id", authenticate, PostControllers.findOnePostbyID); // GetOne Route
  app.put("/api/post/:id", authenticate, PostControllers.updatePostbyID); // UpdateOne Route
  app.delete("/api/post/:id", authenticate, PostControllers.deletePost); // Delete Route
  app.get(
    "/api/postsbyauthor/:userName",
    authenticate,
    PostControllers.getPostsbyAuthor
  );
};

module.exports = PostRoutes;
