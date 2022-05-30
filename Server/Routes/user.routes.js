const userController = require("../controllers/user.controller");

const userRoutes = (app) => {
  app.post("/register", userController.register);
  app.post("/login", userController.login);
  app.post("/logout", userController.logout);
  app.get("/getLoggedUser", userController.getLoggedInUser);
};

module.exports = userRoutes;
