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
    const [roomsJoinedResponse, makeRoomsRequest] = useAPI();

    //handle search request
    useEffect(() => {
        if (!response.loading && !response.hasError && response.data) {
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

    useEffect(() => {
        if (!roomsJoinedResponse.loading && !roomsJoinedResponse.hasError) {
            console.log("test", roomsJoinedResponse.data);
            setRooms(roomsJoinedResponse.data);
        }
    }, [roomsJoinedResponse]);

    useEffect(() => {
        if (
            roomsJoinedResponse.loading ||
            roomsJoinedResponse.loading === false ||
            !rooms
        )
            return;
        makeRoomsRequest({ url: "/chatroom/joined", method: "GET" });
    }, [roomsJoinedResponse.loading, rooms, makeRoomsRequest]);

    return (
        <div className="roomlist">
            <RoomSearch onSubmit={searchHandler} />
            <div className="roomlist-content">
                {rooms &&
                    rooms.map((room) => (
                        <Room
                            key={room.id}
                            room={room}
                            hasSearched={hasSearched}
                        />
                    ))}
            </div>
            <div className="roomlist-new">
                <i className="fas fa-plus" />
            </div>
        </div>
    );
}

export default RoomList;
