import React, { useContext, useEffect, useRef, useState } from "react";
import { useAPI } from "../../hooks/useAPI";
import { SocketContext } from "../../socket";
import ChatInput from "./ChatInput";
import Message from "./Message";

function Chat({ room, match }) {
    const socket = useContext(SocketContext);
    let messageEnd = useRef();

    const [response, makeRequest] = useAPI();
    const [messageResponse, makeMessageRequest] = useAPI();

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});

    //gets user
    useEffect(() => {
        if (response.loading || response.loading === false) return;
        makeRequest({ url: "/users/me", method: "get" });
    }, [makeRequest, response.loading]);
    //gets messages
    useEffect(() => {
        if (
            messageResponse.loading ||
            messageResponse.loading === false ||
            !room
        )
            return;
        makeMessageRequest({
            url: `/chatroom/messages/${room.id}`,
            method: "get",
        });
    }, [makeMessageRequest, room, messageResponse.loading]);
    //sets user and messages
    useEffect(() => {
        if (!response.loading && !response.hasError) {
            setUser(response.data);
        }
        if (
            !messageResponse.loading &&
            !messageResponse.hasError &&
            messageResponse.data
        ) {
            setMessages(messageResponse.data);
        }
    }, [response, messageResponse]);

    //auto scroll
    useEffect(() => {
        if (!messageEnd.current) return;
        messageEnd.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    });

    socket.on("newMessage", (message) => {
        //fetch the messages
        if (
            messageResponse.loading ||
            messageResponse.loading === false ||
            !room
        )
            return;
        makeMessageRequest({
            url: `/chatroom/messages/${room.id}`,
            method: "get",
        });
    });

    const sendMessageHandler = (e, text) => {
        e.preventDefault();
        socket.emit("message", {
            message: text,
            userId: user.id,
            roomId: room.id,
        });
    };

    if (!room) {
        return (
            <div className="chat">
                <div className="chat-info">No Chat Open</div>
            </div>
        );
    }

    return (
        <div className="chat">
            <div className="chat-info">{room.name}</div>
            <div className="chat-content">
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        text={message.message}
                        sender={message.user}
                        me={user.id === message.user.id}
                    />
                ))}
                <div ref={messageEnd} id="message-end"></div>
            </div>

            <ChatInput onSubmit={sendMessageHandler} />
        </div>
    );
}

export default Chat;
