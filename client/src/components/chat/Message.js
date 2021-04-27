import React from "react";

function Message({ text, sender, me }) {
    console.log("sender", me);

    return (
        <div className={`${me ? "right" : "left"} message-container`}>
            <div className={`message`}>
                <div className="text">{text}</div>
                <div className="sender">{sender.nickname}</div>
            </div>
        </div>
    );
}

export default Message;
