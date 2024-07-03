const MONGO_TYPE = require('./mongodb/type');
const RES_ERROR = require('./error/Error');
const COMMON_CONFIG = require('./common');
const JWT_EXPIRED_TIME = 1000 * 60 * 60 * 24;
const JWT_REFRESH_TOKEN_EXPIRED_TIME = 1000 * 60 * 60 * 24 * 365;
// const JWT_EXPIRED_TIME =  1000 * 20
const CONSTANT = {
  MONGO_TYPE,
  RES_ERROR,
  JWT_EXPIRED_TIME,
  COMMON_CONFIG,
  JWT_REFRESH_TOKEN_EXPIRED_TIME,
};

module.exports = CONSTANT;
