import React, { useContext, useState } from "react";
import { SocketContext } from "../../socket";
import MessageMenu from "./MessageMenu";

function Message({ me, message }) {
    const socket = useContext(SocketContext);

    const [hovered, setHovered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(message.message || "");

    const editMessageHandler = (e) => {
        socket.emit("message_update", {
            messageId: message.id,
            message: editText,
        });
        setEditing(false);
    };

    return (
        <div className={`${me ? "right" : "left"} message-container`}>
            <div
                className={`message ${me ? "message-me" : ""}`}
                onMouseEnter={(e) => setHovered(true)}
                onMouseLeave={(e) => {
                    setHovered(false);
                    setMenuOpen(false);
                }}
            >
                <div>
                    {!editing ? (
                        <>
                            <div className="text">{message.message}</div>
                            <div className="sender">
                                {message.user.nickname}
                            </div>
                        </>
                    ) : (
                        <>
                            <textarea
                                className="message-edit"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                rows={3}
                            />
                            <div
                                className="message-edit-btn"
                                onClick={editMessageHandler}
                            >
                                Send
                            </div>
                        </>
                    )}
                </div>
                <div
                    className={`message-hover ${
                        hovered || menuOpen ? "show" : ""
                    } `}
                >
                    <i
                        className="fas fa-angle-down clickable message-opener"
                        onClick={(e) => setMenuOpen(!menuOpen)}
                    >
                        <MessageMenu
                            message={message}
                            me={me}
                            opened={menuOpen}
                            onDismiss={(e) => setMenuOpen(false)}
                            onEdit={() => setEditing(true)}
                        />
                    </i>
                </div>
            </div>
        </div>
    );
}

export default Message;
