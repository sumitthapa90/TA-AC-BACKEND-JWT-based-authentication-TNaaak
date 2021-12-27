var express = require("express");
var User = require("../models/User");
var router = express.Router();

//Get Current User (Authenticated)

router.get("/", async (req, res, next) => {
  var id = req.user.userId;
  try {
    var user = await User.findById(id);
    res.status(200).json({ user: user.displayUser(id) });
  } catch (error) {
    next(error);
  }
});

//Update User (Authenticated)

router.put("/", async (req, res, next) => {
  var id = req.user.userId;
  try {
    var user = await User.findByIdAndUpdate(id, req.body.user, { new: true });
    res.status(200).json({ user: user.displayUser(id) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
