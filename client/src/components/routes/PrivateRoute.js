import React, { useEffect } from "react";
import { Route } from "react-router";
import { history } from "../../history";

function PrivateRoute({ Component, exact, path, user }) {
    useEffect(() => {
        if (user === false) history.push("/signin");
    }, [user]);

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => <Component {...props} user={user} />}
        />
    );
}

export default PrivateRoute;
