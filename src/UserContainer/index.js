import React, { Component } from 'react';
import EditUser from '../EditUser'
import NewNightForm from '../NewNightForm'
import ReviewForm from '../ReviewForm'
import ActivityContainer from '../ActivityContainer'

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
      newActivity: false,
      showActivity: false,
      activityToShow: '',
      session: ''
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


  }

 findAllUserActivities = async () => {
   
    try {

      const response = await fetch(process.env.REACT_APP_API_CALL + 'user/' + this.props.userId, {
        method: 'GET',
        credentials: 'include', // on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await response.json();





      

      this.setState({
        userActivities: parsedResponse.activities,
        session: parsedResponse.session

      })



    } catch (err) {

    }

 }

deleteUser = async () => {
  try {

      const response = await fetch(process.env.REACT_APP_API_CALL + 'user/' + this.props.userId, {
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

      const response = await fetch(process.env.REACT_APP_API_CALL + 'user/logout', {
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
      const updatedUser = await fetch(process.env.REACT_APP_API_CALL + 'user/' + this.props.userId + '/edit', {
        method: 'PUT',
        credentials: 'include',
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
    console.log('ran resetPage');
    this.findAllUserActivities()
    this.setState({
      modalShowing: false,
      newActivity: false,
      showActivity: false
    })
  }

  showActivity = async (e) => {
    console.log(e.currentTarget.id);
    const id = e.currentTarget.id
    try {
      const response = await fetch(process.env.REACT_APP_API_CALL + 'activity/' + id, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }


      })

      const parsedResponse = await response.json();
      console.log(parsedResponse);
      

      this.setState({
        showActivity: true,
        activityToShow: parsedResponse,

      })


    } catch (err) {
      console.log(err);
    }

  }



  render() {


    console.log(this.state);

    const activities = this.state.userActivities.map((activity, i) => {
      return(
        <li key={i} className='activity-li'>
          <div>
            <p className='link' onClick={this.showActivity} id={activity._id}> Name: {activity.name}</p>
            <p>Type: {activity.type}</p><br/>
          </div>
          <ReviewForm activity={activity}/>

        </li>

        )
    })
    const newActivities = activities.reverse()


    let display = ''
    if (this.state.usernameDisplay === '') {
      display = ''
    } else {
      if (this.state.newActivity) {
        display = <NewNightForm resetPage={this.resetPage} userId={this.props.userId} position={this.props.position}/>
      } else if (this.state.newActivity === false && this.state.showActivity === false) {
        display = (
          <div>
            <h1 className='header'>GoOut!</h1>
            <p className='description'>Decide Where You're Going Now</p>
            <h2>{this.state.usernameDisplay}</h2>
            <h4>Experiences Going Out</h4>
            <div className='centerDiv'>
              <div className='overflowContainer'>
                <ul className='activityList'>
                  {newActivities}
                </ul>
              </div>  
            </div>
            {this.state.modalShowing ? <EditUser closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} userToEdit={this.state.userToEdit}/> : <button type='submit' onClick={this.showModal}>Edit User</button>} <br/>
            <button type='submit' onClick={this.showNewActivityForm}>New Night Out</button>
            <button type="submit" onClick={this.deleteUser}>Delete Account</button>
            <button type="submit" onClick={this.logout}>Log Out</button>
          </div>
          )
      } else {
        display = <ActivityContainer activityToShow={this.state.activityToShow} session={this.state.session} resetPage={this.resetPage} position={this.props.position}/>
      }
      
    }


    return(
        <div>
          {display}



        </div>
      )
    
  }
}






export default UserContainer;