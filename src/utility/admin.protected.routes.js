import React from "react";
import {Redirect, Route} from "react-router-dom";

function AdminProtectedRoute({component: Component, ...restOfProps}) {
    let isAdmin = false
    let user = localStorage.getItem("user");
    if (!(user == null)) {
        user = JSON.parse(user)
        isAdmin = user.is_admin
    }
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAdmin ? <Component {...props} /> : <Redirect to="/page_not_found"/>
            }
        />
    );
}

export default AdminProtectedRoute;