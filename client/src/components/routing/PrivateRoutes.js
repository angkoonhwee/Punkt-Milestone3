import React from "react";
import { Route, Redirect } from "react-router-dom";
import { loadUser } from "../../utils/localStorage";

//For protected routes
const PrivateRoute = ({ 
    component: Component,
    ...rest
}) =>{
    const user = loadUser();
    return (
        <Route 
            {...rest}
            render={props => 
                {
                    if (user) {
                       return <Component {...props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }
            }
        />
)};

export default PrivateRoute;