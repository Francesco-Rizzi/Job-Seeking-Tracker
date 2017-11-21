import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import DataViewJob from './data_view_job';
import {fullStages as stageNames} from './stages_data';
import JobForm from './job_form';
import utils from './../../utils/utils';
import _ from 'lodash';

const ns = 'jst-app-logic-view-data';

class DataView extends Component {
	
	constructor( props ){
		super(props);
		this.state = {
			action : false,
			jobID  : false
		};
	}
	
	render(){
		
		const data        = this.props.user.data;
		const groupedJobs = this.groupJobsByStage(data.jobs);
		const keys        = Object.keys(groupedJobs);
		const rankingConf= this.props.user.data.configuration;
		
		return (
			<div className={ns}>
				{keys.map(k => (
					<div key={k} className={`${ns}-group`}>
						<h2 className={`${ns}-title`}>{stageNames[ k ]} ({groupedJobs[ k ].length})</h2>
						{_.sortBy(groupedJobs[ k ], [j => utils.getJobRank(j, rankingConf), j => -j.insertedOn]).map(( j, i ) =>
																							   <DataViewJob key={i} job={j} rankingConf={rankingConf} onEdit={this.onEdit} onRemove={this.onRemove} />)}
					</div>
				))}
				<div className={`${ns}-add`}>
					<a className='jst-button-primary' onClick={this.onNew}>Add Job</a>
				</div>
				{this.renderJobForm()}
			</div>
		);
		
	}
	
	groupJobsByStage( jobs ){
		
		let res = {};
		let ids = Object.keys(jobs);
		
		ids.forEach(id =>{
			
			let j         = jobs[ id ];
			let stageCode = utils.isJobStalled(j, this.props.user.data.configuration.nrpl) ? 9 : j.stageCode;
			let group     = res[ stageCode ];
			group ? group.push(j) : res[ stageCode ] = [ j ];
			
		});
		
		return res;
		
	}
	
	onEdit = ( jobID ) =>{
		this.setState({
						  action : 'edit',
						  jobID
					  });
	};
	
	onNew = () =>{
		this.setState({action : 'new',});
	};
	
	onRemove = ( jobID ) =>{
		this.props.removeJob(jobID);
	};
	
	renderJobForm(){
		
		if ( this.state.action === 'edit' && this.state.jobID !== false ) {
			return <JobForm initialValues={this.props.user.data.jobs[ this.state.jobID ]} onCancel={this.onFormCancel} onSave={this.onFormSave} />;
		}
		
		if ( this.state.action === 'new' ) {
			return <JobForm onCancel={this.onFormCancel} onSave={this.onFormSave} />;
		}
		
		return null;
		
	}
	
	onFormCancel = () =>{
		this.clearAndCloseForm();
	};
	
	onFormSave = ( oldJobID = false, jobData ) =>{
		
		if ( this.state.action === 'new' ) {
			this.props.createJob(jobData);
		} else {
			this.props.editJob(jobData, oldJobID);
		}
		
		this.clearAndCloseForm();
	};
	
	clearAndCloseForm(){
		this.setState({
						  action : false,
						  jobID  : false
					  });
	}
	
}

export default connect(( {user} ) =>{
	return {user};
}, actions)(DataView);