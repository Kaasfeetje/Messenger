import { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import ChatPage from "./components/pages/ChatPage";
import SigninPage from "./components/pages/SigninPage";
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

    return (
        <Router history={history}>
            <Route path="/signin" component={SigninPage} exact />
            <PrivateRoute
                path="/rooms/:roomId"
                Component={ChatPage}
                exact
                user={user}
            />
            <PrivateRoute path="/" Component={ChatPage} exact user={user} />
        </Router>
    );
}

export default App;
