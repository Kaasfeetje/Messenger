import React, { createElement, useContext } from "react";
import { SocketContext } from "../../socket";

function MessageMenu({ message, me, opened, onDismiss, onEdit }) {
    const socket = useContext(SocketContext);

    const editHandler = (e) => {
        onEdit();
        onDismiss();
    };

    const copyHandler = (e) => {
        const el = document.createElement("textarea");
        el.value = message.message;
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);

        onDismiss();
    };

    const deleteHandler = (e) => {
        socket.emit("message_delete", {
            messageId: message.id,
        });

        onDismiss();
    };

    return (
        <ul className={`message-menu ${opened ? "show" : ""}`}>
            {me && (
                <div className="menu-item" onClick={editHandler}>
                    <i className="fas fa-cog" />
                    <span>Edit</span>
                </div>
            )}
            <div className="menu-item" onClick={copyHandler}>
                <i className="fas fa-copy" />
                <span>Copy</span>
            </div>
            {me && (
                <div className="menu-item" onClick={deleteHandler}>
                    <i className="fas fa-trash-alt" />
                    <span>Delete</span>
                </div>
            )}
        </ul>
    );
}

export default MessageMenu;
