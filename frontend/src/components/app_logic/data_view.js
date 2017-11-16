import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import DataViewJob from './data_view_job';
import stageNames from './stages_data';
import JobForm from './job_form';

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
		
		return (
			<div className={ns}>
				{keys.map(k => (
					<div key={k} className={`${ns}-group`}>
						<h2 className={`${ns}-title`}>{stageNames[ k ]}</h2>
						{groupedJobs[ k ].map(( j, i ) =>
												  <DataViewJob key={i} job={j} onEdit={this.onEdit} onRemove={this.onRemove} />)}
					</div>
				))}
				<div className={`${ns}-add`}>
					<a className='jst-button-primary'>Add Job</a>
				</div>
				{this.renderJobForm()}
			</div>
		);
		
	}
	
	groupJobsByStage( jobs ){
		
		let res = {};
		let ids = Object.keys(jobs);
		
		ids.forEach(id =>{
			
			let j     = jobs[ id ];
			j.id      = id;
			let group = res[ j.stageCode ];
			group ? group.push(j) : res[ j.stageCode ] = [ j ];
			
		});
		
		return res;
		
	}
	
	onEdit = ( jobID ) =>{
		this.setState({
						  action : 'edit',
						  jobID
					  });
	};
	
	onRemove = ( jobID ) =>{
		this.props.removeJob(jobID);
	};
	
	renderJobForm(){
		
		if ( this.state.action === 'edit' && this.state.jobID !== false ) {
			return <JobForm job={this.props.user.data.jobs[ this.state.jobID ]} onCancel={this.onFormCancel} onSave={this.onFormSave} />;
		}
		
		if ( this.state.action === 'new' ) {
			return <JobForm job={{}} onCancel={this.onFormCancel} onSave={this.onFormSave} />;
		}
		
	}
	
	onFormCancel = () =>{
		this.clearAndCloseForm();
	};
	
	onFormSave = ( jobData ) =>{
		
		if ( this.state.action === 'new' ) {
			this.props.createJob(jobData);
		} else {
			this.props.editJob(jobData);
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

export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(DataView);