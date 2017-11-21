import React, {Component} from 'react';
import {connect} from 'react-redux';
import utils from './../../utils/utils';

const ns = 'jst-app-logic-view-insights';

class InsightsView extends Component {
	
	render(){
		
		const data = this.getInsightsData();
		
		return (
			<div className={ns}>
				yey
			</div>
		);
		
	}
	
	getInsightsData(){
		
		const jobs        = this.props.user.data.jobs;
		const timeToStall = this.props.user.data.configuration.nrpl;
		
		const res = {
			stageByLocationBars : {},
			stageByLocationPie  : {},
		};
		
		for ( let job in jobs ) {
			
			let isActive = utils.isJobStalled(job, timeToStall);
			
		}
		
		return res;
		
	}
	
}


export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, null)(InsightsView);