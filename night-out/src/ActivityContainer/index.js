import React, { Component } from 'react';
import CoolMap from '../Map'


class ActivityContainer extends Component {
	constructor() {
		super()
		this.state = {

		}
	}


	findOverallRating = (reviews) => {
		let overallNum = 0
		for (let i = 0; i < reviews.length; i++) {
			overallNum += Number(reviews[i].rating)
		}
		return (overallNum / reviews.length)
	}


	render() {
		console.log(this.props.activityToShow);

		const reviews = []

		for (let i = 0; i < this.props.activityToShow.matchingActivityData.length; i++) {
			for (let j = 0; j < this.props.activityToShow.matchingActivityData[i].reviews.length; j++) {
				reviews.push(this.props.activityToShow.matchingActivityData[i].reviews[j])
			}
		}

		const renderReviews = reviews.map((review, i) => {
			return(
				<li key={i}>
					{review.body}<br/>
					Rating: {review.rating}<br/>
				</li>

				)
		})


		return(
			<div>
				<div>
				<h2>Overall Rating: {this.findOverallRating(reviews)}</h2>
				<h1>{this.props.activityToShow.data.name}</h1>
				<p>Type of Place: {this.props.activityToShow.data.type}</p>
				<p>Address: {this.props.activityToShow.data.address}</p>
				<p>Price Level: {this.props.activityToShow.data.price_level}</p>
				<h2>Reviews</h2>

				<ul>
					{renderReviews}
				</ul>
				<CoolMap activityLocations={this.props.activityToShow} session={this.props.session}/>
				</div>
			</div>

			)
	}


}

export default ActivityContainer;