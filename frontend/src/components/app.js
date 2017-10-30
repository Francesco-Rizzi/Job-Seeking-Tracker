import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppLogin from './app-login';
import utils from './../utils/utils';
import * as actions from '../actions';

export default class App extends Component {
	
	render(){
		
		if ( !this.state.user.isLogged ) {
			
			return <AppLogin />;
			
		}
		
		
	}
	
	componentWillMount(){
		
		//CHECK FOR NOT EXPIRED JWT
		const JWT = utils.getJWT();
		
		if ( !utils.isJWTExpired(JWT) ) {
			
			//Try to renew the JWT and use it
			utils.renewJWT();
			utils.startJWTAutoRenewal();
			
		} else {
		
			//Go to the login page,
			//force signOut to clear state
			this.props.signOut();
			
		
		}
		
	}
	
}

connect(( {user} ) =>{
	return {user};
}, actions)(App);