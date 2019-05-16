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
      activityApiId: '',
      reviewed: '',
      username: ''
    }

  }

  componentDidMount = () => {
    if (this.props.activity.reviewed) {
      this.setState({
      body: this.props.activity.reviews[0].body,
      rating: this.props.activity.reviews[0].rating,
      userId: this.props.activity.userId,
      activityId: this.props.activity._id,
      activityApiId: this.props.activity.apiId,
      reviewed: this.props.activity.reviewed
    })
    } else {
      this.setState({
        userId: this.props.activity.userId,
        activityId: this.props.activity._id,
        activityApiId: this.props.activity.apiId,
        reviewed: this.props.activity.reviewed
      })
      
    }
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

      const response = await fetch(process.env.REACT_APP_API_CALL + 'activity/' + this.state.activityId + '/review', {
        method: 'POST',
        credentials: 'include', // on every request we have to send the cookie
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await response.json();
      console.log(parsedResponse);


      this.setState({
        body: parsedResponse.data.body,
        rating: Number(parsedResponse.data.rating),
        reviewed: true,
        username: parsedResponse.data.username
      })

      

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

    console.log(this.props.activity);
    let display = ''
    if (this.state.reviewed) {
      display = (<div className='reviewedData'>
        <p className='reviewP'>"{this.state.body}" - {this.state.username}</p>
        <p className=''>Rating: {this.state.rating}</p>
        <p>-----------------------</p>
      </div>)
    } else {
      display = (<form className='reviewForm' onSubmit={this.handleSubmit}>
            <input type="text" name="body" placeholder="Review Activity" value={this.state.body} onChange={this.handleChange}/><br/>
           <div className="radio-container">
                
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
            <input className='largeButton' type="submit" value="Submit Review" />
          </form>)
    }

    return(
        <div>
          {display}
        </div>
      )
    
  }
}

export default ReviewForm;