import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import firebase from "firebase"

import Todos from "./components/todos/Todos";
import Sidebar from "./components/Sidebar";
import LoginButton from "./components/LoginButton";
import AuthContext, {
  AuthContextProvider,
  IUser,
} from "./context/authContext/AuthContext";

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

  const updateUser = (_user: IUser | null) => {
    setUser(_user);
  };

  const authContextValues = {
    user,
    updateUser,
  };

  const signOut = () => {
    firebase.auth().signOut()
    .then(() => {
      console.log('logged out')
      updateUser(null)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <AuthContextProvider value={authContextValues}>
      <Router>
        <div className="App h-screen flex">
          <Sidebar>
            <Link
              className="hover:bg-red-400 transform duration-300 font-medium ease-in-out my-2 rounded-md w-3/4 text-center py-2"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="hover:bg-red-400 transform duration-300 font-medium ease-in-out my-2 rounded-md w-3/4 text-center py-2"
              to="/todos"
            >
              ToDos
            </Link>
          </Sidebar>
          <div className="h-full w-full">
            <div className="h-14 w-full flex flex-row-reverse px-2 py-1">
              {user ? (
                <div>
                  <p>{user.displayName}</p>
                  <button onClick={signOut}>Sign Out</button>
                </div>
              ) : (
                <LoginButton />
              )}
            </div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/todos">
                <Todos />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
