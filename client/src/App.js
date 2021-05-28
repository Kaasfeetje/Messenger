import { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import MessageContextMenu from "./components/context-menu/MessageContextMenu";
import ChatPage from "./components/pages/ChatPage";
import SigninPage from "./components/pages/SigninPage";
import SignupPage from "./components/pages/SignupPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import { history } from "./history";
import { useAPI } from "./hooks/useAPI";

function App({ location, match }) {
    const [response, makeRequest] = useAPI();

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (response.loading || response.loading === false) return;
        makeRequest({ url: "/users/me", method: "get" });
    }, [makeRequest, response.loading]);

    useEffect(() => {
        if (!response.loading && !response.hasError && response.data) {
            setUser(response.data);
        }
        if (!response.loading && response.hasError) {
            setUser(false);
        }
    }, [response]);

    const updateUser = () =>
        makeRequest({
            url: "/users/me",
            method: "get",
        });

    return (
        <Router history={history}>
            <Route
                path="/signin"
                render={() => <SigninPage onUserChange={updateUser} />}
                exact
            />
            <Route
                path="/signup"
                render={() => <SignupPage onUserChange={updateUser} />}
                exact
            />
            <PrivateRoute
                path="/rooms/:roomId"
                Component={ChatPage}
                exact
                user={user}
            />
            <PrivateRoute
                path="/rooms/:roomId/details"
                Component={ChatPage}
                exact
                user={user}
            />
            <PrivateRoute path="/" Component={ChatPage} exact user={user} />
            {/* <MessageContextMenu /> */}
        </Router>
    );
}

export default App;
