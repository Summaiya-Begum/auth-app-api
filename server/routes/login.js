const { Router } = require("express");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRouter = Router();
require("dotenv").config();

loginRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Internal server error" });
        }
        if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
          return res.json({ token,userId:user._id });
        } else {
          return res.status(401).json({ msg: "Invalid credentials" });
        }
      });
    } else {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (err) {
    console.error("An error occurred:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
});


module.exports = loginRouter;
