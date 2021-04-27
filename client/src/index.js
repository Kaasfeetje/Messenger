import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { socket, SocketContext } from "./socket";

ReactDOM.render(
    <SocketContext.Provider value={socket}>
        <App />
    </SocketContext.Provider>,
    document.getElementById("root")
);
