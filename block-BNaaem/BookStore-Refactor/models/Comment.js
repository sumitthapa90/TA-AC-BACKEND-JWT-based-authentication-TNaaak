var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String },
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  },
  { timestamps: true }
);

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
