const express = require("express");
const {
    getRoomById,
    createRoom,
    getAllPublicRooms,
    getRoomByName,
    updateRoom,
    deleteRoom,
    searchRoom,
    getRoomDetails,
} = require("./chatroomController");
const currentUser = require("../../middlewares/currentUser");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

//@desc Creates a new room and makes the logged in user the owner
//@route POST /api/v1/chatroom
//@access Private
router.post("/", currentUser, requireAuth, createRoom);

//@desc Gets all public rooms
//@route GET /api/v1/chatroom
//@access Private
router.get("/", currentUser, requireAuth, getAllPublicRooms);

//@desc Get a room by id
//@route GET /api/v1/chatroom/:roomId/details
//@access Private
router.get("/:roomId/details", currentUser, requireAuth, getRoomDetails);

//@desc Get a room by id
//@route GET /api/v1/chatroom/:roomId
//@access Private
router.get("/:roomId", currentUser, requireAuth, getRoomById);

//@desc Updates a room if the current user is the owner
//@route PUT /api/v1/chatroom/:roomId
//@access Private/Owner
router.put("/:roomId", currentUser, requireAuth, updateRoom);

//@desc Deletes a room if the current user is the owner
//@route DELETE /api/v1/chatroom/:roomId
//@access Private/Owner
router.delete("/:roomId", currentUser, requireAuth, deleteRoom);

/*
    CRUD    /\
            ||
    SPECIAL \/
*/

//@desc Searches for rooms
//@route GET /api/v1/chatroom/:keyword/search
//@access Private
router.get("/:keyword/search", currentUser, requireAuth, searchRoom);

module.exports = router;
