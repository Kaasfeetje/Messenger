import React, { useEffect, useState } from "react";
import { history } from "../../history";
import { useAPI } from "../../hooks/useAPI";

function ChatDetails({ room, onCancel }) {
    //get room details
    const [response, makeRequest] = useAPI();
    const [leaveResponse, makeLeaveRequest] = useAPI();

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

    useEffect(() => {
        if (
            leaveResponse.loading === true ||
            leaveResponse.loading === undefined ||
            leaveResponse.hasError
        )
            return;

        history.push("/");
    }, [leaveResponse]);

    const leaveRoomHandler = () => {
        makeLeaveRequest({ url: `/chatroom/joined/${room.id}`, method: "get" });
    };

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
                <button
                    className="leave-btn"
                    onClick={() => leaveRoomHandler()}
                >
                    Leave room...
                </button>
            </div>
        </div>
    );
}

export default ChatDetails;
