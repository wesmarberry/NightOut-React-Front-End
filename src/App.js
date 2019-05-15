import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import UserContainer from './UserContainer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      userId: '',
      email: '',
      logged: false,
      needToRegister: false
    }
  }

  setUser = (username, userId, email, logged) => {
    console.log('ran setUser with' + username + ' ' + userId);
    this.setState({
      username: username,
      userId: userId,
      email: email,
      logged: logged
    })
  }

  showRegister = () => {
    this.setState({
      needToRegister: true
    })
  }

  resetToLogin = () => {
    this.setState({
      username: '',
      userId: '',
      email: '',
      logged: false,
      needToRegister: false
    })
  }

  render(){

    console.log(this.state);
    let display = '' 
    if (this.state.logged) {
      display = <UserContainer resetToLogin={this.resetToLogin} username={this.state.username} userId={this.state.userId} email={this.state.email} resetToLogin={this.resetToLogin}/>
    } else if (this.state.needToRegister) {
      display = <Register setUser={this.setUser}/>
    } else {
      display = <Login setUser={this.setUser} showRegister={this.showRegister}/>
    }



    return (
      <div className="App">
          {display}
          
          
        
      
      </div>
    );
    
  }
}

export default App;
