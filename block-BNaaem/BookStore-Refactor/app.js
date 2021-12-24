var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/BookStore-Refactor", (err) => {
  console.log(err ? err : "Connected");
});

var version1indexRouter = require("./routes/version1indexRouter");
var version1usersRouter = require("./routes/version1usersRouter");
var version1booksRouter = require("./routes/version1booksRouter");
var version1commentsRouter = require("./routes/version1commentsRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/version1", version1indexRouter);
app.use("/api/version1/users", version1usersRouter);
app.use("/api/version1/books", version1booksRouter);
app.use("/api/version1/comments", version1commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
