import React, { useEffect, useState } from "react";
import { history } from "../../history";
import { useAPI } from "../../hooks/useAPI";

function Settings({ onCancel, user }) {
    const [response, makeRequest] = useAPI();

    const [nickname, setNickname] = useState(user.nickname || "");
    const [username, setUsername] = useState(user.username || "");
    const [email, setEmail] = useState(user.email || "");
    const [password, setPassword] = useState();

    const submitSettings = (e) => {
        e.preventDefault();
        makeRequest({
            url: `/users/me/update`,
            method: "put",
            data: { username, nickname, email, password },
        });
    };

    useEffect(() => {
        if (response.loading === false && response.data && !response.hasError) {
            onCancel();
        }

        if (
            response.loading === false &&
            !response.hasError &&
            !response.data
        ) {
            history.push("/signin");
        }
    }, [response, onCancel]);

    const logout = () => {
        makeRequest({ url: "/users/signout", method: "post" });
    };

    return (
        <div className="sidepanel">
            <div className="roomlist-search">
                <h2>Update Account</h2>
            </div>
            <form
                onSubmit={submitSettings}
                className="roomlist-content create-room-form"
            >
                <h3>Nickname</h3>
                <div className="form-item">
                    <label htmlFor="nickname">
                        <i className="fas fa-address-card"></i>
                    </label>
                    <input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        id="nickname"
                        placeholder="Nickname"
                    ></input>
                </div>
                <h3>Username</h3>
                <div className="form-item">
                    <label htmlFor="username">
                        <i className="far fa-address-card"></i>
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        placeholder="Username"
                    ></input>
                </div>
                <h3>Email</h3>
                <div className="form-item">
                    <label htmlFor="email">
                        <i className="fas fa-envelope"></i>
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Email"
                    ></input>
                </div>
                <h3>Password</h3>
                <div className="form-item">
                    <label htmlFor="password">
                        <i className="fas fa-key"></i>
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        placeholder="******"
                        type="password"
                    ></input>
                </div>
                <button className="roomlist-icon new">
                    <i className="fas fa-check" />
                </button>
                <div onClick={() => logout()} className="roomlist-icon logout">
                    <i className="fas fa-user-minus" />
                </div>
                <div onClick={() => onCancel()} className="roomlist-icon left">
                    <i className="fas fa-chevron-left" />
                </div>
            </form>
        </div>
    );
}

export default Settings;
