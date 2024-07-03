module.exports = {
  Member: {
    membername: {
      minLength: 5,
      maxLength: 50,
      message: "Username must be between 5 and 50 characters",
    },
    password: {
      minLength: 8,
      maxLength: 20,
      regex: /^\S+$/,
      message: "Password must be between 8 and 20 characters",
      messageRegex: "Password must not contain spaces",
    },
    isAdmin: {
      isBoolean: true,
      message: "isAdmin must be a boolean value",
    },
    name: {
      minLength: 5,
      maxLength: 20,
      message: "Name must be between 5 and 20 characters",
    },
    avatar: {
      isURL: true,
      message: "Avatar must be a valid URL",
    },
    YoB: {
      min: 1900,
      max: new Date().getFullYear(),
      message: `Year of Birth must be between 1900 and ${new Date().getFullYear()}`,
    },
  },

  Watch: {
    watchName: {
      minLength: 5,
      maxLength: 50,
      message: "Watch name must be between 5 and 50 characters",
    },
    price: {
      minValue: 0,
      maxValue: 10000,
      message: "Price must be between 0 and 10000",
    },
    description: {
      maxLength: 200, // Adjust the maximum length as needed
      message: "Description must be less than 200 characters",
    },
  },
  Comment: {
    rating: {
      min: 1,
      max: 5,
      message: "Rating must be between 1 and 5",
    },
    content: {
      minLength: 1,
      maxLength: 500,
      message: "Content must be between 5 and 500 characters",
    },
  },
  Brand: {
    name: {
      minLength: 4,
      maxLength: 50,
      message: "Brand name must be between 5 and 50 characters",
    },
  },
};
