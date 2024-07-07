const { validationResult } = require("express-validator");
const { BrandModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const Error = require("../../constant/error/Error");

const handleUpdateBrandName = async (req, res, next) => {
  try {
    // Kiểm tra lỗi validation từ request
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return makeErrorResponse(res, Error.VALIDATION_ERROR);
    }

    // Cập nhật tên mới cho Brand
    const updatedBrand = await BrandModel.findByIdAndUpdate(
      req.params.id,
      { brandName: req.body.brandName },
      { new: true }
    );

    // Kiểm tra xem brand đã được cập nhật thành công hay không
    if (!updatedBrand) {
      return makeErrorResponse(res, Error.BAD_REQUEST);
    }

    return makeJsonResponse(res, {
      status: "ok",
      data: updatedBrand,
    });
  } catch (error) {
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleUpdateBrandName,
};
