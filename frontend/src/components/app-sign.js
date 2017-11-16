import React, {Component} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

const ns = 'jst-sign';

export default class AppSign extends Component {
	
	render(){
		
		return (
			<div className={`${ns}-wrapper`}>
				<h1 className={`${ns}-page-title`}>App</h1>
				<div className={ns}>
					<AppSignInForm />
					<div className={`${ns}-or-divider`}>- OR -</div>
					<AppSignUpForm />
				</div>
			</div>
		);
		
	}
	
}

/* NOT SHARED CLASSES */

class _AppSignInForm extends Component {
	
	render(){
		
		return (
			<div className={`${ns}-in`}>
				
				<h2 className={`${ns}-title`}>Sign in</h2>
				<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Email</label>
						<Field
							className={`${ns}-field`}
							name="email"
							component="input"
							type="email"
							placeholder="Email"
							required
						/>
					</div>
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Password</label>
						<Field
							className={`${ns}-field`}
							name="password"
							component="input"
							type="password"
							required
						/>
					</div>
					<div>
						<button className={`${ns}-link jst-button-primary`} type="submit" disabled={this.props.ui.isFrozen}>
							Sign in
						</button>
					</div>
				</form>
			
			</div>
		);
		
	}
	
	onSubmit( values ){
		this.props.signIn.apply(0, Object.values(values));
	}
	
}

const AppSignInForm = connect(( {ui} ) =>{
	return {ui};
}, actions)(reduxForm({form : 'signin',})(_AppSignInForm));

class _AppSignUpForm extends Component {
	
	render(){
		return (
			<div className={`${ns}-up`}>
				
				<h2 className={`${ns}-title`}>Sing up</h2>
				<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Name</label>
						<Field
							className={`${ns}-field`}
							name="name"
							component="input"
							type="text"
							placeholder="Name"
							required
						/>
					</div>
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Email</label>
						<Field
							className={`${ns}-field`}
							name="email"
							component="input"
							type="email"
							placeholder="Email"
							required
						/>
					</div>
					<div className={`${ns}-field-wrapper`}>
						<label className={`${ns}-label`}>Password</label>
						<Field
							className={`${ns}-field`}
							name="password"
							component="input"
							type="password"
							required
						/>
					</div>
					<div>
						<button className={`${ns}-link jst-button-primary`} type="submit" disabled={this.props.ui.isFrozen}>
							Sign up
						</button>
					</div>
				</form>
			
			</div>
		);
		
	}
	
	onSubmit( values ){
		this.props.signUp.apply(0, Object.values(values));
	}
	
}

const AppSignUpForm = connect(( {ui} ) =>{
	return {ui};
}, actions)(reduxForm({form : 'signup',})(_AppSignUpForm));
