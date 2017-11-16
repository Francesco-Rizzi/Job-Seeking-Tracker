import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import DataViewJob from './data_view_job';
import stageNames from './stages_data';

const ns = 'jst-app-logic-view-data';

class DataView extends Component {
	
	render(){
		
		const data        = this.props.user.data;
		const groupedJobs = this.groupJobsByStage(data.jobs);
		const keys        = Object.keys(groupedJobs);
		
		return (
			<div className={ns}>
				{keys.map(k => (
					<div key={k} className={`${ns}-group`}>
						<h2 className={`${ns}-title`}>{stageNames[ k ]}</h2>
						{groupedJobs[ k ].map(( j, i ) => <DataViewJob key={i} job={j} />)}
					</div>
				))}
			</div>
		);
		
	}
	
	groupJobsByStage( jobs ){
		
		let res = {};
		jobs.map(j =>{
			let group = res[ j.stageCode ];
			group ? group.push(j) : res[ j.stageCode ] = [ j ];
		});
		return res;
		
	}
	
}

export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(DataView);