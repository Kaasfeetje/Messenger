const Chatmessage = require("./chatmessageModel");

const createMessage = async (userId, roomId, message) => {
    const chatmessage = new Chatmessage({
        user: userId,
        room: roomId,
        message,
    });

    return await chatmessage.save();
};

const updateMessage = async (messageId, updatedMessage) => {
    const chatmessage = await Chatmessage.findById(messageId);

    chatmessage.message = updatedMessage || chatmessage.message;
    await chatmessage.save();
    return chatmessage;
};

const deleteMessage = async (messageId) => {
    const chatmessage = await Chatmessage.findById(messageId);

    await Chatmessage.findByIdAndDelete(messageId);

    return chatmessage;
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

module.exports = {
    getMessagesOfChat,
    createMessage,
    updateMessage,
    deleteMessage,
};
