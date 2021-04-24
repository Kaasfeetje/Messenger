const BadRequestError = require("../../common/errors/BadRequestError");
const NotFoundError = require("../../common/errors/NotFoundError");
const NotAuthorizedError = require("../../common/errors/NotAuthorizedError");
const Chatroom = require("./chatroomModel");

//TODO: Maybe at a title field that will be the name you see in chat and have the private name be unique

const createRoom = async (req, res) => {
    const { name, isPublic } = req.body;

    if (!name)
        throw new BadRequestError(
            "Please provide a name for the room you're trying to create."
        );
    const room = new Chatroom({ name, isPublic, owner: req.currentUser.id });

    await room.save();

    res.status(201).send({ data: room });
};

const getAllPublicRooms = async (req, res) => {
    const rooms = await Chatroom.find({ isPublic: true });

    if (rooms.length === 0)
        throw new NotFoundError(
            "There are currently no rooms available, please create your own."
        );

    res.status(200).send({ data: rooms });
};

const getRoomById = async (req, res) => {
    const room = await Chatroom.findById(req.params.roomId);

    if (!room) throw new NotFoundError("Did not find a room with that id.");

    res.status(200).send({ data: room });
};

const updateRoom = async (req, res) => {
    const room = await Chatroom.findById(req.params.roomId);

    if (!room) throw new NotFoundError("Did not find a room with that id.");
    if (String(room.owner) !== String(req.currentUser.id))
        throw new NotAuthorizedError("You are not the owner of this room.");

    const { name } = req.body;
    room.name = name || room.name;

    await room.save();

    res.status(200).send({ data: room });
};

const deleteRoom = async (req, res) => {
    const room = await Chatroom.findById(req.params.roomId);

    if (!room) throw new NotFoundError("Did not find a room with that id.");
    if (String(room.owner) !== String(req.currentUser.id))
        throw new NotAuthorizedError("You are not the owner of this room.");

    await Chatroom.findByIdAndDelete(req.params.roomId);

    res.status(204).send({});
};

module.exports = {
    createRoom,
    getAllPublicRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
};
