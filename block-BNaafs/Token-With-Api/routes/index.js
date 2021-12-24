var express = require("express");
var router = express.Router();
var auth = require("../middlewere/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ msg: "welcome" });
});

router.get("/protected", auth.verifyToken, (req, res, next) => {
  res.json({ msg: "Welcom to dashboard" });
});

module.exports = router;
