import React, { Component } from 'react';



class AcceptScreen extends Component {
	constructor() {
		super()
		this.state = {
			foundActivities: []
		}
	}





	render() {
		const activities = this.props.foundActivities.map((activity, i) => {
			return (
				<li key={i}>
				Name: {activity.name}<br/>
				Type of Place: {activity.type}<br/>
				$$ Levle: {activity.price_level}
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

				<button type='submit' onClick={this.props.declineNight.bind(null, this.props.foundActivities)}></button>
				</div>
			</div>

			)
	}


}

export default AcceptScreen;