import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      lat: 0,
      lng: 0
    }

  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((data) => {
      const latLong = data
      console.log(latLong);
      // console.log(latLong.coords.latitude);
      this.setState({
        lat: latLong.coords.latitude,
        lng: latLong.coords.longitude
      })
      

    })
    
  }
  
  handleChange = (e) => {
    
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  

  handleSubmit = async (e) => {
    e.preventDefault()

    console.log(this.state);
    try {

      const loginResponse = await fetch('http://localhost:3679/api/v1/user/new', {
        method: 'POST',
        credentials: 'include', // on every request we have to send the cookie
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse);




      if (parsedResponse.data === 'login successful') {

        this.props.history.push('/user')
      }

      this.setState({
        username: parsedResponse.session.username
      })




    } catch (err) {

    }
  }




  

  render() {

    

    return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/><br/>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/><br/>
            <input type="submit" value="Log In" />
          </form>
          <Link to='/register'>Register</Link>
        </div>
      )
    
  }
}

export default Login;