require("dotenv").config();
const app = require("./components/app");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
const mongoose = require("mongoose");
const {
    createMessage,
    updateMessage,
    deleteMessage,
} = require("./components/chatmessage/chatmessageController");

const start = async () => {
    await mongoose.connect(
        process.env.MONGO_URI.replace("<password>", process.env.MONGO_PASSWORD),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    );
    const PORT = process.env.PORT || 3001;
    app.set("port", PORT);
    server.listen(PORT);
    console.log(`Connected to mongodb and listening on port: ${PORT}`);

    io.on("connection", (socket) => {
        console.log("Client connected...", socket.id);

        socket.on("join_room", (room) => {
            socket.join(room);
        });

        socket.on("leave_room", (room) => {
            socket.leave(room);
        });

        socket.on("message", async (data) => {
            const { userId, roomId, message } = data;

            chatmessage = await createMessage(userId, roomId, message);

            io.to(roomId).emit("newMessage");
        });

        socket.on("message_update", async (data) => {
            const { messageId, message } = data;

            chatmessage = await updateMessage(messageId, message);

            io.to(String(chatmessage.room)).emit("newMessage");
        });

        socket.on("message_delete", async (data) => {
            const { messageId } = data;
            chatmessage = await deleteMessage(messageId);

            io.to(String(chatmessage.room)).emit("newMessage");
        });
    });
};

start();
