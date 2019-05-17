import React, { Component } from 'react';
import AcceptScreen from '../AcceptScreen';



class NewNightForm extends Component {
  constructor() {
    super();
    this.state = {
      distance: '',
      type: [],
      priceLevel: [],
      maxPrice: 'true',
      openNow: 'true',
      previousId: '',
      foundActivities: [],
      showAccept: false,
      message: '',
      session: '',
      userId: ''
    }

  }
  // sets the userId when the component loads
  componentDidMount = () => {
    this.setState({
      userId: this.props.userId
    })
    
  }
  // sets the type and priceLevel state properties when the user fills out the form
  handleChange = (e) => {
    console.log(e.currentTarget.data_id);
    const stateCopy = this.state
    // sets the distance parameter for the API call
    if (e.currentTarget.name === 'distance') {
      this.setState({
      [e.currentTarget.name]: Number(e.currentTarget.value)
    })
    }
    // sets the value of the array item based on the className and updates state
    if (e.currentTarget.className === 't1') {
      console.log('ran t1');
      stateCopy.type[0] = e.currentTarget.value
      console.log(stateCopy);
      this.setState({
        type: stateCopy.type
      })
    } else if (e.currentTarget.className === 't2') {
      console.log('ran t2');
      stateCopy.type[1] = e.currentTarget.value
      console.log(stateCopy);
      this.setState({
        type: stateCopy.type
      })
    } else if (e.currentTarget.className === 't3') {
      console.log('ran t3');
      stateCopy.type[2] = e.currentTarget.value
      console.log(stateCopy);
      this.setState({
        type: stateCopy.type
      })
    }
    // sets the pricelevel state property based on the className of the form
    if (e.currentTarget.className === 'p1') {
      console.log('ran t1');
      stateCopy.priceLevel[0] = e.currentTarget.value
      console.log(stateCopy);
      this.setState({
        priceLevel: stateCopy.priceLevel
      })
    } else if (e.currentTarget.className === 'p2') {
      console.log('ran t2');
      stateCopy.priceLevel[1] = e.currentTarget.value
      console.log(stateCopy);
      this.setState({
        priceLevel: stateCopy.priceLevel
      })
    } else if (e.currentTarget.className === 'p3') {
      console.log('ran t3');
      stateCopy.priceLevel[2] = e.currentTarget.value
      console.log(stateCopy);
      this.setState({
        priceLevel: stateCopy.priceLevel
      })
    }
    

  }

  
  // when the user submits the form the create API call is made
  // the number of activities that are filled out are the number of queries the API call makes
  handleSubmit = async (e) => {
    e.preventDefault()

    console.log(this.state);
    try {

      const loginResponse = await fetch(process.env.REACT_APP_API_CALL + 'activity', {
        method: 'POST',
        credentials: 'include', // on every request we have to send the cookie
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse.status);
      // if the parameters are not fully filled out then it returns an error message on the screen
      if (parsedResponse.data.length === 0) {
        console.log('running error');
        this.setState({
          message: 'No results found with the specified parameters. Please Try Again'
        })
      } else {// if ther queries are successful then they are added to the state and 
              // the user is redirected to the AcceptScreen component
        console.log('running set state');
        this.setState({
          foundActivities: parsedResponse.data,
          showAccept: true,
          session: parsedResponse.session
        })
      }
    

     



    } catch (err) {

    }
  }


  // if night is accepted on AcceptScreen component the state is passed up so that the user homepage is 
  // rendered (UserContainer component)
  acceptNight = () => {

    this.setState({
        distance: '',
        type: [],
        priceLevel: [],
        previousId: '',
        foundActivities: [],
        showAccept: false
    })
    this.props.resetPage()

  }
  // if the activites are declined the generated activites are deleted both from the users activites and 
  // the database in general
  declineNight = async (arrToRemove) => {
    const userId = this.props.userId
    console.log(userId);
    try {

      const loginResponse = await fetch(process.env.REACT_APP_API_CALL + 'activity/delete', {
        method: 'DELETE',
        credentials: 'include', // on every request we have to send the cookie
        body: JSON.stringify(arrToRemove),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse);

      // state is reset for the NewNightForm component
      this.setState({
        distance: '',
        type: [],
        priceLevel: [],
        previousId: '',
        foundActivities: [],
        showAccept: false,
        message: ''
      })
    

      


    } catch (err) {

    }
  }

  handleMaxMinChange = (e) => {
    console.log(e.currentTarget.value);
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  render() {

    console.log(this.state);
    // if the activity was not accepted or the component has initially loaded display the form
    let display = ''
    if (this.state.showAccept === false) {
      display = (

        <div>
          <div className='spaceAroundContainer'>
            <div>
              <h1 className='header'>GoOut!</h1>
              <p className='description'>Decide Where You're Going Now</p>
            </div>
            <p className='link' onClick={this.props.resetPage}>Home</p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="radio-container">
                <h4>How Far Are You Willing To Go? (miles)</h4>
                <label for='0.5'>0.5:</label>
                <input type='radio' id='0.5' name='distance' value='0.5' onChange={this.handleChange}/>
                <label for='1'>1:</label>
                <input type='radio' id='1' name='distance' value='1' onChange={this.handleChange}/>
                <label for='1.5'>1.5:</label>
                <input type='radio' id='1.5' name='distance' value='1.5' onChange={this.handleChange}/>
                <label for='2'>2:</label>
                <input type='radio' id='2' name='distance' value='2' onChange={this.handleChange}/>
                <label for='2.5'>2.5:</label>
                <input type='radio' id='2.5' name='distance' value='2.5' onChange={this.handleChange}/>
                <label for='3'>3:</label>
                <input type='radio' id='3' name='distance' value='3' onChange={this.handleChange}/>
                
            </div>
            <br/>
            <div>
              Places Open Now? (default is yes)
                <label for='yes'>Yes:</label>
                <input type='radio' id='yes' name='openNow' value='true' onChange={this.handleMaxMinChange}/>
                <label for='no'>No:</label>
                <input type='radio' id='no' name='openNow' value='false' onChange={this.handleMaxMinChange}/><br/>
              Max or Min Price? (default is max)
                <label for='max'>Max:</label>
                <input type='radio' id='max' name='maxPrice' value='true' onChange={this.handleMaxMinChange}/>
                <label for='min'>Min:</label>
                <input type='radio' id='min' name='maxPrice' value='false' onChange={this.handleMaxMinChange}/>
            </div>
            <p className='label'>Fill Out Up to 3 Activities</p>
            <div className='activityFormContainer'>
              <h4>Activity 1</h4>
              Max/Min Price Range:
              <label for='11'>$:</label>
              <input type='radio' className='p1' id='11' name='priceLevel1' value='1' onChange={this.handleChange}/>
              <label for='21'>$$:</label>
              <input type='radio' className='p1' id='21' name='priceLevel1' value='2' onChange={this.handleChange}/>
              <label for='31'>$$$:</label>
              <input type='radio' className='p1' id='31' name='priceLevel1' value='3' onChange={this.handleChange}/>
              <label for='41'>$$$$:</label>              
              <input type='radio' className='p1' id='41' name='priceLevel1' value='4' onChange={this.handleChange}/><br/>

              

              <label for='Bar1'>Bar</label>
              <input type='radio' className='t1' id='Bar1' name='type1' value='bar' onChange={this.handleChange}/>
              <label for='Restaurant1'>Restaurant</label>
              <input type='radio' className='t1' id='Restaurant1' name='type1' value='restaurant' onChange={this.handleChange}/>
              <label for='Other'>Other</label>
              <input type='text' className='t1' id='Other1' name='type1' value={this.state.type[0]} onChange={this.handleChange}/>
              


            </div>
            <div className='activityFormContainer'>
              <h4>Activity 2</h4>
              Max/Min Price Range:
              <label for='12'>$:</label>
              <input type='radio' className='p2' id='12' name='priceLevel2' value='1' onChange={this.handleChange}/>
              <label for='2'>$$:</label>
              <input type='radio' className='p2' id='22' name='priceLevel2' value='2' onChange={this.handleChange}/>
              <label for='32'>$$$:</label>
              <input type='radio' className='p2' id='32' name='priceLevel2' value='3' onChange={this.handleChange}/>
              <label for='42'>$$$$:</label>
              <input type='radio' className='p2' id='42' name='priceLevel2' value='4' onChange={this.handleChange}/><br/>

              <label for='Bar2'>Bar</label>
              <input type='radio' className='t2' id='Bar2' name='type2' value='bar' onChange={this.handleChange}/>
              <label for='Restaurant2'>Restaurant</label>
              <input type='radio' className='t2' id='Restaurant2' name='type2' value='restaurant' onChange={this.handleChange}/>
              <label for='Other2'>Other</label>
              <input type='text' className='t2' id='Other2' name='type2' value={this.state.type[1]} onChange={this.handleChange}/>
              


            </div>
            <div className='activityFormContainer'>
              <h4>Activity 3</h4>
              Max/Min Price Range:
              <label for='13'>$:</label>
              <input type='radio' className='p3' id='13' name='priceLevel3' value='1' onChange={this.handleChange}/>
              <label for='23'>$$:</label>
              <input type='radio' className='p3' id='23' name='priceLevel3' value='2' onChange={this.handleChange}/>
              <label for='33'>$$$:</label>
              <input type='radio' className='p3' id='33' name='priceLevel3' value='3' onChange={this.handleChange}/>
              <label for='43'>$$$$:</label>
              <input type='radio' className='p3' id='43' name='priceLevel3' value='4' onChange={this.handleChange}/><br/>
              

              <label for='Bar3'>Bar</label>
              <input type='radio' className='t3' id='Bar3' name='type3' value='bar' onChange={this.handleChange}/>
              <label for='Restaurant3'>Restaurant</label>
              <input type='radio' className='t3' id='Restaurant3' name='type3' value='restaurant' onChange={this.handleChange}/>
              <label for='Other3'>Other</label>
              <input type='text' className='t3' id='Other3' name='type3' value={this.state.type[2]} onChange={this.handleChange}/>
              


            </div>
            <button className='newOutButton' type='submit'>Find Place(s) To Go</button><br/>
            <p className='redMessage'>{this.state.message}</p>

          </form>
        </div>


        )
    } else {
      display = <AcceptScreen foundActivities={this.state.foundActivities} declineNight={this.declineNight} acceptNight={this.acceptNight} session={this.state.session} position={this.props.position} userId={this.props.userId}/>
    }




    return(
      <div>
        {display}
      </div>
      )
    
  }
}

export default NewNightForm;
