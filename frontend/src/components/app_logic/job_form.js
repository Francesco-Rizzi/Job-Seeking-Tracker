import React, {Component} from 'react';
import {Field, reduxForm, change, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import utils from './../../utils/utils';
import ReactStars from 'react-stars';
import stages from './stages_data';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const ns = 'jst-app-logic-job-form';

class JobForm extends Component {
	
	render(){
		
		const job   = this.props.initialValues || false;
		const jobID = job ? utils.getJobID(job) : false;
		
		const lastContactOn = this.props.getField('lastContactOn') || +new Date();
		
		return (
			<div className={`${ns}`}>
				
				<form className={`${ns}-form`} onSubmit={this.props.handleSubmit(this.props.onSave.bind(this, jobID))}>
					
					<h2 className={`${ns}-title`}>Data:</h2>
					
					<div className={`${ns}-field-wrapper-row mod-3`}>
						{this.renderField('Role', 'role', 'text')}
						{this.renderField('Company', 'company', 'text')}
						{this.renderField('Location', 'location', 'text')}
					</div>
					
					<div className={`${ns}-field-wrapper-row mod-3`}>
						{this.renderField('Link', 'link', 'text', {required : false})}
						
						<div className={`${ns}-field-wrapper`}>
							<label className={`${ns}-label`}>Last contact on</label>
							<Field className={`${ns}-field mod-hide`} name='lastContactOn' component="input" type={'number'} required />
							<DatePicker className={`${ns}-field`} selected={moment(lastContactOn)} dateFormat="DD MMMM YYYY" minDate={moment().subtract(60, "days")} maxDate={moment().add(30, "days")} onChange={this.onLastContactOnChange} />
						</div>
						
						<div className={`${ns}-field-wrapper`}>
							<label className={`${ns}-label`}>Stage</label>
							<Field className={`${ns}-field`} name='stageCode' component="select" required>
								<option key={-1} disabled value=''>- select -</option>
								{Object.keys(stages).map(k => <option key={k} value={k}>{stages[ k ]}</option>)}
							</Field>
						</div>
					</div>
					
					<div className={`${ns}-field-wrapper-row mod-3`}>
						{this.renderField('Salary(K/y)', 'salary', 'number', {
							min  : 20000,
							max  : 3000000,
							step : 1
						})}
						{this.renderField('Equity(%)', 'equity', 'number', {
							min  : 0,
							max  : 30,
							step : .01
						})}
					</div>
					
					<h2 className={`${ns}-title`}>Ratings:</h2>
					
					<div className={`${ns}-field-wrapper-row mod-4`}>
						{this.renderRating('Benefits', 'rankings.fpk3')}
						{this.renderRating('Current traction', 'rankings.pic1')}
						{this.renderRating('Founder\'s strength', 'rankings.pic2')}
						{this.renderRating('Growth rate', 'rankings.pic3')}
					</div>
					
					<div className={`${ns}-field-wrapper-row mod-4`}>
						{this.renderRating('Employees retention', 'rankings.pic4')}
						{this.renderRating('Career opportunities', 'rankings.pic5')}
						{this.renderRating('Learning opportunities', 'rankings.poc1')}
						{this.renderRating('Company size and reputation', 'rankings.poc2')}
					</div>
					
					<div className={`${ns}-field-wrapper-row mod-4`}>
						{this.renderRating('Team composition', 'rankings.ppr1')}
						{this.renderRating('Location', 'rankings.ppr2')}
						{this.renderRating('Culture', 'rankings.ppr3')}
					</div>
					
					
					<div className={`${ns}-actions`}>
						<button className={`${ns}-action jst-button-link-danger mod-small`} onClick={this.props.onCancel} type='button'>
							Cancel
						</button>
						<button className={`${ns}-action jst-button-primary mod-small mod-space-left`} onClick={this.updateLastContactOn.bind(this, lastContactOn)} type="submit">
							Save
						</button>
					</div>
				
				</form>
			
			</div>
		);
		
	}
	
	onRatingChange( field, val ){
		this.props.changeField(field, val * 2);
	}
	
	onLastContactOnChange = ( date ) =>{
		this.props.changeField('lastContactOn', +date);
	};
	
	renderField( name, code, type, params ){
		return (
			<div className={`${ns}-field-wrapper`}>
				<label className={`${ns}-label`}>{name}</label>
				<Field className={`${ns}-field`} name={code} component="input" type={type} required={true} {...params} />
			</div>
		);
	}
	
	renderRating( name, code ){
		return (
			<div className={`${ns}-field-wrapper`}>
				<label className={`${ns}-label`}>{name}</label>
				<Field className={`${ns}-field mod-rating`} name={code} component="input" type="number" />
				<ReactStars color1={'#888888'} color2={'#e6c304'} value={this.props.getField(code) / 2 || 0} onChange={this.onRatingChange.bind(this, code)} />
			</div>
		);
	}
	
	updateLastContactOn( v ){
		this.props.changeField('lastContactOn', v);
		return true;
	}
	
}

const selector = formValueSelector('job');
export default connect(state => ({
	getField : ( field ) => selector(state, field),
}), {changeField : ( field, val ) => change("job", field, val)})(reduxForm({form : 'job'})(JobForm));