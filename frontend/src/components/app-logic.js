import React, {Component} from 'react';
import utils from './../utils/utils';
import * as actions from '../actions';
import {connect} from 'react-redux';

let interval = null;
const ns     = 'jst-logic';

class AppLogic extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				yey
			</div>
		);
		
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