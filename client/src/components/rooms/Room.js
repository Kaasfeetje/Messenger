import React from "react";
import { history } from "../../history";
import { useAPI } from "../../hooks/useAPI";

function Room({ room, hasSearched }) {
    const [, makeRequest] = useAPI();

    const joinRoomHandler = (e) => {
        e.preventDefault();
        makeRequest({ url: `/chatroom/joined/${room.id}`, method: "get" });
        history.push(`/rooms/${room.id}`);
    };

    return (
        <div>
            <h2>{room.name}</h2>
            {hasSearched && <button onClick={joinRoomHandler}>Join</button>}
        </div>
    );
}

export default Room;
