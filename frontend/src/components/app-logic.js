import React, {Component} from 'react';
import utils from './../utils/utils';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {APPVIEWCONFIG, APPVIEWDATA, APPVIEWINSIGHTS} from "../actions/type";
import DataView from './app_logic/data_view';
import ConfigView from './app_logic/config_view';
import InsightsView from './app_logic/insights_view';

let interval = null;
const ns     = 'jst-logic';

class AppLogic extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				yey
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
		
		//Fetch the data
		this.props.fetchUserData();
		
		//Auto-save data every 5 minutes
		interval = setInterval(() =>{
			this.props.saveUserData(this.props.user.data, true);
		}, 1000 * 60 * 5);
		
	}
	
	componentWillUnmount(){
		interval = null;
	}
	
}


export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(AppLogic);