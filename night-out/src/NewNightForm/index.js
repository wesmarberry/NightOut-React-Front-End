import React, { Component } from 'react';


class NewNightForm extends Component {
  constructor() {
    super();
    this.state = {
      distance: '',
      type1: '',
      priceLevel1: '',
      type2: '',
      priceLevel2: '',
      type3: '',
      priceLevel3: ''
    }

  }

  componentDidMount = () => {
    
    
  }
  
  handleChange = (e) => {
    
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  

  // handleSubmit = async (e) => {
  //   e.preventDefault()

  //   console.log(this.state);
  //   try {

  //     const loginResponse = await fetch('http://localhost:3679/api/v1/user/register', {
  //       method: 'POST',
  //       credentials: 'include', // on every request we have to send the cookie
  //       body: JSON.stringify(this.state),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })

  //     const parsedResponse = await loginResponse.json();
  //     console.log(parsedResponse);




  //     if (parsedResponse.data === 'registration successful') {
  //       console.log('registration successful');

  //     }
      
  //     this.setState({
  //       username: parsedResponse.session.username,
  //       email: parsedResponse.session.email,
  //       userId: parsedResponse.session.userDbId,
  //       logged: true
  //     })
  //     this.props.setUser(this.state.username, this.state.userId, this.state.email, true)



  //   } catch (err) {

  //   }
  // }




  

  render() {

    

    return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="radio-container">
                <h2>How Far Are You Willing To Go? (miles)</h2>
                <input type='radio' id='0.5' name='distance' value='0.5'/>
                <label for='0.5'>0.5</label>
                <input type='radio' id='1' name='distance' value='1'/>
                <label for='1'>1</label>
                <input type='radio' id='1.5' name='distance' value='1.5'/>
                <label for='1.5'>1.5</label>
                <input type='radio' id='2' name='distance' value='2'/>
                <label for='2'>2</label>
                <input type='radio' id='2.5' name='distance' value='2.5'/>
                <label for='2.5'>2.5</label>
                <input type='radio' id='3' name='distance' value='3'/>
                <label for='3'>3</label>
            </div>
            <div>
              <h2>Activity 1</h2>
              Price Level:
              <input type='radio' id='1' name='priceLevel1' value='1'/>
              <label for='1'>1</label>
              <input type='radio' id='2' name='priceLevel1' value='2'/>
              <label for='2'>2</label>
              <input type='radio' id='3' name='priceLevel1' value='3'/>
              <label for='3'>3</label>
              <input type='radio' id='4' name='priceLevel1' value='4'/>
              <label for='4'>4</label><br/>
              Type:
              <input type='radio' id='Bar' name='type1' value='bar'/>
              <label for='Bar'>Bar</label>
              <input type='radio' id='Restaurant' name='type1' value='restaurant'/>
              <label for='Restaurant'>Restaurant</label>
              <input type='radio' id='Other' name='type1' value='other'/>
              <label for='Other'>other</label>


            </div>
            <div>
              <h2>Activity 2</h2>
              Price Level:
              <input type='radio' id='1' name='priceLevel2' value='1'/>
              <label for='1'>1</label>
              <input type='radio' id='2' name='priceLevel2' value='2'/>
              <label for='2'>2</label>
              <input type='radio' id='3' name='priceLevel2' value='3'/>
              <label for='3'>3</label>
              <input type='radio' id='4' name='priceLevel2' value='4'/>
              <label for='4'>4</label><br/>
              Type:
              <input type='radio' id='Bar' name='type2' value='bar'/>
              <label for='Bar'>Bar</label>
              <input type='radio' id='Restaurant' name='type2' value='restaurant'/>
              <label for='Restaurant'>Restaurant</label>
              <input type='radio' id='Other' name='type2' value='other'/>
              <label for='Other'>other</label>


            </div>
            <div>
              <h2>Activity 3</h2>
              Price Level:
              <input type='radio' id='1' name='priceLevel3' value='1'/>
              <label for='1'>1</label>
              <input type='radio' id='2' name='priceLevel3' value='2'/>
              <label for='2'>2</label>
              <input type='radio' id='3' name='priceLevel3' value='3'/>
              <label for='3'>3</label>
              <input type='radio' id='4' name='priceLevel3' value='4'/>
              <label for='4'>4</label><br/>
              Type:
              <input type='radio' id='Bar' name='type3' value='bar'/>
              <label for='Bar'>Bar</label>
              <input type='radio' id='Restaurant' name='type3' value='restaurant'/>
              <label for='Restaurant'>Restaurant</label>
              <input type='radio' id='Other' name='type3' value='other'/>
              <label for='Other'>other</label>


            </div>
          </form>
        </div>
      )
    
  }
}

export default NewNightForm;
