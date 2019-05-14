import React, { Component } from 'react';
import EditUser from '../EditUser'
import NewNightForm from '../NewNightForm'
import ReviewForm from '../ReviewForm'

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
      modalShowing: false,
      newActivity: false
    }

  }

  componentDidMount = async () => {
    
     await this.findAllUserActivities() 

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

  showNewActivityForm = () => {
    this.setState({
      newActivity: true
    })
  }

  resetPage = () => {
    this.setState({
      newActivity: false
    })
  }

  render() {

    console.log(this.props);
    console.log(this.state);

    const activities = this.state.userActivities.map((activity, i) => {
      return(
        <li key={i}>
        Name: {activity.name}<br/>
        Type: {activity.type}<br/>
        <img src={activity.photoUrl}/>
        <ReviewForm activity={activity}/>

        </li>

        )
    })
    const newActivities = activities.reverse()


    let display = ''
    if (this.state.newActivity) {
      display = <NewNightForm resetPage={this.resetPage}/>
    } else {
      display = (
        <div>
          <h1>{this.state.usernameDisplay} container displaying</h1>
          <h2>Your Previous Activities</h2>
          <ul>
            {newActivities}
          </ul>
          {this.state.modalShowing ? <EditUser closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} userToEdit={this.state.userToEdit}/> : <button type='submit' onClick={this.showModal}>Edit User</button>} <br/>
          <button type='submit' onClick={this.showNewActivityForm}>New Night Out</button>
          <button type="submit" onClick={this.deleteUser}>Delete Account</button>
          <button type="submit" onClick={this.logout}>Log Out</button>
        </div>
        )
    }


    return(
        <div>
          {display}



        </div>
      )
    
  }
}






export default UserContainer;