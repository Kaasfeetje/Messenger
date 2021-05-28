import React, { useContext, useState } from "react";
import { SocketContext } from "../../socket";
import ContextMenu from "./ContextMenu";

function MessageContextMenu() {
    const socket = useContext(SocketContext);

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

    // const editHandler = (e) => {
    //     socket.emit("message_update", {
    //         messageId,
    //         message: "this is updated",
    //     });
    //     setOpened(false);
    // };

    const deleteHandler = (e) => {
        socket.emit("message_delete", {
            messageId,
        });
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
            {/* <ul>
                <button onClick={editHandler}>Edit</button>
            </ul> */}
            <ul>
                <button onClick={deleteHandler}>Delete</button>
            </ul>
        </ContextMenu>
    );
}

export default MessageContextMenu;
