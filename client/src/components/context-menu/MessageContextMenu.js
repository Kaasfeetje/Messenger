import React, { useState } from "react";
import ContextMenu from "./ContextMenu";

function MessageContextMenu() {
    const [opened, setOpened] = useState(false);

    const [messageElement, setMessageElement] = useState(undefined);
    const [messageId, setMessageId] = useState("");
    const handleMenu = (el) => {
        setMessageId(el.dataset.id);
        setMessageElement(el);
    };

    const copyHandler = (e) => {
        if (!messageElement) return;

        const textArea = document.createElement("textarea");
        textArea.value = messageElement.firstChild.innerText;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy");
        document.body.removeChild(textArea);
        setOpened(false);
    };

    const editHandler = (e) => {
        setOpened(false);
    };

    const deleteHandler = (e) => {
        setOpened(false);
    };

    return (
        <ContextMenu
            setOpened={setOpened}
            opened={opened}
            clickableClassname="message-me"
            customFunction={handleMenu}
        >
            <ul>
                <button onClick={copyHandler}>Copy</button>
            </ul>
            <ul>
                <button onClick={editHandler}>Edit</button>
            </ul>
            <ul>
                <button onClick={deleteHandler}>Delete</button>
            </ul>
        </ContextMenu>
    );
}

export default MessageContextMenu;
