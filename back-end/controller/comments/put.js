const { validationResult } = require("express-validator");
const { CommentModel, WatchModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const Error = require("../../constant/error/Error");

const handleUpdateComment = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return makeErrorResponse(res, Error.BAD_REQUEST);
  }

  const { rating, content } = req.body;
  const userID = req.user.id;
  const watchID = req.params.watchId;

  try {
    // Find the watch by ID
    const watch = await WatchModel.findById(watchID);
    if (!watch) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    // Find the user's comment within the watch's comments array
    const comment = watch.comments.find((comment) =>
      comment.author.equals(userID)
    );
    if (!comment) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    // Update the comment fields
    comment.rating = rating;
    comment.content = content;
    comment.updatedAt = new Date();

    // Update the comment in the database
    await CommentModel.findByIdAndUpdate(comment._id, {
      rating: comment.rating,
      content: comment.content,
      updatedAt: comment.updatedAt,
    });

    // Save the updated watch document
    await watch.save();

    return makeJsonResponse(res, {
      status: 200,
      message: "Update comment successfully",
      data: comment,
    });
  } catch (error) {
    console.error(error);
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleUpdateComment,
};
