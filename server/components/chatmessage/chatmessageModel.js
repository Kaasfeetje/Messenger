const mongoose = require("mongoose");

const chatmessageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
        room: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Chatroom",
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Chatmessage = mongoose.model("Chatmessage", chatmessageSchema);

module.exports = Chatmessage;
