import React, { Component } from 'react';
import CoolMap from '../Map'


class AcceptScreen extends Component {
	constructor() {
		super()
		this.state = {
			foundActivities: []
		}
	}





	render() {
		console.log(this.state);

		const activities = this.props.foundActivities.map((activity, i) => {
			return (
				<li key={i}>
				Name: {activity.name}<br/>
				Type of Place: {activity.type}<br/>
				$$ Level: {activity.price_level}<br/>
				Address: {activity.address}
				</li>
				)
		})
		return(
			<div>
				<div>
				<h2>Activities</h2>
				<ul>
					{activities}
				</ul>
				<button type='submit' onClick={this.props.acceptNight}>Accept Night</button>
				<button type='submit' onClick={this.props.declineNight.bind(null, this.props.foundActivities)}>Decline Night</button>
				</div>
				<CoolMap activityLocations={this.props.foundActivities} session={this.props.session}/>
			</div>

			)
	}


}

export default AcceptScreen;