var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const DBConfig = require("./configs/mongodb.config.js");
var app = express();
const { DBConnect } = require("./utils/DBUtils");
const passport = require("passport");
const fs = require("fs");

const { PassportService } = require("./services/index.js");
const { makeErrorResponse } = require("./utils/http.utils.js");
const flash = require("connect-flash");
const session = require("express-session");
const adminRouter = require("./routes/admin.router.js");
const memberRouter = require("./routes/member.router.js");
const authenRouter = require("./routes/authen.router.js");
const brandRouter = require("./routes/brand.router.js");
const watchRouter = require("./routes/watch.router.js");
const CommentRouter = require("./routes/comment.router.js");

// view engine setupk
require("./services/passport/local-session.js")();
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.userContext = req.flash("userContext");
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/admin", adminRouter);
app.use("/api/member", memberRouter);
app.use("/api/authen", authenRouter);
app.use("/api/brand", brandRouter);
app.use("/api/watch", watchRouter);
app.use("/api/comment", CommentRouter);
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

passport.use(PassportService.JwtStrategy.extractJwtStrategy);
passport.use(PassportService.LocalStrategy);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render("error/error-404");
});
// test
// error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  if (err) {
    if (err.status == 401) {
      makeErrorResponse(res, {
        status: 401,
        message: err.message ? err.message : "UNAUTHENTICATE",
      });
      return;
    }
    makeErrorResponse(res, err);
    return;
  }
  makeErrorResponse(res, {
    status: 500,
    message: "SOMETHING_WENT_WRONG",
  });
});
const url = DBConfig.url;
const options = DBConfig.options;

DBConnect(url, options);
module.exports = app;
