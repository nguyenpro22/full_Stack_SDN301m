const { body, param } = require("express-validator");
const { COMMON_CONFIG } = require("../../constant");
const brandValidator = () => {
  return [
    body("brandName")
      .isString()
      .notEmpty()
      .isLength({
        min: COMMON_CONFIG.Brand.name.minLength,
        max: COMMON_CONFIG.Brand.name.maxLength,
      })
      .withMessage(COMMON_CONFIG.Brand.name.message),
  ];
};

module.exports = {
  brandValidator,
};
