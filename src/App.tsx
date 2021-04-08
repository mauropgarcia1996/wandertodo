import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./security/ProtectedRoute";

import firebase from "firebase";

import Todos from "./components/todos/Todos";
import Login from "./components/Login";

import Sidebar from "./components/Sidebar";
import LoginButton from "./components/LoginButton";

import AuthContext, {
  AuthContextProvider,
  IUser,
} from "./context/authContext/AuthContext";

const SidebarLinks = [
  { route: "/", name: "Home" },
  { route: "/todos", name: "Collection" },
];

const Home: React.FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    setUser(authContext.user);
  }, [authContext]);

  return <div>{user?.displayName}</div>;
};

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [active, setActive] = useState("");

  const updateUser = (_user: IUser | null) => {
    setUser(_user);
  };

  const authContextValues = {
    user,
    updateUser,
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logged out");
        updateUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContextProvider value={authContextValues}>
      <Router>
        <div className="App h-screen flex text-gray-100">
          <Sidebar>
            {!user ? (
              <Link
                className={`sidebar-link w-full transform pl-5 flex items-center duration-300 font-medium ease-in-out my-2 text-center py-3 `}
                to="/login"
              >
                <span className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </span>
                Authentication
              </Link>
            ) : (
              ""
            )}
            {SidebarLinks.map((link, index) => (
              <Link
                key={index}
                className={
                  `sidebar-link w-full transform pl-5 flex items-center duration-300 font-medium ease-in-out my-2 text-center py-3 ` +
                  (active === link.route ? "sidebar-link-active" : "")
                }
                to={link.route}
                onClick={() => setActive(link.route)}
              >
                <span className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </span>
                {link.name}
              </Link>
            ))}
          </Sidebar>
          <div className="h-full w-full main-bg">
            <div className="h-14 w-full flex flex-row-reverse px-2 py-1">
              {user ? (
                <div className="flex items-center mx-2">
                  <img
                    className="mx-5 rounded-full"
                    src={user.photoURL!}
                    style={{ width: "32px", height: "32px" }}
                  />
                  <button onClick={signOut}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <LoginButton />
              )}
            </div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/todos" component={<Todos />} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
