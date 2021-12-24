var express = require("express");
var router = express.Router();
var User = require("../model/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ msg: "welcome" });
});

router.post("/register", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    console.log(user);
    var token = await user.signToken();
    res.status(200).json({ user: user.userJSON(token) });
  } catch (error) {
    next();
  }
});

router.post("/login", async (req, res, next) => {
  var { email, password } = req.body;

  if (!email || !password) {
    res.status(200).json({ error: "Email/password id required" });
  }

  try {
    var user = await User.findOne({ email });
    if (!user) {
      res.status(200).json({ error: "Invalid Email" });
    }
    var result = await user.verifyPassword(password);
    console.log(result);
    if (!result) {
      res.status(200).json({ error: "Incorect password" });
    }

    //generate token
    var token = await user.signToken();
    console.log(token);
    res.json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
