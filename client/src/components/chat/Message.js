import React from "react";

function Message({ text, sender, me, id }) {
    return (
        <div className={`${me ? "right" : "left"} message-container`}>
            <div className={`message ${me ? "message-me" : ""}`} data-id={id}>
                <div className="text">{text}</div>
                <div className="sender">{sender.nickname}</div>
            </div>
        </div>
    );
}

export default Message;
