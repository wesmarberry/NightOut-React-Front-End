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
		if (overallNum === 0) {
			return 'No Reviews'
		} else {

			return (overallNum / reviews.length)
		}
	}


	render() {
		console.log(this.props.session);
		const activityForMap = [this.props.activityToShow.data]
		const reviews = []

		for (let i = 0; i < this.props.activityToShow.matchingActivityData.length; i++) {
			for (let j = 0; j < this.props.activityToShow.matchingActivityData[i].reviews.length; j++) {
				reviews.push(this.props.activityToShow.matchingActivityData[i].reviews[j])
			}
		}

		const renderReviews = reviews.map((review, i) => {
			return(
				<li key={i}>
					{review.body} - {review.username}<br/>
					Rating: {review.rating}<br/>
				</li>

				)
		})


		return(
			<div>
				<div className='activityHeaderContainer'>
					<p className='link' onClick={this.props.resetPage}>Home</p>
					<h5>Overall Rating: {this.findOverallRating(reviews)}</h5>
				</div>
				<div>
				<h1 className='activityHeader'>{this.props.activityToShow.data.name}</h1>
				<p>Type of Place: {this.props.activityToShow.data.type}<br/>
				Address: {this.props.activityToShow.data.address}<br/>
				Price Level: {this.props.activityToShow.data.price_level}</p>
				<h3>Reviews</h3>
				<div className='centerDiv'>
					<div className='reviewContainer'>
						<ul className='activityList'>
							{renderReviews}
						</ul>
					</div>
				</div>
				<CoolMap activityLocations={activityForMap} session={this.props.session} position={this.props.position}/>
				</div>
			</div>

			)
	}


}

export default ActivityContainer;