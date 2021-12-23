var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: { type: Number },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    console.log(password, this.password);
    var result = await bcrypt.compare(password, this.password);
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

var User = mongoose.model("User", userSchema);
module.exports = User;
