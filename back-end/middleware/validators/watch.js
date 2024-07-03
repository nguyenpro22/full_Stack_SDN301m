const { body, param } = require("express-validator");
const { COMMON_CONFIG } = require("../../constant");
const { BrandModel } = require("../../models");
const watchValidator = () => {
  return [
    body("watchName")
      .optional()
      .isLength({
        min: COMMON_CONFIG.Watch.watchName.minLength,
        max: COMMON_CONFIG.Watch.watchName.maxLength,
      })
      .withMessage(COMMON_CONFIG.Watch.watchName.message),
    body("price")
      .optional()
      .isNumeric()
      .isFloat({
        min: COMMON_CONFIG.Watch.price.minValue,
        max: COMMON_CONFIG.Watch.price.maxValue,
      })
      .withMessage(COMMON_CONFIG.Watch.price.message),
    body("description")
      .optional()
      .isLength({
        max: COMMON_CONFIG.Watch.description.maxLength,
      })
      .withMessage(COMMON_CONFIG.Watch.description.message),

    body("brand")
      .optional()
      .custom(async (value) => {
        const brand = await BrandModel.findById(value);
        if (!brand) {
          return Promise.reject();
        }
      })
      .withMessage("Invalid brand ID"),
  ];
};

module.exports = {
  watchValidator,
};
