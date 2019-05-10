import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
      
      
      </Switch>
    </div>
  );
}

export default App;
