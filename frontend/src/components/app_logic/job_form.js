import React, {Component} from 'react';
import {Field, reduxForm, change, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import utils from './../../utils/utils';
import ReactStars from 'react-stars';

const ns = 'jst-app-logic-job-form';

class JobForm extends Component {
	
	render(){
		
		const job   = this.props.initialValues || false;
		const jobID = job ? utils.getJobID(job) : false;
		
		return (
			<div className={`${ns}`}>
				
				<form className={`${ns}-form`} onSubmit={this.props.handleSubmit(this.props.onSave.bind(0, jobID))}>
					
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Role</label>
						<Field
							className={`${ns}-field`}
							name="role"
							component="input"
							type="text"
							required
						/>
					</div>
					
					<h4>Rankings</h4>
					
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Benefits</label>
						<Field className={`${ns}-field mod-rating`} name="rankings.fpk3" component="input" type="number" />
						<ReactStars color1={'#888888'} color2={'#e6c304'} value={this.props.getRating('rankings.fpk3') / 2 || 0} onChange={this.onRatingChange.bind(this, 'rankings.fpk3')} />
					</div>
					
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Benefits</label>
						<Field className={`${ns}-field mod-rating`} name="rankings.fpk3" component="input" type="number" />
						<ReactStars color1={'#888888'} color2={'#e6c304'} value={this.props.getRating('rankings.fpk3') / 2 || 0} onChange={this.onRatingChange.bind(this, 'rankings.fpk3')} />
					</div>
					
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Benefits</label>
						<Field className={`${ns}-field mod-rating`} name="rankings.fpk3" component="input" type="number" />
						<ReactStars color1={'#888888'} color2={'#e6c304'} value={this.props.getRating('rankings.fpk3') / 2 || 0} onChange={this.onRatingChange.bind(this, 'rankings.fpk3')} />
					</div>
					
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Benefits</label>
						<Field className={`${ns}-field mod-rating`} name="rankings.fpk3" component="input" type="number" />
						<ReactStars color1={'#888888'} color2={'#e6c304'} value={this.props.getRating('rankings.fpk3') / 2 || 0} onChange={this.onRatingChange.bind(this, 'rankings.fpk3')} />
					</div>
					
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Benefits</label>
						<Field className={`${ns}-field mod-rating`} name="rankings.fpk3" component="input" type="number" />
						<ReactStars color1={'#888888'} color2={'#e6c304'} value={this.props.getRating('rankings.fpk3') / 2 || 0} onChange={this.onRatingChange.bind(this, 'rankings.fpk3')} />
					</div>
					
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Benefits</label>
						<Field className={`${ns}-field mod-rating`} name="rankings.fpk3" component="input" type="number" />
						<ReactStars color1={'#888888'} color2={'#e6c304'} value={this.props.getRating('rankings.fpk3') / 2 || 0} onChange={this.onRatingChange.bind(this, 'rankings.fpk3')} />
					</div>
					
					<div className={`${ns}-actions`}>
						<button className={`${ns}-action jst-button-link mod-small`} onClick={this.props.onCancel}>
							Cancel
						</button>
						<button className={`${ns}-action jst-button-primary mod-small mod-space-left`} type="submit">
							Save
						</button>
					</div>
				
				</form>
			
			</div>
		);
		
	}
	
	onRatingChange( field, val ){
		this.props.changeRating(field, val * 2);
	}
	
}

const selector = formValueSelector('job');
export default connect(state => ({
	getRating : ( field ) => selector(state, field),
}), {changeRating : ( field, val ) => change("job", field, val)})(reduxForm({form : 'job',})(JobForm));