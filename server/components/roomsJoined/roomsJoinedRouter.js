const express = require("express");
const { getMyJoinedRooms, joinRoom } = require("./roomsJoinedController");
const currentUser = require("../../middlewares/currentUser");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

//@desc Gets the rooms the current user has joined
//@route GET /api/v1/chatroom/joined
//@access Private
router.get("/", currentUser, requireAuth, getMyJoinedRooms);
//@desc Joins a room
//@route GET /api/v1/chatroom/joined/:roomId
//@access Private
router.get("/:roomId", currentUser, requireAuth, joinRoom);

module.exports = router;
