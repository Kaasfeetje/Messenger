import React, { useContext, useEffect, useState } from "react";

import "../../css/Chat.css";
import { history } from "../../history";
import { useAPI } from "../../hooks/useAPI";
import { SocketContext } from "../../socket";
import Chat from "../chat/Chat";
import ChatDetails from "../chat/ChatDetails";
import CreateRoom from "../rooms/CreateRoom";
import RoomList from "../rooms/RoomList";
function ChatPage({ match, user }) {
    const socket = useContext(SocketContext);
    const [response, makeRequest] = useAPI();

    const [room, setRoom] = useState(undefined);
    const [detailView, setDetailView] = useState(false);
    const [sidePanelStatus, setSidePanelStatus] = useState("rooms");
    //1 - rooms (roomlist panel)
    //2 - create-room (create room panel)

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
            {sidePanelStatus === "rooms" ? (
                <RoomList
                    room={room}
                    onCreateRoom={() => setSidePanelStatus("create-room")}
                />
            ) : sidePanelStatus === "create-room" ? (
                <CreateRoom onCancel={() => setSidePanelStatus("rooms")} />
            ) : (
                <div />
            )}

            {match.path.includes("details") ? (
                <ChatDetails
                    room={room}
                    onCancel={() => {
                        history.push(`/rooms/${room.id}`);
                    }}
                />
            ) : (
                <Chat
                    room={room}
                    user={user}
                    match={match}
                    onDetailView={() => {
                        history.push(`/rooms/${room.id}/details`);
                    }}
                />
            )}
        </div>
    );
}

export default ChatPage;
