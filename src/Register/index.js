import React, { Component } from 'react';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
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




      if (parsedResponse.data === 'registration successful') {
        console.log('registration successful');

      }
      
      this.setState({
        username: parsedResponse.session.username,
        email: parsedResponse.session.email,
        userId: parsedResponse.session.userDbId,
        logged: true
      })
      this.props.setUser(this.state.username, this.state.userId, this.state.email, true)



    } catch (err) {

    }
  }




  

  render() {

        let display = ''
        if (this.state.lat !== 0) {
          display = <input type="submit" value="Register" />
        } else {
          display = <p>...Getting Your Location...<br/>*Location Services Must be Enabled to Enable Registration</p>
        }

    return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange}/><br/>
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/><br/>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/><br/>
            {display}
          </form>
        </div>
      )
    
  }
}

export default Register;










