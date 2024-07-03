const express = require("express");
const router = express.Router();
const { WatchModel } = require("../models/index");
const { makeErrorResponse } = require("../utils/http.utils");
const Controller = require("../controller");
const { JwtAuthenticate, authorizeUser } = require("../middleware/");

const { watchValidator } = require("../middleware/").watchValidator;

router.get("/", Controller.WatchController.Get.handleGetAllWatches);
router.get(
  "/brand/:brandId",
  Controller.WatchController.Get.handleGetWatchesByBrandId
);
router.get(
  "/getAllWatches/",
  Controller.WatchController.Get.handleUserGetAllWatches
);
router.get(
  "/:watchId",
  // JwtAuthenticate,
  Controller.WatchController.Get.handleGetWatchById
);

router.post(
  "/",
  JwtAuthenticate,
  authorizeUser.authenticateSession,
  watchValidator(),
  Controller.WatchController.Post.handleAddNewWatch
);

router.put(
  "/:id",
  JwtAuthenticate,
  authorizeUser.authorizeAdminRole(),
  watchValidator(),
  Controller.WatchController.Put.handleUpdateWatchById
);

router.delete(
  "/:id",
  JwtAuthenticate,
  authorizeUser.authorizeAdminRole(),
  Controller.WatchController.Delete.handleDeleteWatchById
);

module.exports = router;
