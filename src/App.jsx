/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Home from './pages/Home';

import LogoutBtn from './components/LogoutBtn';

const UserAuthRoute = ({ children, ...rest }) => {
  // const user = useSelector((state) => state.user);
  // const isAuthenticated = user.username === 'johnshift';

  const isAuthenticated = localStorage.getItem('username') === 'johnshift';

  return (
    <Route
      {...rest}
      render={({ location }) => (isAuthenticated
        ? (children)
        : (<Redirect to={{ pathname: '/login', state: { from: location } }} />))}
    />
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <LogoutBtn />
        <Switch>
          <UserAuthRoute exact path="/">
            <Home />
          </UserAuthRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">Not Found</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
