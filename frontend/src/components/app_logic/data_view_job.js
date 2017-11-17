import React, {Component} from 'react';
import utils from './../../utils/utils';

const ns = 'jst-app-logic-view-data-job';

export default class DataViewJob extends Component {
	
	render(){
		
		const {job} = this.props;
		const id    = utils.getJobID(job);
		
		return (
			<div className={`${ns}-item`}>
				<div className={`${ns}-overview`}>
					<div>
						{job.role}
					</div>
					<div>
						{job.company}
					</div>
					{this.renderLink(job)}
				</div>
				<div className={`${ns}-details`}>
				
				</div>
				<div className={`${ns}-actions`}>
					<button className={`${ns}-action jst-button-danger mod-small`} onClick={() => this.props.onRemove(id)}>Remove</button>
					<button className={`${ns}-action jst-button-primary mod-small mod-space-left`} onClick={() => this.props.onEdit(id)}>Edit</button>
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