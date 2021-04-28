import React, { useContext, useEffect, useState } from "react";

import "../../css/Chat.css";
import { useAPI } from "../../hooks/useAPI";
import { SocketContext } from "../../socket";
import Chat from "../chat/Chat";
import RoomList from "../rooms/RoomList";
function ChatPage({ match, user }) {
    const socket = useContext(SocketContext);
    const [response, makeRequest] = useAPI();

    const [room, setRoom] = useState(undefined);

    //if in room get the room so socket can join the room
    useEffect(() => {
        if (match.params.roomId) {
            makeRequest({
                url: `/chatroom/${match.params.roomId}`,
                method: "get",
            });
            socket.emit("join_room", match.params.roomId);
        }

        return () => {
            socket.emit("leave_room", match.params.roomId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.roomId]);

    useEffect(() => {
        if (response.loading === true || response.loading === undefined) return;
        setRoom(response.data);
    }, [response]);

    return (
        <div>
            <RoomList />
            <Chat room={room} user={user} match={match} />
        </div>
    );
}

export default ChatPage;
