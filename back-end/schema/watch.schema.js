const mongoose = require("mongoose");
const commentSchema = require("./comment.schema");
const Schema = mongoose.Schema;
const watchSchema = new Schema(
  {
    watchName: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    Automatic: { type: Boolean, default: false },
    watchDescription: { type: String, required: true },
    comments: [commentSchema],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = watchSchema;
