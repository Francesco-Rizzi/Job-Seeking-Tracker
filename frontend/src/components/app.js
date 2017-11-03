import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppSign from './app-sign';
import AppLogic from './app-logic';
import Notifications from './notifications';
import Loader from './loader';
import utils from './../utils/utils';
import * as actions from '../actions';

const ns = 'jst-app';

class App extends Component {
	
	render(){
		
		const {isLogged} = this.props.user;
		
		return <div className={`${ns}-wrapper ${this.props.ui.isFrozen ? 'mod-frozen' : ''}`}>
			{isLogged ? <AppLogic /> : <AppSign />}
			{this.handleFrozen()}
			<Notifications />
		</div>;
		
	}
	
	handleFrozen(){
		if ( this.props.ui.isFrozen ) {
			return <div className={`${ns}-frozen-message is-visible`}>
				<span className={`${ns}-frozen-message-loader`}>
					<Loader />
				</span>
				<span className={`${ns}-frozen-message-title`}>{this.props.ui.frozenMessage}</span>
				<span className={`${ns}-frozen-message-subtitle`}>&#9679; {generateSubtitle()} &#9679;</span>
			</div>;
		} else {
			return <div className={`${ns}-frozen-message`}></div>;
		}
		
		function generateSubtitle(){
			
			const num = Math.random() * 5;
			
			switch ( true ) {
				
				case (num < 1):
					return 'calculating the space-time equation';
					break;
				
				case (num < 2):
					return 'zooming inside the mandelbrot set';
					break;
				
				case (num < 3):
					return 'calculating the entropy of the universe';
					break;
				
				case (num < 4):
					return 'finding the higgs boson';
					break;
				
				case (num < 5):
					return 'hacking the gravity force';
					break;
				
			}
			
		}
		
	}
	
	componentWillMount(){
		
		//this.props.freeze('Fetching your data...');
		
		//CHECK FOR NOT EXPIRED JWT
		const JWT = utils.getJWT();
		
		if ( !utils.isJWTExpired(JWT) ) {
			
			//Try to auto sign-in
			this.props.signInWithJWT(JWT);
			
		} else {
			
			//Force signOut to clear state and render LogIn
			this.props.signOut();
			
		}
		
	}
	
}

export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(App);