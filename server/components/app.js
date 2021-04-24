const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("express-async-errors");

const chatroomRouter = require("./chatroom/chatroomRouter");
const userRouter = require("./user/userRouter");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/chatroom", chatroomRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

module.exports = app;
