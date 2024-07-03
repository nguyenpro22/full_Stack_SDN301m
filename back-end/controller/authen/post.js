const passport = require("passport");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const {
  RES_ERROR,
  JWT_EXPIRED_TIME,
  JWT_REFRESH_TOKEN_EXPIRED_TIME,
} = require("../../constant");
const jwt = require("jsonwebtoken");
const { createToken, extractRefreshToken } = require("../../utils/jwt.utils");
const Error = require("../../constant/error/Error");
require("dotenv").config();
const handleUsernamePasswordLogin = async (req, res, next) => {
  const token = createToken(
    req.user,
    JWT_EXPIRED_TIME,
    process.env.JWT_SECRET_KEY
  );
  console.log(req.user);
  try {
    res.cookie("jwt", token, {
      maxAge: 1,
    });

    makeJsonResponse(res, { status: 200, token: token });
  } catch (e) {
    makeErrorResponse(res, Error.UNKNOWN);
  }
};

const handleRefreshToken = async (req, res, next) => {
  if (req.user) {
    const refreshToken = req.cookies.jwt;
    try {
      const decodeToken = extractRefreshToken(
        refreshToken,
        process.env.JWT_SECRET_KEY
      );
      if (!decodeToken) {
        makeErrorResponse(res, Error.FORBIDDEN);
      } else if (decodeToken.expiredAt <= Date.now()) {
        makeErrorResponse(res, Error.SESSION_EXPIRED);
      } else {
        const token = createToken(
          req.user,
          JWT_EXPIRED_TIME,
          process.env.JWT_SECRET_KEY
        );
        makeJsonResponse(
          res,
          {
            ok: "ok",
            token: token,
          },
          200
        );
      }
    } catch (error) {
      makeErrorResponse(res, Error.UNKNOWN);
    }
  } else {
    makeErrorResponse(res, Error.UNKNOWN);
  }
};
const handleSetTokenToCookies = async (req, res) => {
  const token = createToken(
    req.user,
    JWT_EXPIRED_TIME,
    process.env.JWT_SECRET_KEY
  );
  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000 * 365,
  });
  res.cookie("userID", req.user.id, {
    maxAge: 24 * 60 * 60 * 1000 * 365,
  });
  res.redirect("/");
};
module.exports = {
  handleUsernamePasswordLogin,
  handleRefreshToken,
  handleSetTokenToCookies,
};
