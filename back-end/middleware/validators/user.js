const { body } = require("express-validator");
const { COMMON_CONFIG } = require("../../constant");

// Middleware cho đăng ký thành viên mới
const userSignUpValidator = () => {
  return [
    body("username")
      .isLength({
        min: COMMON_CONFIG.Member.membername.minLength,
        max: COMMON_CONFIG.Member.membername.maxLength,
      })
      .withMessage(COMMON_CONFIG.Member.membername.message),
    body("password")
      .isLength({
        min: COMMON_CONFIG.Member.password.minLength,
        max: COMMON_CONFIG.Member.password.maxLength,
      })
      .withMessage(COMMON_CONFIG.Member.password.message)
      .matches(COMMON_CONFIG.Member.password.regex)
      .withMessage(COMMON_CONFIG.Member.password.messageRegex),
    body("name")
      .isLength({
        min: COMMON_CONFIG.Member.name.minLength,
        max: COMMON_CONFIG.Member.name.maxLength,
      })
      .withMessage(COMMON_CONFIG.Member.name.message),
    body("avatar").isURL().withMessage(COMMON_CONFIG.Member.avatar.message),
    body("YoB")
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage(COMMON_CONFIG.Member.YoB.message),
  ];
};

const userUpdateProfileValidator = () => {
  return [
    body("password")
      .optional()
      .isLength({
        min: COMMON_CONFIG.Member.password.minLength,
        max: COMMON_CONFIG.Member.password.maxLength,
      })
      .withMessage(COMMON_CONFIG.Member.password.message)
      .matches(COMMON_CONFIG.Member.password.regex)
      .withMessage(COMMON_CONFIG.Member.password.messageRegex),
    body("name")
      .optional()
      .isLength({
        min: COMMON_CONFIG.Member.name.minLength,
        max: COMMON_CONFIG.Member.name.maxLength,
      })
      .withMessage(COMMON_CONFIG.Member.name.message),
    body("YoB")
      .optional()
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage(COMMON_CONFIG.Member.YoB.message),
    body("avatar")
      .optional()
      .isURL()
      .withMessage(COMMON_CONFIG.Member.avatar.message),
  ];
};

// Middleware cho admin cập nhật thông tin người dùng
const userUpdateValidator = () => {
  return [
    body("password")
      .optional()
      .isLength({
        min: COMMON_CONFIG.Member.password.minLength,
        max: COMMON_CONFIG.Member.password.maxLength,
      })
      .withMessage(COMMON_CONFIG.Member.password.message)
      .matches(COMMON_CONFIG.Member.password.regex)
      .withMessage(COMMON_CONFIG.Member.password.messageRegex),
    body("isAdmin").isBoolean(),
  ];
};

module.exports = {
  userSignUpValidator,
  userUpdateProfileValidator,
  userUpdateValidator,
};
