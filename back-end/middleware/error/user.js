const { makeErrorResponse } = require("../../utils/http.utils");

const handleLoginError = (err, req, res, next) => {
  makeErrorResponse(res, err);
};

module.exports = {
  handleLoginError,
};
