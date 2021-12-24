var mongoose = require("mongoose");
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: Number },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    try {
      var hashedPwd = await bcrypt.hash(this.password, 10);
      this.password = hashedPwd;
    } catch (error) {
      return error;
    }
    return next();
  } else {
    return next();
  }
});


userSchema.methods.verifyPassword = async function (password) {
    try {
      var result = await bcrypt.compare(password, this.password);
      return result;
    } catch (error) {
      return error;
    }
  };

  userSchema.methods.signToken = async function () {
    var payload = { userId: this.id, email: this.email };
    try {
      var token = await jwt.sign(payload, process.env.SECRET);
      return token;
    } catch (error) {
      return error;
    }
  };
  
  userSchema.methods.userJSON = function (token) {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      token: token,
    };
  };

var User = mongoose.model("User", userSchema);
module.exports = User;
