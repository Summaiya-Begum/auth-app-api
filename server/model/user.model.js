const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    profilePicture:{type: String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZpoQR2IHRT5JlhmLuP_Hy1jK01uKZyAS3FjJ613JpA&s"},
    gender: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel = new mongoose.model("User", UserSchema);
module.exports = userModel;

