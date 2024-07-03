var express = require("express");
const { loginController, homeController } = require("../controller/page");
var router = express.Router();
const passport = require("passport");
const { AuthenController } = require("../controller");
const cookieParser = require("cookie-parser");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("user/index", { title: "Express" });
});
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.redirect("/error/error-500");
    }
    res.redirect("/login");
  });
});

router
  .route("/login")
  .get(loginController.getLoginPage)
  .post(
    passport.authenticate("local-session", {
      failureRedirect: "login",
      failureFlash: true,
      failureFlash: "Invalid username or password.",
    }),
    AuthenController.Post.handleSetTokenToCookies
  );
module.exports = router;
