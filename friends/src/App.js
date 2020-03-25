import React from 'react';
import Login from "./components/Login"
import { Route, Link, Switch, BrowserRouter as Router, NavLink } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import FriendList from './components/FriendList';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navigation">
          <ul>
            <h1>Friends</h1>
            <NavLink to="/login">Log in</NavLink>
          </ul>
        </div>
        <Switch>
          <Route exact path="/">Home</Route>
          <PrivateRoute exact path="/friendlist" component={FriendList}/>
          <Route path="/login" component={Login}></Route>-
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
