import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

const ns = 'jst-app-logic-view-config';

class ConfigView extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				conf
			</div>
		);
		
	}
	
}


export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(ConfigView);