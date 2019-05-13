import React, { Component } from 'react';



class EditUser extends Component {
	constructor() {
		super()
		this.state = {

		}
	}

	



	render() {
	
		return(
			<div>
				<form onSubmit={this.props.closeAndEdit}>
					<label>
					Username:
					<input type='text' name='username' onChange={this.props.handleFormChange} value={this.props.userToEdit.username}/>
					</label>
					<label>
					Email:
					<input type='text' name='email' onChange={this.props.handleFormChange} value={this.props.userToEdit.email}/>
					</label>
					<input type="submit" value='Update User'/>
				</form>
			</div>

			)
	}


}

export default EditUser;