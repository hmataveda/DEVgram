const User = require("../Models/user.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    const NewUser = await user.save();
    console.log("New registerd user", NewUser._id);

    const userToken = jwt.sign(
      {
        _id: NewUser._id,
        email: NewUser.email,
        userName: NewUser.userName,
      },
      SECRET
    );
    console.log("UserToken", userToken);

    res
      .status(201)
      .cookie("userToken", userToken, {
        // httpOnly: true,
        expires: new Date(Date.now() + 10000000),
      })
      .json({
        successMessage: "userCreated",
        RegisterdUser: {
          _id: user._id,
          userName: user.userName,
          email: user.email,
        },
      });
  } catch (err) {
    console.log("Error while registering the user", err);
    res.json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("user", user);
    if (!user) {
      res.status(400).json({ message: "Invalid Login" });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log("LoGIN validpassword check", validPassword);

      if (!validPassword) {
        res.status(400).json({ message: "Invalid Login" });
      } else {
        const userToken = jwt.sign(
          {
            _id: user._id,
            userName: user.userName,
            email: user.email,
          },
          SECRET
        );

        res
          .status(201)
          .cookie("userToken", userToken, {
            // httpOnly: true,
            expires: new Date(Date.now() + 10000000000000),
          })
          .json({
            message: "Successful user Login",
            loggedInuser: {
              _id: user._id,
              userName: user.userName,
              email: user.email,
            },
          });
      }
    }
  } catch (err) {
    console.log("LOGIN error");
    res.status(400).json({ message: "Invalid Login" });
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "you logged out" });
};

const getLoggedInUser = async (req, res) => {
  try {
    const userPayload = jwt.verify(req.cookies.userToken, SECRET);
    console.log("verified user", userPayload);
    // const user = await User.findOne({ _id: userPayload._id });
    res.status(201).json(userPayload);
  } catch (err) {
    res.json(err);
  }
};
module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
};
