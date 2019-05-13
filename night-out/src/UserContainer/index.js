import React, { Component } from 'react';
import EditUser from '../EditUser'


class UserContainer extends Component {

  constructor() {
    super();
    this.state = {
      userActivities: [],
      userToEdit: {
        email: '',
        username: ''
      },
      usernameDisplay: '',
      modalShowing: false
    }

  }

  componentDidMount = () => {
    
     this.findAllUserActivities() 
     this.setState({
      userToEdit: {
        email: this.props.email,
        username: this.props.username
      },
      usernameDisplay: this.props.username

     })
     console.log(this.props);

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
  
  logout = async () => {
    try {

      const response = await fetch('http://localhost:3679/api/v1/user/logout', {
        method: 'GET',
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

  showModal = (movie) => {
    this.setState({
      modalShowing: true
    })
  }

  handleFormChange = (e) => {
    this.setState({
      userToEdit: {
        ...this.state.userToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      }
    })
  }

  closeAndEdit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await fetch('http://localhost:3679/api/v1/user/' + this.props.userId + '/edit', {
        method: 'PUT',
        body: JSON.stringify(this.state.userToEdit),
        headers: {
          'Content-Type': 'application/json'
        }


      })

      const parsedResponse = await updatedUser.json();
      console.log(parsedResponse);
      

      this.setState({
        userToEdit: parsedResponse.data,
        modalShowing: false,
        usernameDisplay: parsedResponse.data.username
      })


    } catch (err) {
      console.log(err);
    }
  }

  render() {

    console.log(this.props);

    return(
        <div>
          <h1>{this.state.usernameDisplay} container displaying</h1>
          <h2>Your Previous Activities</h2>
          {this.state.modalShowing ? <EditUser closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} userToEdit={this.state.userToEdit}/> : <button type='submit' onClick={this.showModal}>Edit User</button>}
          <button type="submit" onClick={this.deleteUser}>Delete Account</button>
          <button type="submit" onClick={this.logout}>Log Out</button>



        </div>
      )
    
  }
}






export default UserContainer;