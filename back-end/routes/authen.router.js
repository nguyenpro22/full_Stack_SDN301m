const express = require("express");
const router = express.Router();
const { AuthenController } = require("../controller");
const { HandleError, JwtAuthenticate } = require("../middleware");
const passport = require("passport");

router.post(
  "/login",
  passport.authenticate("local"),
  AuthenController.Post.handleUsernamePasswordLogin,
  HandleError.handleLoginError
);
router.post(
  "/refresh-token",
  JwtAuthenticate,
  AuthenController.Post.handleRefreshToken
);
module.exports = router;
