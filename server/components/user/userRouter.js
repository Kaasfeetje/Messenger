const express = require("express");
const { signup } = require("./userController");

const router = express.Router();

router.post("/signup", signup);

module.exports = router;
