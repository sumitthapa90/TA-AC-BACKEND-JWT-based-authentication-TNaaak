var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */

router.post("/register", async (req, res, next) => {
  req.body.user.following = false;
  try {
    var user = await User.create(req.body.user);
    var token = await user.signToken();
    res.status(201).json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

//login

router.post("/login", async (req, res, next) => {
  var { email, password } = req.body.user;
  if (!email || !password) {
    res.status(400).json({ error: "Email/Password is Required !!!" });
  }

  try {
    var user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Email is Required !!!" });
    }

    var result = await verifyPassword("password");
    if (!result) {
      res.status(400).json({ error: "Password is Required !!!" });
    }

    //generate token

    var token = await user.signToken();
    return res.status(201).json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});





module.exports = router;
