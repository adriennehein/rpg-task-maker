import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

const Nav = styled.div`
  background: #061f2d;
  padding: 40px 0;
  > a {
    color: #fff;
    padding: 10px 30px;
    text-decoration: none;
    font-weight: 600;
  }
`;

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>

          <Nav>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </Nav>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </Router>
      </div>
    )
  }
}
