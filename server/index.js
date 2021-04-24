require("dotenv").config();
const app = require("./components/app");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
const mongoose = require("mongoose");

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

        socket.on("join", (data) => {
            socket.join("test");
        });

        socket.on("message", (data) => {
            io.to("test").emit("message_response", {
                socketId: socket.id,
                message: data,
            });
        });
    });
};

start();
