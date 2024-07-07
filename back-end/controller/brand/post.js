const { validationResult } = require("express-validator");
const { BrandModel } = require("../../models");
const bcrypt = require("bcrypt");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const Error = require("../../constant/error/Error");
const handleAddNewBrand = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return makeErrorResponse(res, Error.VALIDATION_ERROR);
    }

    // Kiểm tra xem brand đã tồn tại hay chưa
    const existingBrand = await BrandModel.findOne({
      brandName: req.body.brandName,
    });
    if (existingBrand) {
      return makeErrorResponse(res, Error.ALREADY_EXIST);
    }

    // Nếu không có lỗi và brand chưa tồn tại, tiến hành tạo mới brand
    const newBrand = new BrandModel({
      brandName: req.body.brandName,
    });
    await newBrand.save();

    return makeJsonResponse(res, {
      status: "ok",
      data: newBrand,
    });
  } catch (error) {
    console.log(error);
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleAddNewBrand,
};
