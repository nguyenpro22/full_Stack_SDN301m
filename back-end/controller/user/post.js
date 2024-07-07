const { validationResult } = require("express-validator");
const { MemberModel } = require("../../models");
const bcrypt = require("bcrypt");
const Error = require("../../constant/error/Error");
const {
  makeErrorResponse,
  makeJsonResponse,
} = require("../../utils/http.utils");

const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { OAuth2Client } = require("google-auth-library");

const handleSignUp = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return makeErrorResponse(res, Error.VALIDATION_ERROR);
    }

    const existingUser = await MemberModel.findOne({
      membername: req.body.username,
    });
    if (existingUser) {
      return makeErrorResponse(res, Error.ALREADY_EXIST);
    }

    // Validation passed, proceed to create new user
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      membername: req.body.username,
      password: hashPassword,
      name: req.body.name,
      avatar: req.body.avatar,
      YoB: req.body.YoB,
      isAdmin: false,
      interests: [],
      occupations: "",
    };

    const newUser = new MemberModel(user);
    await newUser.save();

    return makeJsonResponse(res, {
      status: 200,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return makeErrorResponse(res, Error.UNKNOWN);
  }
};

const handleSendEmail = async (req, res) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SEC = process.env.CLIENT_SECRET_KEY;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  const EMAIL = process.env.GMAIL_EMAIL;

  const myOAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SEC);
  myOAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  try {
    // Lấy thông tin gửi lên từ client qua body
    const { email, username } = req.body;
    /**
     * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
     * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
     */

    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token;
    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const user = await MemberModel.findOne({ membername: username });
    if (!user) {
      return makeErrorResponse(res, Error.NOT_FOUND);
    }

    const regex = /^\S+$/;
    let randomStr;
    do {
      randomStr = randomstring.generate({
        length: 8, // Length of the string
        charset: "alphanumeric", // Character set to use
        readable: true, // Avoid ambiguous characters
      });
    } while (!regex.test(randomStr));
    const hashPassword = await bcrypt.hash(randomStr, 10);
    user.password = hashPassword;
    await user.save();
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            text-align: center;
            border-bottom: 1px solid #dddddd;
            padding-bottom: 10px;
          }
          .email-header h1 {
            color: #333333;
          }
          .email-body {
            padding: 20px;
          }
          .email-body p {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
          }
          .email-body a {
            color: #007BFF;
            text-decoration: none;
          }
          .email-footer {
            text-align: center;
            border-top: 1px solid #dddddd;
            padding-top: 10px;
            font-size: 14px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Password Reset</h1>
          </div>
          <div class="email-body">
            <p>Hi <strong>${email}</strong>,</p>
            <p>You requested a password reset for your account.</p>
            <p>Your userName is: <i>${username}</i></p>
            <p>Your new password is: <i>${randomStr}</i></p>
            <p>Please use the link below to log in and change your password immediately:</p>
            <p><a href="http://localhost:3000/auth/login">Log in to your account</a></p>
            <p>If you did not request this, please ignore this email or contact support.</p>
          </div>
          <div class="email-footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a transport object using Nodemailer
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SEC,
        refreshToken: REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });

    // Mail options
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: htmlContent,
    };

    // Send email
    const response = await transport.sendMail(mailOptions);
    console.log(response);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error.message });
  }
};

module.exports = {
  handleSignUp,
  handleSendEmail,
};
