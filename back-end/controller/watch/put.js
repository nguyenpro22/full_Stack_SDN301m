const { validationResult } = require("express-validator");
const { WatchModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const Error = require("../../constant/error/Error");

const handleUpdateWatchById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return makeErrorResponse(res, Error.VALIDATION_ERROR);
    }

    const watchId = req.params.id;

    const updatedWatch = await WatchModel.findByIdAndUpdate(
      watchId,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedWatch) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    return makeJsonResponse(res, {
      status: 200,
      message: "Watch updated successfully",
      data: updatedWatch,
    });
  } catch (error) {
    console.error(error);
    return makeErrorResponse(res, {
      status: 500,
      message: error.message || Error.UNKNOWN.message,
    });
  }
};

module.exports = {
  handleUpdateWatchById,
};
