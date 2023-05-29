const { Router } = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");
const signupRouter = Router();
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where files should be stored
  },
  filename: function (req, file, cb) {
    // console.log(file,"fileeee")
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage });

signupRouter.post(
  "/register",
  upload.single("profilePicture"),
  async (req, res) => {
    const { password, email, name, phoneNumber, gender, profilePicture } =
      req.body;

    try {
      let user = await userModel.findOne({ email });
      if (!user) {
        // if (!emailRegex.test(email)) {
        //   return res.status(400).json({ msg: "Invalid email format" });
        // }
        console.log(req.body);
        bcrypt.hash(password, 6, async function (err, hash) {
          if (err) {
            console.error("An error occurred while hashing the password:", err);
            return res.status(500).json({ msg: "Internal server error" });
          }

          const newUser = new userModel({
            name,
            email,
            password: hash,
            phoneNumber,
            gender,
            profilePicture,
          });

          if (req.file) {
            newUser.profilePicture = req.file.originalname; // Set the profile picture if a file is uploaded
          }

          await newUser.save();

          return res.json({ msg: "User sign up successful" });
        });
      } else {
        return res.json({ msg: "User already exists" });
      }
    } catch (err) {
      console.error("An error occurred:", err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
);



module.exports = signupRouter;
