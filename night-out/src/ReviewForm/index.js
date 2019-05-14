import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';


class ReviewForm extends Component {
  constructor() {
    super();
    this.state = {
      body: '',
      rating: '',
      userId: '',
      activityId: '',
      activityApiId: ''
    }

  }

  componentDidMount = () => {
    this.setState({
      userId: this.props.activity.userId,
      activityId: this.props.activity.activityId,
      activityApiId: this.props.activityApiId
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

      // const loginResponse = await fetch('http://localhost:3679/api/v1/user/new', {
      //   method: 'POST',
      //   credentials: 'include', // on every request we have to send the cookie
      //   body: JSON.stringify(this.state),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      // const parsedResponse = await loginResponse.json();
      // console.log(parsedResponse);

      


      

      // this.setState({
      //   username: parsedResponse.session.username,
      //   userId: parsedResponse.session.userDbId,
      //   email: parsedResponse.session.email,
      //   logged: true
      // })

      // this.props.setUser(this.state.username, this.state.userId, this.state.email, true)
      // if (parsedResponse.data === 'login successful') {
      //   console.log('SUCCESS');
      //   this.props.history.push('/user')
      // }


    } catch (err) {

    }
  }




  

  render() {

    

    return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="body" placeholder="Review Activity" value={this.state.body} onChange={this.handleChange}/><br/>
           <div className="radio-container">
                <h2>Review</h2>
                <input type='radio' id='0' name='rating' value='0' onChange={this.handleChange}/>
                <label for='0'>0</label>
                <input type='radio' id='1' name='rating' value='1' onChange={this.handleChange}/>
                <label for='1'>1</label>
                <input type='radio' id='2' name='rating' value='2' onChange={this.handleChange}/>
                <label for='2'>2</label>
                <input type='radio' id='3' name='rating' value='3' onChange={this.handleChange}/>
                <label for='3'>3</label>
                <input type='radio' id='4' name='rating' value='4' onChange={this.handleChange}/>
                <label for='4'>4</label>
                <input type='radio' id='5' name='rating' value='5' onChange={this.handleChange}/>
                <label for='5'>5</label>
            </div>
            <input type="submit" value="Review" />
          </form>
        </div>
      )
    
  }
}

export default ReviewForm;