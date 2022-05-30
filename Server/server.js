require("./Config/mongoose.config");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PostRoutes = require("./Routes/posts.routes");
const UserRoutes = require("./Routes/user.routes");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

PostRoutes(app);
UserRoutes(app);

app.listen(8000, () => {
  console.log(`Server is running  and Listenening at the ${PORT} !!!!!`);
});
