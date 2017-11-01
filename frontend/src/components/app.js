import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppSign from './app-sign';
import AppLogic from './app-logic';
import Notifications from './notifications';
import utils from './../utils/utils';
import * as actions from '../actions';

const ns = 'jst-app';

class App extends Component {
	
	render(){
		
		const {isLogged} = this.props.user;
		
		return <div>
			{isLogged ? <AppLogic /> : <AppSign />}
			{this.handleFrozen()}
			<Notifications />
		</div>;
		
	}
	
	handleFrozen(){
		if ( this.props.ui.isFrozen ) {
			return <div className={`${ns}-frozen-message`}>
				<span className={`${ns}-frozen-message-loader`}>[]</span> {this.props.ui.frozenMessage}
			</div>;
		}
	}
	
	componentWillMount(){
		
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