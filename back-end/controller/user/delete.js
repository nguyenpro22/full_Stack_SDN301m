const Error = require("../../constant/error/Error");
const { BrandModel, MemberModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");

const handleDeleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await MemberModel.findById(userId);
    if (!user) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    await MemberModel.findByIdAndDelete(userId);

    return makeJsonResponse(res, {
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    if (error.kind === "ObjectId") {
      // If the error is due to an invalid ObjectId, send a 400 response
      return makeErrorResponse(res, Error.BAD_REQUEST);
    }

    // For any other errors, send a 500 response
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleDeleteUser,
};
