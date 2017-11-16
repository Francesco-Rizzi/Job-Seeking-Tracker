import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

const ns = 'jst-app-logic-job-form';

class JobForm extends Component {
	
	render(){
		
		const {job} = this.props;
		
		return (
			<div className={`${ns}`}>
				
				<form onSubmit={this.props.handleSubmit(this.onSave)}>
					
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Role</label>
						<Field
							className={`${ns}-field`}
							name="role"
							component="input"
							type="text"
							required
							value={job.role || ''}
						/>
					</div>
					
					<div className={`${ns}-actions`}>
						<button className={`${ns}-action jst-button-primary`} onClick={this.onCancel}>
							Cancel
						</button>
						<button className={`${ns}-action jst-button-primary`} type="submit">
							Save
						</button>
					</div>
				
				</form>
			
			</div>
		);
		
	}
	
}


export default reduxForm({form : 'job',})(JobForm);