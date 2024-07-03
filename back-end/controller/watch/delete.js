const { WatchModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const Error = require("../../constant/error/Error");

const handleDeleteWatchById = async (req, res, next) => {
  try {
    const watchId = req.params.id;

    const deletedWatch = await WatchModel.findByIdAndDelete(watchId);

    if (!deletedWatch) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    makeJsonResponse(res, { message: "Watch deleted successfully" });
  } catch (error) {
    console.error(error);
    makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleDeleteWatchById,
};
