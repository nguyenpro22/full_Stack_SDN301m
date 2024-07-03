const { BrandSchema } = require("../schema");
const mongoose = require("mongoose");
const CONSTANT = require("../constant");

module.exports = mongoose.model(CONSTANT.MONGO_TYPE.BRAND.model, BrandSchema);
