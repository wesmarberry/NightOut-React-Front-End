import React, { Component } from 'react';


class UserContainer extends Component {
  constructor() {
    super();
    this.state = {
      userActivities: []
    }

  }

  componentDidMount = () => {
    
     this.findAllUserActivities() 


  }

 findAllUserActivities = async () => {
   
    try {

      const response = await fetch('http://localhost:3679/api/v1/user/' + this.props.userId, {
        method: 'GET',
        credentials: 'include', // on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await response.json();
      console.log(parsedResponse);




      

      this.setState({
        userActivities: parsedResponse.data.activities
      })



    } catch (err) {

    }

 }

deleteUser = async () => {
  try {

      const response = await fetch('http://localhost:3679/api/v1/user/' + this.props.userId, {
        method: 'DELETE',
        credentials: 'include', // on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await response.json();
      console.log(parsedResponse);




      

      this.props.resetToLogin()



    } catch (err) {

    }
}
  

  render() {

    console.log(this.props);

    return(
        <div>
          <h1>{this.props.username} container displaying</h1>
          <h2>Your Previous Activities</h2>
          <button type="submit" onClick={this.deleteUser}>Delete Account</button>


        </div>
      )
    
  }
}

export default UserContainer;