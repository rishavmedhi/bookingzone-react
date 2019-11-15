import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard'
import MyBooking from "./components/MyBooking/MyBooking";

export default function App() {
  return (
      <Router>
        <div>
          {/*<nav>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      <Link to="/">Home</Link>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <Link to="/about">About</Link>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <Link to="/users">Users</Link>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <Link to="/login">Login</Link>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</nav>*/}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/dashboard" component={Dashboard}>
              <Dashboard />
            </Route>
            <Route path="/dashboard/my-booking" component={MyBooking}>
              <MyBooking />
            </Route>
            <Route path="/login" component={Login}>
              <Login />
            </Route>
            <Route path="/" component={Login}>
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}