const makeJsonResponse = (res, data, status) => {
  return res.json(data).status(status);
};

const makeErrorResponse = (res, err) => {
  return makeJsonResponse(
    res,
    {
      success: false,
      code: err.status,
      message: err.message,
    },
    err.status
  );
};

module.exports = {
  makeJsonResponse,
  makeErrorResponse,
};
