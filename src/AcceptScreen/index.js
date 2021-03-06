import React, { Component } from 'react';
import CoolMap from '../Map'


class AcceptScreen extends Component {
	constructor() {
		super()
		this.state = {
			foundActivities: []
		}
	}

	// passes up state if the user declines the activites
	decline = () => {
		this.props.declineNight(this.props.foundActivities)
	}


	render() {
		console.log(this.state);
		// creates the JSX for the activities from the API call to render
		const activities = this.props.foundActivities.map((activity, i) => {
			let moneySigns = ''
			for (let i = 0; i < activity.price_level; i++) {
				moneySigns += '$'
			}
			return (
				<li key={i}>
				<h2>Activity {i + 1}</h2>
				Name: {activity.name}<br/>
				Type of Place: {activity.type}<br/>
				Price Level: {moneySigns}<br/>
				Address: {activity.address}
				</li>
				)
		})
		return(
			<div>
				<div>
				<ul className='activityList reviewActivityList'>
					{activities}
				</ul>
				<div className='buttonContainer' id='acceptButtonContainer'>
					<button className='largeButton' type='submit' onClick={this.props.acceptNight}>Accept</button>
					<button className='largeButton' type='submit' onClick={this.decline}>Decline</button>
				</div>

				</div>
				
				<CoolMap activityLocations={this.props.foundActivities} session={this.props.session} position={this.props.position}/>
			</div>

			)
	}


}

export default AcceptScreen;