const express = require("express");
const router = express.Router();
const { MemberModel } = require("../models/index");
const passport = require("passport");
const { makeErrorResponse } = require("../utils/http.utils");
const Error = require("../constant/error/Error");
const Controller = require("../controller");
const { JwtAuthenticate, authorizeUser } = require("../middleware/");
const { Member } = require("../constant/common");
const {
  userUpdateProfileValidator,
  userUpdateValidator,
} = require("../middleware/validators/user");
const { userSignUpValidator } = require("../middleware/").userValidator;
/* GET users listing. */

router.get(
  "/",
  JwtAuthenticate,
  authorizeUser.authorizeAdminRole("ADMIN"),
  Controller.MemberController.Get.handleGetAllUser
);
router.get(
  "/:id",
  JwtAuthenticate,
  authorizeUser.authenticateSession,
  Controller.MemberController.Get.handleGetUserById
);

router.post(
  "/",
  userSignUpValidator(),
  Controller.MemberController.Post.handleSignUp
);

router.post("/rs-pwd", Controller.MemberController.Post.handleSendEmail);

router.put(
  "/profile",
  JwtAuthenticate,
  authorizeUser.authenticateSession,
  userUpdateProfileValidator(),
  Controller.MemberController.Put.handleUpdateUserProfile
);

router.put(
  "/profile/pwd",
  JwtAuthenticate,
  authorizeUser.authenticateSession,
  Controller.MemberController.Put.handleUpdateUserPassword
);

router.put(
  "/:id",
  JwtAuthenticate,
  userUpdateValidator(),
  authorizeUser.authorizeAdminRole(),
  Controller.MemberController.Put.handleAdminUpdateUser
);

router.delete(
  "/:id",
  JwtAuthenticate,
  authorizeUser.authorizeAdminRole(),
  Controller.MemberController.Delete.handleDeleteUser
);

module.exports = router;
