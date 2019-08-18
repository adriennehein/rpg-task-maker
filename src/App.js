import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </Router>
      </div>
    )
  }
}
