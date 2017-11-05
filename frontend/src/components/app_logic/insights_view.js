import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

const ns = 'jst-app-logic-view-insights';

class InsightsView extends Component {
	
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
}, actions)(InsightsView);