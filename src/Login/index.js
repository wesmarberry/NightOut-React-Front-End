import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      userId: '',
      lat: 0,
      lng: 0,
      message: ''
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

      const loginResponse = await fetch(process.env.REACT_APP_API_CALL + 'user/new', {
        method: 'POST',
        credentials: 'include', // on every request we have to send the cookie
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse);




      
      if (parsedResponse.data === 'username or password is incorrect') {
        this.setState({
          message: parsedResponse.data
        })
      } else if (parsedResponse.data === "username or password does not exist") {
        this.setState({
          message: parsedResponse.data
        })
      } else {
        this.setState({
          username: parsedResponse.session.username,
          userId: parsedResponse.session.userDbId,
          email: parsedResponse.session.email,
          logged: true
        })
        this.props.setUser(this.state.username, this.state.userId, this.state.email, true, this.state.lat, this.state.lng)
        
      }

     


    } catch (err) {

    }
  }




  

  render() {
        let display = ''
        if (this.state.lat !== 0) {
          display = <input className='largeButton' type="submit" value="Log In" />
        } else {
          display = <p className='redMessage'>...Getting Your Location...<br/>*Location Services Must be Enabled to Access Login<br/></p>
        }

    return(
        <div>

          <h1 className='header'>GoOut!</h1>
          <p className='description'>Decide Where You're Going Now</p>
          <form className='loginForm' onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/><br/>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/><br/>
            <div className='loginButtonContainer'>
              {display}
              <button className ='largeButton' onClick={this.props.showRegister}>Register</button>
            </div>
          </form>
          
          <p className='redMessage'>{this.state.message}</p>
        </div>
      )
    
  }
}

export default Login;