const {  CommentSchema } = require("../schema");
const mongoose = require("mongoose");
const CONSTANT = require("../constant");

module.exports = mongoose.model(
  CONSTANT.MONGO_TYPE.COMMENT.model,
  CommentSchema
);
