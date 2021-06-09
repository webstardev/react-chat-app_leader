import React from "react";
import { useRecoilValue } from "recoil";
import { Route, Redirect } from "react-router-dom";

import { authState } from "../atoms";
import { routes } from "../constants";

import Login from "../pages/Login";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const auth = useRecoilValue(authState);

  if (auth === null)
    return <Route exact path={routes.LOGIN} component={Login} />;
  else {
    if (otherProps.redirectTo) {
      return (
        <Redirect
          to={otherProps.redirectTo ? otherProps.redirectTo : routes.HOME}
        />
      );
    } else {
      return <Route render={(props) => <Component {...props} />} />;
    }
  }
};

export default PrivateRoute;
