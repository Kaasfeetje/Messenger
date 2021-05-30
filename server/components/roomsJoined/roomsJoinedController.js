const RoomsJoined = require("./roomsJoinedModel");

const getMyJoinedRooms = async (req, res) => {
    const rooms = await RoomsJoined.find({ user: req.currentUser.id })
        .populate("room")
        .select("room");

    //TODO: probably only should return the room part
    res.status(200).send({ data: rooms.map((room) => room.room) });
};

const joinLeaveRoom = async (req, res) => {
    //TODO: maybe check if the room is valid
    const roomJoinedExists = await RoomsJoined.findOne({
        user: req.currentUser.id,
        room: req.params.roomId,
    });

    if (roomJoinedExists) {
        await roomJoinedExists.remove();
        res.status(200).send({ data: {} });
    } else {
        const roomJoined = await new RoomsJoined({
            user: req.currentUser.id,
            room: req.params.roomId,
        }).save();

        res.status(201).send({ data: roomJoined });
    }
};

module.exports = { getMyJoinedRooms, joinLeaveRoom };
