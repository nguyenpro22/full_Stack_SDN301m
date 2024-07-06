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
    const updateContent = {
      name: req.body.name,
      avatar: req.body.avatar,
      YoB: req.body.YoB,
      interests: req.body.interests,
      occupations: req.body.occupations,
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

const handleUpdateUserPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return makeErrorResponse(res, Error.VALIDATION_ERROR);
  }

  try {
    const { oldPassword, newPassword } = req.body;
    const user = await MemberModel.findById(req.user.id);

    if (!user) {
      return makeErrorResponse(res, Error.UN_AUTHORIZATION);
    }

    // So sánh mật khẩu cũ với mật khẩu đã băm lưu trữ
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return makeErrorResponse(res, Error.BAD_REQUEST);
    }

    // Hash mật khẩu mới
    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới
    user.password = hashNewPassword;
    await user.save();

    return makeJsonResponse(res, {
      status: 201,
      message: "Password updated successfully",
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
  handleUpdateUserPassword,
};
