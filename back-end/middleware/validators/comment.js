const { body } = require("express-validator");
const { COMMON_CONFIG } = require("../../constant");
const commentValidator = () => {
  return [
    body("rating")
      .isInt({
        min: COMMON_CONFIG.Comment.rating.min,
        max: COMMON_CONFIG.Comment.rating.max,
      })
      .withMessage(COMMON_CONFIG.Comment.rating.message),
    body("content")
      .isString()
      .isLength({
        min: COMMON_CONFIG.Comment.content.minLength,
        max: COMMON_CONFIG.Comment.content.maxLength,
      })
      .withMessage(COMMON_CONFIG.Comment.content.message),
  ];
};

module.exports = {
  commentValidator,
};
