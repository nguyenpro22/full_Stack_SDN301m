var express = require("express");
const { authorizeUser } = require("../middleware");
const { UserModel } = require("../models");
var router = express.Router();

/* GET home page. */
router.get(
  "/",
  authorizeUser.authenticateSession,
  authorizeUser.authorizeAdminRoleSession("ADMIN"),
  async function (req, res, next) {
    res.render("admin/dashboard", {
      userContext: req.userContext,
    });
  }
);
module.exports = router;
