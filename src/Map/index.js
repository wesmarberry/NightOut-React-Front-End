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
          
          onClick={this.onMarkerClick}

        />
        )
        
      
    })
    console.log(markers);

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <Map
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY}}
          initialCenter={{lat: this.props.session.lat, lng: this.props.session.lng}}
          zoom={this.state.zoom}
          google={this.props.google}
          style={{width: '40%', height: ""}}
          icon={{
            url: 'https://icon2.kisspng.com/20180403/caq/kisspng-google-map-maker-google-maps-computer-icons-openst-map-marker-5ac30986b07bc7.8541015415227313987229.jpg',
            anchor: new this.props.google.maps.Point(32,32),
            scaledSize: new this.props.google.maps.Size(64,64)
          }}
          onClick={this.onMapClicked}
        >
        <Marker 
          name='Your Location' 
          position={{lat: this.state.userLat, lng:this.state.userLng}}
          
          onClick={this.onMarkerClick}

        />
        {markers}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
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