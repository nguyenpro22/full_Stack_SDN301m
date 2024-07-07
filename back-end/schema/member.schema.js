const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema(
  {
    membername: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    YoB: { type: Number, required: true },
    occupation: { type: String },
    interests: { type: [String] },
    isAdmin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = MemberSchema;
