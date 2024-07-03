const Error = require("../../constant/error/Error");
const { BrandModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");

const handleDeleteBrandById = async (req, res, next) => {
  try {
    // Check if the brand exists
    const brand = await BrandModel.findById(req.params.id);
    if (!brand) {
      return makeErrorResponse(res, Error.BAD_REQUEST);
    }

    // If the brand exists, proceed to delete it
    await BrandModel.findByIdAndDelete(req.params.id);

    // Return success response
    return makeJsonResponse(res, {
      status: "ok",
      message: "Brand deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleDeleteBrandById,
};
