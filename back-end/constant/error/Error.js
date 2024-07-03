module.exports = {
  NOT_AUTHENTICATE: {
    status: 403,
    message: "Please login",
  },
  WRONG_USER: {
    status: 400,
    message: "Permission Denied",
  },
  UN_AUTHORIZATION: {
    status: 401,
    message: "Invalid User Tokens",
  },
  ACCOUNT_DISABLED: {
    status: 403,
    message: "Account is disabled. Please contact with Admin",
  },
  SESSION_EXPIRED: {
    status: 401,
    message: "SESSION_EXPIRED",
  },
  FORBIDDEN: {
    status: 403,
    message: "FORBIDDEN",
  },
  UNKNOWN: {
    status: 500,
    message: "SOMETHINE_WENT_WRONG",
  },
  BAD_REQUEST: {
    status: 400,
    message: "Bad request",
  },
  DELEGATION_TOKEN_ERROR: {
    status: 403,
    message:
      "Delegation Token not found, please refresh page to get delegation token",
  },
  AUTHENTICATE_FAILED: {
    status: 401,
    message: "Authenticate failed",
  },
  NOT_FOUND: {
    status: 404,
    message: "Resource not found",
  },
  VALIDATION_ERROR: {
    status: 422,
    message: "Validation error",
  },
  CONFLICT: {
    status: 409,
    message: "Conflict error",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error",
  },
  SERVICE_UNAVAILABLE: {
    status: 503,
    message: "Service Unavailable",
  },
  GATEWAY_TIMEOUT: {
    status: 504,
    message: "Gateway Timeout",
  },
  UNSUPPORTED_MEDIA_TYPE: {
    status: 415,
    message: "Unsupported Media Type",
  },
  TOO_MANY_REQUESTS: {
    status: 429,
    message: "Too many requests",
  },
  METHOD_NOT_ALLOWED: {
    status: 405,
    message: "Method Not Allowed",
  },
  ALREADY_EXIST: {
    status: 409,
    message: "Resource already exists",
  },
};
