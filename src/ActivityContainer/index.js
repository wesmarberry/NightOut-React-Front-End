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

	componentDidMount = async () => {
		const reviews = []

		for (let i = 0; i < this.props.activityToShow.matchingActivityData.length; i++) {
			for (let j = 0; j < this.props.activityToShow.matchingActivityData[i].reviews.length; j++) {
				reviews.push(this.props.activityToShow.matchingActivityData[i].reviews[j])
			}
		}

		const renderReviews = await reviews.map((review, i) => {
			return(
				<li className='activityReviewLi' key={i}>
					"{review.body}" - {review.username}<br/>
					Rating: {review.rating}<br/>
					<p>--------------</p>
				</li>

				)
		})

		let rating = await this.findOverallRating(reviews)
		rating = rating.toString()


		this.setState({
			overallRating: rating,
			reviews: reviews,
			renderReviews: renderReviews
		})
		// this.updateOverallRating(rating)
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