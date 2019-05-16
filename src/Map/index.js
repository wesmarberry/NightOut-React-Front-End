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
    console.log('========================');
    console.log(this.props.activityLocations[0].location.lat);
    const markers = this.props.activityLocations.map((activity, i) => {
      return(

        <Marker 
          key={i} 
          name={activity.name} 
          position={activity.location}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
          style={{'z-index': '5'}}
          onClick={this.onMarkerClick}

        />
        )
        
      
    })
    let display = '';
    if (this.props.activityLocations.length === 1) {
      
      display = <div className='centerDiv'>
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
        <Marker 
          name={this.props.activityLocations[0].name}
          position={this.props.activityLocations[0].location}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
          style={{'z-index': '5'}}
          onClick={this.onMarkerClick}
        />
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <p>{this.state.selectedPlace.name}</p>
            </div>
        </InfoWindow>
          
        </Map>
        <p>{this.props.activityLocations.location}</p>
      </div>
      } else if (this.props.activityLocations.length === 2) {
        
      display = <div className='centerDiv'>
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
        <Marker 
          name={this.props.activityLocations[0].name}
          position={this.props.activityLocations[0].location}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
          style={{'z-index': '5'}}
          onClick={this.onMarkerClick}
        />
        <Marker 
          name={this.props.activityLocations[1].name}
          position={this.props.activityLocations[1].location}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
          style={{'z-index': '5'}}
          onClick={this.onMarkerClick}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <p>{this.state.selectedPlace.name}</p>
            </div>
        </InfoWindow>
          
        </Map>
        <p>{this.props.activityLocations.location}</p>
      </div>
      } else if (this.props.activityLocations.length === 3) {
    
 
      display = <div className='centerDiv'>
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
        <Marker 
          name={this.props.activityLocations[0].name}
          position={this.props.activityLocations[0].location}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
          style={{'z-index': '5'}}
          onClick={this.onMarkerClick}
        />
        <Marker 
          name={this.props.activityLocations[1].name}
          position={this.props.activityLocations[1].location}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
          style={{'z-index': '5'}}
          onClick={this.onMarkerClick}
        />
        <Marker 
          name={this.props.activityLocations[2].name}
          position={this.props.activityLocations[2].location}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
          style={{'z-index': '5'}}
          onClick={this.onMarkerClick}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <p>{this.state.selectedPlace.name}</p>
            </div>
        </InfoWindow>
          
        </Map>
        <p>{this.props.activityLocations.location}</p>
      </div>
      }

    console.log(markers);

    return (
      <div>
        {display}
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(CoolMap);