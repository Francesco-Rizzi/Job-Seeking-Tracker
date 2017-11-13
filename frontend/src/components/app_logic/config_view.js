import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

const ns = 'jst-app-logic-view-config';

class ConfigView extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				<h2>Here your configuration values</h2>
				<div className={`${ns}-group`}>
					<div className={`${ns}-title`}>
					
					</div>
					<div className={`${ns}-description`}>
					
					</div>
				</div>
			</div>
		);
		
	}
	
	renderConfigField(field){
	
	}
	
}


export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(ConfigView);