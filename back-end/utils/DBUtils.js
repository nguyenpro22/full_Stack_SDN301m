const mongoose = require("mongoose");

module.exports = {
  DBConnect: async (url, options) => {
    try {
      await mongoose.connect(url, options);
      // await mongoose.connect(url)
      console.log("Connected to MongoDB successfully");
    } catch (e) {}
  },
};
