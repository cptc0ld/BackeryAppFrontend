import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    let isAuthenticated = false
    const user = localStorage.getItem("user");
    if(!(user == null)){
        isAuthenticated = true
    }

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default ProtectedRoute;