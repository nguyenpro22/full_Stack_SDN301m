const Error = require("../../constant/error/Error");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

const extractJwtStrategy = new JwtStrategy(
  {
    ...opts,
    passReqToCallback: true,
  },
  function (req, jwt_payload, done) {
    if (jwt_payload) {
      const isExpiredToken = Date.now() >= jwt_payload.expiredAt * 1000;

      if (isExpiredToken && req.path !== "/refresh-token") {
        return done(Error.SESSION_EXPIRED, false);
      } else {
        return done(null, jwt_payload);
      }
    } else {
      return done(null, false);
    }
  }
);

module.exports = {
  extractJwtStrategy,
};
