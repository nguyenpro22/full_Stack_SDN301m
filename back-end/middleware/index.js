const userValidator = require("./validators/user");
const commentValidator = require("./validators/comment");
const HandleError = require("./error");
const authorizeUser = require("./authorize");
const passport = require("passport");
const brandValidator = require("./validators/brand");
const watchValidator = require("./validators/watch");

const JwtAuthenticate = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});
module.exports = {
  userValidator,
  commentValidator,
  HandleError,
  authorizeUser,
  JwtAuthenticate,
  brandValidator,
  watchValidator,
};
