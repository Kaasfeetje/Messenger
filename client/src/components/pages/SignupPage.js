import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../css/Signinup.css";
import { history } from "../../history";
import { useAPI } from "../../hooks/useAPI";
function SignupPage({ onUserChange }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [response, makeRequest] = useAPI();

    useEffect(() => {
        if (!response.loading && response.data && !response.hasError) {
            history.push("/");
            onUserChange();
        }
    }, [response, onUserChange]);

    const submitHandler = (e) => {
        e.preventDefault();

        //TODO: add error to response object to show it
        if (
            password === "" ||
            passwordConfirm === "" ||
            password !== passwordConfirm ||
            username === "" ||
            email === ""
        )
            return;

        makeRequest({
            url: "/users/signup",
            method: "post",
            data: {
                password,
                username,
                email,
            },
        });
    };
    return (
        <div className="signinup">
            <form className="signinup-form" onSubmit={submitHandler}>
                <h2>Signin</h2>
                <div className="signinup-form-item">
                    <label htmlFor="username">
                        <i className="fas fa-user"></i>
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        placeholder="Username"
                        type="text"
                    />
                </div>
                <div className="signinup-form-item">
                    <label htmlFor="email">
                        <i className="fas fa-envelope"></i>
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Email"
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
                <div className="signinup-form-item">
                    <label htmlFor="password-confirm">
                        <i className="fas fa-key"></i>
                    </label>
                    <input
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        id="password-confirm"
                        placeholder="Please confirm your password"
                        type="password"
                    />
                </div>
                <button disabled={response.loading}>Sign in</button>
                <div className="signinup-option">
                    <span>
                        Already have an account? Sign in{" "}
                        <Link to="/signin">Here</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default SignupPage;
