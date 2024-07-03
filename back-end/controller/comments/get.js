const { param } = require("express-validator");
const { CommentModel, WatchModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const Error = require("../../constant/error/Error");

const getAllCommentsByWatchesId = async (req, res) => {
  const { watchId } = req.params;

  try {
    const watch = await WatchModel.findById(watchId);
    console.log(watch);
    const comments = watch.comments;
    const listCommentsDTO = comments.map((comment) => ({
      rating: comment.rating,
      content: comment.content,
      author: comment.author,
      id: comment._id,
    }));
    return makeJsonResponse(res, {
      status: 200,
      data: listCommentsDTO,
    });
  } catch (error) {
    console.error(error);
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

const getCommentById = async (req, res, next) => {
  const { watchId, commentId } = req.params;
  try {
    const comment = await CommentModel.findById(commentId);
    return makeJsonResponse(res, {
      status: 200,
      data: comment,
    });
  } catch (error) {
    console.error(error);
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  getAllCommentsByWatchesId,
  getCommentById,
};
