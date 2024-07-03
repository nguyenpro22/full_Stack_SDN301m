const Error = require("../../constant/error/Error");
const { BrandModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");

const handleGetBrandById = async function (req, res, next) {
  try {
    const brandId = req.params.id;
    const brand = await BrandModel.findById(brandId);
    if (brand) {
      makeJsonResponse(res, {
        status: 200,
        data: {
          brandName: brand.brandName,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt,
        },
      });
    } else {
      makeJsonResponse(res, {});
    }
  } catch (e) {
    makeErrorResponse(res, Error.UNKNOWN);
  }
};

const handleGetAllBrand = async (req, res) => {
  try {
    const listBrand = await BrandModel.find();
    const listBrandDTO = listBrand.map((brand) => ({
      brandName: brand.brandName,
      id: brand._id,
    }));
    makeJsonResponse(res, {
      status: 200,
      data: listBrandDTO,
    });
  } catch (error) {
    makeErrorResponse(res, Error.UNKNOWN);
  }
};
module.exports = {
  handleGetBrandById,
  handleGetAllBrand,
};
