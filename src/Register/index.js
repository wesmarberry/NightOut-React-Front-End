import React, { Component } from 'react';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
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

      const loginResponse = await fetch(process.env.REACT_APP_API_CALL + 'user/register', {
        method: 'POST',
        credentials: 'include', // on every request we have to send the cookie
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse);




      if (parsedResponse.data === 'Please fill out all required fields') {
        this.setState({
          message: parsedResponse.data
        })


      } else {
        this.setState({
          username: parsedResponse.session.username,
          email: parsedResponse.session.email,
          userId: parsedResponse.session.userDbId,
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
          display = <input className='largeButton' type="submit" value="Register" />
        } else {
          display = <p className='redMessage'>...Getting Your Location...<br/>*Location Services Must be Enabled to Enable Registration</p>
        }

    return(
        <div>
          <h1 className='header'>GoOut!</h1>
          <p className='description'>Decide Where You're Going Now</p>

          <form className='loginForm' onSubmit={this.handleSubmit}>
            <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange}/><br/>
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/><br/>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/><br/>
            <div className='loginButtonContainer'>
              {display}
              <button className='largeButton' onClick={this.props.resetToLogin}>Return To Login</button>
            </div>
          </form>
          <p className='redMessage'>{this.state.message}</p>
        </div>
      )
    
  }
}

export default Register;










