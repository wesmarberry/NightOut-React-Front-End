import React, { Component } from 'react';
import CoolMap from '../Map'


class ActivityContainer extends Component {
	constructor() {
		super()
		this.state = {
			overallRating: '',
			reviews: '',
			renderReviews: ''
		}
	}
	// when the component is loaded all the reviews that have been written about this place are loaded
	// and rendered
	componentDidMount = async () => {
		const reviews = []
		// pushes all reviews that have been written about this activity to the reviews array
		for (let i = 0; i < this.props.activityToShow.matchingActivityData.length; i++) {
			for (let j = 0; j < this.props.activityToShow.matchingActivityData[i].reviews.length; j++) {
				reviews.push(this.props.activityToShow.matchingActivityData[i].reviews[j])
			}
		}
		// generates the JSX to render
		const renderReviews = await reviews.map((review, i) => {
			return(
				<li className='activityReviewLi' key={i}>
					"{review.body}" - {review.username}<br/>
					Rating: {review.rating}<br/>
					<p>--------------</p>
				</li>

				)
		})
		// calculates the overall rating of the activity 
		let rating = await this.findOverallRating(reviews)
		rating = rating.toString()


		this.setState({
			overallRating: rating,
			reviews: reviews,
			renderReviews: renderReviews
		})
		// this.updateOverallRating(rating)
	}

	// fucntion to calculate the overall rating of the activity based on all of the reviews
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

	// API call to update the overall rating of the activity
	updateOverallRating = async (rating) => {
		try {
			const response = await fetch(process.env.REACT_APP_API_CALL + 'activity/' + this.props.activityToShow.data._id + '/overallRating', {
		        method: 'PUT',
		        credentials: 'include', // on every request we have to send the cookie
		        body: JSON.stringify(rating),
		        headers: {
		          'Content-Type': 'application/json'
		        }
			})

			const parsedResponse = await response.json();
			console.log('a;sgpoaerngperoanaoenvaeponao');
			console.log(parsedResponse);
			console.log('a;sgpoaerngperoanaoenvaeponao');



		} catch (err) {

		}
	}

	render() {
		console.log(this.props.session);
		// puts the single activity into an array so that the Map component can accept the property without mutating it
		const activityForMap = [this.props.activityToShow.data]


		


		return(
			<div>
				<div className='activityHeaderContainer'>
					<p className='link' onClick={this.props.resetPage}>Home</p>
					<h5>Overall Rating: {this.state.overallRating}</h5>
				</div>
				<div>
				<h1 className='activityHeader'>{this.props.activityToShow.data.name}</h1>
				<p>Type of Place: {this.props.activityToShow.data.type}<br/>
				Address: {this.props.activityToShow.data.address}<br/>
				Price Level: {this.props.activityToShow.data.price_level}</p>
				<h3>Reviews</h3>
				<div className='centerDiv'>
					<div className='reviewContainer reviewedData'>
						<ul className='activityList reviewActivityList'>
							{this.state.renderReviews}
						</ul>
					</div>
				</div>
				<CoolMap activityLocations={activityForMap} session={this.props.session} position={this.props.position} isActivityPage={this.props.isActivityPage}/>
				</div>
			</div>

			)
	}


}

export default ActivityContainer;