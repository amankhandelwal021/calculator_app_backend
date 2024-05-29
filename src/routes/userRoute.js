const express = require("express");
const {
  getHistory,
  postHistory,
  updateHistory,
  deleteHistory,
} = require("../controller/userController");
const router = express.Router();

router.get("/user/history", getHistory);
router.post("/user/create-history", postHistory);
router.put("/user/update-history", updateHistory);
router.delete("/user/delete-history", deleteHistory);

module.exports = router;
