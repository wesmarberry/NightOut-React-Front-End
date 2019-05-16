import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 

 
class CoolMap extends Component {
  constructor(){
    super()
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        userLat: '',
        userLng: '',
        zoom: 12
      };
  }
 
  componentDidMount = () => {
    console.log(this.props);
    this.setState({
      userLat: this.props.session.lat,
      userLng: this.props.session.lng
    })
  }

  // getSession = async () => {
  //   try {

  //     const response = await fetch('http://localhost:3679/api/v1/user/getInfo', {
  //       method: 'GET',
  //       credentials: 'include', // on every request we have to send the cookie
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })

  //     const parsedResponse = await response.json();
  //     console.log(parsedResponse);

      


      


    


  //   } catch (err) {

  //   }
  // }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    console.log(this.props);
    const markers = this.props.activityLocations.map((activity, i) => {
      return(

        <Marker 
          key={i} 
          name={activity.name} 
          position={activity.location}
          icon={{
            url: 'http://www.clker.com/cliparts/c/I/g/P/d/h/google-maps-pin-blue.svg',
            anchor: new this.props.google.maps.Point(32,32),
            scaledSize: new this.props.google.maps.Size(64,64)
          }}
          onClick={this.onMarkerClick}

        />
        )
        
      
    })
    console.log(markers);

    return (
      // Important! Always set the container height explicitly
      <div className='centerDiv'>
        <Map
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY}}
          initialCenter={this.props.position}
          zoom={this.state.zoom}
          google={this.props.google}
          style={{width: '80%', height: "300px", left: '10%'}}
          
          onClick={this.onMapClicked}
        >
        <Marker 
          name='Your Location' 
          position={this.props.position}
          
          onClick={this.onMarkerClick}

        />
        {markers}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <p>{this.state.selectedPlace.name}</p>
            </div>
        </InfoWindow>
          
        </Map>
       
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(CoolMap);