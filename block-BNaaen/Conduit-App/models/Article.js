var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, slug: "title", unique: true },
    description: { type: String },
    body: { type: String },
    tagList: [{ type: String }],
    favorited: { type: Boolean },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favoritesCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    favoriteList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;
