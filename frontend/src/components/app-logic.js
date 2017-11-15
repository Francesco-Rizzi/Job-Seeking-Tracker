import React, {Component} from 'react';
import utils from './../utils/utils';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {APPVIEWCONFIG, APPVIEWDATA, APPVIEWINSIGHTS} from "../actions/type";
import Header from './app_logic/header';
import DataView from './app_logic/data_view';
import ConfigView from './app_logic/config_view';
import InsightsView from './app_logic/insights_view';

let interval = null;
const ns     = 'jst-logic';

class AppLogic extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				<Header />
				<h1 className={`${ns}-title`}>
					Application {this.props.ui.appView}
				</h1>
				{this.renderView()}
			</div>
		);
		
	}
	
	renderView(){
		
		switch ( this.props.ui.appView ) {
			
			case APPVIEWDATA:
				return <DataView />;
				break;
			
			case APPVIEWCONFIG:
				return <ConfigView />;
				break;
			
			case APPVIEWINSIGHTS:
				return <InsightsView />;
				break;
			
		}
		
	}
	
	componentWillMount(){
		
		//Fetch the user data ONLY if not present (a.k.a. already fetched)
		if ( this.props.user.name === false ) {
			this.props.fetchUserData();
		}
		
		//Auto-renew the JWT
		utils.startJWTAutoRenewal();
		
		//Auto-save data every 5 minutes => now is on every user action
		/*interval = setInterval(() =>{
			this.props.saveUserData(this.props.user.data, true);
		}, 1000 * 10);*/
		
	}
	
	componentWillUnmount(){
		utils.stopJWTAutoRenewal();
		interval = null;
	}
	
}


export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(AppLogic);