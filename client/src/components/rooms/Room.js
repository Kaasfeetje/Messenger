import React from "react";
import { history } from "../../history";

function Room({ room }) {
    const joinRoomHandler = (e) => {
        e.preventDefault();

        history.push(`/rooms/${room.id}`);
    };

    return (
        <div>
            <h2>{room.name}</h2>
            <button onClick={joinRoomHandler}>Join</button>
        </div>
    );
}

export default Room;
