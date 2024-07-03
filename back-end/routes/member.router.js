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
  authorizeUser.authorizeAdminRole("ADMIN"),
  Controller.MemberController.Get.handleAdminGetUserById
);

router.post(
  "/",
  userSignUpValidator(),
  Controller.MemberController.Post.handleSignUp
);

router.put(
  "/profile",
  JwtAuthenticate,
  authorizeUser.authenticateSession,
  userUpdateProfileValidator(),
  Controller.MemberController.Put.handleUpdateUserProfile
);
router.put(
  "/:id",
  JwtAuthenticate,
  userUpdateValidator(),
  Controller.MemberController.Put.handleAdminUpdateUser
);

router.delete(
  "/:id",
  JwtAuthenticate,
  authorizeUser.authorizeAdminRole(),
  Controller.MemberController.Delete.handleDeleteUser
);

module.exports = router;
