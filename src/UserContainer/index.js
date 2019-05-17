import React, { Component } from 'react';
import EditUser from '../EditUser'
import NewNightForm from '../NewNightForm'
import ReviewForm from '../ReviewForm'
import ActivityContainer from '../ActivityContainer'

class UserContainer extends Component {
  // initialized the state so that just the UserContainer displays
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
  // when the page loads, all of the user's activities are found and stored in the state
  componentDidMount = async () => {
    
     await this.findAllUserActivities() 
     // sets the state to take the edit user properties
     this.setState({
      userToEdit: {
        email: this.props.email,
        username: this.props.username
      },
      // an alternate username display only to be re-rendered when the edit submit is clicked
      usernameDisplay: this.props.username

     })


  }

  // api call to find all user activities and set the state with all of the activities
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
  // deletes a user's account
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




      
      // resets the login page and renders the login component when the user is deleted
      this.props.resetToLogin()



    } catch (err) {

    }
}
  // logs the user out and resets the login page and renders the login component
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


      
      // resets the login page when the logout button is clicked
      this.props.resetToLogin()



    } catch (err) {

    }
  }
  // renders the EditUser component
  // shows the form to edit the user's information
  showModal = (movie) => {
    this.setState({
      modalShowing: true
    })
  }
  // tracks the edit form change
  // this function is passed to the EditUser component and when called state is lifted up from the 
  // EditUser component
  handleFormChange = (e) => {
    this.setState({
      userToEdit: {
        ...this.state.userToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      }
    })
  }
  // closes the modal and updates the user's information
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
      
      // hides the modal and resets the state
      this.setState({
        userToEdit: parsedResponse.data,
        modalShowing: false,
        usernameDisplay: parsedResponse.data.username
      })


    } catch (err) {
      console.log(err);
    }
  }
  // renders the NewNightForm component when the button is clicked
  showNewActivityForm = () => {
    this.setState({
      newActivity: true
    })
  }
  // function that is passed down to NewNightForm component and the ActivityContainer component
  // this function is used to lift up state when the home "buttons" are clicked
  // It resets the component (UserActivityContainer)
  resetPage = () => {
    console.log('ran resetPage');
    this.findAllUserActivities()
    this.setState({
      modalShowing: false,
      newActivity: false,
      showActivity: false
    })
  }
  //Renders the ActivityContainer component based on which one is clicked
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

  deleteActivity = async (e) => {
    console.log(e.currentTarget);
    try {
      const response = await fetch(process.env.REACT_APP_API_CALL + 'activity/' + e.currentTarget.id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }


      })

      const parsedResponse = await response.json();
      console.log(parsedResponse);
      

      await this.resetPage()


    } catch (err) {
      console.log(err);
    }
  }


  render() {



    // creates an array of Li's that display all of the user's activity names and types
    // the name <p> is clickable to show the ActivityContainer component for that activity
    const activities = this.state.userActivities.map((activity, i) => {
      return(
        <li key={i} className='activity-li'>
          <div>

            <p className='link' onClick={this.showActivity} id={activity._id}> Name: {activity.name}</p>
            <p>Type: {activity.type}</p><br/>
          </div>
          <ReviewForm activity={activity} deleteActivity={this.deleteActivity} resetPage={this.resetPage}/>


        </li>

        )
    })
    // reverses the created activity array to show the most recent first
    const newActivities = activities.reverse()

    // conditional rendering based on the state
    let display = ''
    if (this.state.usernameDisplay === '') {// conditional statement to wait until ComponentDidMount is finished running
                                            // in order to render the page
      display = ''
    } else {// if newActivity is true then render the NewNightForm component
      if (this.state.newActivity) {
        display = <NewNightForm resetPage={this.resetPage} userId={this.props.userId} position={this.props.position}/>
      } else if (this.state.newActivity === false && this.state.showActivity === false) {//displays user home page on default
        display = (
          <div>
            <h1 className='header'>GoOut!</h1>
            <p className='description'>Decide Where You're Going Now</p>
            <h2>{this.state.usernameDisplay}</h2>
            <div className='buttonContainer'>
              <button className='largeButton' type="submit" onClick={this.deleteUser}>Delete Account</button>
              {this.state.modalShowing ? <EditUser closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} userToEdit={this.state.userToEdit}/> : <button className='largeButton' type='submit' onClick={this.showModal}>Edit User</button>}
              <button className='largeButton' type="submit" onClick={this.logout}>Log Out</button>
            </div>
            <h4>Your Experiences Going Out</h4>
            <div className='centerDiv'>
              <div className='overflowContainer'>
                <ul className='activityList'>
                  {newActivities}
                </ul>
              </div>  
            </div>
            <button className='newOutButton' type='submit' onClick={this.showNewActivityForm}>Go Out Now!</button>
            
          </div>
          )
      } else {
        display = <ActivityContainer activityToShow={this.state.activityToShow} session={this.state.session} resetPage={this.resetPage} position={this.props.position} isActivityPage={true}/>
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