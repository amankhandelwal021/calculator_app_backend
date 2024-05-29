const constants = require("../utils/constants");
const userService = require("../services/userService");

const getHistory = async (req, res) => {
  try {

    const userId = req.body.userId

    const userHistory = await userService.getUserService(userId);
    if (userHistory.status === constants.SUCCESS) {
      return res.status(userHistory.status).json({ message: userHistory.message, userHistory: userHistory });
    } else {
      return res.status(userHistory.status).json({ message: userHistory.message });
    }
  } catch (error) {
    console.error("Internal server error", error);
    return res.status(constants.SERVER_ERROR).json({ message: "Internal server error" });
  }
};

const postHistory = async (req, res) => {
  try {
    const { userId, calculationName, calculationPattern, result } = req.body;

    const requestBody = {
      userId,
      calculationName,
      calculationPattern,
      result,
    };
    const userHistory = await userService.postUserService(requestBody);
    if (userHistory.status === constants.RESOURCE_CREATED) {
      return res.status(userHistory.status).json({ message: userHistory.message, userHistory: userHistory });
    } else {
      return res.status(userHistory.status).json({ message: userHistory.message });
    }
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(constants.SERVER_ERROR).json({ message: "Internal server error" });
  }
};

const updateHistory = async (req, res) => {
  try {
    const { id, calculationName, calculationPattern, result } = req.body;

    const requestBody = {
      calculationName,
      calculationPattern,
      result,
    };

    const userHistory = await userService.updateUserService(id, requestBody);
    if (userHistory.status === constants.SUCCESS) {
      return res
        .status(userHistory.status)
        .json({ message: userHistory.message, userHistory: userHistory });
    } else {
      return res
        .status(userHistory.status)
        .json({ message: userHistory.message });
    }
  } catch (error) {
    console.log("Internal server error", error);
    return res
      .status(constants.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { ids } = req.body;

    const userHistory = await userService.deleteUserService(ids);
    if (userHistory.status === constants.SUCCESS) {
      return res.status(userHistory.status).json({ message: userHistory.message, userHistory: userHistory });
    } else {
      return res.status(userHistory.status).json({ message: userHistory.message });
    }
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(constants.SERVER_ERROR).json({ message: "Internal server error" });

  }
};

module.exports = { getHistory, postHistory, updateHistory, deleteHistory };
