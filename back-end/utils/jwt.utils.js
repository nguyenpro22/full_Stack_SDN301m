const jwt = require("jsonwebtoken");

const createToken = (user, expiredTime, SecretKey) => {
  try {
    const expiredAt = Math.floor(Date.now() / 1000) + expiredTime; // Chuyển sang giây
    const signContent = {
      id: user.id,
      membername: user.membername,
      avatar: user.avatar,
      YoB: user.YoB,
      isAdmin: user.isAdmin,
      expiredAt: expiredAt,
      name: user.name,
    };
    const token = jwt.sign(signContent, SecretKey);
    return token;
  } catch (e) {
    return null;
  }
};

const extractRefreshToken = (refreshToken, SecretKey) => {
  try {
    // Verify the refresh token
    const decodedToken = jwt.verify(refreshToken, SecretKey);

    // Check expiration
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      throw new Error("Refresh token has expired");
    }

    // Validation passed
    return decodedToken;
  } catch (error) {
    // Validation failed
    console.error("Error validating refresh token:", error);
    return null;
  }
};

module.exports = {
  createToken,
  extractRefreshToken,
};
