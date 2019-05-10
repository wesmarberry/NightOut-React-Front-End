import React, { Component } from 'react';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }

  }


  

  

  render() {

    console.log(this.state);

    return(
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/><br/>
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/><br/>
          <input type="submit" value="Log In" />
        </form>
      )
    
  }
}

export default Login;