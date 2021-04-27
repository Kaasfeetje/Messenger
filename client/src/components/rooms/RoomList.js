import React, { useEffect, useState } from "react";
import "../../css/Rooms.css";
import { useAPI } from "../../hooks/useAPI";
import Room from "./Room";
import RoomSearch from "./RoomSearch";

function RoomList() {
    const [rooms, setRooms] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [hasSearched, setHasSearched] = useState(false);

    const [response, makeRequest] = useAPI();

    useEffect(() => {
        if (!response.loading && !response.hasError) {
            setRooms(response.data);
            setHasSearched(true);
        }
    }, [response]);

    const searchHandler = (e, keyword) => {
        e.preventDefault();
        if (keyword === "") return;
        makeRequest({
            url: `/chatroom/${keyword}/search`,
            method: "get",
        });
    };

    return (
        <div className="roomlist">
            <RoomSearch onSubmit={searchHandler} />
            <div className="roomlist-content">
                {rooms && rooms.map((room) => <Room room={room} />)}
            </div>
            <div className="roomlist-new">
                <i className="fas fa-plus" />
            </div>
        </div>
    );
}

export default RoomList;
