const Chatmessage = require("./chatmessageModel");

const createMessage = async (userId, roomId, message) => {
    const chatmessage = new Chatmessage({
        user: userId,
        room: roomId,
        message,
    });

    return await chatmessage.save();
};

const getMessagesOfChat = async (req, res) => {
    //TODO: maybe check if room exists with that id
    //TODO: Add last message query that gets messages before last message(for scrolling back)
    const messages = await Chatmessage.find({
        room: req.params.roomId,
    })
        .sort({ createdAt: -1 })
        .limit(25)
        .populate("user");

    res.status(200).send({ data: messages.reverse() });
};

module.exports = { getMessagesOfChat, createMessage };
