import React, { useEffect, useState } from "react";

import "../../css/Signinup.css";
import { history } from "../../history";
import { useAPI } from "../../hooks/useAPI";
function SigninPage({ onUserChange }) {
    const [usernameorEmail, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, makeRequest] = useAPI();

    //TODO: Add spinner

    useEffect(() => {
        if (!response.loading && response.data && !response.hasError) {
            history.push("/");
            onUserChange();
        }
    }, [response, onUserChange]);

    const submitHandler = (e) => {
        e.preventDefault();

        //TODO: add error to response object to show it
        if (password === "" || usernameorEmail === "") return;

        makeRequest({
            url: "/users/signin",
            method: "post",
            data: {
                password,
                usernameorEmail,
            },
        });
    };

    return (
        <div className="signinup">
            <form className="signinup-form" onSubmit={submitHandler}>
                <h2>Signin</h2>
                <div className="signinup-form-item">
                    <label htmlFor="username-or-email">
                        <i className="fas fa-user"></i>
                    </label>
                    <input
                        value={usernameorEmail}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        id="username-or-email"
                        placeholder="Username or email"
                        type="text"
                    />
                </div>
                <div className="signinup-form-item">
                    <label htmlFor="password">
                        <i className="fas fa-key"></i>
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        placeholder="Password"
                        type="password"
                    />
                </div>
                <button disabled={response.loading}>Sign in</button>
            </form>
        </div>
    );
}

export default SigninPage;
