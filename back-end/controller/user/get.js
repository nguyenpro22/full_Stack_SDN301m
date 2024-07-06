const Error = require("../../constant/error/Error");
const { MemberModel } = require("../../models/");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");

const handleGetUserById = async function (req, res, next) {
  if (req.user) {
    try {
      const user = await MemberModel.findOne({ _id: req.user.id });
      if (user) {
        makeJsonResponse(res, {
          status: 200,
          data: {
            membername: user.membername,
            name: user.name,
            avatar: user.avatar,
            YoB: user.YoB,
            isAdmin: user.role,
            id: user.id,
            occupation: user.occupation,
            interests: user.interests,
          },
        });
      } else {
        makeJsonResponse(res, {});
      }
    } catch (e) {
      res.json({
        error: error.message,
      });
    }
  } else {
    makeErrorResponse(res, Error.UN_AUTHORIZATION);
  }
};
const handleAdminGetUserById = async (req, res, next) => {
  const userId = req.params["id"];
  if (userId) {
    try {
      const user = await MemberModel.findOne({ _id: userId });
      if (user) {
        makeJsonResponse(res, {
          status: 200,
          data: {
            membername: user.membername,
            name: user.name,
            avatar: user.avatar,
            YoB: user.YoB,
            isAdmin: user.isAdmin,
            id: user.id,
          },
        });
      } else {
        makeJsonResponse(res, {});
      }
    } catch (e) {
      makeErrorResponse(res, Error.UNKNOWN);
    }
  } else {
    makeErrorResponse(res, Error.UN_AUTHORIZATION);
  }
};

const handleGetAllUser = async (req, res) => {
  try {
    const listUser = await MemberModel.find();
    const listUserDTO = listUser.map((user) => ({
      membername: user.membername,
      name: user.name,
      avatar: user.avatar,
      YoB: user.YoB,
      isAdmin: user.isAdmin,
      id: user._id,
      password: user.password,
    }));
    makeJsonResponse(res, {
      status: 200,
      data: listUserDTO,
    });
  } catch (error) {
    makeErrorResponse(res, Error.UNKNOWN);
  }
};
module.exports = {
  handleGetUserById,
  handleAdminGetUserById,
  handleGetAllUser,
};
