import React, { useState } from "react";

function ChatInput({ onSubmit }) {
    const [text, setText] = useState();

    return (
        <form className="chat-input">
            <textarea onChange={(e) => setText(e.target.value)} value={text} />
            <button
                type="button"
                onClick={(e) => {
                    onSubmit(e, text);
                    setText("");
                }}
            >
                Send
            </button>
        </form>
    );
}

export default ChatInput;
