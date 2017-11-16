import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

const ns = 'jst-app-logic-view-data-job';

export default class DataViewJob extends Component {
	
	render(){
		
		const {job} = this.props;
		
		return (
			<div className={`${ns}-item`}>
				<div className={`${ns}-overview`}>
					{job.role}
					{this.renderLink(job)}
				</div>
				<div className={`${ns}-details`}>
				
				</div>
				<div className={`${ns}-actions`}>
				<button  className={`${ns}-action jst-button-danger mod-small`}  onClick={() => this.props.onRemove(job.id)}>Remove</button>
				<button  className={`${ns}-action jst-button-primary mod-small`}  onClick={() => this.props.onEdit(job.id)}>Edit</button>
				</div>
			</div>
		);
		
	}
	
	renderLink( job ){
		if ( job.url ) {
			return <a href={job.url} target='_blank'>job url</a>;
		}
	}
	
}