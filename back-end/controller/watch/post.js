const { validationResult } = require("express-validator");
const { WatchModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const Error = require("../../constant/error/Error");

const handleAddNewWatch = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return makeErrorResponse(res, Error.VALIDATION_ERROR);
    }

    const existingWatch = await WatchModel.findOne({
      watchName: req.body.watchName,
    });
    if (existingWatch) {
      return makeErrorResponse(res, Error.ALREADY_EXIST);
    }

    const watch = new WatchModel({
      watchName: req.body.watchName,
      image: req.body.image,
      price: req.body.price,
      Automatic: req.body.Automatic,
      watchDescription: req.body.watchDescription,
      brand: req.body.brand,
    });

    await watch.save();

    makeJsonResponse(res, { status: 200, message: "Watch added successfully" });
  } catch (error) {
    console.error(error);
    makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleAddNewWatch,
};
