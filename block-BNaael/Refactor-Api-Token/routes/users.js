var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var User = require("../model/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    console.log(user);
    var token = await user.signToken();
    res.status(200).json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.status(200).json({ error: "email/password is required" });
  }

  try {
    var user = await User.findOne({ email });
    if (!user) {
      res.status(200).json({ error: "Invalid Email" });
    }

    var result = await user.verifyPassword("password");
    if (!result) {
      res.status(200).json({ error: "Invalid password" });
    }

    //generate token
    var token = await user.signToken();

    res.json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
