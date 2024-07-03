const { validationResult } = require("express-validator");
const { CommentModel, WatchModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const Error = require("../../constant/error/Error");

const handleDeleteComment = async (req, res) => {
  const { commentId, watchId } = req.params;

  try {
    // Find the comment by ID
    const comment = await CommentModel.findByIdAndDelete(commentId);
    if (!comment) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    // Remove the comment ID from the watch's comments array
    const watch = await WatchModel.findById(watchId);
    watch.comments.remove(commentId);
    await watch.save();
    // Respond with success message
    return makeJsonResponse(res, {
      status: 200,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleDeleteComment,
};

/*
const { CommentModel, WatchModel } = require("../../models");
const { makeErrorResponse, makeJsonResponse } = require("../../utils/http.utils");

const handleDeleteComment = async (req, res) => {
  const { commentId, watchId } = req.params;

  try {
    // Tìm comment theo ID
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return makeErrorResponse(res, {
        status: 404,
        message: "Comment not found",
      });
    }

    // Kiểm tra quyền xóa comment
    if (comment.author.toString() !== req.user.id) {
      return makeErrorResponse(res, {
        status: 403,
        message: "You are not authorized to delete this comment",
      });
    }

    // Xóa comment
    await comment.deleteOne();

    // Xóa comment ID khỏi mảng comments của watch
    const watch = await WatchModel.findByIdAndUpdate(
      watchId,
      { $pull: { comments: commentId } },
      { new: true }
    );

    if (!watch) {
      return makeErrorResponse(res, {
        status: 404,
        message: "Watch not found",
      });
    }

    // Phản hồi thành công
    return makeJsonResponse(res, {
      status: 200,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return makeErrorResponse(res, {
      status: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  handleDeleteComment,
};
 */
