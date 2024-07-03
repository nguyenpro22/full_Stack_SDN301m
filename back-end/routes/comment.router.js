const express = require("express");
const router = express.Router();
const { JwtAuthenticate, authorizeUser } = require("../middleware/");
const Controller = require("../controller");
const { commentValidator } = require("../middleware/").commentValidator;

router.get(
  "/:watchId",
  JwtAuthenticate,
  Controller.CommentController.Get.getAllCommentsByWatchesId
);
router.get(
  "/:watchId/:commentId",
  JwtAuthenticate,
  Controller.CommentController.Get.getCommentById
);
router.post(
  "/:watchId",
  JwtAuthenticate,
  authorizeUser.authenticateSession,
  commentValidator(),
  Controller.CommentController.Post.handleAddNewComment
);

router.put(
  "/:watchId",
  JwtAuthenticate,
  authorizeUser.authenticateSession,
  commentValidator(),
  Controller.CommentController.Put.handleUpdateComment
);

router.delete(
  "/:watchId/:commentId",
  JwtAuthenticate,
  authorizeUser.authenticateSession,
  Controller.CommentController.Delete.handleDeleteComment
);

module.exports = router;
