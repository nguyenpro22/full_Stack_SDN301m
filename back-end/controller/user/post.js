const { validationResult } = require("express-validator");
const { MemberModel } = require("../../models");
const bcrypt = require("bcrypt");
const Error = require("../../constant/error/Error");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");

const handleSignUp = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return makeErrorResponse(res, Error.VALIDATION_ERROR);
    }

    const existingUser = await MemberModel.findOne({
      membername: req.body.username,
    });
    if (existingUser) {
      return makeErrorResponse(res, Error.ALREADY_EXIST);
    }

    // Validation passed, proceed to create new user
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      membername: req.body.username,
      password: hashPassword,
      name: req.body.name,
      avatar: req.body.avatar,
      YoB: req.body.YoB,
      isAdmin: false,
      interests: req.body.interests,
      occupations: req.body.occupations,
    };

    const newUser = new MemberModel(user);
    await newUser.save();

    return makeJsonResponse(res, {
      status: 200,
      message: "User created successfully",
    });
  } catch (error) {
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleSignUp,
};
