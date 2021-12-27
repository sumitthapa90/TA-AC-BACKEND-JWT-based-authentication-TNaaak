var express = require("express");
var router = express.Router();
var User = require("../models/User");

//GET /api/profiles/:username

router.get("/:username", async (req, res, next) => {
  var username = req.params.usename;

  try {
    var profileData = await User.findOne({ username });
    if (!profile) {
      res.status(200).json({ error: "invalid profile name" });
    }
    return res.json({ profileData });
  } catch (error) {
    next(error);
  }
});

//POST /api/profiles/:username/follow

router.post("/:username/follow", async (req, res, next) => {
  var username = req.params.username;
  try {
    var user1 = await User.findOne({ username });
    if (!user1) {
      return res.status(400).json({ error: "No such user exists" });
    }

    var user2 = await User.findById(id);
    if (
      user1.username !== user2.username &&
      !user2.followingList.includes(user1.id)
    ) {
      user2 = await User.findByIdAndUpdate(
        user2.id,
        {
          $push: { followingList: user1.id },
        },
        { new: true }
      );
      user1 = await User.findByIdAndUpdate(
        user1.id,
        {
          $push: { followersList: user2.id },
        },
        { new: true }
      );
      return res.status(201).json({ user: user1.displayUser(user2.id) });
    } else {
      return res
        .status(400)
        .json({ errors: { body: "You are already following the person" } });
    }
  } catch (error) {
    next(error);
  }
});

//Unfollow User (Authenticated)
router.delete("/:username/follow", async (req, res, next) => {
  var username = req.params.username;
  try {
    var user1 = await User.findOne({ username });
    if (!user1) {
      return res.status(400).json({ errors: "No such user exists" });
    }
    var user2 = await User.findById(req.user.userId);
    if (user2.followingList.includes(user1.id)) {
      user2 = await User.findByIdAndUpdate(
        user2.id,
        {
          $pull: { followingList: user1.id },
        },
        { new: true }
      );
      user1 = await User.findByIdAndUpdate(
        user1.id,
        {
          $pull: { followersList: user2.id },
        },
        { new: true }
      );
      return res.status(200).json({ user: user1.displayUser(user2.id) });
    } else {
      return res
        .status(400)
        .json({ errors: { body: "You are not following this person" } });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
