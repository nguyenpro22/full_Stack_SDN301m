const LocalStrategy = require("passport-local").Strategy;
const Error = require("../../constant/error/Error");
const { MemberModel } = require("../../models");
const bcrypt = require("bcrypt");
const { makeErrorResponse } = require("../../utils/http.utils");

module.exports = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await MemberModel.findOne({ membername: username });
    console.log(user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(Error.AUTHENTICATE_FAILED, false);
      }
    } else {
      return done(Error.AUTHENTICATE_FAILED, false);
    }
  } catch (error) {
    return done(Error.AUTHENTICATE_FAILED, false);
  }
});
