import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './Login'
import Register from './Register'

class App extends Component {
  constructor() {
    super()
    this.state = {
      needToRegister: false
    }
  }

  render(){

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path='/register' component={ Register } />
          
        
        </Switch>
      </div>
    );
    
  }
}

export default App;
