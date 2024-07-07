const Error = require("../../constant/error/Error");
const { MemberModel } = require("../../models");
const { makeErrorResponse } = require("../../utils/http.utils");

const authorizeAdminRole = () => {
  return async (req, res, next) => {
    try {
      const user = await MemberModel.findOne({ _id: req.user.id });

      if (user) {
        if (user.isAdmin === true) {
          return next();
        } else {
          return next(Error.FORBIDDEN);
        }
      } else {
        return next(Error.FORBIDDEN);
      }
    } catch (err) {
      console.log(err);
      return next(Error.UNKNOWN);
    }
  };
};

const authorizeAdminRoleSession = () => {
  return async (req, res, next) => {
    const user = await MemberModel.findOne({ _id: req.user });
    if (user.isAdmin === true) {
      next();
    } else {
      req.flash("error", "You are not allowed to take this page.");
      res.redirect("login");
    }
  };
};
const authenticateSession = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const user = await MemberModel.findOne({ _id: req.user.id });

      if (!user) {
        req.logout((err) => {
          if (err) {
            return next(err);
          }
          return makeErrorResponse(res, Error.SESSION_EXPIRED);
        });
      } else {
        req.userContext = { id: user._id, membername: user.membername };
        next();
      }
    } else {
      return makeErrorResponse(res, Error.UN_AUTHORIZATION);
    }
  } catch (error) {
    console.error("Error in authenticateSession middleware:", error);
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  authorizeAdminRole,
  authenticateSession,
  authorizeAdminRoleSession,
};
