import React, {Component} from 'react';
import utils from './../utils/utils';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

const ns = 'jst-sing';

export default class AppSign extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				<AppSignInForm />
				<div className={`${ns}-or-divider`}>- OR -</div>
				<AppSignUpForm />
			</div>
		);
		
	}
	
}

/* NOT SHARED CLASSES */

class _AppSignInForm extends Component {
	
	render(){
		
		return (
			<div className={`${ns}-in`}>
				
				<h2>Sign in</h2>
				<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
					<div>
						<label>Email</label>
						<div>
							<Field
								name="email"
								component="input"
								type="email"
								placeholder="Email"
								required
							/>
						</div>
					</div>
					<div>
						<label>Password</label>
						<div>
							<Field
								name="password"
								component="input"
								type="password"
								required
							/>
						</div>
					</div>
					<div>
						<button type="submit" disabled={this.props.ui.isFrozen}>
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
				
				<h2>Sing up</h2>
				<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
					<div>
						<label>Name</label>
						<div>
							<Field
								name="name"
								component="input"
								type="text"
								placeholder="Name"
								required
							/>
						</div>
					</div>
					<div>
						<label>Email</label>
						<div>
							<Field
								name="email"
								component="input"
								type="email"
								placeholder="Email"
								required
							/>
						</div>
					</div>
					<div>
						<label>Password</label>
						<div>
							<Field
								name="password"
								component="input"
								type="password"
								required
							/>
						</div>
					</div>
					<div>
						<button type="submit" disabled={this.props.ui.isFrozen}>
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
