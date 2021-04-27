import React, { useContext, useEffect, useState } from "react";

import "../../css/Chat.css";
import { useAPI } from "../../hooks/useAPI";
import { SocketContext } from "../../socket";
import Chat from "../chat/Chat";
import RoomList from "../rooms/RoomList";
function ChatPage({ match }) {
    const socket = useContext(SocketContext);
    const [response, makeRequest] = useAPI();

    const [room, setRoom] = useState(undefined);

    useEffect(() => {
        if (response.loading || response.loading === false) return;
        if (match.params.roomId) {
            makeRequest({
                url: `/chatroom/${match.params.roomId}`,
                method: "get",
            });
        }
    }, [match.params.roomId, makeRequest, response.loading]);

    useEffect(() => {
        if (!response.loading && !response.hasError && response.data) {
            setRoom(response.data);
            socket.emit("join_room", response.data.name);
        }
    }, [response, socket]);

    return (
        <div>
            <RoomList />
            <Chat room={room} />
        </div>
    );
}

export default ChatPage;
