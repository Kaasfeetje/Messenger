const express = require("express");
const currentUser = require("../../middlewares/currentUser");
const requireAuth = require("../../middlewares/requireAuth");
const { getMessagesOfChat } = require("./chatmessageController");

const router = express.Router();

//@desc Gets messages of chat
//@route GET /api/v1/chatroom/messages/:roomId
//@access Private
router.get("/:roomId", currentUser, requireAuth, getMessagesOfChat);

module.exports = router;
