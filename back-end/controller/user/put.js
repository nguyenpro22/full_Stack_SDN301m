const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Error = require("../../constant/error/Error");
const { MemberModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");

const handleUpdateUserProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return makeErrorResponse(res, Error.VALIDATION_ERROR);
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updateContent = {
      password: hashedPassword,
      name: req.body.name,
      avatar: req.body.avatar,
      YoB: req.body.YoB,
    };

    const result = await MemberModel.updateOne(
      { _id: req.user.id },
      updateContent
    );
    if (result.nModified === 0) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    return makeJsonResponse(res, {
      status: 201,
      message: "User profile updated successfully",
    });
  } catch (error) {
    return makeErrorResponse(res, {
      status: 500,
      message: error.message || Error.UNKNOWN.message,
    });
  }
};

const handleAdminUpdateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return makeErrorResponse(res, Error.VALIDATION_ERROR);
  }

  try {
    const userId = req.params.id;
    const user = req.body;

    const updateContent = {
      isAdmin: user.isAdmin,
    };
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      updateContent.password = hashedPassword;
    }

    const result = await MemberModel.updateOne({ _id: userId }, updateContent);
    if (result.nModified === 0) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    return makeJsonResponse(res, {
      status: 201,
      message: "User updated successfully",
    });
  } catch (error) {
    return makeErrorResponse(res, {
      status: 500,
      message: error.message || Error.UNKNOWN.message,
    });
  }
};

module.exports = {
  handleUpdateUserProfile,
  handleAdminUpdateUser,
};
