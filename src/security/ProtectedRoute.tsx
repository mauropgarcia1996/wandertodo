import React, { useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import AuthContext from "../context/authContext/AuthContext";
import { Route, Redirect } from "react-router-dom";

type Props = { component: React.ReactNode } & RouteComponentProps;

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      render={({ location }) =>
        authContext.user ? (
          props.component
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;