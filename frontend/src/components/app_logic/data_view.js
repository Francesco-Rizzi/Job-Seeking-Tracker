import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

const ns = 'jst-app-logic-view-data';

class DataView extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				yey
			</div>
		);
		
	}
	
}


export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(DataView);