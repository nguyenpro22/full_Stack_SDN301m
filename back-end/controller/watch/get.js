const Error = require("../../constant/error/Error");
const { WatchModel } = require("../../models/");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");

const handleGetWatchById = async function (req, res, next) {
  try {
    const { watchId } = req.params;
    console.log(req.params);
    if (req) {
      const watch = await WatchModel.findOne({ _id: watchId })
        .populate("brand") // Populate brand information
        .populate({
          path: "comments",
          populate: {
            path: "author",
            model: "Member",
            select: ["name", "avatar"],
          },
        });
      if (watch) {
        makeJsonResponse(res, {
          status: 200,
          data: {
            watchName: watch.watchName,
            image: watch.image,
            price: watch.price,
            Automatic: watch.Automatic,
            watchDescription: watch.watchDescription,
            brand: watch.brand,
            comments: watch.comments,
            id: watch.id,
          },
        });
      } else {
        makeJsonResponse(res, {});
      }
    } else {
      makeErrorResponse(res, Error.UN_AUTHORIZATION);
    }
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
};
const handleGetWatchesByBrandId = async function (req, res, next) {
  try {
    const { brandId } = req.params;
    console.log(req.params);
    if (req) {
      const watchs = await WatchModel.find({ brand: brandId })
        .populate("brand")
        .populate({
          path: "comments",
          populate: {
            path: "author",
            model: "Member",
            select: ["name", "avatar"],
          },
        });
      if (watchs) {
        const listWatchesDTO = watchs.map((watch) => ({
          watchName: watch.watchName,
          image: watch.image,
          price: watch.price,
          Automatic: watch.Automatic,
          watchDescription: watch.watchDescription,
          brand: watch.brand,
          comments: watch.comments,
          id: watch._id,
        }));
        makeJsonResponse(res, {
          status: 200,
          data: listWatchesDTO,
        });
      } else {
        makeJsonResponse(res, {});
      }
    } else {
      makeErrorResponse(res, Error.UN_AUTHORIZATION);
    }
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
};

const handleGetAllWatches = async (req, res) => {
  try {
    const listWatches = await WatchModel.find();
    console.log(listWatches);
    const listWatchesDTO = listWatches.map((watch) => ({
      watchName: watch.watchName,
      image: watch.image,
      price: watch.price,
      Automatic: watch.Automatic,
      watchDescription: watch.watchDescription,
      brand: watch.brand,
      comments: watch.comments,
      id: watch._id,
    }));
    makeJsonResponse(res, {
      status: 200,
      data: listWatchesDTO,
    });
  } catch (error) {
    makeErrorResponse(res, {
      status: 500,
      message: error.message || Error.UNKNOWN.message,
    });
  }
};

const handleUserGetAllWatches = async (req, res, next) => {
  try {
    const watches = await WatchModel.find()
      .populate("brand") // Populate brand information
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "Member",
          select: "name", // Only fetch the author's name
        },
      });
    const listWatchesDTO = watches.map((watch) => ({
      watchName: watch.watchName,
      image: watch.image,
      price: watch.price,
      Automatic: watch.Automatic,
      watchDescription: watch.watchDescription,
      brand: watch.brand,
      comments: watch.comments,
      id: watch._id,
    }));
    makeJsonResponse(res, {
      status: 200,
      data: listWatchesDTO,
    });
  } catch (error) {
    makeErrorResponse(res, Error.UNKNOWN);
  }
};

module.exports = {
  handleGetWatchById,
  handleGetAllWatches,
  handleUserGetAllWatches,
  handleGetWatchesByBrandId,
};
