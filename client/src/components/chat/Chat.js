import React, { useContext, useEffect, useRef, useState } from "react";
import { useAPI } from "../../hooks/useAPI";
import { SocketContext } from "../../socket";
import ChatInput from "./ChatInput";
import Message from "./Message";

function Chat({ room, user, onDetailView }) {
    const socket = useContext(SocketContext);
    let messageEnd = useRef();

    const [messageResponse, makeMessageRequest] = useAPI();
    const [messages, setMessages] = useState([]);
    //gets messages
    useEffect(() => {
        if (!room) return;
        makeMessageRequest({
            url: `/chatroom/messages/${room.id}`,
            method: "get",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room]);
    //sets messages
    useEffect(() => {
        if (
            !messageResponse.loading &&
            !messageResponse.hasError &&
            messageResponse.data
        ) {
            setMessages(messageResponse.data);
        }
    }, [messageResponse]);

    //auto scroll
    useEffect(() => {
        if (!messageEnd.current) return;
        messageEnd.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    });

    const handleNewMessage = (room) => {
        if (!room) return;
        makeMessageRequest({
            url: `/chatroom/messages/${room.id}`,
            method: "get",
        });
    };

    useEffect(() => {
        socket.on("newMessage", () => handleNewMessage(room));

        return () => {
            socket.off("newMessage");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, room]);

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
            <h2 className="chat-info clickable" onClick={() => onDetailView()}>
                {room.name}
            </h2>
            <div className="chat-content">
                {user &&
                    messages.map((message) => (
                        <Message
                            key={message.id}
                            text={message.message}
                            sender={message.user}
                            message={message}
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
