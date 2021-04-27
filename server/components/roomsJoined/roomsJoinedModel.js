const mongoose = require("mongoose");

const roomsJoinedSchema = new mongoose.Schema(
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
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__V;
            },
        },
    }
);

const RoomsJoined = mongoose.model("RoomsJoined", roomsJoinedSchema);

module.exports = RoomsJoined;
