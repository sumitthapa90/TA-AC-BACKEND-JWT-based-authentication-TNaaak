var express = require("express");

var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    var allTags = await Article.distinct("tagList");
    res.status(200).json({ allTags });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
