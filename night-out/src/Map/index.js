import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 

 
class CoolMap extends Component {
  static defaultProps = {
    center: {
      lat: 41.8781,
      lng: -87.6298
    },
    zoom: 1
  };
  constructor(){
    super()
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };
  }
 
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
          initialCenter={this.props.center}
          zoom={this.props.zoom}
          google={this.props.google}
          style={{width: '40%', height: ""}}
          
          onClick={this.onMapClicked}
        >
        <Marker 
          name='Home Location' 
          position={{lat:41.8781, lng:-87.6298}}
          
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