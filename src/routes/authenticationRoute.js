const express = require("express");
const router = express.Router();
const { signIn, signUp } = require("../controller/authenticationController");

router.post("/auth/login", signIn);
router.post("/auth/signup", signUp);

module.exports = router;
