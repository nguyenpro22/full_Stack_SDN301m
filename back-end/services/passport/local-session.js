const passport = require("passport");
const bcrypt = require("bcrypt");
const { MemberModel } = require("../../models");
const LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
  passport.use(
    "local-session",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, membername, password, done) => {
        try {
          const user = await MemberModel.findOne({ membername: membername });
          if (!user) {
            req.flash("username", membername);
            req.flash("password", password);
            return done(null, false, {
              message: "Tên đăng nhập này không tồn tại",
            });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            req.flash("username", membername);
            req.flash("password", password);
            return done(null, false, { message: "Mật khẩu không đúng" });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      done(null, user.id);
    });
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await MemberModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
