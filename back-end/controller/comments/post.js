const { validationResult } = require("express-validator");
const { CommentModel, WatchModel } = require("../../models");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");
const mongoose = require("mongoose");
const Error = require("../../constant/error/Error");

const handleAddNewComment = async (req, res) => {
  const { rating, content } = req.body;
  const { watchId } = req.params;

  try {
    const watch = await WatchModel.findById(watchId);
    if (!watch) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    const existingComment = watch.comments.find(
      (comment) => comment.author == req.user.id
    );
    if (existingComment) {
      return makeErrorResponse(res, Error.ALREADY_EXIST);
    }

    const comment = new CommentModel({
      rating,
      content,
      author: req.user.id,
    });
    const savedComment = await comment.save();

    watch.comments.push(savedComment);
    await watch.save();

    return makeJsonResponse(res, { status: 201, data: savedComment });
  } catch (error) {
    console.error(error);
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleAddNewComment,
};
