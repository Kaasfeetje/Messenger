import React, { useEffect, useState } from "react";
import "../../css/Rooms.css";
import { useAPI } from "../../hooks/useAPI";
import Room from "./Room";
import RoomSearch from "./RoomSearch";

function RoomList({ room, onCreateRoom }) {
    const [rooms, setRooms] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [hasSearched, setHasSearched] = useState(false);

    const [response, makeRequest] = useAPI();
    const [roomsJoinedResponse, makeRoomsRequest] = useAPI();

    //set search
    useEffect(() => {
        if (!response.loading && !response.hasError && response.data) {
            setRooms(response.data);
            setHasSearched(true);
        }
    }, [response]);

    //search request
    const searchHandler = (e, keyword) => {
        e.preventDefault();
        if (keyword === "") return;
        makeRequest({
            url: `/chatroom/${keyword}/search`,
            method: "get",
        });
    };

    //set rooms
    useEffect(() => {
        if (!roomsJoinedResponse.loading && !roomsJoinedResponse.hasError) {
            setRooms(roomsJoinedResponse.data);
        }
    }, [roomsJoinedResponse]);

    //get rooms joined request
    useEffect(() => {
        if (
            roomsJoinedResponse.loading ||
            roomsJoinedResponse.loading === false ||
            !rooms
        )
            return;
        makeRoomsRequest({ url: "/chatroom/joined", method: "GET" });
    }, [roomsJoinedResponse.loading, rooms, makeRoomsRequest]);

    const unSearch = () => {
        makeRoomsRequest({ url: "/chatroom/joined", method: "GET" });
        setHasSearched(false);
    };

    return (
        <div className="sidepanel">
            <RoomSearch onSubmit={searchHandler} />
            {hasSearched && (
                <div
                    className="roomlist-has-searched clickable"
                    onClick={unSearch}
                >
                    <i className="fas fa-arrow-left" />
                    <span>Go Back</span>
                </div>
            )}
            <div className="roomlist-content">
                {rooms &&
                    rooms.map((_room, i) => (
                        <Room
                            key={_room.id}
                            room={_room}
                            hasSearched={hasSearched}
                            even={i % 2 === 0}
                            active={room && room.id === _room.id}
                        />
                    ))}
            </div>
            <div className="roomlist-icon new" onClick={() => onCreateRoom()}>
                <i className="fas fa-plus" />
            </div>
            <div className="roomlist-icon settings">
                <i className="fas fa-users-cog" />
            </div>
        </div>
    );
}

export default RoomList;
