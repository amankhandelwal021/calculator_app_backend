const constants = require("../utils/constants");
const authService = require("../services/authenticationService");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const requestBody = {
      name,
      email,
      password,
    };
    const users = await authService.postAuthService(requestBody, res);
    if (users.status === constants.RESOURCE_CREATED) {
      return res
        .status(users.status)
        .json({ message: users.message, users: users });
    } else {
      return res.status(users.status).json({ message: users.message });
    }
  } catch (error) {
    console.error("Internal server error", error);
    return res
      .status(constants.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const requestBody = {
      email,
      password,
    };
    const users = await authService.postAuthServiceSignIn(requestBody, res);
    if (users.status === constants.SUCCESS) {
      return res
        .status(users.status)
        .json({ message: users.message, users: users });
    } else {
      return res.status(users.status).json({ message: users.message });
    }
  } catch (error) {
    console.error("Internal server error", error);
    return res
      .status(constants.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = { signUp, signIn };
