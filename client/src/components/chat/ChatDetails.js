import React, { useEffect, useState } from "react";
import { useAPI } from "../../hooks/useAPI";

function ChatDetails({ room, onCancel }) {
    //get room details
    const [response, makeRequest] = useAPI();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!room) return;
        makeRequest({ url: `/chatroom/${room.id}/details`, method: "get" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room]);

    useEffect(() => {
        if (
            response.loading === true ||
            response.loading === undefined ||
            response.hasError
        )
            return;

        setUsers(response.data.users);
    }, [response]);

    return (
        <div className="chat">
            <h2 className="chat-info clickable" onClick={(e) => onCancel()}>
                <i className="fas fa-chevron-left" />
                Go back
            </h2>
            <div className="chat-content">
                <h2 className="chat-name">{room ? room.name : "Loading..."}</h2>
                <hr />
                <div className="chat-users">
                    <h3>Users</h3>
                    <hr />
                    {users &&
                        users.map((usr) => (
                            <div key={usr.user.id}>
                                <h5>{usr.user.nickname}</h5>
                                <span>{usr.user.username}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ChatDetails;
