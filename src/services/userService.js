const constants = require("../utils/constants");
const CalculationHistory = require("../models/userHistoryModel");

const getUserService = async (userId) => {
  console.log("userId", userId)
  try {
    const history = await CalculationHistory.find({ userId });
    return {
      history: history,
      status: constants.SUCCESS,
      message: "History fetched successfully",
    };
  } catch (error) {
    console.error(error);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};

const postUserService = async (requestBody) => {
  try {
    const history = new CalculationHistory(requestBody);
    const createdHistory = await history.save();
    return {
      history: createdHistory,
      status: constants.RESOURCE_CREATED,
      message: "History created successfully",
    };
  } catch (error) {
    console.log("error", error);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};

const updateUserService = async (id, requestBody) => {
  try {
    const updatedHistory = await CalculationHistory.findByIdAndUpdate(
      id,
      requestBody,
      { new: true }
    );
    if (updatedHistory) {
      return {
        status: constants.SUCCESS,
        message: "History updated successfully",
        data: updatedHistory,
      };
    } else {
      return {
        status: constants.NOT_FOUND,
        message: "History not found",
      };
    }
  } catch (error) {
    console.log("error", error);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};

const deleteUserService = async (ids) => {
  try {
    let deletedHistories = [];
    for (let i = 0; i < ids.length; i++) {
      const deletedHistory = await CalculationHistory.findByIdAndDelete(ids[i]);
      if (deletedHistory) {
        deletedHistories.push(deletedHistory);
      }
    }

    if (deletedHistories.length > 0) {
      return {
        status: constants.SUCCESS,
        message: "History deleted successfully",
        deletedHistories,
      };
    } else {
      return {
        status: constants.NOT_FOUND,
        message: "No history found to delete",
      };
    }
  } catch (error) {
    console.log("error", error);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};


module.exports = {
  getUserService,
  postUserService,
  deleteUserService,
  updateUserService,
};
