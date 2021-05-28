import React, { useEffect, useState } from "react";
import { history } from "../../history";
import { useAPI } from "../../hooks/useAPI";
import CustomCheckbox from "../common/CustomCheckbox";

function CreateRoom({ onCancel }) {
    const [response, makeRequest] = useAPI();

    const [isTrue, setIsTrue] = useState(true);
    const [roomName, setRoomName] = useState("");

    const createRoomHandler = (e) => {
        e.preventDefault();
        makeRequest({
            url: "/chatroom",
            method: "post",
            data: { name: roomName, isPublic: isTrue },
        });
    };

    useEffect(() => {
        if (
            response.loading === true ||
            response.loading === undefined ||
            response.hasError
        )
            return;
        onCancel();
        history.push(`/rooms/${response.data.id}`);
    }, [response, onCancel]);

    return (
        <div className="sidepanel">
            <div className="roomlist-search">
                <h2>Create Room</h2>
            </div>
            <form
                onSubmit={createRoomHandler}
                className="roomlist-content create-room-form"
            >
                <div className="form-item">
                    <label htmlFor="room-name">
                        <i className="fas fa-edit"></i>
                    </label>
                    <input
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        id="room-name"
                        placeholder="Room name"
                    ></input>
                </div>
                <div className="form-item checkbox">
                    {isTrue ? (
                        <label
                            className="relative"
                            onClick={() => setIsTrue(!isTrue)}
                        >
                            Room is Public
                        </label>
                    ) : (
                        <label
                            className="relative"
                            onClick={() => setIsTrue(!isTrue)}
                        >
                            Room is private
                        </label>
                    )}
                    <CustomCheckbox
                        trueIcon="lock-open"
                        falseIcon="lock"
                        value={isTrue}
                        onChange={() => setIsTrue(!isTrue)}
                    />
                </div>
                <button className="roomlist-icon new">
                    <i className="fas fa-plus" />
                </button>
                <div onClick={() => onCancel()} className="roomlist-icon left">
                    <i className="fas fa-chevron-left" />
                </div>
            </form>
        </div>
    );
}

export default CreateRoom;
