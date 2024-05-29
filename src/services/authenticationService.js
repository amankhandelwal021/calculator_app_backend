const constants = require("../utils/constants");
const AuthUser = require("../models/authenticationModel");
const bcrypt = require("bcrypt");

const postAuthService = async (requestBody, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(requestBody.password, salt);

    const user = new AuthUser({ ...requestBody, password: hashPassword });

    const authToken = await user.generateAuthToken();
    console.log("auth",authToken)
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    res.cookie("jwtToken", authToken, {
      expires: new Date(Date.now() + sevenDaysInMilliseconds),
    });

    const createdUser = await user.save();
    return {
      users: createdUser,
      status: constants.RESOURCE_CREATED,
      message: "User saved successfully",
    };
  } catch (error) {
    console.error("ERROR", error.message);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};

const postAuthServiceSignIn = async (requestBody, res) => {
  try {
    const validUser = await AuthUser.findOne({
      email: requestBody.email,
    });

    if (!validUser) {
      return {
        status: constants.NOT_FOUND,
        message: "User not found",
      };
    }
    if (requestBody.password.length === 0) {
      return {
        status: constants.BAD_REQUEST,
        message: "Password is required",
      };
    }
    const isMatchPassword = await bcrypt.compare(
      requestBody.password,
      validUser.password
    );
    if (isMatchPassword) {
      const authToken = await validUser.generateAuthToken();
      const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

      res.cookie("jwtToken", authToken, {
        expires: new Date(Date.now() + sevenDaysInMilliseconds),
      });

      return {
        users: validUser,
        status: constants.SUCCESS,
        message: "User login successfully",
      };
    } else {
      return {
        status: constants.UNAUTHORISED,
        message: "Invalid login credentials, please try again...",
      };
    }
  } catch (error) {
    console.error("ERROR", error.message);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};
module.exports = { postAuthService, postAuthServiceSignIn };
