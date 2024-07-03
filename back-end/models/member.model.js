const {  MemberSchema } = require("../schema");
const mongoose = require("mongoose");
const CONSTANT = require("../constant");
module.exports = mongoose.model(CONSTANT.MONGO_TYPE.MEMBER.model, MemberSchema);
