const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const memberSchema = new Schema(
  {
    membername: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    YoB: { type: Number, required: true },
    isAdmin: { type: Boolean, required: true },
  },
  { timestamps: true }
);
module.exports = memberSchema;
