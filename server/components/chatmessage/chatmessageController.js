const Chatmessage = require("./chatmessageModel");

const createMessage = async (userId, roomId, message) => {
    const message = new Chatmessage({ user: userId, room: roomId, message });

    return await message.save();
};

const getMessagesOfChat = async (req, res) => {
    //TODO: maybe check if room exists with that id
    const messages = await Chatmessage.find({ room: req.params.roomId }).sort({
        createdAt: -1,
    });

    res.status(200).send({ data: messages });
};

module.exports = { getMessagesOfChat, createMessage };
