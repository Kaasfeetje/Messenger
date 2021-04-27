import React, { useState } from "react";

function RoomSearch({ onSubmit }) {
    const [keyword, setKeyword] = useState("");

    return (
        <form
            className="roomlist-search"
            onSubmit={(e) => onSubmit(e, keyword)}
        >
            <div>
                <input
                    placeholder="Search for room..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button htmlFor="room-search">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </form>
    );
}

export default RoomSearch;
