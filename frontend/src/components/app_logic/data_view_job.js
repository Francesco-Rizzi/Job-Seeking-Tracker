import React, {Component} from 'react';
import utils from './../../utils/utils';

const ns = 'jst-app-logic-view-data-job';

export default class DataViewJob extends Component {
	
	render(){
		
		const {job, rankingConf} = this.props;
		const id                 = utils.getJobID(job);
		const grade              = utils.getJobRank(job, rankingConf);
		
		return (
			<div className={`${ns}-item`}>
				<div className={`${ns}-title`}>Overview:</div>
				<div className={`${ns}-overview`}>
					<div><b>{job.role}</b> at <b>{job.company}</b> in <b>{job.location}</b> {/*this.renderLink(job)*/}</div>
					<div>Company Ranker: <b className={`${ns}-grade mod-${grade}`}>{grade}</b></div>
				</div>
				<div className={`${ns}-details`}>
					<div className={`${ns}-title`}>Full data:</div>
				
				</div>
				<div className={`${ns}-actions`}>
					<button className={`${ns}-action jst-button-danger mod-small`} onClick={() => this.props.onRemove(id)}>Remove</button>
					<button className={`${ns}-action jst-button-primary mod-small mod-space-left`} onClick={() => this.props.onEdit(id)}>Edit</button>
				</div>
			</div>
		);
		
	}
	
	renderLink( job ){
		if ( job.link ) {
			return <a href={job.link} target='_blank'>(<i>got-to-job</i>)</a>;
		}
	}
	
}