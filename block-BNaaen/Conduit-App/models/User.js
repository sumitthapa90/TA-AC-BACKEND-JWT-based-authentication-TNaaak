var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String },
    following: { type: Boolean },
    followingList: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followersList: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

//hashing password
userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//compare password
userSchema.methods.verifyPassword = async function (password) {
  try {
    var result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    next(error);
  }
};

//jwt token

userSchema.methods.signToken = async function () {
  var payload = {
    userId: this.id,
    email: this.email,
    username: this.username,
    name: this.name,
  };
  try {
    var token = await jwt.sign(payload, process.env.SECRET);
    return token;
  } catch (error) {
    next(error);
  }
};

// method to make userJson data

userSchema.methods.userJSON = async function (token) {
  return {
    name: this.name,
    username: this.username,
    email: this.email,
    bio: this.bio,
    avatar: this.avatar,
    token: token,
  };
};

// Method to display User

userSchema.methods.displayUser = function (id = null) {
  return {
    name: this.name,
    username: this.username,
    bio: this.bio,
    avatar: this.avatar,
    following: id ? this.followersList.includes(id) : false,
  };
};

var User = mongoose.model("User", userSchema);

module.exports = User;
