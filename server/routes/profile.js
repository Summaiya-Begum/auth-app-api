const { Router } = require("express");
const userModel = require("../model/user.model");
const authentication  = require("../middleware/authentication");

const profileRouter = Router();

profileRouter.get("/", async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { name, phoneNumber, gender, profile } = user;
    const profileData = {
      name,
      phoneNumber,
      gender,
      profile,
    };

    return res.json(profileData);
  } catch (err) {
    console.error("An error occurred:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

profileRouter.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();

    return res.json({
      message: "all users",
      users,
    });
  } catch (err) {
    console.error("An error occurred:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

profileRouter.patch("/update", authentication, async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { name, phoneNumber, gender, profile, email } = req.body;
    const profileData = {
      email,
      name,
      phoneNumber,
      gender,
      profile,
    };
    const update = await userModel.findOneAndUpdate(
      { _id: userId },
      profileData
    );

    return res.json("profile updated");
  } catch (err) {
    console.error("An error occurred:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = profileRouter;