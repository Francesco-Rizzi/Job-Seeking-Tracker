import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

const ns = 'jst-app-logic-view-data-job';

class DataViewJob extends Component {
	
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


export default connect(null, actions)(DataViewJob);