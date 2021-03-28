import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Todos from "./components/todos/Todos";
import Sidebar from "./components/Sidebar";

const Home = () => {
  return <div>Welcome!</div>;
};
const Login = () => {
  return <div>Login</div>;
};

function App() {
  return (
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
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/todos">
              <Todos />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
