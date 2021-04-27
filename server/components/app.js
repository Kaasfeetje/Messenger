const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("express-async-errors");

const chatroomRouter = require("./chatroom/chatroomRouter");
const userRouter = require("./user/userRouter");
const chatmessageRouter = require("./chatmessage/chatmessageRouter");
const roomsJoinedRouter = require("./roomsJoined/roomsJoinedRouter");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
});

app.use("/api/v1/chatroom/joined", roomsJoinedRouter);
app.use("/api/v1/chatroom/messages", chatmessageRouter);
app.use("/api/v1/chatroom", chatroomRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

module.exports = app;
