const express = require("express");
const router = express.Router();
const { BrandModel } = require("../models/index");
const { makeErrorResponse } = require("../utils/http.utils");
const Controller = require("../controller");
const { JwtAuthenticate, authorizeUser } = require("../middleware/");

const { brandValidator } = require("../middleware/").brandValidator;

router.get("/", Controller.BrandController.Get.handleGetAllBrand);
router.get(
  "/:id",
  JwtAuthenticate,
  authorizeUser.authenticateSession,
  Controller.BrandController.Get.handleGetBrandById
);

router.post(
  "/",
  JwtAuthenticate,
  brandValidator(),
  authorizeUser.authorizeAdminRole(),
  Controller.BrandController.Post.handleAddNewBrand
);

router.put(
  "/:id",
  JwtAuthenticate,
  brandValidator(),
  authorizeUser.authenticateSession,
  Controller.BrandController.Put.handleUpdateBrandName
);

router.delete(
  "/:id",
  JwtAuthenticate,
  authorizeUser.authorizeAdminRole(),
  Controller.BrandController.Delete.handleDeleteBrandById
);

module.exports = router;
