const express = require("express");
const {
    getRoomById,
    createRoom,
    getAllPublicRooms,
    getRoomByName,
    updateRoom,
    deleteRoom,
    searchRoom,
} = require("./chatroomController");
const currentUser = require("../../middlewares/currentUser");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

router.use(currentUser, requireAuth);

//@desc Creates a new room and makes the logged in user the owner
//@route POST /api/v1/chatroom
//@access Private
router.post("/", createRoom);

//@desc Gets all public rooms
//@route GET /api/v1/chatroom
//@access Private
router.get("/", getAllPublicRooms);
//@desc Get a room by id
//@route GET /api/v1/chatroom/:roomId
//@access Private
router.get("/:roomId", getRoomById);

//@desc Updates a room if the current user is the owner
//@route PUT /api/v1/chatroom/:roomId
//@access Private/Owner
router.put("/:roomId", updateRoom);

//@desc Deletes a room if the current user is the owner
//@route DELETE /api/v1/chatroom/:roomId
//@access Private/Owner
router.delete("/:roomId", deleteRoom);

/*
    CRUD    /\
            ||
    SPECIAL \/
*/

//@desc Searches for rooms
//@route GET /api/v1/chatroom/:keyword/search
//@access Private
router.get("/:keyword/search", searchRoom);

module.exports = router;
