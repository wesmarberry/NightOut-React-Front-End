import React, { Component } from 'react';
import AcceptScreen from '../AcceptScreen';



class NewNightForm extends Component {
  constructor() {
    super();
    this.state = {
      distance: '',
      type: [],
      priceLevel: [],
      previousId: '',
      foundActivities: [],
      showAccept: false,
      message: '',
      session: ''
    }

  }

  componentDidMount = () => {
    
    
  }
  
  handleChange = (e) => {
    console.log(e.currentTarget.data_id);
    const stateCopy = this.state
    if (e.currentTarget.name === 'distance') {
      this.setState({
      [e.currentTarget.name]: Number(e.currentTarget.value)
    })
    }

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

  

  handleSubmit = async (e) => {
    e.preventDefault()

    console.log(this.state);
    try {

      const loginResponse = await fetch('http://localhost:3679/api/v1/activity', {
        method: 'POST',
        credentials: 'include', // on every request we have to send the cookie
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse);

      if (parsedResponse.data.length === 0) {
        this.setState({
          message: 'No results found with the specified parameters. Please Try Again'
        })
      } else {
        this.setState({
          foundActivities: parsedResponse.data,
          showAccept: true,
          session: parsedResponse.session
        })
      }
    

      // if (parsedResponse.data === 'registration successful') {
      //   console.log('registration successful');

      // }
      
      // this.setState({
      //   username: parsedResponse.session.username,
      //   email: parsedResponse.session.email,
      //   userId: parsedResponse.session.userDbId,
      //   logged: true
      // })
      



    } catch (err) {

    }
  }



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
  
  declineNight = async (arrToRemove) => {
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


      this.setState({
        distance: '',
        type: [],
        priceLevel: [],
        previousId: '',
        foundActivities: [],
        showAccept: false
      })
    

      // if (parsedResponse.data === 'registration successful') {
      //   console.log('registration successful');

      // }
      
      // this.setState({
      //   username: parsedResponse.session.username,
      //   email: parsedResponse.session.email,
      //   userId: parsedResponse.session.userDbId,
      //   logged: true
      // })
      



    } catch (err) {

    }
  }

  render() {

    console.log(this.state);
    let display = ''
    if (this.state.showAccept === false) {
      display = (

        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="radio-container">
                <h2>How Far Are You Willing To Go? (miles)</h2>
                <input type='radio' id='0.5' name='distance' value='0.5' onChange={this.handleChange}/>
                <label for='0.5'>0.5</label>
                <input type='radio' id='1' name='distance' value='1' onChange={this.handleChange}/>
                <label for='1'>1</label>
                <input type='radio' id='1.5' name='distance' value='1.5' onChange={this.handleChange}/>
                <label for='1.5'>1.5</label>
                <input type='radio' id='2' name='distance' value='2' onChange={this.handleChange}/>
                <label for='2'>2</label>
                <input type='radio' id='2.5' name='distance' value='2.5' onChange={this.handleChange}/>
                <label for='2.5'>2.5</label>
                <input type='radio' id='3' name='distance' value='3' onChange={this.handleChange}/>
                <label for='3'>3</label>
            </div>
            <div>
              <h2>Activity 1</h2>
              Price Level:
              <input type='radio' className='p1' id='11' name='priceLevel1' value='1' onChange={this.handleChange}/>
              <label for='11'>1</label>
              <input type='radio' className='p1' id='21' name='priceLevel1' value='2' onChange={this.handleChange}/>
              <label for='21'>2</label>
              <input type='radio' className='p1' id='31' name='priceLevel1' value='3' onChange={this.handleChange}/>
              <label for='31'>3</label>
              <input type='radio' className='p1' id='41' name='priceLevel1' value='4' onChange={this.handleChange}/>
              <label for='41'>4</label><br/>
              Type:
              <input type='radio' className='t1' id='Bar1' name='type1' value='bar' onChange={this.handleChange}/>
              <label for='Bar1'>Bar</label>
              <input type='radio' className='t1' id='Restaurant1' name='type1' value='restaurant' onChange={this.handleChange}/>
              <label for='Restaurant1'>Restaurant</label>
              <input type='radio' className='t1' id='Other1' name='type1' value='other' onChange={this.handleChange}/>
              <label for='Other1'>other</label>


            </div>
            <div>
              <h2>Activity 2</h2>
              Price Level:
              <input type='radio' className='p2' id='12' name='priceLevel2' value='1' onChange={this.handleChange}/>
              <label for='12'>1</label>
              <input type='radio' className='p2' id='22' name='priceLevel2' value='2' onChange={this.handleChange}/>
              <label for='2'>2</label>
              <input type='radio' className='p2' id='32' name='priceLevel2' value='3' onChange={this.handleChange}/>
              <label for='32'>3</label>
              <input type='radio' className='p2' id='42' name='priceLevel2' value='4' onChange={this.handleChange}/>
              <label for='42'>4</label><br/>
              Type:
              <input type='radio' className='t2' id='Bar2' name='type2' value='bar' onChange={this.handleChange}/>
              <label for='Bar2'>Bar</label>
              <input type='radio' className='t2' id='Restaurant2' name='type2' value='restaurant' onChange={this.handleChange}/>
              <label for='Restaurant2'>Restaurant</label>
              <input type='radio' className='t2' id='Other2' name='type2' value='other' onChange={this.handleChange}/>
              <label for='Other2'>other</label>


            </div>
            <div>
              <h2>Activity 3</h2>
              Price Level:
              <input type='radio' className='p3' id='13' name='priceLevel3' value='1' onChange={this.handleChange}/>
              <label for='13'>1</label>
              <input type='radio' className='p3' id='23' name='priceLevel3' value='2' onChange={this.handleChange}/>
              <label for='23'>2</label>
              <input type='radio' className='p3' id='33' name='priceLevel3' value='3' onChange={this.handleChange}/>
              <label for='33'>3</label>
              <input type='radio' className='p3' id='43' name='priceLevel3' value='4' onChange={this.handleChange}/>
              <label for='43'>4</label><br/>
              Type:
              <input type='radio' className='t3' id='Bar3' name='type3' value='bar' onChange={this.handleChange}/>
              <label for='Bar3'>Bar</label>
              <input type='radio' className='t3' id='Restaurant3' name='type3' value='restaurant' onChange={this.handleChange}/>
              <label for='Restaurant3'>Restaurant</label>
              <input type='radio' className='t3' id='Other3' name='type3' value='other' onChange={this.handleChange}/>
              <label for='Other3'>other</label>


            </div>
            <button type='submit'>Generate Night</button><br/>
            <p>{this.state.message}</p>

          </form>
        </div>


        )
    } else {
      display = <AcceptScreen foundActivities={this.state.foundActivities} declineNight={this.declineNight} acceptNight={this.acceptNight} session={this.state.session}/>
    }




    return(
      <div>
        {display}
      </div>
      )
    
  }
}

export default NewNightForm;
