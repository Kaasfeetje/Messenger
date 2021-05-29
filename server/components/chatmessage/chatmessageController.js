const Chatmessage = require("./chatmessageModel");
const NotFoundError = require("../../common/errors/NotFoundError");

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
    const lastPost = req.query.lastPost
        ? new Date(req.query.lastPost)
        : undefined;
    const query = lastPost
        ? { room: req.params.roomId, createdAt: { $lt: lastPost } }
        : { room: req.params.roomId };

    const messages = await Chatmessage.find(query)
        .sort({ createdAt: -1 })
        .limit(25)
        .populate("user");

    if (messages.length === 0) throw new NotFoundError("No posts found");

    res.status(200).send({
        data: {
            messages: messages.reverse(),
            lastPost: messages[0].createdAt,
        },
    });
};

module.exports = {
    getMessagesOfChat,
    createMessage,
    updateMessage,
    deleteMessage,
};
